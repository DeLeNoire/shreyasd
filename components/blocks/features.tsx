"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  IconCode,
  IconBrain,
  IconChartBar,
  IconLockPin,
  IconUsers,
  IconHeadset,
  IconRocket,
  IconPuzzle,
  IconX,
} from "@tabler/icons-react";

const features = [
  {
    title: "Web Wonders",
    description: "Crafting interactive, responsive, and stunning websites.",
    icon: <IconCode />,
  },
  {
    title: "AI Alchemy",
    description:
      "Transforming data into insights with cutting-edge AI and ML techniques.",
    icon: <IconBrain />,
  },
  {
    title: "Quantified Mastery",
    description:
      "Building robust models that make numbers dance and profits grow.",
    icon: <IconChartBar />,
  },
  {
    title: "Always On Blockchain",
    description: "Immutable, decentralized, and unbreakable web3 solutions.",
    icon: <IconLockPin />,
  },
  {
    title: "Collaborative Creations",
    description: "Seamlessly sharing and scaling multi-user systems.",
    icon: <IconUsers />,
  },
  {
    title: "AI Support Squad",
    description: "Get answers anytime from our relentless AI-powered support.",
    icon: <IconHeadset />,
  },
  {
    title: "Guaranteed Innovation",
    description: "Pioneering new frontiers with a satisfaction guarantee.",
    icon: <IconRocket />,
  },
  {
    title: "The Everything Else",
    description: "Projects that defy categorization. They’re just cool.",
    icon: <IconPuzzle />,
  },
];

export function FeaturesSectionDemo() {
  const [selectedCard, setSelectedCard] = useState<null | (typeof features)[0]>(
    null
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl  cursor-pointer">
        {features.map((feature, index) => (
          <Feature
            key={feature.title}
            {...feature}
            index={index}
            onClick={() => setSelectedCard(feature)}
          />
        ))}
      </div>

      {selectedCard && (
        <Popup feature={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex flex-col lg:border-r  py-6 relative group/feature ",
        (index === 0 || index === 4) && "lg:border-l ",
        index < 4 && "lg:border-b"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100  to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 0 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300  group-hover/feature:bg-black transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 ">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

// Popup Component
const Popup = ({
  feature,
  onClose,
}: {
  feature: (typeof features)[0];
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-yellow-100  p-8 rounded-lg shadow-lg w-full h-[42rem]  mx-8 z-30 mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-neutral-800 ">
            {feature.title}
          </h2>
          <button onClick={onClose} className="text-neutral-600 ">
            <IconX />
          </button>
        </div>
        <p className="mt-4 text-neutral-600 ">{feature.description}</p>
        {/* Add any additional content or functionality here */}
      </div>
    </div>
  );
};
