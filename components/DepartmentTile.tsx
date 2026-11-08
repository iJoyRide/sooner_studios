import Image from "next/image";
import Link from "next/link";
import type { Department } from "@/lib/categories";
import { getByDepartment } from "@/lib/products";

type DepartmentTileProps = {
    department: Department;
    eager?: boolean;
};

export default function DepartmentTile({ department, eager = false }: DepartmentTileProps) {
    const items = getByDepartment(department.slug)
    const first = items[0];

    if (!first) return null;

    const fades = department.slug === "lighting";

    return (
        <li>
            <Link href={`/${department.slug}`} className="group block">
                <div className="relative aspect-5/6 overflow-hidden bg-tile lg:aspect-4/5">
                    <Image
                        src={first.images.off}
                        alt={first.name}
                        fill
                        sizes="(min-width: 1024px) 524px, 100vw"
                        loading={eager ? "eager" : undefined}
                    />
                    {fades && (
                        <Image
                            src={first.images.on}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 524px, 100vw"
                            className="lamp-on"
                        />
                    )}
                </div>

                <h2 className="mt-3 text-[17px] font-medium group-hover:underline">
                    {department.label} →
                </h2>
                <p className="text-muted">
                    {items.length} {items.length === 1 ? department.noun : department.noun + "s"}
                </p>
            </Link>
        </li>
    );
}
