"use client";
import { createContext, useContext } from "react";

/** `ready` flips to true while the reveal circle is expanding — pages start their entrance then. */
export const IntroContext = createContext<{ ready: boolean }>({ ready: false });
export const useIntro = () => useContext(IntroContext);
