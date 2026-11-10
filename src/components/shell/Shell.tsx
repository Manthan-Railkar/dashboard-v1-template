import type { ReactNode } from "react";
import { SHELL } from "@/lib/layout";
import Sidebar from "./Sidebar";

/** The rounded gradient canvas + sidebar + routed page area. */
export default function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <div
        className="shell-bg absolute overflow-hidden"
        style={{ left: SHELL.x, top: SHELL.y, width: SHELL.w, height: SHELL.h, borderRadius: SHELL.r }}
      >
        <main className="absolute inset-0" id="page-root">{children}</main>
      </div>
      <Sidebar />
    </>
  );
}
