import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ViewerHeader from './ViewerHeader';
import SlideContainer from './SlideContainer';
import SlideIndicator from './SlideIndicator';
import ProjectDescription from './ProjectDescription';

export type Slide = {
  type: 'preview' | 'text' | 'architecture' | 'code';
  content: string;
};

export type ProjectConfig = {  id?: number;  title: string;
  mode: 'stack' | 'floating' | 'holo' | 'carousel' | 'lab';
  previewUrl: string;
  slides: Slide[];
  description?: string;
};

interface Props {
  isOpen: boolean;
  config: ProjectConfig | null;
  onClose: () => void;
}

export default function ProjectExperienceViewer({ isOpen, config, onClose }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  const nextSlide = useCallback(() => {
    if (!config) return;
    setCurrentSlide((i) => Math.min(i + 1, config.slides.length - 1));
  }, [config]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((i) => Math.max(i - 1, 0));
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    },
    [isOpen, nextSlide, prevSlide, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  // focus the close button when viewer opens
  useEffect(() => {
    if (isOpen && closeRef.current) {
      closeRef.current.focus();
    }
  }, [isOpen]);

  // prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setCurrentSlide(0);
    }
  }, [isOpen]);

  if (!config) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          layoutId={config.id ? `project-card-${config.id}` : undefined}
          className="fixed inset-0 z-50 flex flex-col"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        >
          {/* background design: animated pastel gradients */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
          <style jsx>{`
            @keyframes slowRotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{ animation: 'slowRotate 60s linear infinite' }}
          />

          {/* background blur + dim */}
          <motion.div
            className="absolute inset-0 backdrop-blur-sm bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <ViewerHeader
            title={config.title}
            onClose={onClose}
            onNext={nextSlide}
            onPrev={prevSlide}
            closeRef={closeRef}
          />

          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <SlideContainer
              slides={config.slides}
              current={currentSlide}
              mode={config.mode}
              previewUrl={config.previewUrl}
              onNext={nextSlide}
              onPrev={prevSlide}
              setCurrent={setCurrentSlide}
            />
            <SlideIndicator
              length={config.slides.length}
              current={currentSlide}
              onSelect={(i: number) => setCurrentSlide(i)}
            />
            {config.description && (
              <ProjectDescription text={config.description} />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
