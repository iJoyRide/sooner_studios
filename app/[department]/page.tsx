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
        <div className="content-column py-8">
            <h1>{matchingDepartment.label}</h1>
            <p>{products.length} pieces</p>
            <ul>
                {products.map((product) => (
                    <li key={product.slug}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
}