import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useId, useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Wordmark, DemoNote } from "@/components/kin/shell";
import { setAttested } from "@/lib/kin/age-gate";
import { pageHead } from "@/lib/kin/queries";

export const Route = createFileRoute("/welcome")({
  head: () =>
    pageHead("Welcome — 18+", "KIN is for adults only. Confirm you are 18 or older to continue."),
  component: Welcome,
});

function Welcome() {
  const [checked, setChecked] = useState(false);
  const [left, setLeft] = useState(false);
  const navigate = useNavigate();
  const id = useId();
  if (left)
    return (
      <div className="intro page-enter">
        <main className="intro-content">
          <Wordmark large />
          <h1 className="intro-heading mt-8">KIN is for adults.</h1>
          <p className="intro-support">
            You need to be 18 or older to use KIN. Thanks for stopping by.
          </p>
          <Button variant="ghost" className="mt-6" onClick={() => setLeft(false)}>
            Back
          </Button>
        </main>
      </div>
    );
  return (
    <div className="intro page-enter">
      <main className="intro-content">
        <Wordmark large />
        <p className="eyebrow text-primary mt-8 mb-3">18+ only</p>
        <h1 className="intro-heading">Before we begin.</h1>
        <p className="intro-support">
          KIN is for adults. We don't ask for your birth date. This is a simple self-confirmation,
          not identity or age verification.
        </p>
        <label
          htmlFor={id}
          className="mt-8 flex items-center gap-3 rounded-xl border border-border bg-glass px-4 py-3 text-sm cursor-pointer"
        >
          <Checkbox id={id} checked={checked} onCheckedChange={(v) => setChecked(v === true)} />I am
          18 or older
        </label>
        <Button
          variant="kin"
          size="cta"
          className="mt-6 w-full max-w-[300px]"
          disabled={!checked}
          onClick={() => {
            setAttested(window.localStorage, true);
            void navigate({ to: "/origins" });
          }}
        >
          Continue <ArrowRight />
        </Button>
        <Button
          variant="ghost"
          className="mt-3 text-muted-foreground"
          onClick={() => {
            setAttested(window.localStorage, false);
            setChecked(false);
            setLeft(true);
          }}
        >
          I'm under 18 — leave
        </Button>
      </main>
      <footer className="intro-foot">
        <p className="mb-3 flex items-center justify-center gap-2">
          <ShieldCheck size={12} aria-hidden /> Saved in this browser only.{" "}
          <Link to="/privacy" className="underline">
            Privacy
          </Link>
        </p>
        <DemoNote />
      </footer>
    </div>
  );
}