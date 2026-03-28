"use client";
import { useState, useMemo, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DotPattern from "../magicui/dot-pattern";
import { cn } from "@/lib/utils";
import Cube from "@/components/magicui/cube";

// Lazy loading the content components to improve performance
const MnnitId = lazy(() => import("../Idcards/BandMnnit"));
const InfineraId = lazy(() => import("../Idcards/BandInfinera"));
const NokiaId = lazy(() => import("../Idcards/BandNokia"));

interface Section {
  id: number;
  title: string;
  content: React.ReactNode;
}

export default function HorizontalExpandingLayout() {
  const [expanded, setExpanded] = useState<number | null>(1);
  const [direction, setDirection] = useState<'next' | 'prev'>(
'next');

  const handleNavigate = useCallback((id: number) => {
    setExpanded((prev) => {
      const previous = prev ?? 1;
      setDirection(id > previous ? 'next' : 'prev');
      return id;
    });
  }, []);

  // Memoizing the sections data to prevent re-creation on every render
  const sections = useMemo<Section[]>(
    () => [
      {
        id: 1,
        title: "1. Education",
        content: (
          <div className="w-screen h-full flex items-center justify-center">
            <MnnitId onNext={() => handleNavigate(2)} onPrev={null} />
          </div>
        ),
      },
      {
        id: 2,
        title: "2. Experience",
        content: (
          <div className="w-full h-full flex items-center justify-center">
            <Suspense fallback={<div>Loading...</div>}>
              <InfineraId onNext={() => handleNavigate(3)} onPrev={() => handleNavigate(1)} />
            </Suspense>
          </div>
        ),
      },
        {
          id: 3,
          title: "3. Nokia",
          content: (
            <div className="w-full h-full flex items-center justify-center">
              <Suspense fallback={<div>Loading...</div>}>
                <NokiaId onNext={null} onPrev={() => handleNavigate(2)} />
              </Suspense>
            </div>
          ),
        },
    ],
    [handleNavigate]
  );

  const toggleExpand = (id: number) => {
    if (expanded !== id) setExpanded(id);
  };

  const slideVariants = {
    hiddenRight: { opacity: 0, x: 100 },
    hiddenLeft: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: (dir: 'next' | 'prev') =>
      dir === 'next' ? { opacity: 0, x: -100 } : { opacity: 0, x: 100 },
  };

  // Render the actual layout after GIF is fully loaded
  return (
    <>

    {/* subtle top bar: full width, 50px height, thin border matching site accent */}

        {/* Navigation Section */}
        <div className="grid grid-cols-[100px_100px_1fr_100px_100px] gap-[2px] mb-[2px]">
          <Cube className="h-[80px]" />
          <Cube className="h-[80px]" label="[8px]" />
          
          {/* Center Navigation */}
          <div className="bg-[#f9f9f9] rounded-lg px-6 py-3 h-[80px]">
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 bg-[#e75532] rounded-lg flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0">
                    {[...Array(28)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-[#f9f9f9] rounded-full"
                        style={{
                          left: `${(i % 7) * 14 + 10}%`,
                          top: `${Math.floor(i / 7) * 25 + 10}%`,
                          opacity: Math.random() > 0.5 ? 1 : 0.2,
                          animation: `float ${2 + Math.random()}s ease-in-out infinite`,
                          animationDelay: `${Math.random()}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] text-[#79716b] font-mono">Open for new projects</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-xs font-mono text-[#79716b]">
                <a href="#" className="hover:text-[#e75532] transition-colors">Work</a>
                <a href="#about" className="hover:text-[#e75532] transition-colors">About</a>
                <a href="#recommendations" className="hover:text-[#e75532] transition-colors">Recommendations</a>
                <a href="mailto:info.sujitsen@gmail.com" className="hover:text-[#e75532] transition-colors">Email</a>
                <a href="https://www.linkedin.com/in/shreyasd19/" target="_blank" rel="noopener" className="hover:text-[#e75532] transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
          
          <Cube className="h-[80px]" label="[100px]" />
          <Cube className="h-[80px]" />
        </div>
    <div className="relative min-h-screen flex flex-col sm:flex-row m-2 rounded-lg">

      {/* Background Dot Pattern - positioned absolutely behind everything */}
      {/* <div className="fixed inset-0 pointer-events-none z-0 top-0 left-0 hidden md:block">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(650px_circle_at_center,black,transparent)]"
          )}
        />
      </div> */}

      <div className="relative z-10 flex-1 flex flex-col sm:flex-row">
        <AnimatePresence mode="wait">
          {sections.map((section) => (
            expanded === section.id && (
              <motion.div
                key={section.id}
                custom={direction}
                initial={direction === 'next' ? 'hiddenRight' : 'hiddenLeft'}
                animate="visible"
                exit="exit"
                variants={slideVariants}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className={`relative z-20 flex flex-col items-start justify-between overflow-hidden transition-all duration-500 ease-in-out border border-gray-300 ${
                  expanded === section.id
                    ? "bg-white text-black"
                    : "bg-gray-50 text-gray-500"
                }`}
                style={{ width: expanded === section.id ? "100%" : "180px" }}
                onClick={() => toggleExpand(section.id)}
              >
                {expanded === section.id ? (
                  <div className="w-full h-full flex flex-col items-center justify-start overflow-y-auto">
                    <div className="w-full" style={{ height: 'calc(100vh - 80px)' }}>
                      {section.content}
                    </div>
                  </div>
                ) : (
                  <div className="absolute top-6 left-6 text-lg font-semibold">
                    {section.title}
                  </div>
                )}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - positioned on sides */}
      {expanded && (
        <>
          {expanded > 1 && (
            <button
              onClick={() => handleNavigate(expanded - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-4xl font-bold text-red-600 hover:opacity-80 transition-opacity"
              style={{ color: '#b62222ff' }}
            >
              {'{'}
            </button>
          )}
          {expanded < 3 && (
            <button
              onClick={() => handleNavigate(expanded + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-4xl font-bold text-red-600 hover:opacity-80 transition-opacity"
              style={{ color: '#b62222ff' }}
            >
              {'}'}
            </button>
          )}
        </>
      )}
    </div>
  </>
  );
}
