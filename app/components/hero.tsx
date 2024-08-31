import { Spotlight } from "@/components/ui/spotlight";
import Image from "next/image";
import React from "react";
import { AnimatedTooltips } from "./tooltips";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="h-[40rem] w-full flex md:items-center md:justify-center bg-black/[0.94] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <div className="p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0 space-y-8">
        <Spotlight
          className="absolute -top-40 left-0 md:left-80 md:-top-20"
          fill="white"
        />

        <header className="space-y-3">
          <Image
            src="/logo.png"
            width={200}
            height={80}
            alt="Logo of GDG"
            className="mx-auto"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-300 bg-opacity-50">
            Google Developers Group <br /> On Campus
          </h1>
          <h2 className="text-3xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-300 bg-opacity-50">
            Caldwell University
          </h2>
        </header>

        <div className="flex gap-6 justify-center">
          <AnimatedTooltips />
          <small className="text-white mt-5">
            <a href="">+ 66 others</a>
          </small>
        </div>

        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Join us if you are interested in learning more about technologies, and
          want to connect with other students who are passionate about
          technology.
        </p>

        <div className="flex justify-center">
          <Link
            href="/apply"
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-700 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            APPLY NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
