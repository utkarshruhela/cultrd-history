import { useEffect, useRef, useState } from "react";
import type { FeatureCollection, Geometry } from "geojson";
import type { EntityProps, HistoricalSliceMeta } from "../types";

const MODERN_KEY = "modern";

interface ModernCountryProps {
  name: string;
  "ISO3166-1-Alpha-3": string;
}

/**
 * Optional pre-loaded bundle, used by the standalone single-file preview
 * build (see scripts/build-preview-artifact.mjs) so it can run with zero
 * network fetches after the page itself loads. The normal repo/dev build
 * never sets this, and falls back to fetching from public/data/ as usual.
 */
declare global {
  interface Window {
    __HISTORY_PORTAL_BUNDLE__?: {
      world: FeatureCollection<Geometry, ModernCountryProps>;
      index: { slices: HistoricalSliceMeta[] };
      slices: Record<string, FeatureCollection<Geometry, EntityProps>>;
    };
  }
}

function normalizeModern(fc: FeatureCollection<Geometry, ModernCountryProps>): FeatureCollection<Geometry, EntityProps> {
  return {
    type: "FeatureCollection",
    features: fc.features.map((f) => ({
      type: "Feature",
      geometry: f.geometry,
      properties: {
        NAME: f.properties.name,
        SUBJECTO: f.properties.name,
        PARTOF: f.properties.name,
        BORDERPRECISION: null,
        LINK: null,
      },
    })),
  };
}

export interface ActiveSlice {
  /** "modern" or a historical-basemaps slice key like "bc4000" / "1960" */
  key: string;
  /** The slice's own year, or null for the modern (present-day) layer. */
  sliceYear: number | null;
  data: FeatureCollection<Geometry, EntityProps>;
}

/**
 * Picks and lazily loads the right map layer for a given timeline year:
 * the historical-basemaps time slice whose year is the greatest one
 * <= currentYear (state "holds" until the next known snapshot), or the
 * modern political map once currentYear is past the last available slice.
 * Loaded slices are cached in memory for the life of the page.
 */
export function useHistoricalData(currentYear: number) {
  const [slices, setSlices] = useState<HistoricalSliceMeta[] | null>(null);
  const [active, setActive] = useState<ActiveSlice | null>(null);
  const cache = useRef<Map<string, FeatureCollection<Geometry, EntityProps>>>(new Map());
  const activeKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const bundle = window.__HISTORY_PORTAL_BUNDLE__;
    if (bundle) {
      setSlices(bundle.index.slices.filter((s) => s.featureCount > 0));
      return;
    }
    fetch(`${import.meta.env.BASE_URL}data/historical/index.json`)
      .then((r) => r.json())
      .then((d: { slices: HistoricalSliceMeta[] }) => setSlices(d.slices.filter((s) => s.featureCount > 0)));
  }, []);

  useEffect(() => {
    if (!slices || slices.length === 0) return;

    const lastSlice = slices[slices.length - 1];
    let target: { key: string; sliceYear: number | null; path: string };

    if (currentYear > lastSlice.year) {
      target = { key: MODERN_KEY, sliceYear: null, path: `${import.meta.env.BASE_URL}data/world.geojson` };
    } else {
      // Greatest slice year <= currentYear; fall back to the earliest slice
      // if currentYear is before it (shouldn't happen given the timeline's
      // own min year, but keep this robust).
      let picked = slices[0];
      for (const s of slices) {
        if (s.year <= currentYear) picked = s;
        else break;
      }
      target = { key: picked.key, sliceYear: picked.year, path: `${import.meta.env.BASE_URL}data/historical/${picked.key}.geojson` };
    }

    if (activeKeyRef.current === target.key) return;
    activeKeyRef.current = target.key;

    const cached = cache.current.get(target.key);
    if (cached) {
      setActive({ key: target.key, sliceYear: target.sliceYear, data: cached });
      return;
    }

    const bundle = window.__HISTORY_PORTAL_BUNDLE__;
    const resolved: Promise<unknown> = bundle
      ? Promise.resolve(target.key === MODERN_KEY ? bundle.world : bundle.slices[target.key])
      : fetch(target.path).then((r) => r.json());

    resolved.then((raw) => {
      const normalized =
        target.key === MODERN_KEY
          ? normalizeModern(raw as FeatureCollection<Geometry, ModernCountryProps>)
          : (raw as FeatureCollection<Geometry, EntityProps>);
      cache.current.set(target.key, normalized);
      // Only apply if this is still the slice we want (guards against
      // fast scrubbing racing an older fetch).
      if (activeKeyRef.current === target.key) {
        setActive({ key: target.key, sliceYear: target.sliceYear, data: normalized });
      }
    });
  }, [currentYear, slices]);

  return { active, slices };
}
