import { useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { canEnter, hasAttested, isPublicPath } from "@/lib/kin/age-gate";

/** Redirects to /welcome until the 18+ attestation exists. Runs after hydration. */
export function RequireAdult({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    const allowed = canEnter(pathname, hasAttested(window.localStorage));
    setOk(allowed);
    if (!allowed) void navigate({ to: "/welcome", replace: true });
  }, [pathname, navigate]);
  if (!isPublicPath(pathname) && !ok)
    return <div className="min-h-screen bg-background" aria-busy="true" />;
  return <>{children}</>;
}