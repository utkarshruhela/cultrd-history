import { useCallback, useMemo, useRef, useState } from "react";
import type { TimelineEvent } from "../types";
import { TIMELINE_MIN_YEAR, TIMELINE_MAX_YEAR } from "../data/timelineEvents";
import { formatYear } from "../lib/format";

function yearToPercent(year: number): number {
  return ((year - TIMELINE_MIN_YEAR) / (TIMELINE_MAX_YEAR - TIMELINE_MIN_YEAR)) * 100;
}

function percentToYear(pct: number): number {
  const clamped = Math.min(100, Math.max(0, pct));
  return Math.round(TIMELINE_MIN_YEAR + (clamped / 100) * (TIMELINE_MAX_YEAR - TIMELINE_MIN_YEAR));
}

// How close (in years) a drag-release has to land to an event before it
// snaps exactly onto it.
const SNAP_THRESHOLD_YEARS = (TIMELINE_MAX_YEAR - TIMELINE_MIN_YEAR) * 0.008;

interface TimelineProps {
  currentYear: number;
  onChange: (year: number) => void;
  events: TimelineEvent[];
}

export default function Timeline({ currentYear, onChange, events }: TimelineProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [hoveredEvent, setHoveredEvent] = useState<TimelineEvent | null>(null);

  const nearestEvent = useMemo(() => {
    let best: TimelineEvent | null = null;
    let bestDist = Infinity;
    for (const ev of events) {
      const d = Math.abs(ev.year - currentYear);
      if (d < bestDist) {
        bestDist = d;
        best = ev;
      }
    }
    return bestDist <= SNAP_THRESHOLD_YEARS ? best : null;
  }, [events, currentYear]);

  const yearFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return currentYear;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    return percentToYear(pct);
  }, [currentYear]);

  const snapIfClose = useCallback(
    (year: number) => {
      let best: TimelineEvent | null = null;
      let bestDist = Infinity;
      for (const ev of events) {
        const d = Math.abs(ev.year - year);
        if (d < bestDist) {
          bestDist = d;
          best = ev;
        }
      }
      if (best && bestDist <= SNAP_THRESHOLD_YEARS) {
        onChange(best.year);
      } else {
        onChange(year);
      }
    },
    [events, onChange],
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    onChange(yearFromClientX(e.clientX));
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    onChange(yearFromClientX(e.clientX));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(false);
    snapIfClose(yearFromClientX(e.clientX));
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const range = TIMELINE_MAX_YEAR - TIMELINE_MIN_YEAR;
    const step = (range / 400) * (e.shiftKey ? 5 : 1);
    const delta = e.deltaY > 0 ? step : -step;
    const next = Math.min(TIMELINE_MAX_YEAR, Math.max(TIMELINE_MIN_YEAR, Math.round(currentYear + delta)));
    onChange(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const range = TIMELINE_MAX_YEAR - TIMELINE_MIN_YEAR;
    const step = e.shiftKey ? Math.round(range / 100) : 1;
    if (e.key === "ArrowLeft") {
      onChange(Math.max(TIMELINE_MIN_YEAR, currentYear - step));
    } else if (e.key === "ArrowRight") {
      onChange(Math.min(TIMELINE_MAX_YEAR, currentYear + step));
    } else if (e.key === "Home") {
      onChange(TIMELINE_MIN_YEAR);
    } else if (e.key === "End") {
      onChange(TIMELINE_MAX_YEAR);
    }
  };

  return (
    <div className="timeline">
      <div className="timeline-readout">
        <span className="timeline-year">{formatYear(currentYear)}</span>
        {nearestEvent && <span className="timeline-event-label">{nearestEvent.label}</span>}
      </div>

      <div
        ref={trackRef}
        className="timeline-track"
        role="slider"
        tabIndex={0}
        aria-valuemin={TIMELINE_MIN_YEAR}
        aria-valuemax={TIMELINE_MAX_YEAR}
        aria-valuenow={currentYear}
        aria-valuetext={formatYear(currentYear)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
      >
        <div className="timeline-rail" />
        <div className="timeline-progress" style={{ width: `${yearToPercent(currentYear)}%` }} />

        {events.map((ev, i) => (
          <div
            key={`${ev.year}-${i}`}
            className="timeline-tick"
            style={{ left: `${yearToPercent(ev.year)}%` }}
            onPointerEnter={() => setHoveredEvent(ev)}
            onPointerLeave={() => setHoveredEvent((cur) => (cur === ev ? null : cur))}
            onClick={(e) => {
              e.stopPropagation();
              onChange(ev.year);
            }}
            title={`${formatYear(ev.year)} — ${ev.label}`}
          />
        ))}

        <div className="timeline-handle" style={{ left: `${yearToPercent(currentYear)}%` }} />
      </div>

      {hoveredEvent && (
        <div className="timeline-hover-label" style={{ left: `${yearToPercent(hoveredEvent.year)}%` }}>
          {formatYear(hoveredEvent.year)} — {hoveredEvent.label}
        </div>
      )}

      <div className="timeline-bounds">
        <span>{formatYear(TIMELINE_MIN_YEAR)}</span>
        <span className="timeline-hint">drag or scroll to move through time · click a mark to jump to an event</span>
        <span>{formatYear(TIMELINE_MAX_YEAR)}</span>
      </div>
    </div>
  );
}
