"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";

function getSnapshot() {
    return document.documentElement.dataset.light === "on";
}


function getServerSnapshot() {
    return false;
}


function subscribe(onChange: () => void) {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-light"],
    });
    return () => observer.disconnect();
}

type LightContextValue = {
    lit: boolean;
    toggle: () => void;
};

const LightContext = createContext<LightContextValue | null>(null);

export function LightProvider({ children }: { children: ReactNode }) {
    const lit = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    function toggle() {
        const next = lit ? "off" : "on";
        document.documentElement.dataset.light = next;
        try {
            localStorage.setItem("sooner-light", next);
        } catch {
            // Storage blocked (e.g. private mode): the light still switches for this visit

        }
    }
    return <LightContext value={{ lit, toggle }}>{children}</LightContext>;

}

export function useLight() {
    const context = useContext(LightContext);
    if (!context) {
        throw new Error("useLight must be used inside <LightProvider>");
    }
    return context;
}
