const FALLBACK_PALETTE = [
    "#ec4899",
    "#3b82f6",
    "#eab308",
    "#14b8a6",
    "#a855f7",
    "#f97316",
    "#64748b",
];

export type DonutSlice = {
    name: string;
    value: number;
    fill: string;
};

export function buildSpendingByCategoryData(
    categoryTotals: Record<string, number>,
    categories: { name: string; color: string | null }[]
): DonutSlice[] {
    const entries = Object.entries(categoryTotals).filter(([, v]) => v > 0);
    if (entries.length === 0) return [];

    let paletteIndex = 0;
    return entries.map(([name, value]) => {
        const cat = categories.find((c) => c.name === name);
        const fromDb =
            cat?.color &&
            typeof cat.color === "string" &&
            /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(cat.color.trim());
        const fill = fromDb
            ? cat!.color!.trim()
            : FALLBACK_PALETTE[paletteIndex++ % FALLBACK_PALETTE.length];
        return { name, value, fill };
    });
}
