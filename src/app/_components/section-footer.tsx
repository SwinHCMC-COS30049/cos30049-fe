"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, Github, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <footer className="mx-auto py-12 pt-8">
      {/* Desktop Footer */}
      <div className="hidden md:block container mx-auto">
        {/* Top Section - Newsletter with Input */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h3 className="text-xl font-semibold">Join our newsletter.</h3>
            <p className="text-gray-600 mt-2">
              We will send you one letter per week. No spam.
            </p>
          </div>
          <div className="relative w-96">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-24"
                required
              />
              <Button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Middle Section - Logo, Description and Contact */}
        <div className="flex justify-between items-start mb-12 border-t pt-8">
          <div className="space-y-4">
            <Link
              href="/"
              className="font-poppins text-2xl font-black tracking-tighter"
            >
              crypto.
            </Link>
            <p className="text-gray-600">
              Financial platform for your portfolio
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact us</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                Email:{" "}
                <a
                  href="mailto:supportcrypto@gmail.com"
                  className="text-gray-600 hover:underline text-blue-600"
                >
                  supportcrypto@gmail.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  href="tel:+84123495192"
                  className="text-gray-600 hover:underline text-blue-600"
                >
                  +84 123 495 192
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Copyright and Social Icons */}
        <div className="flex items-center justify-between border-t pt-8">
          <p className="text-sm text-gray-600">
            ©crypto.2025. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <Facebook size={24} />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <Github size={24} />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <Instagram size={24} />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <Twitter size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="md:hidden space-y-8">
        <div className="space-y-4 text-center">
          <Link
            href="/"
            className="font-poppins text-2xl font-black tracking-tighter"
          >
            crypto.
          </Link>
          <p className="text-gray-600">Financial platform for your portfolio</p>
        </div>

        <div className="space-y-4 text-center">
          <h3 className="text-xl font-semibold">Contact us</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              Email:{" "}
              <a
                href="mailto:supportcrypto@gmail.com"
                className="text-gray-600 hover:underline text-blue-600"
              >
                supportcrypto@gmail.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href="tel:+84123495192"
                className="text-gray-600 hover:underline text-blue-600"
              >
                +84 123 495 192
              </a>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-24"
            required
          />
          <Button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2"
          >
            Subscribe
          </Button>
        </form>

        <div className="flex justify-center gap-4">
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            <Facebook size={20} />
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            <Github size={20} />
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            <Instagram size={20} />
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            <Twitter size={20} />
          </Link>
        </div>

        <p className="text-center text-sm text-gray-600">
          ©crypto.2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
