import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Radar } from "@/components/kin/radar";
import { pageHead } from "@/lib/kin/queries";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Discover connections before identities",
      "Maybe you’re not strangers. Explore KIN, a private social discovery concept using synthetic demo data.",
    ),
  component: Index,
});
function Index() {
  return (
    <div className="intro page-enter">
      <header className="flex justify-between items-center px-7 py-7 md:px-12">
        <span className="demo-label text-muted-foreground">A little closer than you think</span>
        <span className="demo-label text-primary">v0.1 / demo</span>
      </header>
      <div className="intro-art">
        <Radar decorative />
      </div>
      <main className="intro-content">
        <div className="flex items-center gap-2 border border-border rounded-full px-3 py-2 text-[10px] text-muted-foreground mb-8 bg-glass">
          <Sparkles size={12} className="text-primary" />
          Maybe you’re not strangers.
        </div>
        <h1 className="kin-wordmark intro-title">KIN</h1>
        <h2 className="intro-heading">
          Discover connections
          <br />
          before identities.
        </h2>
        <p className="intro-support">
          What if someone you passed today was already part of your story?
        </p>
        <Button asChild variant="kin" size="cta" className="mt-9 w-full max-w-[280px]">
          <Link to="/enable">
            Find my KIN <ArrowRight />
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
          Private by design <span>·</span> Synthetic demo data
        </p>
        <p className="mt-3 text-[9px]">
          A standalone KIN concept. No real DNA analysis or location tracking.
        </p>
      </footer>
    </div>
  );
}