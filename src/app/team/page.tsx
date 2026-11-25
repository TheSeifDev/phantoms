import type { Metadata } from "next";
import { TeamPageContent } from "@/components/team-page-content";
import { routeMetadata } from "@/lib/seo";

export const metadata: Metadata = routeMetadata(
  "The Team — Phantoms",
  "Meet the people behind Phantoms and revisit moments from the team’s first chapter.",
  "/team",
);

export default function TeamPage() {
  return <TeamPageContent />;
}
