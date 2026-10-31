import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts');
  // Filter out section indices
  const articles = posts
    .filter((p) => !p.id.includes('_index'))
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const jsonFeed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Dhruv Patel - Lead Android Engineer',
    home_page_url: 'https://deardhruv.com/',
    feed_url: 'https://deardhruv.com/index.json',
    description:
      'Dhruv Patel - Lead Android & Multiplatform Engineer with 14+ years of experience building sophisticated mobile solutions, on-device AI runtimes, and high-performance native architectures.',
    author: {
      name: 'Dhruv Patel',
      url: 'https://deardhruv.com/'
    },
    items: articles.map((post) => {
      const slug = post.id.replace(/\.md$/, '');
      const permalink = `https://deardhruv.com/posts/${slug}/`;

      // Format ISO string with timezone or standard ISO
      const formatIso = (val: string | Date | undefined) => {
        if (!val) return '';
        if (typeof val === 'string') return val;
        return val.toISOString();
      };

      return {
        id: permalink,
        url: permalink,
        title: post.data.title,
        summary: post.data.description || '',
        date_published: formatIso(post.data.date),
        date_modified: formatIso(post.data.lastmod || post.data.date),
        tags: post.data.tags || []
      };
    })
  };

  return new Response(JSON.stringify(jsonFeed, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8'
    }
  });
};
