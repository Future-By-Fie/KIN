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
import { OriginsMap } from "@/components/kin/origins-map";
import { StoryEditor, emptyStory } from "@/components/kin/story-editor";
import { StoryTimeline } from "@/components/kin/story-timeline";
import {
  loadStories,
  newPlacesFrom,
  removeStory,
  saveStory,
  type Story,
  type StoryInput,
} from "@/lib/kin/stories-store";
import { KNOWN_PLACES } from "@/lib/kin/places";
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
  const [view, setView] = useState<"map" | "list" | "stories">("map");
  const [stories, setStories] = useState<Story[]>([]);
  const [storyEdit, setStoryEdit] = useState<{ id?: string; form: StoryInput } | null>(null);
  const [storyRemoving, setStoryRemoving] = useState<Story | null>(null);
  useEffect(() => {
    setList(loadOrigins(localStorage));
    setStories(loadStories(localStorage));
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
        <Link
          to="/dna"
          className="mt-4 block rounded-xl border border-border bg-glass px-4 py-3 text-sm hover:border-primary/40"
        >
          <span className="font-medium">DNA</span>{" "}
          <span className="eyebrow text-muted-foreground">Optional · coming later</span>
          <span className="block text-xs text-muted-foreground mt-1">
            How DNA could enrich your origins. No provider connected.
          </span>
        </Link>

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

        <div
          className="mt-6 inline-flex rounded-full border border-border p-0.5 text-xs"
          role="group"
          aria-label="View"
        >
          {(["map", "list", "stories"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`rounded-full px-3 py-1 capitalize ${view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              {v}
            </button>
          ))}
        </div>
        {view === "map" && (
          <OriginsMap
            list={list}
            onSelect={(o) => {
              setError("");
              setEditing({ id: o.id, form: { ...o } });
            }}
          />
        )}

        {view === "stories" && (
          <div className="mt-6 space-y-4">
            {stories.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Tell how your family moved. Only what you know — KIN adds nothing.
              </p>
            )}
            {stories.map((st) => (
              <StoryTimeline
                key={st.id}
                story={st}
                origins={list}
                onEdit={() => setStoryEdit({ id: st.id, form: { ...st } })}
                onRemove={() => setStoryRemoving(st)}
              />
            ))}
            <Button
              variant="kin"
              size="cta"
              className="w-full"
              onClick={() => setStoryEdit({ form: emptyStory() })}
            >
              <Plus /> Start a story
            </Button>
          </div>
        )}

        <ul className={`mt-6 space-y-3 ${view !== "list" ? "hidden" : ""}`}>
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
        {list.length === 0 && view === "list" && (
          <p className="mt-6 text-sm text-muted-foreground">
            No places yet. Nothing is shared with anyone.
          </p>
        )}
        <Button
          variant="kin"
          size="cta"
          className={`mt-6 w-full ${view === "stories" ? "hidden" : ""}`}
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

      <datalist id="kin-places">
        {KNOWN_PLACES.map((k) => (
          <option key={k.name} value={k.name} />
        ))}
      </datalist>
      <StoryEditor
        initial={storyEdit?.form ?? null}
        isEdit={!!storyEdit?.id}
        onClose={() => setStoryEdit(null)}
        onSave={(form, alsoSave) => {
          setStories(saveStory(localStorage, form, storyEdit?.id));
          if (alsoSave) {
            let next = list;
            for (const place of newPlacesFrom(form, list))
              next = addOrigin(
                localStorage,
                { place, country: "", era: "", story: "", provenance: "self_reported" },
                `o-${Date.now()}-${next.length}`,
              );
            setList(next);
          }
          setStoryEdit(null);
        }}
      />
      <AlertDialog open={!!storyRemoving} onOpenChange={(o) => !o && setStoryRemoving(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete “{storyRemoving?.title}”?</AlertDialogTitle>
            <AlertDialogDescription>
              This deletes the story from this browser. Your origins stay.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (storyRemoving) setStories(removeStory(localStorage, storyRemoving.id));
                setStoryRemoving(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
                  list="kin-places"
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