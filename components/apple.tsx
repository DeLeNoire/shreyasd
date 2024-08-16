
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/carousel";
import { GlobeDemo } from "./globedemo";
import { Content } from "next/font/google";
import Web from "@/lib/constants/web"

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-10 md:py-20 ">
      <h2 className=" flex justify-center items-center max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Software Engineer Open to Work
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

interface DummyContentProps {
  useGlobe?: boolean; // Optional prop
}

const DummyContent: React.FC<DummyContentProps> = ({ useGlobe }) => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-md mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
              <Image
              src=""
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "My",
    title: "Projects ------->",
    src: "/pink.jpg",
    content: <DummyContent/>,
  },
  {
    category: "Web",
    title: "Enhance your productivity.",
    src: "/camera.jpg",
    content: <Web/>,
  },
  {
    category: "Product",
    title: "Launching the new Apple Vision Pro.",
    src: "/chess.jpg",
    content: <DummyContent />,
  },

  {
    category: "Product",
    title: "Maps for your iPhone 15 Pro Max.",
    src: "/lamp.jpg",
    content: <DummyContent />,
  },
  {
    category: "iOS",
    title: "Photography just got better.",
    src: "/phone.jpg",
    content: <DummyContent />,
  },
  {
    category: "Hiring",
    title: "Hiring for a Staff Software Engineer",
    src: "/doorway.jpg",
    content: <DummyContent />,
  },
];
