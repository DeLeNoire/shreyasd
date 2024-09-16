"use client";
import { useState, useMemo, lazy, Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import DotPattern from "../magicui/dot-pattern";
import { cn } from "@/lib/utils";

// Lazy loading the content components to improve performance
const MnnitId = lazy(() => import("../Idcards/BandMnnit"));
const InfineraId = lazy(() => import("../Idcards/BandInfinera"));

interface Section {
  id: number;
  title: string;
  content: React.ReactNode;
}

// Default component to render when no section is selected
const DefaultComponent = () => (
  <div className="w-full h-full flex items-center justify-center bg-gray-200">
    <h2 className="text-xl font-semibold text-gray-700">
      Select a section to view content
    </h2>
  </div>
);

export default function HorizontalExpandingLayout() {
  const [expanded, setExpanded] = useState<number | null>(1);
  const [gifLoaded, setGifLoaded] = useState(false);

  // Preload the GIF and set the state when it's loaded
  useEffect(() => {
    const img = new Image();
    img.src = "/load.gif"; // Path to the GIF in the public folder
    img.onload = () => setGifLoaded(true);
  }, []);

  // Memoizing the sections data to prevent re-creation on every render
  const sections = useMemo<Section[]>(
    () => [
      {
        id: 1,
        title: "1. Education",
        content: (
          <div className="w-full h-full flex items-center justify-center">
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
            {expanded === section.id ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full h-full p-6">
                <div className="col-span-1 flex flex-col justify-center">
                  <h2 className="font-bold text-xl sm:text-2xl mb-4">
                    {section.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    Banglore is tourism city of the India .
                  </p>
                </div>
                <div className="col-span-1 -mt-8 z-20">{section.content}</div>
              </div>
            ) : (
              <div className="absolute top-6 left-6 text-lg font-semibold">
                {section.title}
              </div>
            )}
          </motion.div>
        ))}

        {/* Render default component when no section is selected */}
        {!expanded && <DefaultComponent />}
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
