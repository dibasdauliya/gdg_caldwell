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
    name: "Nana Blay",
    designation: "Vice-President",
    image: "/white.png",
  },
  {
    id: 3,
    name: "Board Member",
    designation: "Secretary",
    image: "/white.png",
  },
  {
    id: 4,
    name: "Board Member",
    designation: "Treasurer",
    image: "/white.png",
  },
  {
    id: 5,
    name: "Board Member",
    designation: "Event Coordinator",
    image: "/white.png",
  },
  {
    id: 6,
    name: "Board Member",
    designation: "Women in Teach Mentor",
    image: "/white.png",
  },
  {
    id: 7,
    name: "Board Member",
    designation: "Content Creator",
    image: "/white.png",
  },
  {
    id: 8,
    name: "Board Member",
    designation: "Marketing and Communication Lead",
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
