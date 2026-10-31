import type { APIRoute } from 'astro';

const SITE_URL = 'https://deardhruv.com';

const routes = [
  { path: '/', lastmod: '2026-10-21T15:30:00+05:30' },
  { path: '/about/', lastmod: '2022-08-03T00:00:00+00:00' },
  { path: '/portfolio/', lastmod: '2026-06-11T00:00:00+00:00' },
  { path: '/projects/', lastmod: '2026-10-21T00:00:00+00:00' },
  { path: '/posts/', lastmod: '2026-10-21T15:30:00+05:30' },
  { path: '/posts/ai_playground_series/', lastmod: '2026-10-21T00:00:00+00:00' },
  { path: '/posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone/', lastmod: '2026-10-05T10:00:00+05:30' },
  { path: '/posts/ai_playground_series/02-the-day-a-chat-box-became-a-document-engine/', lastmod: '2026-10-05T11:00:00+05:30' },
  { path: '/posts/ai_playground_series/03-the-model-was-fine-the-phone-wasnt/', lastmod: '2026-10-05T12:00:00+05:30' },
  { path: '/posts/ai_playground_series/04-i-put-an-image-generator-inside-the-phone/', lastmod: '2026-10-05T13:00:00+05:30' },
  { path: '/posts/ai_playground_series/05-at-some-point-i-stopped-building-a-chat-app/', lastmod: '2026-10-05T14:00:00+05:30' },
  { path: '/posts/ai_playground_series/06-pushing-mobile-hardware-to-the-edge/', lastmod: '2026-10-21T15:30:00+05:30' },
  { path: '/sitemap/', lastmod: '2026-10-21T00:00:00+00:00' },
  { path: '/other/', lastmod: '2026-07-02T00:00:00+00:00' },
  { path: '/other/ai-playground/', lastmod: '2026-07-02T00:00:00+00:00' },
  { path: '/other/ai-playground/privacy-policy-ai-playground-app/', lastmod: '2026-07-02T00:00:00+00:00' },
  { path: '/other/ai-playground/terms-ai-playground-app/', lastmod: '2026-07-02T00:00:00+00:00' },
  { path: '/other/open-store-app/', lastmod: '2026-05-29T00:00:00+00:00' },
  { path: '/other/open-store-app/privacy-policy-open-store-app/', lastmod: '2026-05-29T00:00:00+00:00' },
  { path: '/other/open-store-app/terms-open-store-app/', lastmod: '2026-05-29T00:00:00+00:00' },
  { path: '/other/veloci-hue/', lastmod: '2026-04-19T00:00:00+00:00' },
  { path: '/other/veloci-hue/privacy-policy-veloci-hue-game/', lastmod: '2026-04-19T00:00:00+00:00' },
  { path: '/other/veloci-hue/terms-veloci-hue/', lastmod: '2026-04-19T00:00:00+00:00' }
];

export const GET: APIRoute = () => {
  const xml = `<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes.map(r => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
