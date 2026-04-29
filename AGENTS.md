# AGENTS

## Project Overview

- This repo is an Astro 6 personal site deployed with the Cloudflare adapter.
- Runtime config lives in [astro.config.mjs](./astro.config.mjs) and [wrangler.toml](./wrangler.toml).
- Current content and routes live under [src/](./src/).
- [hugo-backup/](./hugo-backup/) is legacy source material from the previous Hugo site. Do not edit it unless the task explicitly targets the backup.

## Build And Validation

- Use `pnpm` for package management. The repo has a [pnpm-lock.yaml](./pnpm-lock.yaml) lockfile.
- Required Node version is `>=22.12.0` in [package.json](./package.json).
- Main commands:
  - `pnpm dev` starts the Astro dev server.
  - `pnpm build` builds the site and is the default validation step after changes.
  - `pnpm preview` previews the built site locally.
- Prefer `pnpm build` as the final check for content, page, layout, or config edits.

## Architecture

- Content schema is defined in [src/content.config.ts](./src/content.config.ts).
- Blog posts are Markdown files in [src/content/posts](./src/content/posts).
- Shared page shell and metadata live in [src/layouts/BaseLayout.astro](./src/layouts/BaseLayout.astro).
- Reusable UI components live in [src/components](./src/components).
- Primary routes:
  - [src/pages/index.astro](./src/pages/index.astro) shows non-draft, non-archived posts sorted by newest first.
  - [src/pages/archive.astro](./src/pages/archive.astro) shows non-draft archived posts.
  - [src/pages/post/[...slug].astro](./src/pages/post/[...slug].astro) renders individual posts.
  - [src/pages/tags/[tag].astro](./src/pages/tags/[tag].astro) builds tag landing pages from post frontmatter.
  - [src/pages/rss.xml.js](./src/pages/rss.xml.js) emits the RSS feed from non-draft, non-archived posts.

## Content Conventions

- Post frontmatter must satisfy the `posts` collection schema:
  - required: `title`, `date`
  - optional: `description`, `author`, `tags`, `image`, `archived`, `draft`
- `date` must be parseable by `z.coerce.date()`.
- Default author is `Ovieh Mosley` when omitted.
- Use `draft: true` to hide a post from public listings.
- Use `archived: true` to move a post off the homepage and into the archive while keeping it published.
- Tags drive the generated tag pages automatically. Update frontmatter tags instead of creating manual tag route files.

## Editing Guidance

- Preserve the current Astro structure unless the task requires a larger reorganization.
- Keep metadata changes consistent with the existing SEO fields in [src/layouts/BaseLayout.astro](./src/layouts/BaseLayout.astro).
- Follow the existing design tokens in [src/styles/global.css](./src/styles/global.css) instead of introducing one-off colors, spacing, or font stacks.
- The site currently uses DM Sans for body text and Fira Code for code.
- When changing post listing behavior, update all affected surfaces together: homepage, archive, tags, and RSS if applicable.
- When editing post routes or content loading, verify assumptions against [src/content.config.ts](./src/content.config.ts) and the relevant page files rather than the starter [README.md](./README.md), which is not project-specific documentation.

## Deployment Notes

- Astro is configured with `output: 'server'` and the Cloudflare adapter in [astro.config.mjs](./astro.config.mjs).
- Wrangler serves built assets from `./dist` as configured in [wrangler.toml](./wrangler.toml).
- If deployment-related files change, run `pnpm build` before proposing any deploy step.