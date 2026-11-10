import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** White glass card. `data-skel` makes it part of the staggered skeleton entrance. */
export default function Card({ className, ...p }: HTMLAttributes<HTMLDivElement>) {
  return <div data-skel className={cn("card", className)} {...p} />;
}
