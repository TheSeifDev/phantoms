import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact-page-content";
import { routeMetadata } from "@/lib/seo";

export const metadata: Metadata = routeMetadata(
  "Start a Project — Phantoms",
  "Tell Phantoms about your website, app or SaaS idea and start a focused project conversation.",
  "/contact",
);

export default function ContactPage() {
  return <ContactPageContent />;
}
