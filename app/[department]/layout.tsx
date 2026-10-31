import MobileDock from "@/components/MobileDock";
import { departments } from "@/lib/categories";
import { getByDepartment, getCategoryCounts } from "@/lib/products";
import { notFound } from "next/navigation";

export default async function DepartmentLayout(props: LayoutProps<"/[department]">) {
    const params = await props.params;

    const matchingDepartment = departments.find(
        (department) => department.slug === params.department
    );

    if (!matchingDepartment) {
        notFound();
    }

    return (
        <>
            {props.children}
            <MobileDock
                department={matchingDepartment}
                counts={getCategoryCounts(matchingDepartment.slug)}
                total={getByDepartment(matchingDepartment.slug).length}
            />
        </>
    );
}
