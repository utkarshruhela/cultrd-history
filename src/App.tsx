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
      <nav className="site-nav" aria-label="Site navigation">
        <a className="site-mark" href="https://www.utkarshruhela.com/" aria-label="Utkarsh Ruhela, home">UTK</a>
        <a className="site-section" href="https://www.utkarshruhela.com/">HOME</a>
        <span className="site-current">HISTORYFLOW</span>
        <span className="site-status">ARCHIVE_002</span>
      </nav>

      <header className="app-header">
        <div className="app-title-block">
          <span className="app-kicker">PERSONAL_ARCHIVE / CULTURAL_ATLAS</span>
          <h1>history<em>flow</em></h1>
        </div>
        <div className="app-context">
          <span className="app-tagline">WHO RULED WHOM, WHERE</span>
          <span className="app-instruction">CLICK THE MAP / SCRUB THE TIMELINE</span>
        </div>
        {activeSliceYear !== null && (
          <span className="app-slice-note">BOUNDARIES AS OF {formatYear(activeSliceYear)}</span>
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
