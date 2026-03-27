import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ProjectSlide from './ProjectSlide';
import { Slide } from './ProjectExperienceViewer';

interface Props {
  slides: Slide[];
  current: number;
  mode: 'stack' | 'floating' | 'holo' | 'carousel' | 'lab';
  previewUrl: string;
  onNext: () => void;
  onPrev: () => void;
  setCurrent: (i: number) => void;
}

export default function SlideContainer({
  slides,
  current,
  mode,
  previewUrl,
  onNext,
  onPrev,
  setCurrent,
}: Props) {
  const [slideSize, setSlideSize] = useState(0);

  const updateSize = useCallback(() => {
    let w = window.innerWidth * 0.8;
    if (window.innerWidth < 640) {
      w = window.innerWidth * 0.98; // nearly full width on small screens
    }
    setSlideSize(w);
  }, []);

  useEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [updateSize]);

  const handleDragEnd = (_: any, info: any) => {
    const vx = info.velocity.x;
    if (vx < -200) {
      onNext();
    } else if (vx > 200) {
      onPrev();
    } else {
      const moved = info.offset.x;
      if (moved < -slideSize / 3) {
        onNext();
      } else if (moved > slideSize / 3) {
        onPrev();
      }
    }
  };

  // compute translate x so that active slide is centered in viewport
  const offsetCenter =
    typeof window !== 'undefined'
      ? (window.innerWidth - slideSize) / 2
      : 0;
  const x = offsetCenter - current * (slideSize + 24); // gap of 24px

  // mode-specific class stub
  const modeClass = {
    stack: 'scale-95',
    floating: '',
    holo: 'bg-gradient-to-br from-cyan-200 to-purple-200',
    carousel: '',
    lab: '',
  }[mode];

  return (
    <motion.div
      className="relative w-full flex overflow-hidden"
      drag={mode !== 'lab' ? 'x' : undefined}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={mode !== 'lab' ? handleDragEnd : undefined}
      style={{ cursor: mode !== 'lab' ? 'grab' : 'default' }}
    >
      <motion.div
        className="flex gap-6"
        animate={{ x }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      >
        {slides.map((slide, i) => {
          const offset = i - current;
          // basic peek carousel values
          let anim: any = {
            opacity: current === i ? 1 : 0.6,
            scale: current === i ? 1 : 0.9,
          };
          let extraClass = '';

          if (mode === 'stack') {
            anim = {
              ...anim,
              y: offset > 0 ? 20 * offset : 0,
              scale: current === i ? 1 : 0.95,
              opacity: offset > 0 ? 0.7 - 0.1 * offset : anim.opacity,
            };
          } else if (mode === 'floating') {
            anim = {
              ...anim,
              rotate: offset * 3,
              y: Math.sin(offset) * 10,
            };
            extraClass = 'shadow-xl';
          } else if (mode === 'holo') {
            extraClass = 'border border-cyan-300 bg-white/10 backdrop-blur-sm';
            anim = {
              ...anim,
              boxShadow: current === i ? '0 0 40px rgba(0,255,255,0.6)' : '0 0 10px rgba(0,255,255,0.2)',
            };
          } else if (mode === 'lab') {
            anim = {
              ...anim,
              rotate: offset * 5,
              x: offset * 10,
            };
            extraClass = 'cursor-grab';
          }

          // additional drag props for lab mode
          const slideDragProps: any = {};
          if (mode === 'lab') {
            slideDragProps.drag = true;
            slideDragProps.dragConstraints = { left: -slideSize, right: slideSize, top: 0, bottom: 0 };
            slideDragProps.dragElastic = 0.2;
            slideDragProps.onDragEnd = (_: any, info: any) => {
              if (Math.abs(info.offset.x) > slideSize / 2) {
                if (info.offset.x < 0 && i < slides.length - 1) {
                  setCurrent(i + 1);
                } else if (info.offset.x > 0 && i > 0) {
                  setCurrent(i - 1);
                }
              }
            };
          }

          return (
            <motion.div
              key={i}
              className={`${modeClass} ${extraClass}`}
              style={{ width: slideSize, minWidth: slideSize }}
              animate={anim}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              {...slideDragProps}
            >
              <ProjectSlide
                slide={slide}
                isActive={current === i}
                previewUrl={previewUrl}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
