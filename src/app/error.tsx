"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Image
        alt="Loading image"
        src="/images/error.svg"
        width={400}
        height={400}
      />
      <Button onClick={() => reset()}>Try Again</Button>
    </div>
  );
}
