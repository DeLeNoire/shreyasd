import { useState } from "react";
import { algorithms } from "@/lib/data/algorithms/Algorithms";
import { motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import dynamic from "next/dynamic";

interface PopupProps {
  feature: any;
  onClose: () => void;
}

const AnimatedBeamDemo = dynamic(
  () => import("../beam/beams").then((mod) => mod.AnimatedBeamDemo),
  { ssr: false }
);

const Popup = ({ feature, onClose }: PopupProps) => {
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(
    null
  );

  const filteredAlgorithms = algorithms.filter(
    (algorithm) => algorithm.category === feature.category
  );

  const getSpanClasses = (index: number) => {
    switch (index) {
      case 0:
      case 4:
      case 2:
        return "col-start-1 col-end-4 row-start-1 row-end-4";
      case 1:
        return "col-span-3 row-span-3";
      case 7:
      case 8:
        return "col-start-1 col-end-3 row-start-1 row-end-8";
      case 9:
      case 10:
        return "col-start-3 col-end-5 row-start-1 row-end-8";
      case 3:
      case 6:
        return "col-start-2 col-end-5 row-start-1 row-end-4";
      default:
        return "col-span-1 row-span-1";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 bg-slate-50">
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
            } ${index === 5 ? "col-span-2" : ""}`}
          >
            {(expandedCardIndex === index || expandedCardIndex === null) &&
            index === 5 ? (
              <AnimatedBeamDemo />
            ) : (
              <h2 className="text-xl font-bold text-neutral-800">
                {algo.name}
              </h2>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Popup;
