import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layers2, ArrowRight, MessageCircle, Check, Fingerprint } from "lucide-react";
import { AppShell, DemoNote, PrivacyLine } from "@/components/kin/shell";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/components/kin/demo-context";
import { getConnections } from "@/lib/kin/service";
import { pageHead } from "@/lib/kin/queries";
import type { RevealedConnection } from "@/lib/kin/types";
import majaPortrait from "@/assets/maja.jpg";
export const Route = createFileRoute("/connections")({
  head: () =>
    pageHead(
      "Your connections",
      "Your mutually accepted synthetic KIN connections. Private until you both opt in.",
    ),
  component: Connections,
});
function Connections() {
  const [connections, setConnections] = useState<RevealedConnection[]>([]);
  const { refresh } = useDemo();
  useEffect(() => {
    let active = true;
    getConnections().then((items) => {
      if (active) setConnections(items);
    });
    return () => {
      active = false;
    };
  }, [refresh]);
  return (
    <AppShell>
      <div className="narrow-page">
        <p className="eyebrow text-primary">Not quite strangers anymore</p>
        <h1 className="font-display text-4xl font-medium mt-4">
          Your connections<span className="text-primary">.</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-3">A little curiosity brought you here.</p>
        {connections.length ? (
          <div className="mt-8 space-y-4">
            {connections.map((connection) => (
              <Link
                to="/chat/$id"
                params={{ id: connection.match.id }}
                key={connection.match.id}
                className="match-card grid grid-cols-[52px_minmax(0,1fr)_auto] gap-4 items-center"
              >
                {connection.user.id === "maja" ? (
                  <img
                    src={majaPortrait}
                    width={52}
                    height={52}
                    loading="lazy"
                    alt="Synthetic Maja profile"
                    className="size-[52px] rounded-full object-cover"
                  />
                ) : (
                  <div className="size-[52px] rounded-full bg-secondary grid place-items-center text-sm">
                    {connection.user.initials}
                  </div>
                )}
                <div className="min-w-0">
                  <h2 className="font-display text-lg">{connection.user.name}</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Possible {connection.match.relationship}
                  </p>
                  <span className="text-[10px] text-primary flex items-center gap-1 mt-2">
                    <Check size={10} />
                    Mutually connected
                  </span>
                </div>
                <MessageCircle size={20} className="text-primary" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto size-20 grid place-items-center rounded-full border border-border bg-secondary">
              <Layers2 size={30} strokeWidth={1.3} />
            </div>
            <h2 className="font-display text-2xl mt-7">Your story is still unfolding.</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[290px] mx-auto mt-3">
              Your connections will appear here once you both choose to say hello.
            </p>
            <Button asChild variant="kin" size="cta" className="mt-8">
              <Link to="/discover">
                Find a possible KIN <ArrowRight />
              </Link>
            </Button>
          </div>
        )}
        <div className="mt-10">
          <PrivacyLine />
        </div>
        <div className="mt-6">
          <DemoNote />
        </div>
      </div>
    </AppShell>
  );
}