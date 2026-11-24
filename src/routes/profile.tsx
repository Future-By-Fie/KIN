import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUpRight, ShieldCheck, Settings2, Fingerprint, MapPin } from "lucide-react";
import { AppShell, DemoNote } from "@/components/kin/shell";
import { useDemo } from "@/components/kin/demo-context";
import { userQuery, pageHead } from "@/lib/kin/queries";
export const Route = createFileRoute("/profile")({
  head: () =>
    pageHead(
      "Your profile",
      "Your fictional KIN demo profile. You control discovery and identity reveal.",
    ),
  loader: ({ context }) => context.queryClient.ensureQueryData(userQuery),
  component: Profile,
});
function Profile() {
  const { data: user } = useSuspenseQuery(userQuery);
  const { preferences } = useDemo();
  return (
    <AppShell>
      <div className="narrow-page">
        <div className="text-center">
          <div className="mx-auto size-24 rounded-full grid place-items-center bg-secondary border border-border text-4xl font-display">
            {user.initials}
            <span className="sr-only">Synthetic profile</span>
          </div>
          <h1 className="font-display text-4xl mt-6">
            {user.name}
            <span className="text-primary">.</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-3">{user.bio}</p>
          <span className="inline-flex items-center gap-1 text-[10px] text-primary bg-primary/5 border border-primary/15 rounded-full py-1.5 px-3 mt-5">
            <Fingerprint size={12} />
            Synthetic demo profile
          </span>
        </div>
        <div className="mt-10 border-t border-border">
          <div className="settings-row">
            <div>
              <h2 className="text-sm font-medium">Discovery status</h2>
              <p className="text-xs text-muted-foreground mt-1">
                {preferences.discovery
                  ? "Open to a little possibility."
                  : "Taking a little privacy break."}
              </p>
            </div>
            <span className="text-xs text-primary">
              {preferences.discovery ? "Visible" : "Paused"}
            </span>
          </div>
          <div className="settings-row">
            <span className="flex items-center gap-3 text-sm">
              <MapPin size={17} className="text-muted-foreground" />
              Lund, Sweden
            </span>
            <span className="text-[10px] text-muted-foreground">Demo location</span>
          </div>
          <Link to="/privacy" className="settings-row">
            <span className="flex items-center gap-3 text-sm">
              <ShieldCheck size={17} className="text-muted-foreground" />
              Your privacy
            </span>
            <ArrowUpRight size={17} />
          </Link>
          <Link to="/settings" className="settings-row">
            <span className="flex items-center gap-3 text-sm">
              <Settings2 size={17} className="text-muted-foreground" />
              Settings
            </span>
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <p className="text-center text-xs text-muted-foreground leading-relaxed mt-8">
          Your identity stays hidden from nearby signals.
          <br />
          Nothing is revealed until you both choose it.
        </p>
        <div className="mt-8">
          <DemoNote />
        </div>
      </div>
    </AppShell>
  );
}