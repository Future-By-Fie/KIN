import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wordmark, DemoNote } from "@/components/kin/shell";
import { useDemo } from "@/components/kin/demo-context";
import { pageHead } from "@/lib/kin/queries";
export const Route = createFileRoute("/enable")({
  head: () =>
    pageHead(
      "Enable discovery",
      "Try approximate nearby discovery around a fictional Lund location. No real location is accessed.",
    ),
  component: Enable,
});
function Enable() {
  const { setPreference } = useDemo();
  return (
    <div className="intro page-enter">
      <header className="flex items-center justify-between p-7">
        <Button asChild variant="ghost" size="icon">
          <Link to="/" aria-label="Back">
            <ArrowLeft />
          </Link>
        </Button>
        <Wordmark />
      </header>
      <main className="intro-content">
        <div className="grid size-24 place-items-center rounded-full border border-primary/30 bg-primary/5 text-primary mb-9">
          <MapPin size={36} strokeWidth={1.3} />
        </div>
        <p className="eyebrow text-primary mb-4">Close, not exact.</p>
        <h1 className="intro-heading">
          Your world.
          <br />A little more connected.
        </h1>
        <p className="intro-support">
          KIN uses approximate location to discover possible connections nearby. Your exact location
          stays yours.
        </p>
        <div className="mt-7 flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck size={15} />
          Demo location: Lund, Sweden
        </div>
        <Button asChild variant="kin" size="cta" className="mt-9 w-full max-w-[300px]">
          <Link
            to="/discover"
            onClick={() => {
              setPreference("discovery", true);
              setPreference("location", true);
            }}
          >
            Enable discovery <ArrowRight />
          </Link>
        </Button>
        <Button asChild variant="ghost" className="mt-3 text-muted-foreground">
          <Link to="/discover" onClick={() => setPreference("discovery", false)}>
            Not now
          </Link>
        </Button>
      </main>
      <footer className="intro-foot">
        <p className="mb-3">Demo mode only. No location permission requested.</p>
        <DemoNote />
      </footer>
    </div>
  );
}