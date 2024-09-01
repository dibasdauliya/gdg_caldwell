import React from "react";
import Container from "./container";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-black text-white">
      <Container className="flex justify-between items-center">
        <Link href="/" className="text-center flex gap-1 items-center">
          <Image
            src="/logo.png"
            width={80}
            height={60}
            alt="Logo of GDG"
            className="mx-auto"
          />
          <p>GDG On Campus: Caldwell University</p>
        </Link>
        <nav>
          <ul className="flex gap-4 text-white">
            <li>
              <Link href="/past-events">Past Events</Link>
            </li>
            <li>
              <Link href="/upcomming-events">Upcomming Events</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
