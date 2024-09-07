"use client";
import React from "react";
import { ContainerScroll } from "../ui/ipad";
import Image from "next/image";
import Iphone15Pro from "../magicui/iphoneMock";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-row overflow-hidden">
      <Iphone15Pro src="/dcex.png" className="w-[25rem] h-[32rem]" />
    </div>
  );
}
