"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { useRef, useState } from "react";
import CategorySheet from "@/components/CategorySheet";
import LightToggle from "@/components/LightToggle";
import type { Department } from "@/lib/categories";

type MobileDockProps = {
  department: Department;
  counts: Record<string, number>;
  total: number;
};

export default function MobileDock({ department, counts, total }: MobileDockProps) {
  // The part of the URL after the department, e.g. "sconces"; null on the "All" page
  const activeCategory = useSelectedLayoutSegment() ?? undefined;
  const categoryLabel =
    department.categories.find((category) => category.slug === activeCategory)?.label ?? "All";
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function closeSheet() {
    setOpen(false);
    // Wait a frame for the dock to be visible again, then put focus back on its button
    requestAnimationFrame(() => buttonRef.current?.focus());
  }

  return (
    <>
      {open && (
        <CategorySheet
          department={department}
          activeCategory={activeCategory}
          counts={counts}
          total={total}
          onClose={closeSheet}
        />
      )}
      <div className={`fixed inset-x-0 bottom-[calc(28px+env(safe-area-inset-bottom))] z-20 flex justify-center lg:hidden ${open ? "invisible" : ""}`}>
        <div className="flex items-center rounded-full bg-dock-bg text-dock-ink px-2 shadow-lg">
          <button
            type="button"
            onClick={() => setOpen(true)}
            ref={buttonRef}
            aria-label={`Category: ${categoryLabel}. Change category`}
            className="inline-flex min-h-11 items-center gap-1 px-3"
          >
            <span>Category · {categoryLabel}</span>
            <span aria-hidden="true">▾</span>
          </button>

          {/* 1px divider between the two buttons */}
          <span aria-hidden="true" className="h-6 w-px bg-dock-ink/30" />

          <LightToggle onDock />
        </div>
      </div>
    </>
  );
}
