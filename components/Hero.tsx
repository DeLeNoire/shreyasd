"use client";
import { cn } from "@/lib/utils";
import App from "./Band";
import DotPattern from "./magicui/dot-pattern";
import InfineraId from "./BandInfinera";

export default function Hero() {
  return (
    <div className="flex items-center justify-center  h-screen">
      <div
        style={{
          flex: 1,
          textAlign: "center",
          color: "black",
          height: "100vh",
        }}
      >
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(650px_circle_at_center,white,transparent)]"
          )}
        />
        <div className="w-full h-full flex">
          <App />
          <InfineraId />
        </div>
      </div>
    </div>
  );
}
