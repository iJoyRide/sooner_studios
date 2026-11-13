import Link from "next/link";
import { notFound } from "next/navigation";
import { getByDepartment, getBySlug } from "@/lib/products";
import StickyBar from "@/components/StickyBar";
import ProjectCarousel from "@/components/ProjectCarousel";


export const instant = false;

export function generateStaticParams() {
    return getByDepartment("interior-design").map((project) => ({
        department: project.department,
        category: project.category,
        slug: project.slug,
    }));
}

export default async function ProjectPage(props: PageProps<"/[department]/[category]/[slug]">) {
    const params = await props.params;
    const project = getBySlug(params.slug);

    if (
        !project ||
        project.department !== "interior-design" ||
        project.department !== params.department ||
        project.category !== params.category
    ) {
        notFound();
    }

    const projects = getByDepartment("interior-design");
    const index = projects.findIndex((p) => p.slug === project.slug);
    const next = projects[(index + 1) % projects.length];

    return (
        <main className="pt-8 pb-32 lg:pt-0 lg:pb-16">
            {/* Desktop only: the mobile dock already has the toggle */}
            <StickyBar className="hidden lg:block">
                <Link
                    href="/interior-design"
                    className="inline-flex min-h-11 items-center text-muted hover:text-ink"
                >
                    ← All projects
                </Link>
            </StickyBar>

            <div className="content-column lg:pt-4">
                {/* Mobile only: the link stays above the photo */}
                <Link
                    href="/interior-design"
                    className="mb-6 inline-flex min-h-11 items-center text-muted hover:text-ink lg:hidden"
                >
                    ← All projects
                </Link>

                {project.gallery && (
                    <ProjectCarousel photos={project.gallery} name={project.name} />
                )}

                <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[1fr_2fr] lg:gap-12">
                    <div>
                        <h1 className="text-[20px] font-medium leading-tight lg:text-[30px]">
                            {project.name}
                        </h1>

                        <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
                            <dt className="text-muted">Date</dt>
                            <dd>{project.date}</dd>
                            <dt className="text-muted">Location</dt>
                            <dd>{project.location}</dd>
                            <dt className="text-muted">Scope</dt>
                            <dd>{project.scope}</dd>
                        </dl>
                    </div>

                    <div className="max-w-[65ch]">
                        {project.summary && (
                            <p className="text-[17px] leading-snug">{project.summary}</p>
                        )}

                        <div className="mt-6 space-y-4 leading-relaxed">
                            {project.description?.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>

                <nav aria-label="More projects" className="mt-16 border-t border-rule pt-6">
                    <Link
                        href={`/${next.department}/${next.category}/${next.slug}`}
                        className="inline-flex min-h-11 flex-col justify-center"
                    >
                        <span className="text-muted">Next project</span>
                        <span className="text-[17px] font-medium">{next.name} →</span>
                    </Link>
                </nav>
            </div>
        </main >
    );
}
