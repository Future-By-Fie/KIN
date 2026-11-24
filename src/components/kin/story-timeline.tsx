import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OriginsMap } from "@/components/kin/origins-map";
import { locate, MAP_COPY } from "@/lib/kin/places";
import type { OriginEntry } from "@/lib/kin/origins-store";
import { SOURCE_LABEL, STORY_FOOTER, type Story } from "@/lib/kin/stories-store";

/** Read view of one story, in the user's own order. Plain text only. */
export function StoryTimeline({
  story,
  origins,
  onEdit,
  onRemove,
}: {
  story: Story;
  origins: OriginEntry[];
  onEdit: () => void;
  onRemove: () => void;
}) {
  const [onMap, setOnMap] = useState(false);
  const unmapped = [
    ...new Set(story.steps.flatMap((s) => [s.from, s.to]).filter((p) => p && !locate(p))),
  ];
  return (
    <article className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <h2 className="font-display text-lg">{story.title}</h2>
          {story.about && <p className="text-xs text-muted-foreground">About: {story.about}</p>}
        </div>
        <Button variant="ghost" size="icon" aria-label={`Edit ${story.title}`} onClick={onEdit}>
          <Pencil />
        </Button>
        <Button variant="ghost" size="icon" aria-label={`Delete ${story.title}`} onClick={onRemove}>
          <Trash2 />
        </Button>
      </div>
      <ol className="story-timeline mt-4 ml-1 space-y-4">
        {story.steps.map((s) => (
          <li key={s.id} className="story-step relative pl-4" data-src={s.source}>
            <p className="text-sm font-medium">
              {s.from && s.to && s.from !== s.to
                ? `${s.from} → ${s.to}`
                : s.from === s.to
                  ? `Stayed in ${s.from}`
                  : s.from || s.to}
            </p>
            {s.when && <p className="text-xs text-muted-foreground">{s.when}</p>}
            {s.note && <p className="text-sm mt-1 whitespace-pre-wrap">{s.note}</p>}
            <span
              className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[11px] ${s.source === "documented" ? "border-signal/40 text-signal" : "border-border text-muted-foreground"}`}
            >
              {SOURCE_LABEL[s.source]}
            </span>
          </li>
        ))}
      </ol>
      <label className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <input type="checkbox" checked={onMap} onChange={(e) => setOnMap(e.target.checked)} />
        Show on map
      </label>
      {onMap && <OriginsMap list={origins} story={story} onSelect={() => {}} />}
      {unmapped.length > 0 && (
        <p className="text-xs text-muted-foreground mt-2">
          {MAP_COPY.unmapped}: {unmapped.join(", ")}
        </p>
      )}
      <p className="text-[11px] text-muted-foreground mt-3">{STORY_FOOTER}</p>
    </article>
  );
}