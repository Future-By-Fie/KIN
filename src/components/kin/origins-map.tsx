import { useState } from "react";
import { journey, locate, MAP_COPY, project } from "@/lib/kin/places";
import { ENTRY_LABEL, type OriginEntry } from "@/lib/kin/origins-store";
import type { Story } from "@/lib/kin/stories-store";

/** Stylised SVG world view of the user's own origins. No tiles, no network, no guessing. */
export function OriginsMap({
  list,
  onSelect,
  story,
}: {
  list: OriginEntry[];
  onSelect: (o: OriginEntry) => void;
  /** Draw this story's steps as arrows, only between places on the fixed map list. */
  story?: Story;
}) {
  const legs = (story?.steps ?? []).flatMap((st) => {
    const a = locate(st.from);
    const b = locate(st.to);
    return a && b && a !== b ? [{ id: st.id, src: st.source, a: project(a), b: project(b) }] : [];
  });
  const [showJourney, setShowJourney] = useState(false);
  const placed = list.flatMap((o) => {
    const at = locate(o.place, o.country);
    return at ? [{ o, ...project(at) }] : [];
  });
  const unmapped = list.filter((o) => !locate(o.place, o.country));
  const path = journey(list).map((j) => project(j.at));
  // Nudge points sharing a spot so each stays tappable.
  const seen = new Map<string, number>();
  const pts = placed.map((p) => {
    const k = `${p.x.toFixed(0)},${p.y.toFixed(0)}`;
    const n = seen.get(k) ?? 0;
    seen.set(k, n + 1);
    return { ...p, x: p.x + n * 3, y: p.y + n * 2 };
  });

  return (
    <div className="mt-6">
      <div className="origins-map rounded-2xl border border-border overflow-hidden">
        <svg
          viewBox="0 20 360 120"
          role="group"
          aria-label="Map of your origins"
          className="w-full h-auto block"
        >
          {Array.from({ length: 13 }, (_, i) => (
            <line key={`v${i}`} x1={i * 30} y1={0} x2={i * 30} y2={180} className="map-grid" />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 30} x2={360} y2={i * 30} className="map-grid" />
          ))}
          {showJourney && path.length > 1 && (
            <polyline points={path.map((p) => `${p.x},${p.y}`).join(" ")} className="map-journey" />
          )}
          <defs>
            <marker
              id="story-arrow"
              viewBox="0 0 6 6"
              refX="5"
              refY="3"
              markerWidth="4"
              markerHeight="4"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 z" className="map-story-head" />
            </marker>
          </defs>
          {legs.map((l) => (
            <line
              key={l.id}
              x1={l.a.x}
              y1={l.a.y}
              x2={l.b.x}
              y2={l.b.y}
              className="map-story"
              data-src={l.src}
              markerEnd="url(#story-arrow)"
            />
          ))}
          {pts.map(({ o, x, y }) => (
            <g
              key={o.id}
              role="button"
              tabIndex={0}
              aria-label={`${o.place}. ${ENTRY_LABEL[o.provenance]}`}
              className="map-point"
              data-prov={o.provenance}
              onClick={() => onSelect(o)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onSelect(o))
              }
            >
              <circle cx={x} cy={y} r={6} className="map-halo" />
              <circle cx={x} cy={y} r={2.4} className="map-dot" />
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <i className="legend-dot bg-primary" /> {ENTRY_LABEL.self_reported}
        </span>
        <span className="flex items-center gap-1">
          <i className="legend-dot bg-signal" /> {ENTRY_LABEL.documented}
        </span>
        {path.length > 1 && (
          <label className="flex items-center gap-1 ml-auto cursor-pointer">
            <input
              type="checkbox"
              checked={showJourney}
              onChange={(e) => setShowJourney(e.target.checked)}
            />
            Show as a journey
          </label>
        )}
      </div>
      <p className="text-[11px] text-muted-foreground mt-1">
        {MAP_COPY.note}
        {showJourney && path.length > 1 && ` Line: ${MAP_COPY.journey}.`}
      </p>
      {list.length === 0 && (
        <p className="text-sm text-muted-foreground mt-2">
          Add your first place. Nothing is shared.
        </p>
      )}
      {unmapped.length > 0 && (
        <p className="text-xs text-muted-foreground mt-2">
          {MAP_COPY.unmapped}: {unmapped.map((o) => o.place).join(", ")}
        </p>
      )}
    </div>
  );
}