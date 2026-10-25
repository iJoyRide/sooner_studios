import Link from "next/link";
import LightToggle from "@/components/LightToggle";
import type { Department } from "@/lib/categories";

type CategoryBarProps = {
  department: Department;
  activeCategory?: string; // left out on the "All" page
};

export default function CategoryBar({ department, activeCategory }: CategoryBarProps) {
  return (
    <nav aria-label="Categories" className="content-column mb-8 hidden lg:block">
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
    </nav>
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
        className={`inline-flex min-h-11 items-center rounded-full border px-4 ${
          active ? "border-ink bg-ink text-bg" : "border-rule"
        }`}
      >
        {label}
      </Link>
    </li>
  );
}
