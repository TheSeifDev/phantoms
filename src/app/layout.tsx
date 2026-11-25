import type { Metadata, Viewport } from "next";
import { Caveat, DM_Serif_Display, IBM_Plex_Sans_Arabic, JetBrains_Mono, Manrope } from "next/font/google";
import { SiteProvider } from "@/components/site-provider";
import { MotionProvider } from "@/components/motion-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-script", display: "swap" });
const arabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], variable: "--font-arabic", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: { default: "Phantoms — Tech Beyond the Ordinary", template: "%s — Phantoms" },
  description: "Phantoms turns ambitious ideas into websites, apps and digital products people want to use. A close-knit product and technology team.",
  keywords: ["Phantoms", "software team", "web development", "mobile apps", "SaaS", "Egypt"],
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
  openGraph: {
    type: "website",
    siteName: "Phantoms",
    title: "Phantoms — Tech Beyond the Ordinary",
    description: "Ideas into reality. People, ideas, impact.",
    ...(siteUrl ? { url: siteUrl, images: [`${siteUrl.replace(/\/$/, "")}/images/phantoms-hero.webp`] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Phantoms — Tech Beyond the Ordinary",
    description: "Ideas into reality. People, ideas, impact.",
    ...(siteUrl ? { images: [`${siteUrl.replace(/\/$/, "")}/images/phantoms-hero.webp`] } : {}),
  },
};

export const viewport: Viewport = { themeColor: "#0b0b0c", colorScheme: "dark light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${manrope.variable} ${dmSerif.variable} ${caveat.variable} ${arabic.variable} ${mono.variable}`}>
        <SiteProvider>
          <MotionProvider>
            <SiteHeader />
            <main id="main-content">{children}</main>
            <SiteFooter />
          </MotionProvider>
        </SiteProvider>
      </body>
    </html>
  );
}
