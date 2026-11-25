"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("[app] A page failed to render.", error.digest); }, [error.digest]);
  return (
    <section className="not-found section-wrap">
      <span className="eyebrow"><i className="eyebrow__dot" />A MOMENT IN THE SHADOWS</span>
      <h1>Something<br /><em>slipped.</em></h1>
      <p>The page could not load this time. Try again, or return to the homepage.</p>
      <div className="error-actions"><button className="action-link action-link--secondary" onClick={() => reset()}>Try again</button><Link className="action-link action-link--primary" href="/"><span>Back home</span><ArrowUpRight size={17} /></Link></div>
    </section>
  );
}
