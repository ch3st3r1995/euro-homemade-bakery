// Astro 5+ content collections config: docs.astro.build/en/guides/content-collections/
// One collection per locale (not per page-type) so it maps 1:1 onto
// src/content/{en,uk,pl}/ as proposed in CLAUDE.md Section 3.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pageSchema = z.discriminatedUnion('page', [
  z.object({
    page: z.literal('home'),
    title: z.string(),
    description: z.string(),
    translated: z.boolean(),
    heroHeading: z.string(),
    heroSubheading: z.string(),
    // Department blurbs are structured frontmatter (not markdown body) so
    // each can feed its own DepartmentSection component independently --
    // a single collection entry only has one rendered body.
    departments: z.object({
      bakery: z.object({ heading: z.string(), description: z.string() }),
      deli: z.object({ heading: z.string(), description: z.string() }),
      grocery: z.object({ heading: z.string(), description: z.string() }),
    }),
  }),
  z.object({
    page: z.literal('about'),
    title: z.string(),
    description: z.string(),
    translated: z.boolean(),
  }),
  z.object({
    page: z.literal('catering'),
    title: z.string(),
    description: z.string(),
    translated: z.boolean(),
  }),
  z.object({
    page: z.literal('contact'),
    title: z.string(),
    description: z.string(),
    translated: z.boolean(),
  }),
  z.object({
    page: z.literal('promo'),
    title: z.string(),
    description: z.string(),
    translated: z.boolean(),
    promoTitle: z.string(),
    promoActive: z.boolean(),
  }),
]);

const en = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/en' }),
  schema: pageSchema,
});
const uk = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/uk' }),
  schema: pageSchema,
});
const pl = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pl' }),
  schema: pageSchema,
});

export const collections = { en, uk, pl };
