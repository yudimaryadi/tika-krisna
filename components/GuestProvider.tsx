"use client";

import { useEffect, useState } from "react";
import { GuestContext } from "@/lib/guest-context";

export default function GuestProvider({ children }: { children: React.ReactNode }) {
  const [guest, setGuest] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setGuest(params.get("to") || "");
  }, []);

  return <GuestContext.Provider value={guest}>{children}</GuestContext.Provider>;
}
