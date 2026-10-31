import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.union([z.string(), z.date()]).optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    series: z.array(z.string()).optional().default([]),
    aliases: z.array(z.string()).optional().default([]),
    layout: z.string().optional(),
    draft: z.boolean().optional().default(false),
    author: z.object({
      name: z.string().optional()
    }).optional()
  })
});

const other = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/other' }),
  schema: z.object({
    title: z.string(),
    date: z.union([z.string(), z.date()]).optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    layout: z.string().optional(),
    draft: z.boolean().optional().default(false),
    author: z.object({
      name: z.string().optional()
    }).optional()
  })
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './content' }),
  schema: z.object({
    title: z.string(),
    date: z.union([z.string(), z.date()]).optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    aliases: z.array(z.string()).optional().default([]),
    layout: z.string().optional(),
    draft: z.boolean().optional().default(false),
    author: z.object({
      name: z.string().optional()
    }).optional()
  })
});

export const collections = { posts, other, pages };
