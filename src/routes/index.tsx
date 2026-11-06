import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/kin/queries";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Discover where you come from",
      "KIN is a visual origin discovery concept: map your origin places and migration stories. DNA is optional and future. Synthetic demo data.",
    ),
  component: Index,
});

/** Illustrative points only — synthetic, labelled demo. */
const DEMO_POINTS = [
  { x: 52, y: 22 },
  { x: 49, y: 28 },
  { x: 58, y: 34 },
  { x: 30, y: 30 },
];

export const PILLARS = [
  {
    name: "Origins",
    tag: "Start here",
    text: "Map your places and the stories of how your family moved.",
  },
  {
    name: "DNA",
    tag: "Optional · future",
    text: "Could one day enrich your origins. No provider is connected.",
  },
  {
    name: "Connect",
    tag: "Secondary",
    text: "An optional, consent-first way to meet people. Nearby never means related.",
  },
];

function Index() {
  return (
    <div className="intro page-enter">
      <header className="flex justify-between items-center px-7 py-7 md:px-12">
        <span className="demo-label text-muted-foreground">Visual origin discovery</span>
        <span className="demo-label text-primary">v0.2 / demo</span>
      </header>
      <main className="intro-content">
        <div className="w-full flex justify-center mb-6" aria-hidden>
          <svg
            viewBox="0 0 100 50"
            className="origins-map w-full max-w-[340px] rounded-2xl border border-border"
          >
            {Array.from({ length: 9 }, (_, i) => (
              <line key={`v${i}`} className="map-grid" x1={i * 12.5} y1={0} x2={i * 12.5} y2={50} />
            ))}
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={`h${i}`}
                className="map-grid"
                x1={0}
                y1={i * 12.5}
                x2={100}
                y2={i * 12.5}
              />
            ))}
            {DEMO_POINTS.map((p, i) => (
              <g key={i} className="map-point">
                <circle className="map-halo" cx={p.x} cy={p.y} r={2.4} />
                <circle className="map-dot" cx={p.x} cy={p.y} r={0.9} />
              </g>
            ))}
            <text x={97} y={47} textAnchor="end" fontSize={2.6} fill="currentColor" opacity={0.5}>
              Demo points
            </text>
          </svg>
        </div>
        <h1 className="kin-wordmark intro-title">KIN</h1>
        <h2 className="intro-heading">
          Discover where you come from.
          <br />
          <span className="text-primary">Connect with where you belong.</span>
        </h2>
        <ul className="mt-6 grid gap-2 w-full max-w-[340px] text-left">
          {PILLARS.map((p) => (
            <li key={p.name} className="rounded-xl border border-border bg-glass px-4 py-3">
              <p className="text-sm font-medium">
                {p.name} <span className="eyebrow text-muted-foreground ml-1">{p.tag}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">{p.text}</p>
            </li>
          ))}
        </ul>
        <Button asChild variant="kin" size="cta" className="mt-7 w-full max-w-[280px]">
          <Link to="/welcome">
            Start with my origins <ArrowRight />
          </Link>
        </Button>
        <Button asChild variant="ghost" className="mt-3 text-muted-foreground">
          <Link to="/how-it-works">
            How it works <ArrowRight size={14} />
          </Link>
        </Button>
      </main>
      <footer className="intro-foot">
        <p className="flex justify-center gap-2 items-center">
          <ShieldCheck size={12} />
          18+ only <span>·</span> Private by design <span>·</span> Synthetic demo data
        </p>
        <p className="mt-3 text-[9px]">
          A prototype. No DNA analysis, location tracking or verification of relatives.
        </p>
      </footer>
    </div>
  );
}