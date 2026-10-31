import { departments } from "@/lib/categories";
import data from "@/data/products.json";

export type Product = {
    slug: string;
    name: string;
    department: string;
    category: string;
    material: string;
    images: {
        off: string;
        on: string;
    };
};

const products: Product[] = data;

for (const product of products) {

    const matchingDepartment = departments.find(
        (department) => department.slug === product.department
    )

    const matchingCategory = matchingDepartment?.categories.find(
        (category) => category.slug === product.category
    )

    if (!matchingCategory) {
        throw new Error(
            `Product "${product.slug}" has unknown category "${product.department}/${product.category}". Check lib/categories.ts.`
        );
    }
}

export function getAll(): Product[] {
    return products
};

export function getByDepartment(departmentSlug: string): Product[] {
    return products.filter((product) => product.department === departmentSlug);
}

export function getByCategory(departmentSlug: string, categorySlug: string): Product[] {
    return products.filter((product) => product.department === departmentSlug && product.category === categorySlug)
}

export function getCategoryCounts(departmentSlug: string): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const product of getByDepartment(departmentSlug)) {
        counts[product.category] = (counts[product.category] ?? 0) + 1;
    }

    return counts;
}