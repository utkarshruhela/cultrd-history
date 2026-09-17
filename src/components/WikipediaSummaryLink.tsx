import { useState } from "react";

type SummaryState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; text: string }
  | { status: "error"; message: string };

const summaryCache = new Map<string, string>();

function wikipediaSummaryEndpoint(href: string): string {
  const articleUrl = new URL(href);
  const articleTitle = decodeURIComponent(articleUrl.pathname.slice("/wiki/".length));
  const endpoint = new URL("/w/api.php", articleUrl.origin);
  endpoint.search = new URLSearchParams({
    action: "query",
    prop: "extracts",
    exintro: "1",
    explaintext: "1",
    redirects: "1",
    format: "json",
    origin: "*",
    titles: articleTitle,
  }).toString();
  return endpoint.toString();
}

function firstParagraph(extract: string): string {
  const paragraph = extract
    .split(/\n\s*\n|\n/)
    .map((paragraph) => paragraph.trim())
    .find(Boolean) ?? "";
  return paragraph.replace(/\[\s*\]/g, "").trim();
}

interface WikipediaSummaryLinkProps {
  href: string;
  label: string;
  className?: string;
}

export default function WikipediaSummaryLink({ href, label, className }: WikipediaSummaryLinkProps) {
  const [expanded, setExpanded] = useState(false);
  const [summary, setSummary] = useState<SummaryState>(() => {
    const cached = summaryCache.get(href);
    return cached ? { status: "ready", text: cached } : { status: "idle" };
  });

  async function loadSummary() {
    const cached = summaryCache.get(href);
    if (cached) {
      setSummary({ status: "ready", text: cached });
      return;
    }

    setSummary({ status: "loading" });
    try {
      const response = await fetch(wikipediaSummaryEndpoint(href));
      if (!response.ok) throw new Error(`Wikipedia returned ${response.status}`);

      const payload = (await response.json()) as {
        query?: { pages?: Record<string, { extract?: string; missing?: string }> };
      };
      const page = Object.values(payload.query?.pages ?? {})[0];
      const text = firstParagraph(page?.extract ?? "");
      if (!text || page?.missing !== undefined) throw new Error("No lead summary was available");

      summaryCache.set(href, text);
      setSummary({ status: "ready", text });
    } catch (error) {
      setSummary({
        status: "error",
        message: error instanceof Error ? error.message : "The summary could not be loaded",
      });
    }
  }

  function handleClick() {
    if (expanded) {
      setExpanded(false);
      return;
    }

    setExpanded(true);
    if (summary.status === "idle" || summary.status === "error") void loadSummary();
  }

  return (
    <div className="wikipedia-summary">
      <button
        type="button"
        className={["wikipedia-summary-trigger", className].filter(Boolean).join(" ")}
        onClick={handleClick}
        aria-expanded={expanded}
      >
        <span>{label}</span>
        <span className="wikipedia-summary-toggle" aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>

      {expanded && (
        <div className="wikipedia-summary-body" aria-live="polite">
          {summary.status === "loading" && <p className="wikipedia-summary-status">Loading Wikipedia summary…</p>}
          {summary.status === "ready" && <p>{summary.text}</p>}
          {summary.status === "error" && (
            <p className="wikipedia-summary-status">Summary unavailable: {summary.message}.</p>
          )}
          {summary.status !== "loading" && (
            <a href={href} target="_blank" rel="noreferrer" className="wikipedia-summary-source">
              Read the full Wikipedia article ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
}
