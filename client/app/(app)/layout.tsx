"use client";

import type { PropsWithChildren } from "react";
import { Navbar } from "@/components/navigation/navbar";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
