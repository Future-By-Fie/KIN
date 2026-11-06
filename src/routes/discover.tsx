import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MapPin, ArrowUpRight, Radio, Sparkles, PauseCircle } from "lucide-react";
import { isDiscoveryActive } from "@/lib/kin/discovery";
import { AppShell, PrivacyLine, DemoNote } from "@/components/kin/shell";
import { Radar } from "@/components/kin/radar";
import { MatchCard } from "@/components/kin/match-card";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/components/kin/demo-context";
import { nearbyQuery, pageHead } from "@/lib/kin/queries";
export const Route = createFileRoute("/discover")({
  head: () =>
    pageHead(
      "Your KIN radar",
      "Discover people nearby who share origin places in a synthetic Lund demo. Identities stay private.",
    ),
  loader: ({ context }) => context.queryClient.ensureQueryData(nearbyQuery),
  component: Discover,
});
function Discover() {
  const { data: matches } = useSuspenseQuery(nearbyQuery);
  const { preferences, setPreference, stopDiscovery } = useDemo();
  const active = isDiscoveryActive(preferences);
  return (
    <AppShell>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 mt-7 md:mt-10">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <MapPin size={13} />
          <span>Lund, Sweden</span>
          <span className="text-border">/</span>
          <span className="text-primary">Demo mode</span>
        </div>
        <span role="status" className="flex items-center gap-1.5 text-[10px] text-signal">
          <Radio size={12} aria-hidden />
          {active ? "Discovery on" : "Paused"}
        </span>
      </div>
      <p role="note" className="mt-4 text-xs text-muted-foreground">
        Radar is an optional, playful extra. Being nearby never means being related.{" "}
        <Link to="/origins" className="text-primary underline">
          Back to My Origins
        </Link>
      </p>
      <div className="discovery-heading mt-5 md:mt-8">
        <p className="eyebrow text-muted-foreground mb-3">A familiar feeling. A new connection.</p>
        <h1 className="font-display text-[32px] md:text-[46px] font-medium leading-[1.13]">
          Someone nearby
          <br />
          <span className="text-primary">shares your roots.</span>
        </h1>
      </div>
      <div className="discovery-grid">
        <div>
          <Radar paused={!active} matches={matches} />
          <div className="desktop-only mt-5">
            <PrivacyLine />
          </div>
        </div>
        <section className="min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-primary" />
            <h2 className="font-display text-lg font-medium">
              {active
                ? `${matches.length} shared-roots signal${matches.length === 1 ? "" : "s"} nearby`
                : "Your radar is on pause"}
            </h2>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-[330px] mb-5">
            {active
              ? "People nearby who chose to share origin places like yours. Nearby never means related."
              : "Your visibility is off. You choose when to discover."}
          </p>
          {active ? (
            <div className="space-y-3">
              {matches.map((match, index) => (
                <MatchCard key={match.id} match={match} featured={index === 0} />
              ))}
              <Button
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={stopDiscovery}
              >
                <PauseCircle />
                Stop discovery
              </Button>
            </div>
          ) : (
            <Button
              variant="kin"
              size="cta"
              className="w-full"
              onClick={() => {
                setPreference("discovery", true);
                setPreference("location", true);
                setPreference("ancestry", true);
              }}
            >
              Resume discovery <Radio />
            </Button>
          )}
          <div className="mt-5 mobile-only">
            <PrivacyLine />
          </div>
          <div className="mt-6 flex items-center justify-between text-[10px] text-muted-foreground border-t border-border pt-4">
            <span>Possibility, not certainty.</span>
            <Link to="/how-it-works" className="flex items-center gap-1 hover:text-foreground">
              How KIN works <ArrowUpRight size={12} />
            </Link>
          </div>
        </section>
      </div>
      <div className="mt-6 md:mt-10">
        <DemoNote />
      </div>
    </AppShell>
  );
}