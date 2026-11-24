import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { AGE_KEY, canEnter } from "@/lib/kin/age-gate";

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (options: unknown) => options,
  useNavigate: () => vi.fn(),
  Link: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

import { Route } from "@/routes/welcome";

describe("Under-18 exit", () => {
  it("withdraws a previous adult attestation and blocks feature access", () => {
    localStorage.setItem(AGE_KEY, "yes");
    const Welcome = (Route as unknown as { component: React.ComponentType }).component;
    render(<Welcome />);
    fireEvent.click(screen.getByRole("button", { name: "I'm under 18 — leave" }));
    expect(localStorage.getItem(AGE_KEY)).toBeNull();
    expect(canEnter("/origins", localStorage.getItem(AGE_KEY) === "yes")).toBe(false);
  });
});