"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export function ClarityTracker() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Clarity.init("vvlv7c1e9y");
    }
  }, []);

  return null;
}
