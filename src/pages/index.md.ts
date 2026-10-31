import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts');
  const articles = posts
    .filter((p) => !p.id.includes('_index'))
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const postLinks = articles
    .map((post) => {
      const slug = post.id.replace(/\.md$/, '');
      return `- [${post.data.title}](https://deardhruv.com/posts/${slug}/)`;
    })
    .join('\n\n');

  const markdown = `# Dhruv Patel - Lead Android Engineer

Dhruv Patel - Lead Android & Multiplatform Engineer with 14+ years of experience building sophisticated mobile solutions, on-device AI runtimes, and high-performance native architectures.

## Latest Posts

${postLinks}
`;

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8'
    }
  });
};
