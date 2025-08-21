"use client";

import useMouseMove from "@/hooks/business-logic/useMouseMove";
import Image from "next/image";

export default function Background() {
  useMouseMove();

  return (
    <div className="relative h-full w-full overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dotted-pattern-light"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="rgba(0, 0, 0, 0.1)" />
          </pattern>
          <pattern
            id="dotted-pattern-dark"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="rgba(255, 255, 255, 0.3)" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#dotted-pattern-light)"
          className="dark:hidden"
        />
        <rect
          width="100%"
          height="100%"
          fill="url(#dotted-pattern-dark)"
          className="hidden dark:block"
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[200px] h-[200px] bg-accent rounded-full shadow-lg">
        <Image src="/images/logo.png" alt="logo" width={100} height={100} />
        <p className="text-2xl font-bold text-text mt-4">ترازوب</p>
      </div>

      <div
        className="pointer-events-none absolute z-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl dark:hidden"
        style={{
          left: "var(--x, 50%)",
          top: "var(--y, 50%)",
          background:
            "radial-gradient(circle, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 50%, transparent 90%)",
        }}
      />
      <div
        className="pointer-events-none absolute z-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl hidden dark:block"
        style={{
          left: "var(--x, 50%)",
          top: "var(--y, 50%)",
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 50%, transparent 90%)",
        }}
      />
    </div>
  );
}
