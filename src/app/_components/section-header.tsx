"use client";

import { useState } from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed container mx-auto left-0 right-0 top-0 z-50 bg-background/50 backdrop-blur-sm px-8">
      <div className="flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-poppins font-black tracking-tighter">
          crypto.
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link
            href="/news"
            className="text-gray-700 hover:text-gray-900"
          >
            News
          </Link>
          <Link href="/wallets" className="text-gray-700 hover:text-gray-900">
            Wallets
          </Link>
          <Link href={"/login"}>
            <Button>Log in</Button>
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="p-2 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="flex h-5 w-6 flex-col justify-between">
            <span
              className={`h-1 w-full bg-black transition-transform ${
                isMenuOpen ? "translate-y-2 rotate-45 h-1" : ""
              }`}
            />
            <span
              className={`h-1 w-full bg-black transition-opacity ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-1 w-full bg-black transition-transform ${
                isMenuOpen ? "-translate-y-2 -rotate-45 h-1" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden h-screen ${isMenuOpen ? "block" : "hidden"}`}>
        <nav className="flex flex-col h-2/3 bg-background border-black rounded-xl border-2 justify-center text-center gap-4 py-4">
          <Link
            href="/"
            className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/news"
            className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            News
          </Link>
          <Link
            href="/wallets"
            className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            wallets
          </Link>

          <Link href={"/login"}>
            <Button>Log in</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
