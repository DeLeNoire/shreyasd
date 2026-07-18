"use client";
import { useEffect, useState } from "react";
import ExpandingLayout from "@/components/grids/homegrid";
import PortfolioClone from "@/components/Project/rest";

export default function Home() {
  const [isGifVisible, setIsGifVisible] = useState(true);
  const [isLayoutVisible, setIsLayoutVisible] = useState(false);

  // Effect to handle the delay
  useEffect(() => {
    // Set a timeout to hide the GIF and show the ExpandingLayout after 6 seconds
    const timer = setTimeout(() => {
      setIsGifVisible(false);
      setIsLayoutVisible(true);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <>
      {isGifVisible && (
        <div className="flex justify-center items-center h-screen bg-[#111111]">
          <div className="text-center text-sm font-mono text-[#b4b2ad]">
            Loading portfolio…
          </div>
        </div>
      )}

      {isLayoutVisible && <ExpandingLayout />}


      {/* Portfolio Clone Section - Full Width */}
      <section className="w-full min-h-screen">
        <PortfolioClone />
      </section>

    </>
  );
}