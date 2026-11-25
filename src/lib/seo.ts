import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export function routeMetadata(title: string, description: string, path: string): Metadata {
  const canonical = siteUrl ? `${siteUrl}${path === "/" ? "" : path}` : undefined;
  const image = siteUrl ? `${siteUrl}/images/phantoms-hero.webp` : undefined;

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: "website",
      siteName: "Phantoms",
      title,
      description,
      ...(canonical ? { url: canonical } : {}),
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
