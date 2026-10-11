import { useId } from "react";
import { Switch } from "@/components/ui/switch";

export function PreferenceRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="settings-row">
      <div className="min-w-0">
        <label className="text-sm font-medium cursor-pointer" htmlFor={id}>
          {label}
        </label>
        <p id={`${id}-desc`} className="text-xs text-muted-foreground leading-relaxed mt-2">
          {description}
        </p>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        aria-describedby={`${id}-desc`}
      />
    </div>
  );
}