import App from "@/components/Band";
import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24 p-12 lg:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
        Don't be shy, say hi!&nbsp;
          <code className="font-mono font-bold ">
            <Link href="https://www.linkedin.com/in/shreyasd19/" >
            /in/shreyasd19 , 
            </Link>
          </code>&nbsp;
          
          <code className="font-mono font-bold">
            <Link href="https://drive.google.com/file/d/1TsS2DaWk7OUzwS8qeypHCGs7Bwfa1KbO/view?usp=drive_link">
            /Resume.pdf
            </Link>
          </code>&nbsp;
        </p>
      </div>
      <div className="w-full">
        <Hero />
      </div>
    </main>
  );
}
