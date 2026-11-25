import type { Metadata } from "next";
import { WorkPageContent } from "@/components/work-page-content";
import { routeMetadata } from "@/lib/seo";

export const metadata: Metadata = routeMetadata(
  "Selected Work — Phantoms",
  "Explore Phantoms projects across health technology, SaaS and robotics, with the thinking behind each build.",
  "/work",
);

export default function WorkPage() {
  return <WorkPageContent />;
}
