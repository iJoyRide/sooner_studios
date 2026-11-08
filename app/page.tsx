import DepartmentTile from "@/components/DepartmentTile";
import StickyBar from "@/components/StickyBar";
import { departments } from "@/lib/categories";

export default function Home() {
  return (
    <main className="pt-12 pb-16 lg:pt-20 lg:pb-24">
      <section className="content-column">
        <h1 className="mx-auto max-w-215 text-center text-balance text-[18px] font-medium leading-snug lg:text-[24px]">
          An independent design label exploring furniture, lighting, objects and
          spaces through material, construction and proportion.
        </h1>
      </section>

      <StickyBar className="mt-8 lg:mt-12" />

      <ul className="content-column grid gap-x-4 gap-y-10 lg:grid-cols-2">
        {departments.map((department, index) => (
          <DepartmentTile
            key={department.slug}
            department={department}
            eager={index === 0}
          />
        ))}
      </ul>
    </main>
  );
}
