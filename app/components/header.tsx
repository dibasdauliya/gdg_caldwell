import React from "react";
import Container from "./container";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-black text-white">
      <Container className="flex flex-wrap gap-y-3 justify-center md:justify-between items-center">
        <Link href="/" className="text-center flex flex-wrap justify-center gap-1 items-center">
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
          <ul className="flex flex-wrap gap-y-2 gap-x-4 text-white">
            <li>
              <Link href="/upcoming-events">Upcoming Events</Link>
            </li>
            <li>
              <Link href="/past-events">Past Events</Link>
            </li>
            <li>
              <Link href="/apply">Apply</Link>
            </li>
            <li>
              <Link href="/team">Our Team</Link>
            </li>
            <li>
              <Link href="/profile/edit">Profile</Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
