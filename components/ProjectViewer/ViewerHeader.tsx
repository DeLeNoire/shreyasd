import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  onClose: () => void;
  onNext: () => void;
  onPrev?: () => void;
  closeRef?: React.RefObject<HTMLButtonElement>;
}

export default function ViewerHeader({ title, onClose, onNext, onPrev, closeRef }: Props) {
  return (
    <motion.header
      className="relative z-10 flex items-center justify-between px-6 py-4 bg-transparent text-white"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className="flex items-center gap-4">
        <button
          ref={closeRef}
          aria-label="Close viewer"
          onClick={onClose}
          className="text-xl font-bold"
        >
          ✕
        </button>
        <button
          aria-label="Previous slide"
          onClick={onPrev}
          className="text-xl rotate-180"
        >
          →
        </button>
      </div>
      <h2 className="text-lg font-semibold truncate max-w-xs text-center">
        {title}
      </h2>
      <button aria-label="Next slide" onClick={onNext} className="text-xl">
        →
      </button>
    </motion.header>
  );
}
