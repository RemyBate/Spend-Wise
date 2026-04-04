/** Month/year used for dashboard & expense analytics (aligns with seeded demo data). */
export const REPORTING_MONTH = 4;
export const REPORTING_YEAR = 2026;

const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export function formatReportMonthLabel(month: number, year: number): string {
    return `${MONTHS[month - 1]} ${year}`;
}
