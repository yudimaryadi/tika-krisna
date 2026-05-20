"use client";

import { createContext, useContext } from "react";

const GuestContext = createContext<string>("");
export const useGuest = () => useContext(GuestContext);
export { GuestContext };
