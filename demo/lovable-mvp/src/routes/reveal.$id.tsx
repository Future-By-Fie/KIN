import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Fingerprint,
  LoaderCircle,
  Check,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wordmark, DemoNote, PrivacyLine } from "@/components/kin/shell";
import { useDemo } from "@/components/kin/demo-context";
import {
  requestConnection,
  acceptConnection,
  cancelConnection,
  getRevealedConnection,
} from "@/lib/kin/service";
import { pageHead } from "@/lib/kin/queries";
import { canRequestReveal } from "@/lib/kin/discovery";
import type { RevealedConnection } from "@/lib/kin/types";
import majaPortrait from "@/assets/maja.jpg";
export const Route = createFileRoute("/reveal/$id")({
  head: () =>
    pageHead(
      "Meet your KIN",
      "A consent-first, synthetic reveal. Nothing is revealed until both sides choose to connect.",
    ),
  component: Reveal,
});
function Reveal() {
  const { id } = Route.useParams();
  const { preferences, updateConnections } = useDemo();
  const [stage, setStage] = useState<"private" | "waiting" | "accepted" | "revealed">("private");
  const [connection, setConnection] = useState<RevealedConnection | null>(null);
  const [error, setError] = useState("");
  const active = useRef(true);
  const requestStarted = useRef(false);
  const completed = useRef(false);
  useEffect(() => {
    active.current = true;
    getRevealedConnection(id).then((existing) => {
      if (active.current && existing) {
        completed.current = true;
        setConnection(existing);
        setStage("revealed");
      }
    });
    return () => {
      active.current = false;
      if (requestStarted.current && !completed.current) void cancelConnection(id);
    };
  }, [id]);
  async function connect() {
    if (stage !== "private") return;
    if (!canRequestReveal(preferences)) {
      setError("Discovery or connection requests are off. You can change this in Privacy.");
      return;
    }
    setStage("waiting");
    setError("");
    requestStarted.current = true;
    try {
      await requestConnection(id);
      await new Promise((resolve) => setTimeout(resolve, 1800));
      if (!active.current) return;
      const revealed = await acceptConnection(id);
      completed.current = true;
      setConnection(revealed);
      updateConnections();
      setStage("accepted");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (active.current) setStage("revealed");
    } catch (err) {
      if (active.current) {
        setError(err instanceof Error ? err.message : "Please try again.");
        setStage("private");
      }
    }
  }
  return (
    <div className="intro page-enter">
      <header className="flex items-center justify-between p-7 md:px-12">
        <Button asChild variant="ghost" size="icon">
          <Link to="/discover" aria-label="Keep private and return">
            <ArrowLeft />
          </Link>
        </Button>
        <Wordmark />
        <span className="demo-label text-primary">Demo</span>
      </header>
      <main className="intro-content">
        {stage !== "revealed" ? (
          <>
            <div className="reveal-network" aria-hidden>
              <div className="reveal-thread" />
              <div className="reveal-node left">
                <Fingerprint size={30} strokeWidth={1.2} />
              </div>
              <div className="reveal-node right">
                <Fingerprint size={30} strokeWidth={1.2} />
              </div>
            </div>
            {stage === "private" ? (
              <>
                <p className="eyebrow text-primary mb-5">A story you might share</p>
                <h1 className="intro-heading">
                  You may share
                  <br />a family connection.
                </h1>
                <p className="text-muted-foreground text-base leading-relaxed mt-7">
                  You don’t know who they are.
                  <br />
                  They don’t know who you are.
                </p>
                <p className="text-xs text-muted-foreground mt-5">
                  One choice each. A new beginning.
                </p>
                <Button
                  variant="kin"
                  size="cta"
                  className="w-full max-w-[300px] mt-9"
                  onClick={connect}
                >
                  Ask to connect <ArrowRight />
                </Button>
                <Button asChild variant="ghost" className="mt-3 text-muted-foreground">
                  <Link to="/discover">Keep it private</Link>
                </Button>
                {error && (
                  <p role="alert" className="text-sm text-primary mt-4 max-w-xs">
                    {error}{" "}
                    <Link to="/privacy" className="underline">
                      Privacy
                    </Link>
                  </p>
                )}
              </>
            ) : stage === "waiting" ? (
              <>
                <LoaderCircle aria-hidden className="text-primary animate-spin mb-5" size={28} />
                <h1 className="font-display text-3xl">
                  A little courage.
                  <br />A possible connection.
                </h1>
                <p role="status" className="text-sm text-muted-foreground mt-5">
                  Waiting for their choice…
                </p>
                <p className="text-[10px] text-muted-foreground mt-3">
                  Simulating the other person’s consent in this demo.
                </p>
                <Button asChild variant="ghost" className="mt-6">
                  <Link to="/discover">Cancel & keep private</Link>
                </Button>
              </>
            ) : (
              <>
                <div className="size-12 rounded-full bg-primary text-primary-foreground grid place-items-center mb-5">
                  <Check size={24} />
                </div>
                <h1 className="font-display text-4xl">Connection accepted</h1>
                <p className="text-muted-foreground mt-4">You both chose a little curiosity.</p>
              </>
            )}
          </>
        ) : (
          connection && (
            <div className="page-enter flex flex-col items-center">
              <p className="eyebrow text-primary mb-8 flex items-center gap-2">
                <Check size={14} />
                Connection accepted
              </p>
              {id === "maja" ? (
                <img
                  src={majaPortrait}
                  alt="Synthetic profile portrait of Maja"
                  className="portrait-reveal"
                  width={160}
                  height={160}
                />
              ) : (
                <div className="portrait-reveal grid place-items-center bg-secondary text-5xl font-display">
                  {connection.user.initials}
                </div>
              )}
              <p className="text-muted-foreground mt-8 text-sm">Meet your KIN</p>
              <h1 className="font-display text-5xl mt-3 font-medium">{connection.user.name}</h1>
              <p className="text-primary text-sm mt-4">Possible {connection.match.relationship}</p>
              <p className="text-muted-foreground text-xs mt-2">
                {connection.match.distance} away <span className="mx-2">·</span> Lund, Sweden
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[300px] mt-7">
                Maybe your stories have been connected
                <br />
                longer than you think.
              </p>
              <Button asChild variant="kin" size="cta" className="w-full mt-8">
                <Link to="/chat/$id" params={{ id }}>
                  Say hello <MessageCircle />
                </Link>
              </Button>
              <Button asChild variant="ghost" className="text-muted-foreground mt-2">
                <Link to="/connections">
                  Your connections <ArrowRight />
                </Link>
              </Button>
              <span className="text-[10px] text-muted-foreground mt-4">
                Fictional person · Synthetic relationship · Demo reveal
              </span>
            </div>
          )
        )}
      </main>
      <footer className="intro-foot">
        <div className="mb-4">
          <PrivacyLine />
        </div>
        <DemoNote />
      </footer>
    </div>
  );
}