import CategoryBar from "@/components/CategoryBar";
import PageTitle from "@/components/PageTitle";
import ProductGrid from "@/components/ProductGrid";
import MobileDock from "@/components/MobileDock";
import { departments } from "@/lib/categories";
import { notFound } from "next/navigation";
import { getByDepartment, getCategoryCounts } from "@/lib/products";


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
            <CategoryBar department={matchingDepartment} />
            <ProductGrid products={products} />
            <MobileDock
                categoryLabel="All"
                department={matchingDepartment}
                counts={getCategoryCounts(matchingDepartment.slug)}
                total={products.length}
            />

        </main>
    );
}