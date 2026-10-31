import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import type { Department } from "@/lib/categories";

type CategorySheetProps = {
    department: Department;
    activeCategory?: string;
    counts: Record<string, number>;
    total: number;
    onClose: () => void;
};

export default function CategorySheet({ department, activeCategory, counts, total, onClose }: CategorySheetProps) {
    const headingId = useId();
    const closeRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    // Move focus into the sheet when it opens
    useEffect(() => {
        closeRef.current?.focus();
    }, []);

    // Esc closes the sheet; Tab and Shift+Tab loop inside it
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
                return;
            }
            if (event.key !== "Tab" || !panelRef.current) return;

            const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button");
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    // Stop the page behind from scrolling while the sheet is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);


    return (
        <div className="fixed inset-0 z-30 lg:hidden">
            {/* Backdrop: tapping outside the sheet closes it */}
            <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-scrim" />

            <div
                role="dialog"
                ref={panelRef}
                aria-modal="true"
                aria-labelledby={headingId}
                className="absolute inset-x-0 bottom-0 rounded-t-[20px] bg-bg pb-[env(safe-area-inset-bottom)]"
            >
                {/* Grab handle */}
                <div aria-hidden="true" className="mx-auto mt-2 h-1 w-9 rounded-full bg-rule" />

                <div className="flex items-center justify-between pl-4 pr-1 pt-1">
                    <h2 id={headingId} className="text-base font-medium">Category</h2>
                    <button
                        type="button"
                        ref={closeRef}
                        onClick={onClose}
                        aria-label="Close"
                        className="inline-flex size-11 items-center justify-center"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <ul className="pb-2">
                    <Row href={`/${department.slug}`} label="All" count={total} active={!activeCategory} onSelect={onClose} />
                    {department.categories.map((category) => (
                        <Row
                            key={category.slug}
                            href={`/${department.slug}/${category.slug}`}
                            label={category.label}
                            count={counts[category.slug] ?? 0}
                            active={category.slug === activeCategory}
                            onSelect={onClose}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

function CloseIcon() {
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
        >
            <path d="M6 6l12 12M18 6L6 18" />
        </svg>
    );
}

type RowProps = {
    href: string;
    label: string;
    count: number;
    active: boolean;
    onSelect: () => void;
};

function Row({ href, label, count, active, onSelect }: RowProps) {
    return (
        <li>
            <Link
                href={href}
                onClick={onSelect}
                aria-current={active ? "page" : undefined}
                className={`flex h-13 items-center gap-3 px-4 ${active ? "font-bold" : ""}`}
            >
                <span className="flex-1">{label}</span>
                <span className="text-muted">{count}</span>
                <span aria-hidden="true" className="w-4">
                    {active && <TickIcon />}
                </span>
            </Link>
        </li>
    );
}

function TickIcon() {
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
            <path d="M5 12l5 5L19 7" />
        </svg>
    );
}
