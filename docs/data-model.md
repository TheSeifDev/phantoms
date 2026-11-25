# Proposed future data model

**Status: documentation only.** This proposal does not connect to Neon, provision infrastructure, add a database client, or create/apply a migration. The current site remains a static-data demo. Do not connect or migrate a database now.

If a future change explicitly authorizes Neon, its scope is limited to durable **project** and **confirmed current member** content used by the public site. Contact inquiries are out of scope: do not create a contact-inquiry table, submit form details to Neon, or persist them elsewhere in the application.

## `projects`

A project record represents a confirmed portfolio item. Fields should retain the content already modeled in `src/data/site.ts` while separating stable identifiers from localized copy:

| Field | Proposed type | Notes |
| --- | --- | --- |
| `id` | UUID, primary key | Internal stable identifier. |
| `slug` | Text, unique, not null | Public route key; validate before publishing. |
| `number` | Text | Display sequence such as `01`; do not treat it as an ID. |
| `name` | Text, not null | Confirmed project name. |
| `category`, `status`, `summary`, `problem`, `approach`, `outcome` | JSONB `{ "en": string, "ar": string }` | Localized public copy; validate both locales and escape at render time. |
| `tags` | Text array | Public topic labels. |
| `tone` | Text / constrained enum | Presentation variant; currently `red`, `paper`, or `ink`. |
| `repository_url` | Nullable URL | Include only when the repository is confirmed and intended to be public. |
| `visuals` | JSONB array, optional | Public asset reference, localized alt text, visual kind, and optional visible label. Keep asset binaries outside Postgres. A `mockup` or `concept` kind must carry an explicit visible label such as “Mockup” or “Concept”; never imply it is a shipped screen. |
| `display_order` | Integer | Stable ordering independent of record IDs. |
| `is_published` | Boolean | Allows draft content to remain unpublished. |
| `created_at`, `updated_at` | Timestamptz | Set and maintain on the server. |

Only factual, confirmed projects and status claims should be published. Store no contact-form payloads or visitor data on project rows.

## `members`

A member record represents a person confirmed as a current team member. Do not seed records from archival group photos, inferred identities, or unverified biographies.

| Field | Proposed type | Notes |
| --- | --- | --- |
| `id` | UUID, primary key | Internal stable identifier. |
| `name` | Text, not null | Name approved for public display. |
| `role`, `bio` | JSONB `{ "en": string, "ar": string }` | Approved localized role and biography. |
| `github_username` | Nullable text | Optional exact username explicitly confirmed by that member. Validate its format; never infer it from a name. If present and the member approves avatar use, derive the GitHub avatar URL from that confirmed username rather than storing a guessed image URL. |
| `portrait_url` | Nullable URL | Optional approved portrait asset when no confirmed GitHub avatar is used; never point at archival team-memory photos as a current portrait. |
| `display_order` | Integer | Public page order. |
| `is_published` | Boolean | Publish only after the member details and image source are confirmed. |
| `created_at`, `updated_at` | Timestamptz | Set and maintain on the server. |

An absent username or portrait means show no invented avatar. Obtain approval for public name, biography, role, and avatar source before publishing.

## Secrets and runtime boundaries

If Neon is implemented later, `DATABASE_URL` must be supplied as a protected **runtime-only server secret**. Never commit it, put it in client code or `NEXT_PUBLIC_*`, expose it in build arguments, or print it in logs. Keep database access server-side and apply migrations only after separate authorization and review of the target environment. No secret, connection, or migration is required for the current Preview.

## Explicit exclusions

- Contact inquiries, names/emails submitted through the contact form, messages, and form submissions.
- Form drafts, browser storage, analytics-based form capture, and background submission.
- Unconfirmed member records, inferred GitHub usernames, or archival photos treated as current portraits.
- Mockups presented as shipped product screens or verified outcomes.
