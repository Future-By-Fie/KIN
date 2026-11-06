import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { canEnter } from "@/lib/kin/age-gate";

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (options: unknown) => options,
  useNavigate: () => vi.fn(),
  Link: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));
vi.mock("@/components/kin/shell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DemoNote: () => <p>Demo data</p>,
}));

import { Route as Dna } from "@/routes/dna";
import { Route as Landing } from "@/routes/index";

const comp = (r: unknown) => (r as { component: React.ComponentType }).component;

describe("DNA concept page", () => {
  it("is behind the 18+ gate", () => {
    expect(canEnter("/dna", false)).toBe(false);
    expect(canEnter("/dna", true)).toBe(true);
  });
  it("says no provider is connected, shows no percentages, and consent cannot be turned on", () => {
    const Page = comp(Dna);
    const { container } = render(<Page />);
    expect(screen.getByText(/No DNA provider is connected/)).toBeTruthy();
    expect(container.textContent).not.toMatch(/%/);
    const switches = screen.getAllByRole("switch");
    expect(switches.length).toBeGreaterThan(0);
    for (const s of switches) {
      expect(s.getAttribute("aria-checked")).toBe("false");
      expect(s.hasAttribute("disabled")).toBe(true);
    }
  });
});

describe("Landing page", () => {
  it("leads with the locked tagline and labels demo points", () => {
    const Page = comp(Landing);
    const { container } = render(<Page />);
    expect(container.textContent).toContain("Discover where you come from.");
    expect(container.textContent).toContain("Connect with where you belong.");
    expect(container.textContent).toContain("Demo points");
    expect(container.textContent).toContain("v0.2");
  });
});