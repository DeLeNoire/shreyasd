"use client";
import { useState, useMemo, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import DotPattern from "../magicui/dot-pattern";
import { cn } from "@/lib/utils";

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

  // Memoizing the sections data to prevent re-creation on every render
  const sections = useMemo<Section[]>(
    () => [
      {
        id: 1,
        title: "1. Education",
        content: (
          <div className="w-screen h-full flex items-center justify-center">
            <MnnitId />
          </div>
        ),
      },
      {
        id: 2,
        title: "2. Experience",
        content: (
          <div className="w-full h-full flex items-center justify-center">
            <Suspense fallback={<div>Loading...</div>}>
              <InfineraId />
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
                <NokiaId />
              </Suspense>
            </div>
          ),
        },
    ],
    []
  );

  const toggleExpand = (id: number) => {
    if (expanded !== id) setExpanded(id);
  };

  // Render the actual layout after GIF is fully loaded
  return (
    <div className="min-h-screen flex flex-col sm:flex-row mt-16 pt-1">
      <div className="flex-1 flex flex-col sm:flex-row">
        {sections.map((section) => (
          <motion.div
            key={section.id}
            className={`relative flex flex-col items-start justify-between overflow-hidden transition-all duration-500 ease-in-out border border-gray-300 ${
              expanded === section.id
                ? "bg-white text-black"
                : "bg-gray-50 text-gray-500"
            }`}
            style={{ width: expanded === section.id ? "100%" : "180px" }}
            onClick={() => toggleExpand(section.id)}
          >
            {expanded === section.id && section.id === 1 ? (
              <div className="w-full h-full flex items-center justify-center p-6">
                {section.content}
              </div>
            ) : expanded === section.id ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full h-full p-6">
                <div className="col-span-1 -mt-8 z-20">{section.content}</div>
              </div>
            ) : (
              <div className="absolute top-6 left-6 text-lg font-semibold">
                {section.title}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Background Dot Pattern */}
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(650px_circle_at_center,black,transparent)]"
        )}
      />
    </div>
  );
}
