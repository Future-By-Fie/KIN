import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, LockKeyhole, ArrowRight } from "lucide-react";
import { AppShell, DemoNote } from "@/components/kin/shell";
import { PreferenceRow } from "@/components/kin/preference-row";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/components/kin/demo-context";
import { pageHead } from "@/lib/kin/queries";
export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead(
      "Private by design",
      "Control approximate discovery, fictional ancestry signals and consent. Nothing is revealed without mutual action.",
    ),
  component: Privacy,
});
function Privacy() {
  const { preferences, setPreference } = useDemo();
  return (
    <AppShell back title="Privacy">
      <div className="narrow-page">
        <ShieldCheck size={32} strokeWidth={1.4} className="text-primary" />
        <p className="eyebrow text-primary mt-6">Yours to choose</p>
        <h1 className="font-display text-4xl font-medium mt-4">
          Private isn’t a setting.
          <br />
          It’s the starting point.
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed mt-5">
          Nothing is revealed without mutual action.
        </p>
        <div className="mt-8 border-t border-border">
          <PreferenceRow
            label="Approximate location"
            description="Discover in a general area, never an exact pin. This demo uses a fictional Lund location, not your device location."
            checked={preferences.location}
            onChange={(value) => setPreference("location", value)}
          />
          <PreferenceRow
            label="Ancestry / relationship signals"
            description="Allow matching from invented family-tree patterns. All signals are synthetic. No DNA is collected or analyzed."
            checked={preferences.ancestry}
            onChange={(value) => setPreference("ancestry", value)}
          />
          <div className="settings-row">
            <div>
              <h2 className="text-sm font-medium">Identity reveal</h2>
              <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                Always private until both people opt in. This protection cannot be switched off.
              </p>
            </div>
            <LockKeyhole size={19} className="text-primary" />
          </div>
          <PreferenceRow
            label="Connection requests"
            description="Allow yourself to ask to connect. Each reveal still requires the other person’s consent, simulated in this demo."
            checked={preferences.consent}
            onChange={(value) => setPreference("consent", value)}
          />
        </div>
        <Button asChild variant="glass" size="cta" className="mt-8 w-full">
          <Link to="/discover">
            Back to discovery <ArrowRight />
          </Link>
        </Button>
        <p className="text-[11px] text-muted-foreground text-center mt-6">
          No accounts. No tracking. No real genetic data.
          <br />
          Demo choices reset when this session ends.
        </p>
        <div className="mt-6">
          <DemoNote />
        </div>
      </div>
    </AppShell>
  );
}