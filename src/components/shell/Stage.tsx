"use client";
import type { ReactNode } from "react";

/** Full-screen canvas occupying the entire screen size. */
export default function Stage({ children }: { children: ReactNode }) {
  return <div className="relative h-full w-full">{children}</div>;
}
