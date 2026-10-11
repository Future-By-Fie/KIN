import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, LockKeyhole, Sparkles, ArrowRight } from "lucide-react";
import { AppShell, DemoNote } from "@/components/kin/shell";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/kin/queries";
export const Route = createFileRoute("/how-it-works")({
  head: () =>
    pageHead(
      "How it works",
      "Discover. Protect. Connect. KIN keeps identities private until mutual consent, with synthetic demo data only.",
    ),
  component: HowItWorks,
});
function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "DISCOVER",
      text: "KIN finds possible family connections nearby.",
      icon: Compass,
    },
    {
      number: "02",
      title: "PROTECT",
      text: "Identities stay hidden until both sides opt in.",
      icon: LockKeyhole,
    },
    {
      number: "03",
      title: "CONNECT",
      text: "Only mutual consent reveals the connection.",
      icon: Sparkles,
    },
  ];
  return (
    <AppShell back title="How it works">
      <div className="narrow-page">
        <p className="eyebrow text-primary">Possibility starts here</p>
        <h1 className="font-display text-4xl font-medium mt-4">
          A small world.
          <br />A bigger story.
        </h1>
        <div className="mt-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="grid grid-cols-[40px_minmax(0,1fr)_32px] gap-4 border-t border-border py-7"
            >
              <span className="text-muted-foreground font-display text-xl">{step.number}</span>
              <div>
                <h2 className="eyebrow text-primary">{step.title}</h2>
                <p className="text-sm leading-relaxed mt-3">{step.text}</p>
              </div>
              <step.icon size={25} className="text-muted-foreground" strokeWidth={1.3} />
            </div>
          ))}
        </div>
        <div className="border-y border-border py-5">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Demo uses synthetic data. Connection confidence is an illustrative score, not genetic
            evidence. KIN does not analyze DNA or confirm relatives.
          </p>
        </div>
        <Button asChild variant="kin" size="cta" className="w-full mt-8">
          <Link to="/enable">
            Find my KIN <ArrowRight />
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full mt-2 text-muted-foreground">
          <Link to="/privacy">
            Private by design <LockKeyhole />
          </Link>
        </Button>
        <div className="mt-5">
          <DemoNote />
        </div>
      </div>
    </AppShell>
  );
}