"use client";

import { useLight } from "@/lib/light-context";

export default function LightTestButton() {
    const { lit, toggle } = useLight();

    return (
        <button
            onClick={toggle}
            className="fixed right-4 bottom-4 border border-rule bg-bg px-3 py-2"
        >
            Light: {lit ? "on" : "off"}
        </button>
    );
}