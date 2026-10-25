"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LightToggle from "@/components/LightToggle";
import type { Department } from "@/lib/categories";


type CategoryBarProps = {
  department: Department;
  activeCategory?: string; // left out on the "All" page
};

export default function CategoryBar({ department, activeCategory }: CategoryBarProps) {
  const markerRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  // Watch the invisible marker above the bar: once it scrolls off-screen, the bar is stuck
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
      <nav
        aria-label="Categories"
        className={`sticky top-0 z-10 mb-8 hidden bg-bg lg:block ${stuck ? "shadow-md" : ""}`}
      >
        <div className="content-column">
          <div className="relative flex h-17 items-center justify-center border-y border-rule">
            <ul className="flex gap-2">
              <Tab href={`/${department.slug}`} label="All" active={!activeCategory} />
              {department.categories.map((category) => (
                <Tab
                  key={category.slug}
                  href={`/${department.slug}/${category.slug}`}
                  label={category.label}
                  active={category.slug === activeCategory}
                />
              ))}
            </ul>

            <div className="absolute right-0">
              <LightToggle />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}


type TabProps = {
  href: string;
  label: string;
  active: boolean;
};

function Tab({ href, label, active }: TabProps) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={`inline-flex min-h-11 items-center rounded-full border px-4 ${active ? "border-ink bg-ink text-bg" : "border-rule"
          }`}
      >
        {label}
      </Link>
    </li>
  );
}
