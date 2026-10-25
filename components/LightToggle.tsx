"use client";

import { useLight } from "@/lib/light-context";

type LightToggleProps = {
  onDock?: boolean; // true inside MobileDock, where colours are inverted
};

export default function LightToggle({ onDock = false }: LightToggleProps) {
  const { lit, toggle } = useLight();

  const trackColour = onDock ? "bg-dock-ink/50 lit:bg-dock-ink" : "bg-muted lit:bg-ink";
  const knobColour = onDock ? "bg-dock-bg" : "bg-bg";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={lit}
      aria-label={lit ? "Lighting: on" : "Lighting: off"}
      className="inline-flex min-h-11 items-center gap-2 px-2"
    >
      <BulbIcon />
      <span>Light</span>

      {/* The switch: a track with a sliding knob */}
      <span
        aria-hidden="true"
        className={`relative h-4.5 w-8.5 rounded-full ${trackColour}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-3.5 rounded-full transition-transform lit:translate-x-4 ${knobColour}`}
        />
      </span>
    </button>
  );
}


function BulbIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3z" />
    </svg>
  );
}
