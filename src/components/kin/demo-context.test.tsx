import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { DemoProvider, useDemo } from "./demo-context";
import { initialPreferences } from "@/lib/kin/discovery";

describe("Demo preferences reset", () => {
  it("restores every prototype preference without retaining previous changes", () => {
    const { result } = renderHook(() => useDemo(), { wrapper: DemoProvider });
    act(() => {
      for (const key of Object.keys(initialPreferences) as (keyof typeof initialPreferences)[])
        result.current.setPreference(key, !initialPreferences[key]);
    });
    expect(result.current.preferences).toEqual({
      discovery: false,
      location: false,
      notifications: false,
      ancestry: false,
      consent: false,
    });
    act(() => result.current.resetPreferences());
    expect(result.current.preferences).toEqual(initialPreferences);
  });
});