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
    name: "Dibas Dauliya",
    designation: "President",
    image: "/dibas.jpeg",
  },
  {
    id: 3,
    name: "Dibas Dauliya",
    designation: "President",
    image: "/dibas.jpeg",
  },
  {
    id: 4,
    name: "Dibas Dauliya",
    designation: "President",
    image: "/dibas.jpeg",
  },
  {
    id: 5,
    name: "Dibas Dauliya",
    designation: "President",
    image: "/dibas.jpeg",
  },
  {
    id: 6,
    name: "Dibas Dauliya",
    designation: "President",
    image: "/dibas.jpeg",
  },
];

export function AnimatedTooltips() {
  return (
    <div className="flex flex-row items-center justify-center">
      <AnimatedTooltip items={people} />
    </div>
  );
}
