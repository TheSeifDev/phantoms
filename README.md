# Phantoms Landing

A bilingual, responsive team and studio website for Phantoms. The public site is English-first with an Arabic/RTL switch and dark/light themes. Phase one excludes paid products, courses and checkout.

The current design is a full rebuild: bold technical sans typography, graphite/off-white surfaces, a restrained vermilion signal and one original metallic hero image. It replaces the rejected paper-collage/serif direction. The home page presents each featured project once, a capability accordion, an interactive build-process selector and a compact profile/archive section. Interior pages share the new responsive editorial system. Reference research and design interpretation are recorded in [the redesign notes](docs/redesign-references.md).

## Stack

- Next.js App Router, TypeScript and Tailwind CSS 4
- GSAP, ScrollTrigger and Lenis for progressive motion
- Node.js 22 and pnpm 11.25.0
- Neon Postgres is a future option for project and confirmed team-member records only; it is not connected in this demo.

## Run locally

```sh
pnpm install
pnpm dev
```

The site and its contact-page preview work without a database or database environment variables. No `.env.local` setup is needed for this demo. Set a real `NEXT_PUBLIC_SITE_URL` only after the production domain is confirmed; without it, the app omits guessed canonical and absolute social URLs.

## Contact-page demo

The contact form validates values in the browser only. Submitting it displays **“Preview only—your inquiry has not been sent or saved”** (with an Arabic equivalent); it makes no network request, writes no record, and does not use local storage. The visitor can explicitly copy the generated brief to the clipboard or download it as a `.txt` file. Neither action sends the inquiry to Phantoms.

No email address or other contact channel is configured by this repository. Do not invent one or imply that an inquiry has reached the team.

## Future data model

There is no active Neon connection or migration to run. If database work is authorized later, Neon is scoped to **projects and confirmed current team members only**—never contact inquiries. See [the proposed data model](docs/data-model.md) for fields, avatar provenance, mockup labeling, and runtime-secret boundaries. Do not connect, provision, or migrate a database as part of running this demo.

## Content and assets

- `src/data/site.ts` contains the current static service and project copy. `src/data/team.ts` contains the confirmed GitHub profile for Seif Ayman (`TheSeifDev`) and three anonymous, visibly labeled profile mockups; remaining real member accounts and details are still required.
- Add only confirmed current team names, biographies and portrait paths. A GitHub avatar may be derived only from a member's explicitly confirmed GitHub username; never infer a username or reuse archive portraits as current-member portraits.
- `public/images/` contains the site mark and compressed images supplied for the archive. The generated hero is included locally at `public/manus-storage/async-images/r6bfqbclDYhfD7A0g9gHFl/image-1.webp`, matching its unchanged project-storage URL, so static GitHub copies load the same artwork. The old team photos are memories, not portraits for the incoming team.
- Rafiq, OMNI and Dashboard concept mockups use unchanged project-managed `/manus-storage/` URLs and are visibly labeled. Exact copies of the completed assets are also included under `public/manus-storage/`, so the same paths work in a standalone GitHub clone and static export without relying on the Preview proxy.
- Any project mockup or concept visual must be visibly labeled as a **mockup** or **concept**. Do not present a mockup as a shipped product screen or evidence of completed functionality.

## Public pages

`/`, `/work`, `/work/[slug]`, `/services`, `/team`, `/contact`, `/flagship/rafiq`, and `/flagship/omni`. Unknown case-study slugs return a real 404.
