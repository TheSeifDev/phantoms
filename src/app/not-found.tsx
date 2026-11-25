import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="not-found section-wrap">
      <span className="eyebrow"><i className="eyebrow__dot" />404 / OFF THE MAP</span>
      <h1>Nothing here.<br /><em>Yet.</em></h1>
      <p>This page may have moved, or it might still be an idea.</p>
      <Link className="action-link action-link--primary" href="/"><span>Back to Phantoms</span><ArrowUpRight size={17} /></Link>
    </section>
  );
}
