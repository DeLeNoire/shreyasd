import React from 'react';
import BrowserFrame from './BrowserFrame';
import { Slide } from './ProjectExperienceViewer';

interface Props {
  slide: Slide;
  isActive: boolean;
  previewUrl: string;
}

export default function ProjectSlide({ slide, isActive, previewUrl }: Props) {
  const commonClasses =
    'flex-shrink-0 w-full max-w-3xl h-[60vh] md:h-[70vh] rounded-lg overflow-hidden';

  switch (slide.type) {
    case 'preview':
      return (
        <div className={commonClasses}>
          {isActive ? <BrowserFrame url={previewUrl} /> : <div className="bg-gray-200 w-full h-full" />}
        </div>
      );
    case 'text':
      return (
        <div
          className={
            commonClasses +
            ' flex items-center justify-center bg-white p-10 text-center text-xl text-[#292524]'
          }
        >
          {slide.content}
        </div>
      );
    case 'architecture':
      return (
        <div className={commonClasses + ' bg-white p-6 overflow-auto'}>
          <pre className="text-sm font-mono text-[#44403c]">{slide.content}</pre>
        </div>
      );
    case 'code':
      return (
        <div className={commonClasses + ' bg-black text-green-400 p-4 overflow-auto'}>
          <pre className="text-xs font-mono">{slide.content}</pre>
        </div>
      );
    default:
      return null;
  }
}
