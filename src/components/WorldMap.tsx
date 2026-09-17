import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { MapContainer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { EntityProps } from "../types";
import { colorForEntity } from "../lib/color";
import { useHistoricalData, type ActiveSlice } from "../hooks/useHistoricalData";

export interface SelectedEntity {
  name: string;
  subjecto: string | null;
  partof: string | null;
  borderprecision: number | null;
  link: string | null;
}

function styleFor(feature: Feature<Geometry, EntityProps> | undefined, selectedName: string | null): L.PathOptions {
  const name = feature?.properties?.NAME;
  const fillColor = colorForEntity(feature?.properties?.SUBJECTO ?? name);
  const isSelected = !!name && name === selectedName;

  return {
    fillColor,
    fillOpacity: 0.82,
    color: isSelected ? "#efff17" : "#050505",
    weight: isSelected ? 2.5 : 0.7,
  };
}

/**
 * Static backdrop: today's political map, everywhere, all the time --
 * light gray fill with black borders, non-interactive. Historical/modern
 * slices (GeoJsonLayer below) are drawn on top of this and only cover the
 * parts of the world that have data for the current year (e.g. at 4000 BCE
 * that's just a handful of literate civilizations); without this backdrop
 * the rest of the world was just empty black background, which read as
 * "map is broken" rather than "no data for this year yet."
 */
function useWorldOutline(): FeatureCollection<Geometry> | null {
  const [data, setData] = useState<FeatureCollection<Geometry> | null>(null);

  useEffect(() => {
    const bundle = window.__HISTORY_PORTAL_BUNDLE__;
    if (bundle) {
      setData(bundle.world as unknown as FeatureCollection<Geometry>);
      return;
    }
    fetch(`${import.meta.env.BASE_URL}data/world.geojson`)
      .then((r) => r.json())
      .then(setData);
  }, []);

  return data;
}

function BaseWorldLayer() {
  const map = useMap();
  const data = useWorldOutline();
  const layerRef = useRef<L.GeoJSON | null>(null);

  useEffect(() => {
    if (!data) return;
    const layer = L.geoJSON(data, {
      interactive: false,
      style: {
        fillColor: "#efefeb",
        fillOpacity: 1,
        color: "#050505",
        weight: 0.7,
      },
    }).addTo(map);
    layer.bringToBack();
    layerRef.current = layer;
    return () => {
      layer.remove();
      layerRef.current = null;
    };
  }, [data, map]);

  return null;
}

/**
 * Today's political borders, EVERY country, traced as a border-only outline
 * on top of the map at every point on the timeline, regardless of year.
 * Same source data as BaseWorldLayer (world.geojson) and the same style for
 * every country -- no country gets special treatment here.
 *
 * Why: GeoJsonLayer below shows whichever historical entity actually ruled
 * each area in a given year (Mughal Empire, Maratha Confederacy, Holy Roman
 * Empire, etc.), which is the accurate history and the whole point of the
 * app. But that meant a viewer looking at, say, 1526 CE had no reference at
 * all for where any of today's countries actually are, which can read as
 * "this map is wrong" rather than "this is what the region looked like
 * then." This layer adds that reference uniformly: today's borders are
 * always visible in a thin neutral line, for every country on Earth, while
 * the historical ruler-by-ruler coloring underneath is untouched.
 *
 * (An earlier version of this only drew India's modern outline, meant as a
 * fix for exactly this confusion after a screenshot at 1526 CE was flagged
 * as looking broken. Singling out one country for this treatment was itself
 * inconsistent and looked like special pleading -- this generic version
 * gives every country the same reference outline instead.)
 *
 * No fill (fillOpacity 0) and non-interactive, so it never obscures or
 * blocks clicks on the historical entities it's drawn over.
 */
interface ModernBordersLayerProps {
  /**
   * Changes whenever the active historical/modern slice layer is swapped.
   * GeoJsonLayer below adds a *new* Leaflet layer instance on every slice
   * change, appended after this one -- so without re-asserting
   * bringToFront on each swap, the freshly-added slice layer would paint
   * over these outlines the very first time the timeline crosses into a new
   * slice.
   */
  bringToFrontKey: unknown;
}

function ModernBordersLayer({ bringToFrontKey }: ModernBordersLayerProps) {
  const map = useMap();
  const data = useWorldOutline();
  const layerRef = useRef<L.GeoJSON | null>(null);

  useEffect(() => {
    if (!data) return;
    const layer = L.geoJSON(data, {
      interactive: false,
      style: {
        fillOpacity: 0,
        color: "#050505",
        weight: 1,
        opacity: 0.85,
      },
    }).addTo(map);
    layer.bringToFront();
    layerRef.current = layer;
    return () => {
      layer.remove();
      layerRef.current = null;
    };
  }, [data, map]);

  useEffect(() => {
    layerRef.current?.bringToFront();
  }, [bringToFrontKey, data]);

  return null;
}

interface GeoJsonLayerProps {
  slice: ActiveSlice;
  selectedName: string | null;
  onSelect: (entity: SelectedEntity) => void;
}

/**
 * Imperative Leaflet GeoJSON layer. The whole layer is swapped (removed +
 * re-added) whenever `slice` changes identity, which -- thanks to caching
 * in useHistoricalData -- only happens when the timeline crosses into a
 * different time slice, not on every pixel of dragging. Styling
 * (selection highlight) is still cheap in-place restyling.
 */
function GeoJsonLayer({ slice, selectedName, onSelect }: GeoJsonLayerProps) {
  const map = useMap();
  const layerRef = useRef<L.GeoJSON<EntityProps> | null>(null);
  const selectedRef = useRef(selectedName);
  selectedRef.current = selectedName;

  useEffect(() => {
    const layer = L.geoJSON(slice.data, {
      style: (f) => styleFor(f as Feature<Geometry, EntityProps>, selectedRef.current),
      onEachFeature: (feature, lyr) => {
        const props = feature.properties as EntityProps;
        lyr.on({
          mouseover: (e) => {
            (e.target as L.Path).setStyle({ weight: 2.5, color: "#efff17" });
            (e.target as L.Path).bringToFront();
          },
          mouseout: (e) => {
            (e.target as L.Path).setStyle(styleFor(feature as Feature<Geometry, EntityProps>, selectedRef.current));
          },
          click: () => {
            onSelect({
              name: props.NAME ?? "Unknown",
              subjecto: props.SUBJECTO,
              partof: props.PARTOF,
              borderprecision: props.BORDERPRECISION,
              link: props.LINK,
            });
          },
        });
        if (props.NAME) {
          lyr.bindTooltip(props.NAME, { sticky: true, direction: "top", opacity: 0.9 });
        }
      },
    }).addTo(map);

    layerRef.current = layer;
    return () => {
      layer.remove();
      layerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slice, map]);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    layer.eachLayer((lyr) => {
      const gj = lyr as L.Path & { feature?: Feature<Geometry, EntityProps> };
      if (gj.feature) gj.setStyle(styleFor(gj.feature, selectedName));
    });
  }, [selectedName]);

  return null;
}

interface WorldMapProps {
  currentYear: number;
  selectedName: string | null;
  onSelect: (entity: SelectedEntity) => void;
  onActiveSliceChange: (sliceYear: number | null) => void;
}

export default function WorldMap({ currentYear, selectedName, onSelect, onActiveSliceChange }: WorldMapProps) {
  const { active } = useHistoricalData(currentYear);

  useEffect(() => {
    onActiveSliceChange(active?.sliceYear ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <div className="world-map">
      <MapContainer
        center={[10, 0]}
        zoom={1.5}
        minZoom={0.75}
        maxZoom={7}
        worldCopyJump
        className="leaflet-container-full"
        attributionControl={false}
      >
        <BaseWorldLayer />
        {active && <GeoJsonLayer slice={active} selectedName={selectedName} onSelect={onSelect} />}
        <ModernBordersLayer bringToFrontKey={active?.key ?? null} />
      </MapContainer>
      {!active && <div className="map-loading">Loading map…</div>}
    </div>
  );
}
