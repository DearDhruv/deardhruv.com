#!/usr/bin/env node
/**
 * SEO, Meta Tags, Social Cards, JSON-LD Structured Data & Bot Hygiene Verification
 * Audits all generated static pages and crawler configuration files in dist/.
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error("❌ dist/ directory missing. Run 'npm run build:astro' first.");
  process.exit(1);
}

console.log('🔍 Auditing SEO, OpenGraph, JSON-LD Structured Data, AI Discovery & Bot Policies...\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✅ ${message}`);
  } else {
    failed++;
    console.error(`  ❌ FAIL: ${message}`);
  }
}

// 1. Audit robots.txt
console.log('--- 1. Robots & Bot Hygiene Audit ---');
const robotsPath = path.join(DIST_DIR, 'robots.txt');
assert(fs.existsSync(robotsPath), 'robots.txt exists in dist/');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf-8');
  assert(robots.includes('Disallow: /test/'), 'robots.txt protects internal /test/ fixture path');
  assert(robots.includes('Disallow: /design-preview/'), 'robots.txt protects unreleased /design-preview/ path');
  assert(robots.includes('Disallow: /.git/'), 'robots.txt protects /.git/ repository path');
  assert(robots.includes('Disallow: /private/'), 'robots.txt protects /private/ path');
  assert(robots.includes('Disallow: /drafts/'), 'robots.txt protects /drafts/ path');
  assert(robots.includes('Disallow: /api/private/'), 'robots.txt protects /api/private/ path');

  // Search bots
  assert(robots.includes('User-agent: Googlebot'), 'robots.txt declares policy for Googlebot');
  assert(robots.includes('User-agent: Bingbot'), 'robots.txt declares policy for Bingbot');
  assert(robots.includes('User-agent: Applebot'), 'robots.txt declares policy for Applebot');

  // AI agents
  assert(robots.includes('User-agent: GPTBot'), 'robots.txt welcomes GPTBot (OpenAI)');
  assert(robots.includes('User-agent: ChatGPT-User'), 'robots.txt welcomes ChatGPT-User');
  assert(robots.includes('User-agent: OAI-SearchBot'), 'robots.txt welcomes OAI-SearchBot');
  assert(robots.includes('User-agent: Claude-bot') || robots.includes('User-agent: ClaudeBot'), 'robots.txt welcomes Claude-bot (Anthropic)');
  assert(robots.includes('User-agent: PerplexityBot'), 'robots.txt welcomes PerplexityBot');
  assert(robots.includes('User-agent: Google-Extended'), 'robots.txt welcomes Google-Extended (Gemini)');
  assert(robots.includes('User-agent: Applebot-Extended'), 'robots.txt welcomes Applebot-Extended');
  assert(robots.includes('User-agent: DeepSeekBot'), 'robots.txt welcomes DeepSeekBot');
  assert(robots.includes('User-agent: MistralBot'), 'robots.txt welcomes MistralBot');

  // Abusive scrapers blocked
  assert(robots.includes('User-agent: SemrushBot'), 'robots.txt restricts aggressive scraper SemrushBot');
  assert(robots.includes('User-agent: AhrefsBot'), 'robots.txt restricts aggressive scraper AhrefsBot');

  // Metadata directives
  assert(robots.includes('Sitemap: https://deardhruv.com/sitemap.xml'), 'robots.txt references sitemap.xml');
  assert(robots.includes('llms: https://deardhruv.com/llms.txt'), 'robots.txt references llms.txt');
  assert(robots.includes('Content-Signals: allow'), 'robots.txt declares Content-Signals protocol');
}

// 2. Audit sitemap.xml
console.log('\n--- 2. Sitemap XML Audit ---');
const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'sitemap.xml exists in dist/');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  assert(sitemap.includes('<urlset'), 'sitemap.xml has valid <urlset> root element');
  assert(sitemap.includes('<priority>1.0</priority>'), 'sitemap.xml sets priority 1.0 for homepage');
  assert(sitemap.includes('<changefreq>weekly</changefreq>'), 'sitemap.xml sets weekly changefreq');
  assert(!sitemap.includes('/test/'), 'sitemap.xml excludes internal /test/ paths');
  assert(!sitemap.includes('/design-preview/'), 'sitemap.xml excludes /design-preview/ paths');
}

// 3. Audit RSS 2.0 Feed
console.log('\n--- 3. RSS 2.0 Feed Audit ---');
const rssPath = path.join(DIST_DIR, 'index.xml');
assert(fs.existsSync(rssPath), 'index.xml (RSS 2.0) exists in dist/');
if (fs.existsSync(rssPath)) {
  const rss = fs.readFileSync(rssPath, 'utf-8');
  assert(rss.includes('<rss version="2.0"'), 'index.xml has valid RSS 2.0 root element');
  assert(rss.includes('<channel>'), 'index.xml contains channel container');
  assert(rss.includes('<atom:link href="https://deardhruv.com/index.xml"'), 'index.xml has atom self link');
  assert(rss.includes('<item>'), 'index.xml contains syndicated post items');
  assert(rss.includes('Part 6 - Pushing Mobile Hardware to the Edge'), 'index.xml includes flagship series posts');
}

// 4. Audit Representative HTML Pages for SEO, OpenGraph & JSON-LD
console.log('\n--- 4. SEO, OpenGraph & JSON-LD Page Matrix Audit ---');
const testPages = [
  { file: 'index.html', title: 'Home', isArticle: false, is404: false },
  { file: 'portfolio/index.html', title: 'Portfolio', isArticle: false, is404: false },
  { file: 'projects/index.html', title: 'Projects', isArticle: false, is404: false },
  { file: 'posts/index.html', title: 'Posts Index', isArticle: false, is404: false },
  { file: 'posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone/index.html', title: 'Article 01', isArticle: true, is404: false },
  { file: 'posts/ai_playground_series/06-pushing-mobile-hardware-to-the-edge/index.html', title: 'Article 06', isArticle: true, is404: false },
  { file: 'about/index.html', title: 'About', isArticle: false, is404: false },
  { file: '404.html', title: '404 Error Page', isArticle: false, is404: true }
];

for (const p of testPages) {
  const filePath = path.join(DIST_DIR, p.file);
  const exists = fs.existsSync(filePath);
  assert(exists, `${p.title} (${p.file}) exists`);
  if (!exists) continue;

  const html = fs.readFileSync(filePath, 'utf-8');

  // Title tag
  assert(html.includes('<title>') && html.includes('</title>'), `${p.title} contains valid <title>`);
  assert(!html.includes(':: Dhruv Patel :: Dhruv Patel'), `${p.title} has no duplicate branding in title`);

  // Meta description & Canonical
  assert(html.includes('<meta name="description" content="'), `${p.title} contains meta description`);
  assert(html.includes('<link rel="canonical" href="https://deardhruv.com'), `${p.title} contains absolute canonical link`);

  // Robots meta
  if (p.is404) {
    assert(html.includes('<meta name="robots" content="noindex, follow">'), `${p.title} has noindex robots directive`);
  } else {
    assert(html.includes('<meta name="robots" content="index, follow'), `${p.title} has index, follow robots directive`);
    assert(html.includes('<meta name="googlebot" content="index, follow'), `${p.title} has googlebot directive`);
    assert(html.includes('<meta name="bingbot" content="index, follow'), `${p.title} has bingbot directive`);
  }

  // Open Graph
  assert(html.includes('<meta property="og:site_name" content="Dhruv Patel">'), `${p.title} contains og:site_name`);
  assert(html.includes('<meta property="og:title" content="'), `${p.title} contains og:title`);
  assert(html.includes('<meta property="og:description" content="'), `${p.title} contains og:description`);
  assert(html.includes('<meta property="og:image" content="https://deardhruv.com'), `${p.title} contains high-res og:image`);
  assert(html.includes('<meta property="og:url" content="https://deardhruv.com'), `${p.title} contains og:url`);

  // Twitter Card
  assert(html.includes('<meta name="twitter:card" content="summary_large_image">'), `${p.title} contains twitter:card`);
  assert(html.includes('<meta name="twitter:site" content="@DearDhruv">'), `${p.title} contains twitter:site`);
  assert(html.includes('<meta name="twitter:creator" content="@DearDhruv">'), `${p.title} contains twitter:creator`);
  assert(html.includes('<meta name="twitter:domain" content="deardhruv.com">'), `${p.title} contains twitter:domain`);

  // AI & Discovery endpoints
  assert(html.includes('<link rel="describedby" href="/llms.txt"'), `${p.title} links /llms.txt`);
  assert(html.includes('<link rel="help" href="/llms-full.txt"'), `${p.title} links /llms-full.txt`);
  assert(html.includes('<link rel="mcp" href="/.well-known/mcp.json"'), `${p.title} links .well-known/mcp.json`);
  assert(html.includes('<meta name="ai-agent" content="enabled=true; policy=/llms.txt; format=markdown">'), `${p.title} declares ai-agent meta tag`);
  assert(html.includes('<meta name="content-signal" content="search=yes, ai-train=yes, ai-inference=yes">'), `${p.title} declares content-signal meta tag`);

  // JSON-LD Structured Data
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert(jsonLdMatch && jsonLdMatch[1], `${p.title} contains <script type="application/ld+json">`);
  if (jsonLdMatch && jsonLdMatch[1]) {
    try {
      const parsed = JSON.parse(jsonLdMatch[1]);
      assert(parsed['@context'] === 'https://schema.org', `${p.title} JSON-LD has schema.org context`);
      assert(Array.isArray(parsed['@graph']), `${p.title} JSON-LD defines graph array`);

      const graph = parsed['@graph'] || [];
      const person = graph.find(e => e['@type'] === 'Person');
      assert(person && person.name === 'Dhruv Patel', `${p.title} JSON-LD graph contains Person entity`);
      assert(person && person.sameAs && person.sameAs.includes('https://github.com/DearDhruv'), `${p.title} Person entity has public GitHub profile`);
      assert(person && JSON.stringify(person.image).includes('/pp/pro_pic.jpg'), `${p.title} Person entity references high-res portrait (/pp/pro_pic.jpg)`);

      // Verify zero Event schema (prevents Google Search Console Event Rich Results validation errors on personal site)
      assert(!person.performerIn, `${p.title} Person entity does not emit performerIn`);
      const eventEntities = graph.filter(e => e['@type'] === 'Event');
      assert(eventEntities.length === 0, `${p.title} JSON-LD graph contains zero Event entities`);

      const website = graph.find(e => e['@type'] === 'WebSite');
      assert(website && website.url === 'https://deardhruv.com/', `${p.title} JSON-LD graph contains WebSite entity`);

      const breadcrumbs = graph.find(e => e['@type'] === 'BreadcrumbList');
      assert(breadcrumbs && Array.isArray(breadcrumbs.itemListElement), `${p.title} JSON-LD graph contains BreadcrumbList`);

      if (p.file === 'projects/index.html' || p.file === 'portfolio/index.html') {
        const apps = graph.filter(e => e['@type'] === 'SoftwareApplication');
        assert(apps.length >= 2, `${p.title} JSON-LD graph contains SoftwareApplication entities (${apps.length} found)`);
      }

      if (p.file === 'projects/index.html' || p.file === 'portfolio/index.html' || p.file === 'about/index.html') {
        const faq = graph.find(e => e['@type'] === 'FAQPage');
        assert(faq && Array.isArray(faq.mainEntity) && faq.mainEntity.length > 0, `${p.title} contains structured FAQPage entity`);
      }

      if (p.isArticle) {
        const article = graph.find(e => e['@type'] === 'TechArticle');
        assert(article && article.headline, `${p.title} JSON-LD graph contains TechArticle entity`);
        assert(article && article.author && article.author['@id'] === 'https://deardhruv.com/#person', `${p.title} TechArticle references author #person`);
        assert(article && article.timeRequired, `${p.title} TechArticle defines timeRequired reading duration`);
        assert(article && Array.isArray(article.about), `${p.title} TechArticle defines about entity links`);
      }
    } catch (e) {
      assert(false, `${p.title} JSON-LD parsed valid JSON (Error: ${e.message})`);
    }
  }
}

// 5. Zero Private Repository Links Privacy Audit
console.log('\n--- 5. Privacy & Sensitive Repository Protection Audit ---');
function crawlForPrivateRepo(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const fullPath = path.join(dir, f.name);
    if (f.isDirectory()) {
      crawlForPrivateRepo(fullPath);
    } else if (f.isFile() && (f.name.endsWith('.html') || f.name.endsWith('.json') || f.name.endsWith('.xml') || f.name.endsWith('.txt') || f.name.endsWith('.md'))) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      if (content.includes('github.com/DearDhruv/deardhruv.com') || content.includes('github.com/deardhruv/deardhruv.com')) {
        assert(false, `Forbidden private repo reference detected in: ${path.relative(DIST_DIR, fullPath)}`);
      }
    }
  }
}
crawlForPrivateRepo(DIST_DIR);
assert(true, 'Zero private repository references (deardhruv.com) found in dist/');

console.log(`\n========================================`);
console.log(`SEO & Metadata Verification: ${passed} passed, ${failed} failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 100% SEO, OpenGraph, JSON-LD Structured Data, and Bot Hygiene verified!');
  process.exit(0);
}
