const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const siteOrigin = 'https://deardhruv.com';

const routes = [
  // Core pages
  { path: '/', file: 'index.html', category: 'core', type: 'text/html; charset=utf-8' },
  { path: '/about/', file: 'about/index.html', category: 'core', type: 'text/html; charset=utf-8' },
  { path: '/portfolio/', file: 'portfolio/index.html', category: 'core', type: 'text/html; charset=utf-8' },
  { path: '/projects/', file: 'projects/index.html', category: 'core', type: 'text/html; charset=utf-8' },
  { path: '/posts/', file: 'posts/index.html', category: 'writing', type: 'text/html; charset=utf-8' },
  { path: '/sitemap/', file: 'sitemap/index.html', category: 'utility', type: 'text/html; charset=utf-8' },

  // Series & Articles
  { path: '/posts/ai_playground_series/', file: 'posts/ai_playground_series/index.html', category: 'series', type: 'text/html; charset=utf-8' },
  { path: '/posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone/', file: 'posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone/index.html', category: 'article', type: 'text/html; charset=utf-8' },
  { path: '/posts/ai_playground_series/02-the-day-a-chat-box-became-a-document-engine/', file: 'posts/ai_playground_series/02-the-day-a-chat-box-became-a-document-engine/index.html', category: 'article', type: 'text/html; charset=utf-8' },
  { path: '/posts/ai_playground_series/03-the-model-was-fine-the-phone-wasnt/', file: 'posts/ai_playground_series/03-the-model-was-fine-the-phone-wasnt/index.html', category: 'article', type: 'text/html; charset=utf-8' },
  { path: '/posts/ai_playground_series/04-i-put-an-image-generator-inside-the-phone/', file: 'posts/ai_playground_series/04-i-put-an-image-generator-inside-the-phone/index.html', category: 'article', type: 'text/html; charset=utf-8' },
  { path: '/posts/ai_playground_series/05-at-some-point-i-stopped-building-a-chat-app/', file: 'posts/ai_playground_series/05-at-some-point-i-stopped-building-a-chat-app/index.html', category: 'article', type: 'text/html; charset=utf-8' },
  { path: '/posts/ai_playground_series/06-pushing-mobile-hardware-to-the-edge/', file: 'posts/ai_playground_series/06-pushing-mobile-hardware-to-the-edge/index.html', category: 'article', type: 'text/html; charset=utf-8' },

  // Policy & Utility
  { path: '/other/', file: 'other/index.html', category: 'policy', type: 'text/html; charset=utf-8' },
  { path: '/other/ai-playground/', file: 'other/ai-playground/index.html', category: 'policy', type: 'text/html; charset=utf-8' },
  { path: '/other/ai-playground/privacy-policy-ai-playground-app/', file: 'other/ai-playground/privacy-policy-ai-playground-app/index.html', category: 'policy', type: 'text/html; charset=utf-8' },
  { path: '/other/ai-playground/terms-ai-playground-app/', file: 'other/ai-playground/terms-ai-playground-app/index.html', category: 'policy', type: 'text/html; charset=utf-8' },
  { path: '/other/open-store-app/', file: 'other/open-store-app/index.html', category: 'policy', type: 'text/html; charset=utf-8' },
  { path: '/other/open-store-app/privacy-policy-open-store-app/', file: 'other/open-store-app/privacy-policy-open-store-app/index.html', category: 'policy', type: 'text/html; charset=utf-8' },
  { path: '/other/open-store-app/terms-open-store-app/', file: 'other/open-store-app/terms-open-store-app/index.html', category: 'policy', type: 'text/html; charset=utf-8' },
  { path: '/other/veloci-hue/', file: 'other/veloci-hue/index.html', category: 'policy', type: 'text/html; charset=utf-8' },
  { path: '/other/veloci-hue/privacy-policy-veloci-hue-game/', file: 'other/veloci-hue/privacy-policy-veloci-hue-game/index.html', category: 'policy', type: 'text/html; charset=utf-8' },
  { path: '/other/veloci-hue/terms-veloci-hue/', file: 'other/veloci-hue/terms-veloci-hue/index.html', category: 'policy', type: 'text/html; charset=utf-8' },

  // Aliases
  { path: '/about-us/', file: 'about-us/index.html', category: 'alias', type: 'text/html; charset=utf-8' },
  { path: '/about-hugo/', file: 'about-hugo/index.html', category: 'alias', type: 'text/html; charset=utf-8' },
  { path: '/contact/', file: 'contact/index.html', category: 'alias', type: 'text/html; charset=utf-8' },
  { path: '/design-preview/', file: 'design-preview/index.html', category: 'internal', type: 'text/html; charset=utf-8' },
  { path: '/404.html', file: '404.html', category: 'error', type: 'text/html; charset=utf-8' },

  // Feeds, Discovery, APIs & Static
  { path: '/resume.pdf', file: 'resume.pdf', category: 'asset', type: 'application/pdf' },
  { path: '/sitemap.xml', file: 'sitemap.xml', category: 'sitemap', type: 'application/xml; charset=utf-8' },
  { path: '/index.json', file: 'index.json', category: 'feed', type: 'application/feed+json; charset=utf-8' },
  { path: '/feed.json', file: 'index.json', category: 'redirect', type: 'application/feed+json; charset=utf-8' },
  { path: '/index.md', file: 'index.md', category: 'agent-discovery', type: 'text/markdown; charset=utf-8' },
  { path: '/index.xml', file: 'index.xml', category: 'feed', type: 'application/rss+xml; charset=utf-8' },
  { path: '/llms.txt', file: 'llms.txt', category: 'agent-discovery', type: 'text/markdown; charset=utf-8' },
  { path: '/llms-full.txt', file: 'llms-full.txt', category: 'agent-discovery', type: 'text/markdown; charset=utf-8' },
  { path: '/ai.txt', file: 'ai.txt', category: 'agent-discovery', type: 'text/plain; charset=utf-8' },
  { path: '/auth.md', file: 'auth.md', category: 'agent-discovery', type: 'text/markdown; charset=utf-8' },
  { path: '/.well-known/mcp.json', file: '.well-known/mcp.json', category: 'agent-protocol', type: 'application/json; charset=utf-8' },
  { path: '/.well-known/api-catalog', file: '.well-known/api-catalog', category: 'agent-protocol', type: 'application/linkset+json; charset=utf-8' },
  { path: '/.well-known/oauth-protected-resource', file: '.well-known/oauth-protected-resource', category: 'agent-protocol', type: 'application/json' },
  { path: '/.well-known/oauth-authorization-server', file: '.well-known/oauth-authorization-server', category: 'agent-protocol', type: 'application/json' },
  { path: '/.well-known/openid-configuration', file: '.well-known/openid-configuration', category: 'agent-protocol', type: 'application/json' }
];

