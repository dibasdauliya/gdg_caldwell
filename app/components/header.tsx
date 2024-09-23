import React, { useState } from "react";
import Container from "./container"; // Make sure this is correctly imported
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-black text-white">
      <Container className="flex flex-wrap gap-y-3 justify-between items-center">
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

        <button
          className="block md:hidden text-white ml-auto"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <nav className={`md:block ${isOpen ? 'block' : 'hidden'} w-full md:w-auto`}>
          <ul className="flex flex-col md:flex-row gap-y-2 gap-x-4 text-white">
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
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;