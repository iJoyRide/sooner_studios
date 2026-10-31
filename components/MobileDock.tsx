"use client";

import { useState } from "react";
import CategorySheet from "@/components/CategorySheet";
import LightToggle from "@/components/LightToggle";
import type { Department } from "@/lib/categories";

type MobileDockProps = {
  categoryLabel: string; // e.g. "Pendants", or "All"
  department: Department;
  activeCategory?: string; // left out on the "All" page
  counts: Record<string, number>;
  total: number;
};

export default function MobileDock({ categoryLabel, department, activeCategory, counts, total }: MobileDockProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <CategorySheet
          department={department}
          activeCategory={activeCategory}
          counts={counts}
          total={total}
          onClose={() => setOpen(false)}
        />
      )}
      <div className={`fixed inset-x-0 bottom-[calc(28px+env(safe-area-inset-bottom))] z-20 flex justify-center lg:hidden ${open ? "invisible" : ""}`}>
        <div className="flex items-center rounded-full bg-dock-bg text-dock-ink px-2 shadow-lg">
          <button
            type="button"
            onClick={() => setOpen(true)}
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
