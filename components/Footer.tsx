import Link from "next/link";
import { departments } from "@/lib/categories";
import CurrentYear from "@/components/CurrentYear";

// Layout adapted from HyperUI's "Large with newsletter form" footer
// (https://hyperui.dev/components/marketing/footers/), made compact. The newsletter
// form is replaced with an email link, because Sooner has no mailing list.
export default function Footer() {
  return (
    <footer className="mt-auto border-t border-rule">
      <div className="content-column py-10">
        <div className="lg:flex lg:items-start lg:gap-8">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-[19px] font-bold tracking-[-0.02em]"
          >
            Sooner
          </Link>

          <div className="mt-6 grid grid-cols-2 gap-6 lg:mt-0 lg:flex-1 lg:grid-cols-5 lg:gap-y-8">
            {/* Top row: heading on the left, email "form" on the right */}
            <div className="col-span-2">
              <h2 className="text-xl font-bold">Get in touch</h2>
              <p className="mt-2 text-muted">For projects and enquiries, drop us an email.</p>
            </div>

            <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
              <a
                href="mailto:soonerstudios.sg@gmail.com"
                className="group block w-full border border-rule p-1.5 sm:flex sm:items-center sm:gap-4"
              >
                <span className="block w-full px-2 py-2">soonerstudios.sg@gmail.com</span>
                <span className="mt-1 block w-full bg-ink px-5 py-2 text-center font-bold tracking-wide text-bg uppercase group-hover:opacity-90 sm:mt-0 sm:w-auto sm:shrink-0">
                  Email us
                </span>
              </a>
            </div>

            {/* Department links (built from departments, so a new one adds a link) */}
            <div>
              <h2 className="font-medium">Explore</h2>
              <ul className="mt-1">
                {departments.map((department) => (
                  <li key={department.slug}>
                    <Link
                      href={`/${department.slug}`}
                      className="flex min-h-11 items-center text-muted hover:text-ink"
                    >
                      {department.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-medium">Social</h2>
              <ul className="mt-1">
                <li>
                  <a
                    href="https://instagram.com/soonerstudios"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center text-muted hover:text-ink"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-6 border-t border-rule pt-6">
          <p className="text-muted">
            &copy; <CurrentYear /> Sooner Studios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
