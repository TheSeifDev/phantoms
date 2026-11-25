import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans_Arabic, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SiteProvider } from "@/components/site-provider";
import { MotionProvider } from "@/components/motion-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Archivo({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const arabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], variable: "--font-arabic", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const metadata: Metadata = {
  title: { default: "Phantoms — Build Beyond the Ordinary", template: "%s — Phantoms" },
  description: "An independent product and engineering collective. Phantoms builds websites, apps, and digital products through creative thinking and engineering precision.",
  keywords: ["Phantoms", "software team", "web development", "mobile apps", "SaaS", "Egypt"],
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: siteUrl } } : {}),
  openGraph: { type: "website", siteName: "Phantoms", title: "Phantoms — Build Beyond the Ordinary", description: "Creative thinking. Engineering precision. Ideas into reality.", ...(siteUrl ? { url: siteUrl, images: [`${siteUrl}/manus-storage/async-images/r6bfqbclDYhfD7A0g9gHFl/image-1.webp`] } : {}) },
  twitter: { card: "summary_large_image", title: "Phantoms — Build Beyond the Ordinary", description: "Creative thinking. Engineering precision.", ...(siteUrl ? { images: [`${siteUrl}/manus-storage/async-images/r6bfqbclDYhfD7A0g9gHFl/image-1.webp`] } : {}) },
};

export const viewport: Viewport = { themeColor: "#101112", colorScheme: "dark light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" dir="ltr" suppressHydrationWarning><body className={`${sans.variable} ${display.variable} ${arabic.variable} ${mono.variable}`}><SiteProvider><MotionProvider><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></MotionProvider></SiteProvider></body></html>;
}
