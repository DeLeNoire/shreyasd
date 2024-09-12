"use client";
import React from "react";
import { useScroll } from "framer-motion";
import { useRef } from "react";

const TracingBeam = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return <div>TracingBeam</div>;
};

export default TracingBeam;
