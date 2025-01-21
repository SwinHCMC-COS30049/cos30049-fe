import { Button } from "@/components/ui/button";
import React from "react";

export default async function Hero() {
  return (
    <section className="container relative h-screen mx-auto px-8">
      <div className="absolute w-full z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-4">
        <h1 className="font-bold text-3xl sm:text-5xl md:text-7xl text-center">
          Financial platform
          <br />
          for your portfolio
        </h1>

        <p className="text-center text-md sm:text-lg md:text-xl">
          Trade smarter. Own your data. Decentralize your future.
        </p>

        <Button>Get started</Button>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-300 animation-delay-2000 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-300 animation-delay-4000 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob2"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-300 animation-delay-6000 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob3"></div>
    </section>
  );
}
