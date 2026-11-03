import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppShell, DemoNote } from "@/components/kin/shell";
import { pageHead } from "@/lib/kin/queries";

export const Route = createFileRoute("/kin-day")({
  head: () =>
    pageHead(
      "Your first KIN day",
      "Your 18th birthday. Your first KIN day. A quiet moment to start your story.",
    ),
  component: KinDay,
});

function KinDay() {
  return (
    <AppShell back title="KIN day">
      <section className="px-6 py-10 max-w-lg mx-auto text-center">
        <p className="eyebrow text-primary mb-4">Optional milestone</p>
        <h1 className="intro-heading">
          Your 18th birthday.
          <br />
          Your first KIN day.
        </h1>
        <p className="intro-support mt-4">
          A moment to ask where your story begins. Add a place your family comes from, or just a
          memory. Nothing is shared, and Radar stays off until you choose otherwise.
        </p>
        <Button asChild variant="kin" size="cta" className="mt-8 w-full max-w-[300px]">
          <Link to="/origins">
            Add my first origin <ArrowRight />
          </Link>
        </Button>
        <div className="mt-10">
          <DemoNote />
        </div>
      </section>
    </AppShell>
  );
}