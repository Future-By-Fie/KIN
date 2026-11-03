import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { initialPreferences, type Preferences } from "@/lib/kin/discovery";

type DemoValue = {
  preferences: Preferences;
  setPreference: (key: keyof Preferences, value: boolean) => void;
  stopDiscovery: () => void;
  refresh: number;
  updateConnections: () => void;
};
const DemoContext = createContext<DemoValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState(initialPreferences);
  const [refresh, setRefresh] = useState(0);
  const setPreference = useCallback(
    (key: keyof Preferences, value: boolean) => setPreferences((old) => ({ ...old, [key]: value })),
    [],
  );
  const stopDiscovery = useCallback(
    () => setPreferences((old) => ({ ...old, discovery: false })),
    [],
  );
  const updateConnections = useCallback(() => setRefresh((n) => n + 1), []);
  const value = useMemo(
    () => ({ preferences, setPreference, stopDiscovery, refresh, updateConnections }),
    [preferences, setPreference, stopDiscovery, refresh, updateConnections],
  );
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}
export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error("Demo provider is missing.");
  return value;
}