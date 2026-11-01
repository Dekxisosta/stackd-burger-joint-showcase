"use client";

import { useEffect } from "react";
import { SCRIPTS } from "@/lib/scripts";

/**
 * Loads the app scripts one after another, in the order listed in lib/scripts.js.
 * Runs once per page load (guarded, so React Strict Mode's double effect is safe).
 */
export default function LegacyScripts() {
  useEffect(() => {
    if (window.__stackdLoading) return;
    window.__stackdLoading = true;

    const load = (src) =>
      new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.async = false;
        s.onload = resolve;
        s.onerror = () => reject(new Error("Failed to load " + src));
        document.body.appendChild(s);
      });

    SCRIPTS.reduce((p, src) => p.then(() => load(src)), Promise.resolve()).catch(
      (err) => console.error("[stackd]", err)
    );
  }, []);

  return null;
}
