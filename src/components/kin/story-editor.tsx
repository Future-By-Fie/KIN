import { useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
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
  moveStep,
  SOURCE_LABEL,
  SOURCES,
  STORY_LIMITS,
  validateStory,
  type StoryInput,
  type StoryStep,
} from "@/lib/kin/stories-store";

const blankStep = (): StoryStep => ({
  id: `s-${Date.now()}-${Math.round(Math.random() * 1e6)}`,
  from: "",
  to: "",
  when: "",
  note: "",
  source: "recollection",
});
export const emptyStory = (): StoryInput => ({ title: "", about: "", steps: [blankStep()] });

const SOURCE_CHOICE = {
  recollection: "I remember this",
  family_story: "Family story (passed down)",
  documented: "I have a document (not checked by KIN)",
} satisfies typeof SOURCE_LABEL;

export function StoryEditor({
  initial,
  isEdit,
  onClose,
  onSave,
}: {
  initial: StoryInput | null;
  isEdit: boolean;
  onClose: () => void;
  onSave: (s: StoryInput, alsoSave: boolean) => void;
}) {
  const [form, setForm] = useState<StoryInput | null>(initial);
  const [alsoSave, setAlsoSave] = useState(false);
  const [error, setError] = useState("");
  const [prev, setPrev] = useState(initial);
  if (prev !== initial) {
    setPrev(initial);
    setForm(initial);
    setAlsoSave(false);
    setError("");
  }
  const setStep = (i: number, patch: Partial<StoryStep>) =>
    form &&
    setForm({ ...form, steps: form.steps.map((s, j) => (j === i ? { ...s, ...patch } : s)) });

  return (
    <Dialog open={!!form} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit story" : "Start a story"}</DialogTitle>
          <DialogDescription>
            Only what you know. KIN adds nothing and verifies nothing.
          </DialogDescription>
        </DialogHeader>
        {form && (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              try {
                onSave(validateStory(form), alsoSave);
              } catch (err) {
                setError((err as Error).message);
              }
            }}
          >
            <div>
              <Label htmlFor="st-title">Title</Label>
              <Input
                id="st-title"
                required
                maxLength={STORY_LIMITS.title}
                placeholder="e.g. Grandma's road to Lund"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="st-about">Who it's about (optional)</Label>
              <Input
                id="st-about"
                maxLength={STORY_LIMITS.about}
                value={form.about}
                onChange={(e) => setForm({ ...form, about: e.target.value })}
              />
            </div>
            <ol className="space-y-3">
              {form.steps.map((st, i) => (
                <li key={st.id} className="rounded-xl border border-border p-3 space-y-2">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-medium flex-1">Step {i + 1}</p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Move step ${i + 1} up`}
                      disabled={i === 0}
                      onClick={() => setForm({ ...form, steps: moveStep(form.steps, i, -1) })}
                    >
                      <ArrowUp />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Move step ${i + 1} down`}
                      disabled={i === form.steps.length - 1}
                      onClick={() => setForm({ ...form, steps: moveStep(form.steps, i, 1) })}
                    >
                      <ArrowDown />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove step ${i + 1}`}
                      disabled={form.steps.length === 1}
                      onClick={() =>
                        setForm({ ...form, steps: form.steps.filter((_, j) => j !== i) })
                      }
                    >
                      <Trash2 />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`${st.id}-from`}>From</Label>
                      <Input
                        id={`${st.id}-from`}
                        list="kin-places"
                        maxLength={STORY_LIMITS.place}
                        value={st.from}
                        onChange={(e) => setStep(i, { from: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${st.id}-to`}>To</Label>
                      <Input
                        id={`${st.id}-to`}
                        list="kin-places"
                        maxLength={STORY_LIMITS.place}
                        value={st.to}
                        onChange={(e) => setStep(i, { to: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`${st.id}-when`}>When (optional)</Label>
                    <Input
                      id={`${st.id}-when`}
                      maxLength={STORY_LIMITS.when}
                      placeholder="e.g. around 1950"
                      value={st.when}
                      onChange={(e) => setStep(i, { when: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`${st.id}-note`}>Note (optional)</Label>
                    <Textarea
                      id={`${st.id}-note`}
                      maxLength={STORY_LIMITS.note}
                      value={st.note}
                      onChange={(e) => setStep(i, { note: e.target.value })}
                    />
                  </div>
                  <fieldset className="space-y-1">
                    <legend className="text-sm font-medium">Where does this come from?</legend>
                    {SOURCES.map((src) => (
                      <label key={src} className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name={`${st.id}-src`}
                          checked={st.source === src}
                          onChange={() => setStep(i, { source: src })}
                        />
                        {SOURCE_CHOICE[src]}
                      </label>
                    ))}
                  </fieldset>
                </li>
              ))}
            </ol>
            {form.steps.length < STORY_LIMITS.steps && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setForm({ ...form, steps: [...form.steps, blankStep()] })}
              >
                <Plus /> Add a step
              </Button>
            )}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={alsoSave}
                onChange={(e) => setAlsoSave(e.target.checked)}
              />
              Also save new places to My Origins
            </label>
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            <Button type="submit" variant="kin" className="w-full">
              Save story
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}