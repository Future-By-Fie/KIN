import { createFileRoute, Link } from "@tanstack/react-router";
import { Dna, Info } from "lucide-react";
import { AppShell, DemoNote } from "@/components/kin/shell";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { pageHead } from "@/lib/kin/queries";

export const Route = createFileRoute("/dna")({
  head: () =>
    pageHead(
      "DNA — optional, future",
      "How DNA could one day enrich origin discovery in KIN. No provider is connected and no DNA analysis happens in this demo.",
    ),
  component: DnaPage,
});

const SOURCES = [
  { label: "You added", cls: "text-primary", text: "Places and stories you tell yourself." },
  {
    label: "Documented",
    cls: "text-signal",
    text: "Backed by a record you hold, like a letter or certificate.",
  },
  {
    label: "DNA estimate",
    cls: "text-muted-foreground",
    text: "Always an estimate. Never shown as fact about who you are.",
  },
];

const CONSENTS = ["Use a DNA estimate to suggest origin regions", "Let possible relatives find me"];

function DnaPage() {
  return (
    <AppShell back title="DNA">
      <div className="narrow-page">
        <div
          role="note"
          className="mt-6 flex gap-3 rounded-xl border border-border bg-glass p-4 text-sm"
        >
          <Info size={18} className="text-primary shrink-0" aria-hidden />
          <p>
            <strong>Future capability.</strong> No DNA provider is connected. DNA analysis and
            matching are not available in this demo.
          </p>
        </div>
        <p className="eyebrow text-primary mt-8">Optional</p>
        <h1 className="font-display text-3xl font-medium mt-2">DNA could deepen your origins.</h1>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
          KIN works without a DNA test. In a future version, you could choose to bring results from
          a provider you already use, so KIN can suggest regions to explore alongside the places and
          stories you add. You would decide what is used and could withdraw at any time.
        </p>

        <h2 className="font-display text-lg font-medium mt-8">Every item shows its source</h2>
        <ul className="mt-3 space-y-2">
          {SOURCES.map((s) => (
            <li key={s.label} className="rounded-xl border border-border px-4 py-3">
              <p className={`text-sm font-medium ${s.cls}`}>{s.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.text}</p>
            </li>
          ))}
        </ul>

        <h2 className="font-display text-lg font-medium mt-8">Consent preview</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Separate choices, off by default. Not available in this demo.
        </p>
        <div className="mt-3 space-y-3">
          {CONSENTS.map((c, i) => (
            <div
              key={c}
              className="flex items-center justify-between gap-4 rounded-xl border border-border px-4 py-3 opacity-60"
            >
              <Label htmlFor={`dna-consent-${i}`} className="text-sm">
                {c}{" "}
                <span className="block text-[11px] text-muted-foreground">
                  Not available in this demo
                </span>
              </Label>
              <Switch id={`dna-consent-${i}`} checked={false} disabled />
            </div>
          ))}
        </div>

        <Link
          to="/origins"
          className="mt-8 inline-flex items-center gap-2 text-sm text-primary underline"
        >
          <Dna size={14} aria-hidden /> Back to My Origins
        </Link>
        <div className="mt-6">
          <DemoNote />
        </div>
      </div>
    </AppShell>
  );
}