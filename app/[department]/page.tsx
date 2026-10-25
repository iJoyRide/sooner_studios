import PageTitle from "@/components/PageTitle";
import { departments } from "@/lib/categories";
import { getByDepartment } from "@/lib/products";
import { notFound } from "next/navigation";

export const instant = false;

export function generateStaticParams() {
    return departments.map((department) => ({ department: department.slug }));
}

export default async function DepartmentPage(props: PageProps<"/[department]">) {
    const params = await props.params;

    const matchingDepartment = departments.find(
        (department) => department.slug === params.department
    );

    if (!matchingDepartment) {
        notFound();
    }

    const products = getByDepartment(matchingDepartment.slug);

    return (
        <main>
            <PageTitle title={matchingDepartment.label} count={products.length} />
            <ul className="content-column">
                {products.map((product) => (
                    <li key={product.slug}>{product.name}</li>
                ))}
            </ul>
        </main>
    );
}