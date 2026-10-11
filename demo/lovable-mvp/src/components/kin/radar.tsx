import { Link } from "@tanstack/react-router";
import { ScanFace } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { KinMatch } from "@/lib/kin/types";

const DECORATIVE_POINTS = ["a", "b", "c"];

export function Radar({
  decorative = false,
  paused = false,
  matches = [],
}: {
  decorative?: boolean;
  paused?: boolean;
  matches?: KinMatch[];
}) {
  const points = decorative
    ? DECORATIVE_POINTS.map((id) => ({ id, match: null }))
    : matches.slice(0, 3).map((match) => ({ id: match.id, match }));
  return (
    <div
      className="radar"
      role={decorative ? undefined : "group"}
      aria-label={decorative ? undefined : "Simulated nearby signals (synthetic demo data)"}
      aria-hidden={decorative || undefined}
    >
      <div className="radar-grid" />
      <div className="radar-ring" />
      <div className="radar-ring" />
      <div className="radar-ring" />
      <div className="radar-cross" />
      <div className="radar-cross vertical" />
      {!paused && (
        <>
          <div className="radar-pulse" />
          <div className="radar-pulse second" />
          <div className="radar-sweep" />
        </>
      )}
      <div className="radar-center">
        <ScanFace size={22} aria-hidden />
      </div>
      {!paused &&
        points.map(({ id, match }, index) => (
          <div key={id} className={`radar-point p${index + 1}`}>
            {match ? (
              <Button asChild className="signal-button">
                <Link
                  to="/match/$id"
                  params={{ id: match.id }}
                  aria-label={`Open possible ${match.relationship}, ${match.distance} away (demo)`}
                />
              </Button>
            ) : (
              <span className="signal-button block" />
            )}
            {index === 0 && match && (
              <span className="signal-tag" aria-hidden>
                Possible KIN <span className="text-primary ml-1">{match.distance}</span>
              </span>
            )}
          </div>
        ))}
      {!decorative && (
        <div className="radar-caption">
          {paused ? "Discovery is paused" : "LUND, SWEDEN"}
          <span className="mx-2">·</span>Simulated demo location
        </div>
      )}
    </div>
  );
}