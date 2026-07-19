import React from "react";

type CubeProps = {
  variant?: "default" | "grid-9" | "circles-7" | "rectangles" | "dots-17";
  label?: string;
  className?: string;
  theme?: "dark" | "light";
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
};

export default function Cube({ variant = "default", label = "", className = "", theme = "dark", onClick }: CubeProps) {
  const isDark = theme === "dark";
  const shellClass = isDark
    ? "bg-[#151515] border-[#2a2a2a]"
    : "bg-white border-[#e5e5e5]";
  const baseTextClass = isDark ? "text-[#8a8784]" : "text-[#5f584f]";
  const accent = isDark ? "bg-[#ff3b3b]" : "bg-[#d0d0d0]";
  const secondary = isDark ? "bg-[#1f1f1f]" : "bg-[#f5f5f5]";
  const border = isDark ? "border-[#2a2a2a]" : "border-[#e5e5e5]";

  const content = (
    <>
      {variant === "grid-9" && (
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 p-1 gap-0.5">
          {[...Array(9)].map((_, i) => (
            <div key={i} className={`rounded-sm ${i === 7 ? `${accent} animate-pulse` : secondary}`} />
          ))}
        </div>
      )}

      {variant === "circles-7" && (
        <div className={`absolute inset-0 flex items-center justify-center border ${border}`}>
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 ${isDark ? "bg-[#3a3a3a]" : "bg-[#d0d0d0]"} rounded-full`}
              style={{
                left: `${20 + i * 10}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0.45 + ((i % 3) * 0.2),
              }}
            />
          ))}
        </div>
      )}

      {variant === "rectangles" && (
        <div className="absolute inset-0 flex items-center justify-center gap-1 p-2">
          <div className={`w-4 h-6 border-2 ${border} rounded`} />
          <div className={`w-4 h-6 border-2 ${border} rounded`} />
          <div className={`w-3 h-3 ${accent} rounded-sm animate-pulse`} />
        </div>
      )}

      {variant === "dots-17" && (
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 p-2 gap-1">
          {[...Array(17)].map((_, i) => (
            <div
              key={i}
              className={`rounded-full ${i === 8 ? accent : isDark ? "bg-[#2a2a2a]" : "bg-[#f0f0f0]"}`}
              style={{ width: "6px", height: "6px", margin: "auto" }}
            />
          ))}
        </div>
      )}

      {label && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-[10px] font-mono ${baseTextClass}`}>{label}</span>
        </div>
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`relative rounded-lg border overflow-hidden transition-all duration-200 ${shellClass} ${className}`}
      >
        {content}
      </button>
    );
  }

  return <div className={`relative rounded-lg border overflow-hidden ${shellClass} ${className}`}>{content}</div>;
}