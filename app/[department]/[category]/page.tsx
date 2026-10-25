import PageTitle from "@/components/PageTitle";
import ProductGrid from "@/components/ProductGrid";
import CategoryBar from "@/components/CategoryBar";
import { departments } from "@/lib/categories";
import { getByCategory } from "@/lib/products";
import { notFound } from "next/navigation";

export const instant = false;

export function generateStaticParams() {
    const pages: { department: string; category: string }[] = [];

    for (const department of departments) {
        for (const category of department.categories) {
            pages.push({ department: department.slug, category: category.slug });
        }
    }

    return pages;
}

export default async function CategoryPage(props: PageProps<"/[department]/[category]">) {
    const params = await props.params;

    const matchingDepartment = departments.find(
        (department) => department.slug === params.department
    );

    const matchingCategory = matchingDepartment?.categories.find(
        (category) => category.slug === params.category
    );

    if (!matchingDepartment || !matchingCategory) {
        notFound();
    }

    const products = getByCategory(matchingDepartment.slug, matchingCategory.slug);

    return (
        <main>
            <PageTitle title={matchingCategory.label} count={products.length} />
            <CategoryBar department={matchingDepartment} activeCategory={matchingCategory.slug} />
            <ProductGrid products={products} />
        </main>
    );
}