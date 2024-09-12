import { MarqueeDemo } from "@/components/carousel/carouselCards";
import { GlobeDemo } from "@/components/globedemo";
import Hero from "@/components/Hero";
import InfiniteSlider from "@/components/InfiniteScroll/slider";
import Image from "next/image";
import Link from "next/link";
import Projects from "@/components/mystuff";
import Skeleton from "@/components/card/skeletonCard";
import TracingBeam from "@/components/tracingBeam";
//import Ipad from "@/components/ipad";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 pt-12 lg:pr-24 lg:pl-24 ">
      <div className="z-30 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed left-0 top-0 flex  w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-5  backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
          Don&apos;t be shy, say hi!&nbsp;
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

      <div className="w-[80rem] h-10 bg-gradient-to-r from-black via-transparent to-black rounded-full flex items-end justify-center mt-20">
        <div className={"w-full h-9 bg-white  rounded-full"}>
          <div className="w-full h-20 relative flex items-center justify-center rounded-full ">
            <div className="absolute top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm " />
            <div className="absolute top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4 " />
            <div className="absolute top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[3px] w-1/4 blur-sm " />
            <div className="absolute top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4 " />
          </div>
          <div className="flex items-center justify-between">
            <div className="h-[30rem] w-px bg-gradient-to-b from-black via-black to-white -mt-16"></div>
            <div className="h-[30rem] w-px bg-gradient-to-b from-black via-black to-white -mt-16"></div>
          </div>
        </div>
      </div>

      <>
        <Projects />
      </>

      <div className="mt-64">
        <InfiniteSlider />
      </div>

      <div className="mt-12">
        <MarqueeDemo />
      </div>

      <GlobeDemo />
    </main>
  );
}
