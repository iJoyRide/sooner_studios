"use client";

import { useEffect, useRef, useState } from "react";
import LightToggle from "@/components/LightToggle";

type StickyBarProps = {
  children?: React.ReactNode; // whatever sits on the left (e.g. "← All projects")
  className?: string;
};

export default function StickyBar({ children, className = "" }: StickyBarProps) {
  const markerRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  // Same trick as CategoryBar: once the marker scrolls away, the bar is stuck → add shadow
  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;

    const observer = new IntersectionObserver(([entry]) => {
      setStuck(!entry.isIntersecting);
    });
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={markerRef} aria-hidden="true" />
      <div className={`sticky top-0 z-10 bg-bg ${stuck ? "shadow-md" : ""} ${className}`}>
        <div className="content-column">
          <div className="flex h-17 items-center justify-between">
            <div>{children}</div>
            <LightToggle />
          </div>
        </div>
      </div>
    </>
  );
}
