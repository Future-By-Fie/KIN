import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ShieldCheck, UserRound, RotateCcw } from "lucide-react";
import { AppShell, DemoNote } from "@/components/kin/shell";
import { PreferenceRow } from "@/components/kin/preference-row";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/components/kin/demo-context";
import { resetDemo } from "@/lib/kin/service";
import { pageHead } from "@/lib/kin/queries";
import { useState } from "react";
export const Route = createFileRoute("/settings")({
  head: () =>
    pageHead(
      "Settings",
      "Manage KIN discovery visibility, approximate demo location, notifications and privacy.",
    ),
  component: Settings,
});
function Settings() {
  const { preferences, setPreference, updateConnections } = useDemo();
  const [reset, setReset] = useState(false);
  return (
    <AppShell back title="Settings">
      <div className="narrow-page">
        <p className="eyebrow text-primary">Your KIN. Your call.</p>
        <h1 className="font-display text-4xl mt-4 font-medium">
          Make yourself
          <br />
          comfortable.
        </h1>
        <div className="mt-8 border-t border-border">
          <Link to="/profile" className="settings-row">
            <span className="flex gap-3 items-center text-sm">
              <UserRound size={17} />
              Profile
            </span>
            <ArrowUpRight size={17} />
          </Link>
          <PreferenceRow
            label="Discovery visibility"
            description="Let nearby synthetic signals find a possible connection. Switch off to pause discovery."
            checked={preferences.discovery}
            onChange={(value) => setPreference("discovery", value)}
          />
          <PreferenceRow
            label="Approximate location"
            description="Lund, Sweden · Fictional location only."
            checked={preferences.location}
            onChange={(value) => setPreference("location", value)}
          />
          <PreferenceRow
            label="Notifications"
            description="Demo preference only. No device notifications are sent."
            checked={preferences.notifications}
            onChange={(value) => setPreference("notifications", value)}
          />
          <Link to="/privacy" className="settings-row">
            <span className="flex gap-3 items-center text-sm">
              <ShieldCheck size={17} />
              Privacy
            </span>
            <ArrowUpRight size={17} />
          </Link>
          <Link to="/how-it-works" className="settings-row">
            <span className="text-sm">How KIN works</span>
            <ArrowUpRight size={17} />
          </Link>
          <div className="settings-row">
            <div>
              <h2 className="text-sm">Demo mode</h2>
              <p className="text-xs text-muted-foreground mt-2">
                KIN v0.1 · Everything here is fictional.
              </p>
            </div>
            <span className="text-primary demo-label">Always on</span>
          </div>
        </div>
        <Button
          variant="glass"
          className="w-full mt-7"
          onClick={() => {
            resetDemo();
            updateConnections();
            setReset(true);
          }}
        >
          <RotateCcw />
          Reset demo connections
        </Button>
        {reset && (
          <p role="status" className="text-primary text-xs text-center mt-3">
            Fresh start. Your demo connections and messages are cleared.
          </p>
        )}
        <div className="mt-7">
          <DemoNote />
        </div>
      </div>
    </AppShell>
  );
}