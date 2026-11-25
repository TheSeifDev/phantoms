import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/services-page-content";
import { routeMetadata } from "@/lib/seo";

export const metadata: Metadata = routeMetadata(
  "Services — Web, Apps & SaaS",
  "From product thinking and design to launch, Phantoms builds websites, apps and SaaS products for real people.",
  "/services",
);

export default function ServicesPage() {
  return <ServicesPageContent />;
}
