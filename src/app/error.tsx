"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function Error() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold text-red-500">Error</h1>
        <p className="text-lg">An error occurred during the request.</p>
      </div>
      <Button onClick={() => router.push("/")}>Go back home</Button>
    </div>
  );
}