const csvRows = ['url,route_path,file_path,http_status,content_type,canonical,indexability,title,word_count,category'];

for (const r of routes) {
  const filePath = path.join(distDir, r.file);
  const exists = fs.existsSync(filePath);
  let status = exists ? 200 : 404;
  if (r.path === '/404.html') status = 404;
  if (r.category === 'redirect') status = 200; // Netlify rewrite to index.json

  let canonical = siteOrigin + r.path;
  let indexability = 'indexable';
  let title = '';
  let wordCount = 0;

  if (exists && r.file.endsWith('.html')) {
    const html = fs.readFileSync(filePath, 'utf-8');
    const tMatch = html.match(/<title>([^<]*)<\/title>/);
    if (tMatch) title = tMatch[1].replace(/"/g, '""');

    const cMatch = html.match(/<link rel="canonical" href="([^"]*)"/);
    if (cMatch) canonical = cMatch[1];

    if (html.includes('content="noindex') || r.category === 'alias' || r.category === 'error' || r.category === 'internal') {
      indexability = 'noindex';
    }

    const bodyMatch = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/);
    if (bodyMatch) {
      const text = bodyMatch[1].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                               .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                               .replace(/<[^>]+>/g, ' ')
                               .replace(/\s+/g, ' ')
                               .trim();
      wordCount = text ? text.split(/\s+/).length : 0;
    }
  } else if (exists && (r.file.endsWith('.txt') || r.file.endsWith('.md'))) {
    const text = fs.readFileSync(filePath, 'utf-8');
    wordCount = text.trim().split(/\s+/).length;
    title = path.basename(r.file);
  } else if (exists && r.file.endsWith('.json')) {
    title = path.basename(r.file);
    indexability = 'noindex';
  } else if (exists && r.file.endsWith('.pdf')) {
    title = 'Dhruv Patel Professional Resume';
    indexability = 'indexable';
  } else if (exists && r.file.endsWith('.xml')) {
    title = path.basename(r.file);
    indexability = 'noindex';
  }

  csvRows.push(`"${siteOrigin + r.path}","${r.path}","${r.file}",${status},"${r.type}","${canonical}","${indexability}","${title}",${wordCount},"${r.category}"`);
}

const outPath = path.resolve(__dirname, '..', 'docs', 'audit', 'baseline-2026-11-01', 'url-inventory.csv');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, csvRows.join('\n'));
console.log('Saved URL inventory to:', outPath);
console.log('Inventoried items:', csvRows.length - 1);
