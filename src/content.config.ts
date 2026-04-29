import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    author: z.string().default('Ovieh Mosley'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    archived: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
