"use client";
import { useState, useMemo, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

type ThemeMode = "dark" | "light";

interface HorizontalExpandingLayoutProps {
  theme: ThemeMode;
  toggleTheme: () => void;
}

export default function HorizontalExpandingLayout({ theme, toggleTheme }: HorizontalExpandingLayoutProps) {
  const [expanded, setExpanded] = useState<number | null>(1);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const isDark = theme === "dark";

  const handleNavigate = useCallback((id: number) => {
    setExpanded((prev) => {
      const previous = prev ?? 1;
      setDirection(id > previous ? "next" : "prev");
      return id;
    });
  }, []);

  const sections = useMemo<Section[]>(
    () => [
      {
        id: 1,
        title: "1. Education",
        content: (
          <div className="w-screen h-full flex items-center justify-center">
            <MnnitId theme={theme} onNext={() => handleNavigate(2)} onPrev={null} />
          </div>
        ),
      },
      {
        id: 2,
        title: "2. Experience",
        content: (
          <div className="w-full h-full flex items-center justify-center">
            <Suspense fallback={<div>Loading...</div>}>
              <InfineraId theme={theme} onNext={() => handleNavigate(3)} onPrev={() => handleNavigate(1)} />
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
              <NokiaId theme={theme} onNext={null} onPrev={() => handleNavigate(2)} />
            </Suspense>
          </div>
        ),
      },
    ],
    [handleNavigate, theme]
  );

  const toggleExpand = (id: number) => {
    if (expanded !== id) setExpanded(id);
  };

  const slideVariants = {
    hiddenRight: { opacity: 0, x: 100 },
    hiddenLeft: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: (dir: "next" | "prev") => (dir === "next" ? { opacity: 0, x: -100 } : { opacity: 0, x: 100 }),
  };

  const shellClass = isDark
    ? "bg-[#111111] text-[#e6e4df] border-[#2a2a2a]"
    : "bg-[#f3f3f3] text-[#191919] border-[#e5e5e5]";
  const navClass = isDark
    ? "bg-[#161616] border-[#2a2a2a]"
    : "bg-[#f5f5f5] border-[#e5e5e5]";
  const mutedText = isDark ? "text-[#8a8784]" : "text-[#6f675f]";
  const linkClass = isDark ? "hover:text-[#ff3b3b]" : "hover:text-[#666666]";

  return (
    <>
      <div className={`grid grid-cols-[100px_100px_1fr_100px_100px] gap-[2px] mb-[2px] pt-2 pl-2 pr-2 ${shellClass}`}>
        <Cube theme={theme} className="h-[80px] cursor-pointer" label={isDark ? "☾" : "☀"} onClick={toggleTheme} />
        <Cube theme={theme} className="h-[80px]" label="[8px]" />

        <div className={`rounded-lg border px-6 py-3 h-[80px] ${navClass}`}>
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-4">
              <div className={`relative w-12 h-12 ${isDark ? "bg-[#ff3b3b]" : "bg-[#b56130]"} rounded-lg flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0">
                  {[...Array(28)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-1 h-1 ${isDark ? "bg-[#e6e4df]" : "bg-[#fff8ed]"} rounded-full`}
                      style={{
                        left: `${(i % 7) * 14 + 10}%`,
                        top: `${Math.floor(i / 7) * 25 + 10}%`,
                        opacity: Math.random() > 0.5 ? 1 : 0.2,
                        animation: `float ${2 + Math.random()}s ease-in-out infinite`,
                        animationDelay: `${Math.random()}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className={`text-[11px] font-mono ${mutedText}`}>Open to new roles</p>
              </div>
            </div>

            <div className={`flex items-center gap-6 text-xs font-mono ${isDark ? "text-[#b4b2ad]" : "text-[#4a433d]"}`}>
              <a href="#" className={`transition-colors ${linkClass}`}>Work</a>
              <a href="#about" className={`transition-colors ${linkClass}`}>About</a>
              <a href="#recommendations" className={`transition-colors ${linkClass}`}>Recommendations</a>
              <a href="https://github.com/DeLeNoire" target="_blank" rel="noopener" className={`transition-colors ${linkClass}`}>GitHub</a>
              <a href="https://www.linkedin.com/in/shreyasd19/" target="_blank" rel="noopener" className={`transition-colors ${linkClass}`}>LinkedIn</a>
            </div>
          </div>
        </div>

        <Cube theme={theme} className="h-[80px]" label="[100px]" />
        <Cube theme={theme} className="h-[80px]" />
      </div>

      <div className={`relative min-h-screen flex flex-col sm:flex-row m-2 rounded-lg ${isDark ? "bg-[#111111]" : "bg-[#f3f3f3]"}`}>
        <div className="relative z-10 flex-1 flex flex-col sm:flex-row">
          <AnimatePresence mode="wait">
            {sections.map((section) => (
              expanded === section.id && (
                <motion.div
                  key={section.id}
                  custom={direction}
                  initial={direction === "next" ? "hiddenRight" : "hiddenLeft"}
                  animate="visible"
                  exit="exit"
                  variants={slideVariants}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={`relative z-20 flex flex-col items-start justify-between overflow-hidden transition-all duration-500 ease-in-out border ${
                    expanded === section.id
                      ? isDark
                        ? "bg-[#111111] text-[#e6e4df] border-[#2a2a2a]"
                        : "bg-white text-[#1b1b1b] border-[#e5e5e5]"
                      : isDark
                        ? "bg-[#161616] text-[#8a8784] border-[#2a2a2a]"
                        : "bg-white text-[#6f675f] border-[#e5e5e5]"
                  }`}
                  style={{ width: expanded === section.id ? "100%" : "180px" }}
                  onClick={() => toggleExpand(section.id)}
                >
                  {expanded === section.id ? (
                    <div className="w-full h-full flex flex-col items-center justify-start overflow-y-auto">
                      <div className="w-full" style={{ height: "calc(100vh - 80px)" }}>
                        {section.content}
                      </div>
                    </div>
                  ) : (
                    <div className="absolute top-6 left-6 text-lg font-semibold">{section.title}</div>
                  )}
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {expanded && (
          <>
            {expanded > 1 && (
              <button
                onClick={() => handleNavigate(expanded - 1)}
                className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 text-4xl font-bold ${isDark ? "text-[#ff3b3b]" : "text-[#666666]"} hover:opacity-80 transition-opacity`}
              >
                {"{"}
              </button>
            )}
            {expanded < 3 && (
              <button
                onClick={() => handleNavigate(expanded + 1)}
                className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 text-4xl font-bold ${isDark ? "text-[#ff3b3b]" : "text-[#666666]"} hover:opacity-80 transition-opacity`}
              >
                {"}"}
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
