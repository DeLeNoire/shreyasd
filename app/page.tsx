import { FeaturesSectionDemo } from "@/components/blocks/features";
import { MarqueeDemo } from "@/components/carousel/carouselCards";

import { GlobeDemo } from "@/components/globedemo";
import Hero from "@/components/Hero";
import InfiniteSlider from "@/components/InfiniteScroll/slider";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 pt-16 lg:pr-24 lg:pl-24 ">
      <div className="z-30 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed left-0 top-0 flex  w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
          Don't be shy, say hi!&nbsp;
          {/* Show text link on large screens and above */}
          <code className="font-mono font-bold hidden lg:block">
            <Link href="https://www.linkedin.com/in/shreyasd19/">
              /in/shreyasd19,
            </Link>
          </code>
          &nbsp;
          {/* Show icon on screens smaller than large */}
          <div className="font-mono font-bold block lg:hidden">
            <Link href="https://www.linkedin.com/in/shreyasd19/">
              <Image
                src="/linked.png" // Replace with your icon image path
                alt="LinkedIn Icon"
                width={24}
                height={24}
                className="inline-block"
              />
            </Link>
          </div>
          &nbsp;
          <code className="font-mono font-bold hidden lg:block">
            <Link href="https://drive.google.com/file/d/1TsS2DaWk7OUzwS8qeypHCGs7Bwfa1KbO/view?usp=drive_link">
              /Resume.pdf
            </Link>
          </code>
          &nbsp;
          <div className="font-mono font-bold block lg:hidden">
            <Link href="https://drive.google.com/file/d/1TsS2DaWk7OUzwS8qeypHCGs7Bwfa1KbO/view?usp=drive_link">
              <Image
                src="/cv.png" // Replace with your icon image path
                alt="CV Icon"
                width={24}
                height={24}
                className="inline-block"
              />
            </Link>
          </div>
          &nbsp;
        </div>
      </div>

      <div className="w-full z-20 ">
        <Hero />
      </div>

      <div className="m-20">
        <FeaturesSectionDemo />
      </div>

      <div className="mt-12">
        <InfiniteSlider />
      </div>
      <div className="mt-12">
        <MarqueeDemo />
      </div>

      <GlobeDemo />
    </main>
  );
}
