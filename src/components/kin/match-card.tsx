import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Fingerprint, LockKeyhole } from "lucide-react";
import type { KinMatch } from "@/lib/kin/types";
export function MatchCard({ match, featured = false }: { match: KinMatch; featured?: boolean }) {
  return (
    <Link
      to="/match/$id"
      params={{ id: match.id }}
      className={`match-card ${featured ? "featured" : ""}`}
    >
      <div className="grid grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-3">
        <span className="match-symbol">
          <Fingerprint size={22} />
        </span>
        <div className="min-w-0">
          <h3 className="font-medium text-sm">Shared roots: {match.sharedOrigin}</h3>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Demo signal <span className="mx-1">·</span> Identity private
          </p>
        </div>
        <ArrowUpRight size={18} className="text-muted-foreground shrink-0" />
      </div>
      <p className="mt-4 text-[10px] text-muted-foreground flex items-center gap-1.5">
        <LockKeyhole size={10} />
        Shared origin, not proof of family
      </p>
    </Link>
  );
}