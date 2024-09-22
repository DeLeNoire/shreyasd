"use client";
import { useEffect, useState, useMemo } from "react";
import { MarqueeDemo } from "@/components/carousel/carouselCards";
import { GlobeDemo } from "@/components/globedemo";
import InfiniteSlider from "@/components/InfiniteScroll/slider";
import Image from "next/image";
import Link from "next/link";
import ExpandingLayout from "@/components/grids/homegrid";
import Projects from "@/components/mystuff";
import Skeleton from "@/components/card/skeletonCard";

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

  // Use useMemo to cache the ExpandingLayout component
  const cachedExpandingLayout = useMemo(() => {
    return <ExpandingLayout />;
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

      {isLayoutVisible && cachedExpandingLayout}

      <main className="flex min-h-screen flex-col items-center justify-between lg:pr-28 lg:pl-28">
        <div className="sticky z-50 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-5 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
            Don&apos;t be shy, say hi!&nbsp;
            <code className="font-mono font-bold hidden lg:block">
              <Link href="https://www.linkedin.com/in/shreyasd19/">
                /in/shreyasd19,
              </Link>
            </code>
            <div className="font-mono font-bold block lg:hidden">
              <Link href="https://www.linkedin.com/in/shreyasd19/">
                <Image
                  src="/linked.png"
                  alt="LinkedIn Icon"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
            <code className="font-mono font-bold hidden lg:block">
              <Link href="https://drive.google.com/file/d/1TsS2DaWk7OUzwS8qeypHCGs7Bwfa1KbO/view?usp=drive_link">
                /Resume.pdf
              </Link>
            </code>
            <div className="font-mono font-bold block lg:hidden">
              <Link href="https://drive.google.com/file/d/1TsS2DaWk7OUzwS8qeypHCGs7Bwfa1KbO/view?usp=drive_link">
                <Image src="/cv.png" alt="CV Icon" width={24} height={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="h-full w-full mt-48">
          <Projects />
        </div>

        <div className="mt-64 mb-24">
          <InfiniteSlider />
        </div>

        <GlobeDemo />
      </main>
    </>
  );
}
