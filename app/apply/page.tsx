import React from "react";
import Container from "../components/container";
import Image from "next/image";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function ApplyPage() {
  return (
    <>
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

      <main>
        <Container>
          <h1 className="text-3xl font-bold mt-8">
            Apply to Join <abbr title="Google Developers Group">GDG</abbr> On
            Campus: Caldwell University
          </h1>
          <p className="mt-4 text-lg">
            Together we learn, together we grow. Join us if you are interested!
          </p>
        </Container>
      </main>
    </>
  );
}
