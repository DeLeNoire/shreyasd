"use client";
import { useEffect, useState } from "react";
import ExpandingLayout from "@/components/grids/homegrid";
import PortfolioClone from "@/components/Project/rest";

type ThemeMode = "dark" | "light";

export default function Home() {
  const [isGifVisible, setIsGifVisible] = useState(true);
  const [isLayoutVisible, setIsLayoutVisible] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGifVisible(false);
      setIsLayoutVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <>
      {isGifVisible && (
        <div className={`flex justify-center items-center h-screen ${theme === "dark" ? "bg-[#111111] text-[#b4b2ad]" : "bg-white text-[#4b463d]"}`}>
          <div className="text-center text-sm font-mono">
            Loading portfolio…
          </div>
        </div>
      )}

      {isLayoutVisible && (
        <ExpandingLayout
          theme={theme}
          toggleTheme={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
        />
      )}

      <section className={`w-full min-h-screen ${theme === "dark" ? "bg-[#111111]" : "bg-[#f7f2e8]"}`}>
        <PortfolioClone theme={theme} />
      </section>
    </>
  );
}