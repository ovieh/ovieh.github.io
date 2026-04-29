# ovieh.com

Personal site and writing portfolio for Ovieh Mosley, built with Astro and deployed on Cloudflare.

The site combines a portfolio, long-form technical writing, archived bootcamp-era posts, and project pages under the `ovieh.com` domain.

## Stack

- Astro 6
- Cloudflare adapter for Astro
- Cloudflare Workers / Wrangler deployment
- Markdown content collections for posts
- RSS generation via `@astrojs/rss`

## Requirements

- Node.js `>=22.12.0`
- `pnpm`

## Getting Started

Install dependencies:

```sh
pnpm install
```

Start the local development server:

```sh
pnpm dev
```

Create a production build:

```sh
pnpm build
```

Preview the production build locally:

```sh
pnpm preview
```

## Project Structure

```text
/
├── public/                  # Static assets
├── src/
│   ├── components/          # Shared UI pieces like header, footer, and post cards
│   ├── content/posts/       # Markdown blog posts
│   ├── layouts/             # Shared page shell and metadata
│   ├── pages/               # Route files
│   ├── styles/              # Global styling and design tokens
│   └── content.config.ts    # Content collection schema
├── astro.config.mjs         # Astro config and canonical site URL
├── wrangler.toml            # Cloudflare deployment config
└── hugo-backup/             # Legacy Hugo source, kept for reference
```

## Content Model

Posts live in `src/content/posts` and use the `posts` collection defined in `src/content.config.ts`.

Supported frontmatter fields:

- `title` (required)
- `date` (required)
- `description`
- `author`
- `tags`
- `image`
- `draft`
- `archived`

Content behavior:

- `draft: true` keeps a post out of public listings and static post generation.
- `archived: true` keeps a post published, but removes it from the homepage and RSS feed.
- Tags automatically generate tag pages.

## Main Routes

- `/` shows current, non-draft, non-archived writing.
- `/archive` shows archived posts.
- `/projects` highlights selected projects and experiments.
- `/about` presents background and positioning.
- `/post/[slug]` renders individual posts.
- `/tags/[tag]` renders tag archives.
- `/rss.xml` exposes the RSS feed for current writing.

## Deployment

The site is configured for Cloudflare deployment.

- Canonical site URL is set in `astro.config.mjs`.
- Worker and static asset settings live in `wrangler.toml`.
- Build output is written to `dist/`.

If you change layout, content loading, metadata, or deployment configuration, run:

```sh
pnpm build
```

Deploy with Wrangler after a successful build and after confirming Cloudflare configuration for the target environment.

## Notes

- `README.md` documents the project for contributors.
- `AGENTS.md` contains editing and repo-specific guidance for coding agents.
- `hugo-backup/` is legacy source material and should not be edited unless the task explicitly targets the old Hugo site.
