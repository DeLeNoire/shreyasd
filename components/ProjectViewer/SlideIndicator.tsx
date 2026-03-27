import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  length: number;
  current: number;
  onSelect: (i: number) => void;
}

export default function SlideIndicator({ length, current, onSelect }: Props) {
  return (
    <div className="flex gap-2 my-4">
      {Array.from({ length }).map((_, i) => (
        <motion.span
          key={i}
          onClick={() => onSelect(i)}
          className="cursor-pointer"
          animate={{ scale: current === i ? 1.4 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {current === i ? '●' : '○'}
        </motion.span>
      ))}
    </div>
  );
}
