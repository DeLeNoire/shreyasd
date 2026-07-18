import React from "react";

type CubeProps = {
  variant?: "default" | "grid-9" | "circles-7" | "rectangles" | "dots-17";
  label?: string;
  className?: string;
};

export default function Cube({ variant = "default", label = "", className = "" }: CubeProps) {
  return (
    <div className={`relative bg-[#151515] border border-[#2a2a2a] rounded-lg overflow-hidden ${className}`}>
      {variant === "grid-9" && (
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 p-1 gap-0.5">
          {[...Array(9)].map((_, i) => (
            <div key={i} className={`rounded-sm ${i === 7 ? "bg-[#ff3b3b] animate-pulse" : "bg-[#1f1f1f]"}`} />
          ))}
        </div>
      )}

      {variant === "circles-7" && (
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#3a3a3a] rounded-full"
              style={{
                left: `${20 + i * 10}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0.45 + ((i % 3) * 0.2)
              }}
            />
          ))}
        </div>
      )}

      {variant === "rectangles" && (
        <div className="absolute inset-0 flex items-center justify-center gap-1 p-2">
          <div className="w-4 h-6 border-2 border-[#2a2a2a] rounded" />
          <div className="w-4 h-6 border-2 border-[#2a2a2a] rounded" />
          <div className="w-3 h-3 bg-[#ff3b3b] rounded-sm animate-pulse" />
        </div>
      )}

      {variant === "dots-17" && (
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 p-2 gap-1">
          {[...Array(17)].map((_, i) => (
            <div
              key={i}
              className={`rounded-full ${i === 8 ? "bg-[#ff3b3b]" : "bg-[#2a2a2a]"}`}
              style={{ width: "6px", height: "6px", margin: "auto" }}
            />
          ))}
        </div>
      )}

      {label && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-mono text-[#8a8784]">{label}</span>
        </div>
      )}
    </div>
  );
}