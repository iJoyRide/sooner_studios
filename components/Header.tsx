"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { departments } from "@/lib/categories";


export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-rule lg:border-b-0">
      <div className="content-column flex items-center justify-between py-2.5">
        <Link
          href="/"
          className="flex min-h-11 items-center text-[19px] font-bold tracking-[-0.02em]"
        >
          Sooner
        </Link>

        <nav aria-label="Departments">
          <ul className="flex gap-1 lg:gap-4">
            {departments.map((department) => {
              const href = `/${department.slug}`;
              const isCurrent = pathname === href || pathname.startsWith(href + "/");

              return (
                <li key={department.slug}>
                  <Link
                    href={href}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`flex min-h-11 items-center px-2 ${isCurrent ? "text-ink" : "text-muted"}`}
                  >
                    {department.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
