"use client";
import { cn } from "@/lib/utils";
import { useState, memo } from "react";
import { algoCards } from "@/lib/data/algorithms/AlgoCard";
import dynamic from "next/dynamic";

const Popup = dynamic(() => import("@/components/InfiniteScroll/popup"), {
  ssr: false,
});

function InfiniteSlider() {
  const [selectedCard, setSelectedCard] = useState<
    null | (typeof algoCards)[0]
  >(null);

  const handleCardClick = (algoCard: (typeof algoCards)[0]) => {
    setSelectedCard(algoCard);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 relative z-10 py-10 max-w-7xl mx-auto cursor-pointer">
        {algoCards.map((algoCard, index) => (
          <MemoizedAlgoCard
            key={algoCard.category}
            {...algoCard}
            index={index}
            onClick={() => handleCardClick(algoCard)}
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
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={cn(
      "flex flex-col lg:border-r py-10 relative group/feature",
      (index === 0 || index === 5) && "lg:border-l",
      index < 5 && "lg:border-b"
    )}
  >
    {index <= 4 && (
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent pointer-events-none" />
    )}
    {index > 4 && (
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent pointer-events-none" />
    )}
    <div className="mb-4 relative z-10 px-10 text-neutral-600">{name[0]}</div>
    <div className="text-lg font-bold mb-2 relative z-10 px-10">
      <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1.5 rounded-tr-full rounded-br-full bg-neutral-300 group-hover/feature:bg-black transition-all duration-200 origin-center" />
      <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800">
        {name}
      </span>
    </div>
    <p className="text-sm text-neutral-600 max-w-xs relative z-10 px-10">
      {name}
    </p>
  </div>
);

// Memoize AlgoCard to prevent unnecessary re-renders
const MemoizedAlgoCard = memo(AlgoCard);

export default InfiniteSlider;
