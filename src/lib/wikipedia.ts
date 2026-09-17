export function isWikipediaUrl(href: string): boolean {
  try {
    const url = new URL(href);
    return url.protocol === "https:" && /(^|\.)wikipedia\.org$/i.test(url.hostname) && url.pathname.startsWith("/wiki/");
  } catch {
    return false;
  }
}
