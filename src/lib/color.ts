// Deterministic name -> color, so the same ruling power/entity always gets
// the same fill wherever and whenever it appears (e.g. every "British
// Empire" polygon across the globe, across time slices, is the same hue).
export function colorForEntity(name: string | null | undefined): string {
  if (!name) return "hsl(220 8% 20%)";
  let hash = 5381;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash * 33) ^ name.charCodeAt(i)) >>> 0;
  }
  const hue = hash % 360;
  const sat = 50 + ((hash >> 8) % 18); // 50-68%
  const light = 40 + ((hash >> 16) % 16); // 40-56%
  return `hsl(${hue} ${sat}% ${light}%)`;
}
