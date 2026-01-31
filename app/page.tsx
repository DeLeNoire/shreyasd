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
        <div className="flex justify-center items-center h-screen bg-slate-50">
          <img
            src="/coke.gif"
            alt="Loading..."
            className="w-1/2 md:h-2/3 bg-white"
          />
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