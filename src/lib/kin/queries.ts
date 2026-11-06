import { queryOptions } from "@tanstack/react-query";
import { getCurrentUser, getNearbyKin, getKinMatch } from "./service";
export const nearbyQuery = queryOptions({ queryKey: ["nearby-kin"], queryFn: getNearbyKin });
export const userQuery = queryOptions({ queryKey: ["current-user"], queryFn: getCurrentUser });
export const matchQuery = (id: string) =>
  queryOptions({ queryKey: ["kin-match", id], queryFn: () => getKinMatch(id) });
export function pageHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} — KIN` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} — KIN` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  };
}