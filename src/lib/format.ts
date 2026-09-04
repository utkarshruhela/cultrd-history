/** Shared year formatting: -3200 -> "3,200 BCE", 1526 -> "1,526 CE". */
export function formatYear(year: number): string {
  return year < 0 ? `${Math.abs(year).toLocaleString()} BCE` : `${year.toLocaleString()} CE`;
}
