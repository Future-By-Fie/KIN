import { Link } from "@tanstack/react-router";
import { ArrowLeft, Compass, Sprout, Settings2, UserRound, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function Wordmark({ large = false }: { large?: boolean }) {
  return <span className={`kin-wordmark ${large ? "text-5xl" : "text-[32px]"}`}>KIN</span>;
}
export function DemoNote() {
  return (
    <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
      Demo data: all people, places and origin signals are synthetic.
    </p>
  );
}
export function AppShell({
  children,
  back = false,
  title,
}: {
  children: ReactNode;
  back?: boolean;
  title?: string;
}) {
  return (
    <div className="app-shell">
      <header className="app-header grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="flex min-w-0 items-center gap-4">
          {back ? (
            <Button asChild variant="ghost" size="icon">
              <Link to="/origins" aria-label="Back to My Origins">
                <ArrowLeft />
              </Link>
            </Button>
          ) : (
            <Link to="/origins" aria-label="KIN home, My Origins">
              <Wordmark />
            </Link>
          )}
          {title ? (
            <span className="font-display text-lg font-medium truncate">{title}</span>
          ) : (
            <span className="desktop-only text-xs text-muted-foreground border-l border-border pl-4">
              Maybe you’re not strangers.
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <span className="demo-label text-primary desktop-only">● Demo mode</span>
          <Button asChild variant="ghost" size="icon">
            <Link to="/settings" aria-label="Settings">
              <Settings2 className="text-muted-foreground" />
            </Link>
          </Button>
          <Link
            to="/profile"
            aria-label="Your profile"
            className="grid size-8 place-items-center rounded-full bg-secondary border border-border text-xs font-medium"
          >
            A
          </Link>
        </div>
      </header>
      <main className="page-enter">{children}</main>
      <nav className="bottom-nav" aria-label="Main navigation">
        <Link to="/origins">
          <Sprout size={20} aria-hidden />
          <span>Origins</span>
        </Link>
        <Link to="/discover">
          <Compass size={20} aria-hidden />
          <span>Connect</span>
        </Link>
        <Link to="/profile">
          <UserRound size={20} />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
}
export function PrivacyLine() {
  return (
    <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
      <ShieldCheck size={13} />
      <span>Nothing is revealed until you both choose it.</span>
    </div>
  );
}