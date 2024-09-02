"use client";
import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
const people = [
  {
    id: 1,
    name: "Dibas Dauliya",
    designation: "President",
    image: "/dibas.jpeg",
  },
  {
    id: 2,
    name: "Board Member",
    designation: "TBD",
    image: "/white.png",
  },
  {
    id: 3,
    name: "Board Member",
    designation: "TBD",
    image: "/white.png",
  },
  {
    id: 4,
    name: "Board Member",
    designation: "TBD",
    image: "/white.png",
  },
  {
    id: 5,
    name: "Board Member",
    designation: "TBD",
    image: "/white.png",
  },
  {
    id: 6,
    name: "Board Member",
    designation: "TBD",
    image: "/white.png",
  },
];

export function AnimatedTooltips() {
  return (
    <div className="flex flex-row items-center justify-center">
      <AnimatedTooltip items={people} />
    </div>
  );
}
