import { colorForEntity } from "../lib/color";
import { formatYear } from "../lib/format";
import { findPoliticalEntity } from "../data/politicalEntities";
import type { PoliticalEntityKind, PoliticalRuler } from "../types";
import type { SelectedEntity } from "./WorldMap";

const PRECISION_LABEL: Record<number, string> = {
  1: "Approximate border",
  2: "Moderately precise border",
  3: "Precise / well-documented border",
};

const KIND_LABEL: Record<PoliticalEntityKind, string> = {
  empire: "Empire",
  kingdom: "Kingdom",
  dynasty: "Dynasty",
  caliphate: "Caliphate",
  khanate: "Khanate",
  confederacy: "Confederacy",
  sultanate: "Sultanate",
  republic: "Republic",
  "city-state": "City-state",
  other: "Political entity",
};

function formatPeriod(start: number, end: number, approx: boolean): string {
  return `${formatYear(start)} – ${formatYear(end)}${approx ? " (approx.)" : ""}`;
}

/** Compact ruler-reign range, e.g. "1526–1530 CE" or "559–530 BCE" -- BCE/CE
 * shown once per range rather than repeated per year, since a single
 * ruler's reign never straddles the BCE/CE boundary in this dataset. */
function formatRulerYears(r: PoliticalRuler): string {
  const startAbs = Math.abs(r.reignStart).toLocaleString();
  const suffix = r.reignStart < 0 ? "BCE" : "CE";
  const approxMark = r.reignApprox ? "~" : "";
  if (r.reignEnd === undefined) {
    return `${approxMark}${startAbs} ${suffix} –`;
  }
  const endAbs = Math.abs(r.reignEnd).toLocaleString();
  return `${approxMark}${startAbs}–${endAbs} ${suffix}`;
}

interface InfoPanelProps {
  activeSliceYear: number | null;
  selected: SelectedEntity | null;
  onClose: () => void;
}

export default function InfoPanel({ activeSliceYear, selected, onClose }: InfoPanelProps) {
  if (!selected) {
    return (
      <div className="info-panel info-panel-empty">
        <p>Click a region on the map to see who ruled it.</p>
        <p className="info-panel-note">
          Colors are per ruling power (consistent across space and time), from{" "}
          <a href="https://github.com/aourednik/historical-basemaps" target="_blank" rel="noreferrer">
            historical-basemaps
          </a>{" "}
          for {activeSliceYear === null ? "up to 2010" : "this period"}, and the modern political map beyond that. That
          source is community-maintained and flagged "work in progress" by its own author — treat details as a
          starting point, not a citation.
        </p>
        {window.__HISTORY_PORTAL_BUNDLE__ && (
          <p className="info-panel-note">
            This is a live preview with a size-trimmed sample of time snapshots (43 of the full 50), chosen to
            still cover every era below. The source repo ships the complete set.
          </p>
        )}
      </div>
    );
  }

  const ruledBySomeoneElse = selected.subjecto && selected.subjecto !== selected.name;
  const entity = findPoliticalEntity(selected.name, activeSliceYear);

  return (
    <div className="info-panel">
      <button className="info-panel-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <h2>{selected.name}</h2>

      {entity && (
        <div className="info-panel-meta">
          <span className="info-panel-kind">{KIND_LABEL[entity.kind]}</span>
          <span className="info-panel-period">{formatPeriod(entity.periodStart, entity.periodEnd, entity.periodApprox)}</span>
        </div>
      )}

      <div className="info-panel-cluster" style={{ color: colorForEntity(selected.subjecto ?? selected.name) }}>
        {ruledBySomeoneElse ? `Ruled by ${selected.subjecto}` : "Independent / self-ruled"}
      </div>
      {selected.partof && selected.partof !== selected.name && selected.partof !== selected.subjecto && (
        <p>Part of: {selected.partof}</p>
      )}
      {selected.borderprecision != null && (
        <p className="info-panel-note">{PRECISION_LABEL[selected.borderprecision] ?? "Border precision unknown"}</p>
      )}

      {entity && <p className="info-panel-description">{entity.description}</p>}

      {entity && entity.rulers.length > 0 && (
        <div className="info-panel-rulers">
          <h3>Major rulers</h3>
          <ol className="ruler-timeline">
            {entity.rulers.map((r) => (
              <li key={`${r.name}-${r.reignStart}`} className="ruler-entry">
                <span className="ruler-dot" aria-hidden="true" />
                <div className="ruler-body">
                  <div className="ruler-headline">
                    <span className="ruler-name">{r.name}</span>
                    <span className="ruler-years">{formatRulerYears(r)}</span>
                  </div>
                  {r.note && <p className="ruler-note">{r.note}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {selected.link && (
        <p>
          <a href={selected.link} target="_blank" rel="noreferrer">
            More on Wikipedia →
          </a>
        </p>
      )}
      <p className="info-panel-todo">
        {activeSliceYear === null
          ? "Showing the modern political map (no snapshot needed — the last historical-basemaps slice is 2010)."
          : `Showing the historical-basemaps snapshot for ${Math.abs(activeSliceYear)} ${activeSliceYear < 0 ? "BCE" : "CE"} — boundaries hold at this snapshot until the next known one.`}
      </p>
    </div>
  );
}
