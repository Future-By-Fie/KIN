import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Cake, Pencil, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AppShell, DemoNote } from "@/components/kin/shell";
import { pageHead } from "@/lib/kin/queries";
import {
  addOrigin,
  ENTRY_LABEL,
  LIMITS,
  loadOrigins,
  removeOrigin,
  updateOrigin,
  type OriginEntry,
  type OriginInput,
} from "@/lib/kin/origins-store";

export const Route = createFileRoute("/origins")({
  head: () =>
    pageHead("My Origins", "Your places and family stories, stored only in this browser."),
  component: Origins,
});

const empty: OriginInput = {
  place: "",
  country: "",
  era: "",
  story: "",
  provenance: "self_reported",
};
const DAY_KEY = "kin.kinday.dismissed";

function Origins() {
  const [list, setList] = useState<OriginEntry[]>([]);
  const [editing, setEditing] = useState<{ id?: string; form: OriginInput } | null>(null);
  const [removing, setRemoving] = useState<OriginEntry | null>(null);
  const [error, setError] = useState("");
  const [showDay, setShowDay] = useState(false);
  useEffect(() => {
    setList(loadOrigins(localStorage));
    setShowDay(localStorage.getItem(DAY_KEY) !== "1");
  }, []);
  const save = () => {
    if (!editing) return;
    try {
      setList(
        editing.id
          ? updateOrigin(localStorage, editing.id, editing.form)
          : addOrigin(localStorage, editing.form),
      );
      setEditing(null);
    } catch (e) {
      setError((e as Error).message);
    }
  };
  const set = (k: keyof OriginInput, v: string) =>
    editing && setEditing({ ...editing, form: { ...editing.form, [k]: v } });

  return (
    <AppShell>
      <section className="px-5 py-6 max-w-lg mx-auto">
        <p className="eyebrow text-primary">My Origins</p>
        <h1 className="font-display text-3xl font-medium mt-1">Where your story begins.</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Stored only in this browser. Not verified.
        </p>

        {showDay && (
          <div className="mt-5 rounded-2xl border border-primary/30 bg-primary/5 p-4 flex gap-3">
            <Cake className="text-primary shrink-0" size={20} aria-hidden />
            <div className="flex-1">
              <p className="font-medium">Your 18th birthday. Your first KIN day.</p>
              <Link to="/kin-day" className="text-xs text-primary underline">
                Open KIN day
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Dismiss KIN day"
              onClick={() => {
                localStorage.setItem(DAY_KEY, "1");
                setShowDay(false);
              }}
            >
              <X />
            </Button>
          </div>
        )}

        <ul className="mt-6 space-y-3">
          {list.map((o) => (
            <li key={o.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-display text-lg">
                    {o.place}
                    {o.country && `, ${o.country}`}
                  </p>
                  {o.era && <p className="text-xs text-muted-foreground">{o.era}</p>}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Edit ${o.place}`}
                  onClick={() => {
                    setError("");
                    setEditing({ id: o.id, form: { ...o } });
                  }}
                >
                  <Pencil />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove ${o.place}`}
                  onClick={() => setRemoving(o)}
                >
                  <Trash2 />
                </Button>
              </div>
              {o.story && <p className="text-sm mt-2 whitespace-pre-wrap">{o.story}</p>}
              <span
                className={`mt-3 inline-block rounded-full border px-2 py-0.5 text-[11px] ${o.provenance === "documented" ? "border-signal/40 text-signal" : "border-border text-muted-foreground"}`}
              >
                {ENTRY_LABEL[o.provenance]}
              </span>
            </li>
          ))}
        </ul>
        {list.length === 0 && (
          <p className="mt-6 text-sm text-muted-foreground">
            No places yet. Nothing is shared with anyone.
          </p>
        )}
        <Button
          variant="kin"
          size="cta"
          className="mt-6 w-full"
          onClick={() => {
            setError("");
            setEditing({ form: empty });
          }}
        >
          <Plus /> Add an origin
        </Button>
        <div className="mt-8">
          <DemoNote />
        </div>
      </section>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit origin" : "Add an origin"}</DialogTitle>
            <DialogDescription>Only you see this. KIN doesn't verify it.</DialogDescription>
          </DialogHeader>
          {editing && (
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                save();
              }}
            >
              <div>
                <Label htmlFor="o-place">Place</Label>
                <Input
                  id="o-place"
                  required
                  maxLength={LIMITS.place}
                  value={editing.form.place}
                  onChange={(e) => set("place", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="o-country">Region or country</Label>
                <Input
                  id="o-country"
                  maxLength={LIMITS.country}
                  value={editing.form.country}
                  onChange={(e) => set("country", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="o-era">Era (optional)</Label>
                <Input
                  id="o-era"
                  maxLength={LIMITS.era}
                  placeholder="e.g. 1920s"
                  value={editing.form.era}
                  onChange={(e) => set("era", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="o-story">Short story (optional)</Label>
                <Textarea
                  id="o-story"
                  maxLength={LIMITS.story}
                  value={editing.form.story}
                  onChange={(e) => set("story", e.target.value)}
                />
                <p className="text-[11px] text-muted-foreground text-right">
                  {editing.form.story.length}/{LIMITS.story}
                </p>
              </div>
              <fieldset className="space-y-2">
                <legend className="text-sm font-medium">Where does this come from?</legend>
                {(["self_reported", "documented"] as const).map((p) => (
                  <label key={p} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="prov"
                      checked={editing.form.provenance === p}
                      onChange={() => set("provenance", p)}
                    />
                    {p === "self_reported"
                      ? "Family memory / I added it"
                      : "I have a document (not checked by KIN)"}
                  </label>
                ))}
              </fieldset>
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              <Button type="submit" variant="kin" className="w-full">
                Save
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!removing} onOpenChange={(o) => !o && setRemoving(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {removing?.place}?</AlertDialogTitle>
            <AlertDialogDescription>This deletes it from this browser.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (removing) setList(removeOrigin(localStorage, removing.id));
                setRemoving(null);
              }}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  );
}