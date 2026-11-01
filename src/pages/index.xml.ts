import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts');
  const articles = posts
    .filter((p) => !p.id.includes('_index'))
    .sort((a, b) => new Date(b.data.date || 0).getTime() - new Date(a.data.date || 0).getTime());

  const SITE_URL = 'https://deardhruv.com';

  const formatRfc822 = (d: string | Date | undefined) => {
    const date = d ? new Date(d) : new Date();
    return date.toUTCString();
  };

  const escapeXml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const xml = `<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Dhruv Patel (@DearDhruv) - Lead Android Engineer</title>
    <link>${SITE_URL}/</link>
    <description>Recent engineering articles, system designs, and on-device AI runtime writeups by Dhruv Patel (@DearDhruv).</description>
    <language>en-us</language>
    <managingEditor>dhruv.time@gmail.com (Dhruv Patel - @DearDhruv)</managingEditor>
    <webMaster>dhruv.time@gmail.com (Dhruv Patel - @DearDhruv)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/index.xml" rel="self" type="application/rss+xml"/>
${articles.map((post) => {
  const slug = post.id.replace(/\.md$/, '');
  const permalink = `${SITE_URL}/posts/${slug}/`;
  return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${permalink}</link>
      <pubDate>${formatRfc822(post.data.date)}</pubDate>
      <author>dhruv.time@gmail.com (Dhruv Patel)</author>
      <guid>${permalink}</guid>
      <description>${escapeXml(post.data.description || post.data.title)}</description>
    </item>`;
}).join('\n')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
};
