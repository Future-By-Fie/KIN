import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PreferenceRow } from "./preference-row";

describe("PreferenceRow accessibility", () => {
  it("exposes the switch by its visible label and toggles it", () => {
    const onChange = vi.fn();
    render(<PreferenceRow label="Ancestry / relationship signals" description="Synthetic only." checked onChange={onChange} />);
    const toggle = screen.getByRole("switch", { name: "Ancestry / relationship signals" });
    expect(toggle).toHaveAccessibleDescription("Synthetic only.");
    fireEvent.click(toggle);
    expect(onChange).toHaveBeenCalledWith(false);
  });
});