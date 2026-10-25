export type Category = {
    slug: string;
    label: string;
}

export type Department = {
    slug: string;
    label: string;
    categories: Category[];
}

export const departments: Department[] = [
    {
        slug: "lighting",
        label: "Lighting",
        categories: [
            { slug: "pendants", label: "Pendants" },
            { slug: "sconces", label: "Sconces" },
            { slug: "table", label: "Table lamps" },
            { slug: "floor", label: "Floor lamps" },
            { slug: "outdoor", label: "Outdoor" },
        ],

    },
];
