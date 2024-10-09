import { Boxes } from "@/components/ui/background-boxes";
import Link from "next/link";
import React from "react";
import Container from "./container";

export default function Footer() {
  return (
    <footer className="text-black bg-grid-black/[0.1] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div>

      <Container className="flex justify-between items-center text-sm">
        <p>Developed by GDG Caldwell</p>

        <p className="flex gap-4 itemes-center">
          <Link href="/team" className="underline">
            Our Team
          </Link>

          <Link href="/apply" className="underline">
            Apply
          </Link>
          <Link href="/about" className="underline">
            About Us
          </Link>
        </p>
      </Container>
    </footer>
  );
}
