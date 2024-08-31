"use client";
import { cn } from "@/lib/utils";
import { IconCancel, IconCe, IconCross, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { AnimatedBeamDemo } from "../beam/beams";

import { algoCards } from "@/lib/data/algorithms/topicCard";

import { algorithms } from "@/lib/data/algorithms/algoCards";

import { motion } from "framer-motion";

export default function InfiniteSlider() {
  const [selectedCard, setSelectedCard] = useState<
    null | (typeof algoCards)[0]
  >(null);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  relative z-10 py-10 max-w-7xl mx-auto cursor-pointer">
        {algoCards.map((algoCard, index) => (
          <AlgoCard
            key={algoCard.category}
            {...algoCard}
            index={index}
            onClick={() => setSelectedCard(algoCard)}
          />
        ))}
      </div>

      {selectedCard && (
        <Popup
          feature={{
            name: selectedCard.name,
            category: selectedCard.category,
            id: selectedCard.category,
          }}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
}

const AlgoCard = ({
  name,
  category,
  index,
  onClick,
}: {
  name: string;
  category: string;
  index: number;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature ",
        (index === 0 || index === 5) && "lg:border-l ",
        index < 5 && "lg:border-b"
      )}
    >
      {index <= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100  to-transparent pointer-events-none" />
      )}

      {index > 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 0 to-transparent pointer-events-none" />
      )}

      <div className="mb-4 relative z-10 px-10 text-neutral-600">{name[0]}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1.5 rounded-tr-full rounded-br-full bg-neutral-300  group-hover/feature:bg-black transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 ">
          {name}
        </span>
      </div>
      <p className="text-sm text-neutral-600 max-w-xs relative z-10 px-10">
        {name}
      </p>
    </div>
  );
};

const Popup = ({
  feature,
  onClose,
}: {
  feature: (typeof algorithms)[0];
  onClose: () => void;
}) => {
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(
    null
  );

  const filteredAlgorithms = algorithms.filter(
    (algorithm) => algorithm.category === feature.category
  );

  const getSpanClasses = (index: number) => {
    switch (index) {
      case 0:
        return "col-start-1 col-end-4 row-start-1 row-end-4";
      case 4:
        return "col-start-1 col-end-4 row-start-1 row-end-4";
      case 1:
        return "col-span-3 row-span-3 ";
      case 7:
      case 8:
        return "col-start-1 col-end-3 row-start-1 row-end-8";
      case 2:
        return "col-start-1 col-end-4 row-start-1 row-end-4";
      case 9:
      case 10:
        return "col-start-3 col-end-5 row-start-1 row-end-8";
      case 6:
      case 3:
        return "col-start-2 col-end-5 row-start-1 row-end-4";
      default:
        return "col-span-1 row-span-1";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 bg-slate-50 ">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      >
        <div className="mt-24 flex items-center justify-center mr-1">
          <button
            onClick={onClose}
            className="text-black z-50 font-bold rounded-sm"
          >
            <IconX />
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mx-8 z-30 w-screen h-[42rem] mt-10 grid grid-rows-3 grid-cols-4 gap-4">
        {filteredAlgorithms.map((algo, index) => (
          <motion.div
            key={algo.id}
            layout
            onClick={() =>
              setExpandedCardIndex(expandedCardIndex === index ? null : index)
            }
            className={`cursor-pointer flex items-center justify-center bg-green-50 relative transition-all duration-300 ${
              expandedCardIndex === index
                ? getSpanClasses(index)
                : "col-span-1 row-span-1"
            } ${index == 5 ? "col-span-2" : ""} `}
          >
            {(expandedCardIndex === index || expandedCardIndex === null) &&
            index == 5 ? (
              <AnimatedBeamDemo />
            ) : (
              <h2 className="text-xl font-bold text-neutral-800">
                {algo.name}
              </h2>
            )}
            {expandedCardIndex === 0 && index === 0 ? <AnimatedBeamDemo /> : ""}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
