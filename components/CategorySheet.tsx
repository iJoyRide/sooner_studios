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

    return (
        <div className="fixed inset-0 z-30 lg:hidden">
            {/* Backdrop: tapping outside the sheet closes it */}
            <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-scrim" />

            <div className="absolute inset-x-0 bottom-0 rounded-t-[20px] bg-bg pb-[env(safe-area-inset-bottom)]">
                {/* Grab handle */}
                <div aria-hidden="true" className="mx-auto mt-2 h-1 w-9 rounded-full bg-rule" />

                <div className="flex items-center justify-between pl-4 pr-1 pt-1">
                    <h2 className="text-base font-medium">Category</h2>
                    <button
                        type="button"
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
