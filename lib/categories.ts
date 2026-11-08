export type Category = {
    slug: string;
    label: string;
}

export type Department = {
    slug: string;
    label: string;
    noun: string;
    categories: Category[];
}

export const departments: Department[] = [
    {
        slug: "lighting",
        label: "Lighting",
        noun: "piece",
        categories: [
            { slug: "pendants", label: "Pendants" },
            { slug: "sconces", label: "Sconces" },
            { slug: "table", label: "Table Lamps" },
            { slug: "floor", label: "Floor Lamps" },
            { slug: "outdoor", label: "Outdoor" },
        ],

    },

    {
        slug: "interior-design",
        label: "Interior Design",
        noun: "project",
        categories: [
            { slug: "residential", label: "Residential"},
            { slug: "commercial", label: "Commercial"},
        ],
    },
];
