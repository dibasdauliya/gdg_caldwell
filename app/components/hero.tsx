import { Spotlight } from "@/components/ui/spotlight";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="min-h-[52rem] pb-12 md:pb-0 w-full flex md:items-center md:justify-center bg-black/[0.94] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0 space-y-8">
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
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Join us if you are interested in learning more about technologies and
          want to connect with other students who are passionate about
          technology.
        </p>
        <div className="flex flex-col items-center space-y-6">
          <a
            href="https://gdg.community.dev/gdg-on-campus-caldwell-university-caldwell-united-states/#c6dbSdWXGHW"
            rel="noopener noreferrer"
            target="_blank"
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-700 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            APPLY NOW
          </a>
          <div className="flex items-center gap-4">
            <a
              href="https://gdg.community.dev/gdg-on-campus-caldwell-university-caldwell-united-states/#taz9mL2u80T"
              rel="noopener noreferrer"
              target="_blank"
              className="relative group"
            >
              <span className="relative z-10 text-white font-semibold group-hover:text-slate-100 transition-colors">
                Upcoming Events
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </a>
            <span className="text-neutral-400">|</span>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://gdg.community.dev/gdg-on-campus-caldwell-university-caldwell-united-states/#qJkhqi-zgSp"
              className="relative group"
            >
              <span className="relative z-10 text-white font-semibold group-hover:text-slate-100 transition-colors">
                Past Events
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
