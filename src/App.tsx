import { useState } from "react";
import WorldMap, { type SelectedEntity } from "./components/WorldMap";
import Timeline from "./components/Timeline";
import InfoPanel from "./components/InfoPanel";
import { TIMELINE_EVENTS } from "./data/timelineEvents";
import { formatYear } from "./lib/format";
import "./App.css";

export default function App() {
  const [currentYear, setCurrentYear] = useState(1526); // Mughal Empire founding, arbitrary demo default
  const [selected, setSelected] = useState<SelectedEntity | null>(null);
  const [activeSliceYear, setActiveSliceYear] = useState<number | null>(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1>CULTRD HISTORY</h1>
        <span className="app-tagline">who ruled whom, where — click the map, scrub the timeline</span>
        {activeSliceYear !== null && (
          <span className="app-slice-note">showing boundaries as of {formatYear(activeSliceYear)}</span>
        )}
      </header>

      <main className="app-main">
        <WorldMap
          currentYear={currentYear}
          selectedName={selected?.name ?? null}
          onSelect={setSelected}
          onActiveSliceChange={(sliceYear) => {
            setActiveSliceYear((prev) => {
              if (prev !== sliceYear) setSelected(null);
              return sliceYear;
            });
          }}
        />
        <InfoPanel activeSliceYear={activeSliceYear} selected={selected} onClose={() => setSelected(null)} />
      </main>

      <footer className="app-footer">
        <Timeline currentYear={currentYear} onChange={setCurrentYear} events={TIMELINE_EVENTS} />
      </footer>
    </div>
  );
}
