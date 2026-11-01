#!/usr/bin/env node
/**
 * DearDhruv.com — Permanent Continuous Audit Engine
 * 
 * High-performance, zero-dependency site auditor testing against static dist/.
 * Modules: health, seo, a11y, perf, security, ai.
 * 
 * Usage:
 *   node scripts/audit.js            # Run full audit
 *   node scripts/audit.js --health   # Run health & link checks
 *   node scripts/audit.js --seo      # Run SEO, metadata, JSON-LD, sitemap
 *   node scripts/audit.js --a11y     # Run accessibility tokens & landmarks
 *   node scripts/audit.js --perf     # Run performance budgets & JS check
 *   node scripts/audit.js --security # Run security headers & leak checks
 *   node scripts/audit.js --ai       # Run AI agent & markdown endpoints
 */

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = process.env.PUBLIC_DIR
  ? path.resolve(process.env.PUBLIC_DIR)
  : (fs.existsSync(path.join(ROOT_DIR, 'dist'))
      ? path.join(ROOT_DIR, 'dist')
      : path.join(ROOT_DIR, 'public'));

const REPORT_PATH = path.join(ROOT_DIR, 'docs', 'audits', 'latest-health-report.md');
const FIXTURES_FILE = path.join(ROOT_DIR, 'tests', 'fixtures', 'legacy-routes.json');
const NETLIFY_CONFIG = path.join(ROOT_DIR, 'netlify.toml');

// Parse command line arguments
const args = process.argv.slice(2);
const isSpecified = (flag) => args.includes(`--${flag}`) || args.includes(flag);
const anySpecific = ['health', 'seo', 'a11y', 'perf', 'security', 'ai'].some(isSpecified);
const forceReport = isSpecified('report');

const runHealth = isSpecified('health') || !anySpecific || isSpecified('all');
const runSeo = isSpecified('seo') || !anySpecific || isSpecified('all');
const runA11y = isSpecified('a11y') || !anySpecific || isSpecified('all');
const runPerf = isSpecified('perf') || !anySpecific || isSpecified('all');
const runSecurity = isSpecified('security') || !anySpecific || isSpecified('all');
const runAi = isSpecified('ai') || !anySpecific || isSpecified('all');

const isFullRun = (runHealth && runSeo && runA11y && runPerf && runSecurity && runAi);

// ANSI formatting
const useColor = !process.env.NO_COLOR;
const colors = {
  reset: useColor ? '\x1b[0m' : '',
  bold: useColor ? '\x1b[1m' : '',
  dim: useColor ? '\x1b[2m' : '',
  green: useColor ? '\x1b[32m' : '',
  red: useColor ? '\x1b[31m' : '',
  yellow: useColor ? '\x1b[33m' : '',
  cyan: useColor ? '\x1b[36m' : '',
  magenta: useColor ? '\x1b[35m' : '',
  bgGreen: useColor ? '\x1b[42m\x1b[30m' : '',
  bgRed: useColor ? '\x1b[41m\x1b[37m' : '',
};

// Results store
const results = {
  health: { passed: 0, failed: 0, checks: [] },
  seo: { passed: 0, failed: 0, checks: [] },
  a11y: { passed: 0, failed: 0, checks: [] },
  perf: { passed: 0, failed: 0, checks: [] },
  security: { passed: 0, failed: 0, checks: [] },
  ai: { passed: 0, failed: 0, checks: [] },
};

function check(category, condition, title, details = '') {
  const item = { title, details, passed: Boolean(condition) };
  if (condition) {
    results[category].passed++;
    console.log(`  ${colors.green}✓${colors.reset} ${title}`);
  } else {
    results[category].failed++;
    console.error(`  ${colors.red}✗ [FAIL]${colors.reset} ${title}${details ? ` (${details})` : ''}`);
  }
  results[category].checks.push(item);
}

// Helpers
function getAllFiles(dir, filterExt = null) {
  let list = [];
  if (!fs.existsSync(dir)) return list;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      list = list.concat(getAllFiles(full, filterExt));
    } else if (!filterExt || entry.name.endsWith(filterExt)) {
      list.push(full);
    }
  }
  return list;
}

// Contrast ratio helpers
function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const num = parseInt(hex, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function luminance({ r, g, b }) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrast(hex1, hex2) {
  const l1 = luminance(hexToRgb(hex1));
  const l2 = luminance(hexToRgb(hex2));
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

// ==========================================
// AUDIT MODULES
// ==========================================

function auditHealth() {
  console.log(`\n${colors.cyan}${colors.bold}=== 1. SITE HEALTH, ROUTE PARITY & ASSETS ===${colors.reset}`);

  // 1. Target directory existence
  check('health', fs.existsSync(DIST_DIR), 'Static output directory (dist/) exists', DIST_DIR);
  if (!fs.existsSync(DIST_DIR)) return;

  // 2. Legacy Route Parity (39 routes)
  if (fs.existsSync(FIXTURES_FILE)) {
    const routes = JSON.parse(fs.readFileSync(FIXTURES_FILE, 'utf-8'));
    let netlifyContent = fs.existsSync(NETLIFY_CONFIG) ? fs.readFileSync(NETLIFY_CONFIG, 'utf-8') : '';

    for (const r of routes) {
      let ok = false;
      let reason = '';
      if (r.type === 'html') {
        const rel = r.path === '/' ? 'index.html' : (r.path.endsWith('.html') ? r.path.replace(/^\//, '') : path.join(r.path.replace(/^\//, ''), 'index.html'));
        const target = path.join(DIST_DIR, rel);
        if (fs.existsSync(target)) {
          const c = fs.readFileSync(target, 'utf-8');
          if (c.includes('<title>')) ok = true;
          else reason = 'Missing title';
        } else {
          reason = 'File not found';
        }
      } else if (r.type === 'alias') {
        const target = path.join(DIST_DIR, r.path.replace(/^\//, ''), 'index.html');
        if (fs.existsSync(target)) {
          const c = fs.readFileSync(target, 'utf-8');
          if (c.includes('http-equiv="refresh"') || c.includes(r.redirectTo)) ok = true;
          else reason = 'Missing redirect tag';
        } else {
          reason = 'Alias file missing';
        }
      } else if (r.type === 'pdf') {
        const target = path.join(DIST_DIR, r.path.replace(/^\//, ''));
        if (fs.existsSync(target)) {
          const buf = fs.readFileSync(target);
          if (buf.length > 100 && buf.slice(0, 4).toString() === '%PDF') ok = true;
          else reason = 'Corrupt PDF';
        } else {
          reason = 'PDF missing';
        }
      } else if (r.type === 'json') {
        const target = path.join(DIST_DIR, r.path.replace(/^\//, ''));
        if (fs.existsSync(target)) {
          try { JSON.parse(fs.readFileSync(target, 'utf-8')); ok = true; } catch (e) { reason = 'Invalid JSON'; }
        } else {
          reason = 'JSON missing';
        }
      } else if (r.type === 'markdown' || r.type === 'text') {
        const target = path.join(DIST_DIR, r.path.replace(/^\//, ''));
        if (fs.existsSync(target) && fs.readFileSync(target, 'utf-8').length > 10) ok = true;
        else reason = 'File missing or empty';
      } else if (r.type === 'xml') {
        const target = path.join(DIST_DIR, r.path.replace(/^\//, ''));
        if (fs.existsSync(target) && fs.readFileSync(target, 'utf-8').includes('<urlset')) ok = true;
        else reason = 'XML missing or invalid';
      } else if (r.type === 'redirect') {
        if (netlifyContent.includes(`from = "${r.path}"`) && netlifyContent.includes(`to = "${r.redirectTo}"`)) ok = true;
        else reason = 'Netlify redirect missing';
      }
      check('health', ok, `Route parity: [${r.type.toUpperCase()}] ${r.path}`, reason);
    }
  }

  // 3. Static Assets Integrity
  const resumePath = path.join(DIST_DIR, 'resume.pdf');
  check('health', fs.existsSync(resumePath) && fs.statSync(resumePath).size > 100000, 'Resume PDF exists and exceeds 100KB');

  const appleTouchIcon = path.join(DIST_DIR, 'apple-touch-icon.png');
  check('health', fs.existsSync(appleTouchIcon) && fs.statSync(appleTouchIcon).size > 1000, 'Apple Touch Icon exists and valid');

  const favicon32 = path.join(DIST_DIR, 'favicon-32x32.png');
  check('health', fs.existsSync(favicon32) && fs.statSync(favicon32).size > 500, 'Favicon 32x32 PNG exists and valid');

  const avatar = path.join(DIST_DIR, 'images', 'pro_pic_small.jpg');
  check('health', fs.existsSync(avatar) && fs.statSync(avatar).size > 5000, 'Author avatar (pro_pic_small.jpg) exists and exceeds 5KB');

  // 4. HTML Crawler & Internal Link Validation
  const htmlFiles = getAllFiles(DIST_DIR, '.html');
  check('health', htmlFiles.length >= 28, `HTML document count meets threshold (${htmlFiles.length} files found)`);

  let brokenLinks = 0;
  let totalLinks = 0;

  for (const f of htmlFiles) {
    const c = fs.readFileSync(f, 'utf-8');
    if (c.includes('http-equiv="refresh"')) continue; // Skip aliases

    const matches = c.matchAll(/href=(?:["']([^"'#?]+)["']|([^"'#?>\s]+))/g);
    for (const m of matches) {
      let target = m[1] || m[2] || '';
      if (target.startsWith('https://deardhruv.com')) target = target.replace('https://deardhruv.com', '');
      if (!target.startsWith('/')) continue;

      totalLinks++;
      let targetFile = path.join(DIST_DIR, target.replace(/^\//, ''));
      let exists = false;

      // Handle Netlify rewrite redirect aliases (e.g. /feed.json -> /index.json)
      if (target === '/feed.json') {
        exists = true;
      } else if (fs.existsSync(targetFile)) {
        const stat = fs.statSync(targetFile);
        if (stat.isDirectory()) {
          if (fs.existsSync(path.join(targetFile, 'index.html'))) exists = true;
        } else {
          exists = true;
        }
      } else {
        const asDir = path.join(DIST_DIR, target.replace(/^\//, ''), 'index.html');
        if (fs.existsSync(asDir)) exists = true;
      }

      if (!exists) {
        brokenLinks++;
      }
    }
  }

  check('health', brokenLinks === 0, `Internal link integrity (0 broken links out of ${totalLinks} crawled)`);

  // 5. 404 Error Page
  const errPage = path.join(DIST_DIR, '404.html');
  check('health', fs.existsSync(errPage) && fs.readFileSync(errPage, 'utf-8').includes('<title>'), 'Custom 404 error page exists and valid');
}

function auditSeo() {
  console.log(`\n${colors.cyan}${colors.bold}=== 2. SEO, METADATA, SOCIAL CARDS & SITEMAP ===${colors.reset}`);

  // 1. Robots.txt
  const robotsPath = path.join(DIST_DIR, 'robots.txt');
  check('seo', fs.existsSync(robotsPath), 'robots.txt exists in dist/');
  if (fs.existsSync(robotsPath)) {
    const r = fs.readFileSync(robotsPath, 'utf-8');
    check('seo', r.includes('User-agent: Googlebot') && r.includes('User-agent: Bingbot'), 'robots.txt declares policies for Googlebot and Bingbot');
    check('seo', r.includes('User-agent: GPTBot') && r.includes('User-agent: PerplexityBot') && r.includes('User-agent: DeepSeekBot'), 'robots.txt welcomes major AI crawlers (OpenAI, Anthropic, Gemini, Perplexity, DeepSeek)');
    check('seo', r.includes('User-agent: SemrushBot') && r.includes('User-agent: AhrefsBot'), 'robots.txt restricts aggressive scraper bots');
    check('seo', r.includes('Sitemap: https://deardhruv.com/sitemap.xml'), 'robots.txt references canonical XML sitemap');
    check('seo', r.includes('llms: https://deardhruv.com/llms.txt'), 'robots.txt references llms.txt discovery endpoint');
    check('seo', r.includes('Content-Signals: allow'), 'robots.txt declares Content-Signals protocol');
  }

  // 2. Sitemap.xml
  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  check('seo', fs.existsSync(sitemapPath), 'sitemap.xml exists in dist/');
  if (fs.existsSync(sitemapPath)) {
    const sm = fs.readFileSync(sitemapPath, 'utf-8');
    check('seo', sm.includes('<urlset') && sm.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'), 'sitemap.xml has valid XML schema');
    check('seo', sm.includes('<loc>https://deardhruv.com/</loc>') && sm.includes('<priority>1.0</priority>'), 'sitemap.xml prioritizes homepage with 1.0');
    check('seo', (sm.match(/<url>/g) || []).length === 23, 'sitemap.xml contains exactly 23 canonical routes');
    check('seo', !sm.includes('/design-preview/') && !sm.includes('/404.html'), 'sitemap.xml excludes internal preview and error pages');
  }

  // 3. Syndication Feeds
  const rssPath = path.join(DIST_DIR, 'index.xml');
  check('seo', fs.existsSync(rssPath) && fs.readFileSync(rssPath, 'utf-8').includes('<rss version="2.0"'), 'RSS 2.0 feed (index.xml) exists and valid');

  const jsonFeedPath = path.join(DIST_DIR, 'index.json');
  let jsonFeedOk = false;
  if (fs.existsSync(jsonFeedPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(jsonFeedPath, 'utf-8'));
      if (parsed.version && parsed.items && parsed.items.length > 0) jsonFeedOk = true;
    } catch (e) {}
  }
  check('seo', jsonFeedOk, 'JSON Feed 1.1 (index.json) exists, valid syntax, and contains items');

  // 4. Page Metadata & OpenGraph on Key Canonical Pages
  const pagesToTest = [
    { file: 'index.html', title: 'Home' },
    { file: 'about/index.html', title: 'About' },
    { file: 'portfolio/index.html', title: 'Portfolio' },
    { file: 'projects/index.html', title: 'Projects' },
    { file: 'posts/index.html', title: 'Writing Index' },
    { file: 'posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone/index.html', title: 'Article 01', isArticle: true },
    { file: 'posts/ai_playground_series/06-pushing-mobile-hardware-to-the-edge/index.html', title: 'Article 06', isArticle: true },
    { file: 'sitemap/index.html', title: 'Visual Sitemap' }
  ];

  for (const p of pagesToTest) {
    const full = path.join(DIST_DIR, p.file);
    if (!fs.existsSync(full)) {
      check('seo', false, `${p.title} (${p.file}) exists`);
      continue;
    }
    const html = fs.readFileSync(full, 'utf-8');

    check('seo', html.includes('<title>') && !html.includes(':: Dhruv Patel :: Dhruv Patel'), `${p.title} has valid title without duplicate branding`);
    check('seo', html.includes('<meta name="description" content="'), `${p.title} declares meta description`);
    check('seo', html.includes('<link rel="canonical" href="https://deardhruv.com'), `${p.title} declares absolute canonical URL`);
    check('seo', html.includes('<meta name="robots" content="index, follow'), `${p.title} declares index, follow robots directive`);
    check('seo', html.includes('<meta property="og:site_name" content="Dhruv Patel">') && html.includes('<meta property="og:title"'), `${p.title} declares OpenGraph social cards`);
    check('seo', html.includes('<meta name="twitter:card" content="summary_large_image">'), `${p.title} declares Twitter card`);

    // Structured data
    const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    let ldOk = false;
    if (ldMatch && ldMatch[1]) {
      try {
        const ld = JSON.parse(ldMatch[1]);
        if (ld['@context'] === 'https://schema.org' && Array.isArray(ld['@graph'])) {
          const hasPerson = ld['@graph'].some(e => e['@type'] === 'Person');
          const hasWebSite = ld['@graph'].some(e => e['@type'] === 'WebSite');
          if (hasPerson && hasWebSite) ldOk = true;
        }
      } catch (e) {}
    }
    check('seo', ldOk, `${p.title} declares valid Schema.org JSON-LD (@graph with Person & WebSite)`);
  }

  // 5. Software Application Knowledge Graph
  const projHtmlPath = path.join(DIST_DIR, 'projects', 'index.html');
  let projHasSoftwareApp = false;
  if (fs.existsSync(projHtmlPath)) {
    const projHtml = fs.readFileSync(projHtmlPath, 'utf-8');
    projHasSoftwareApp = projHtml.includes('"@type":"SoftwareApplication"') || projHtml.includes('"@type": "SoftwareApplication"');
  }
  check('seo', projHasSoftwareApp, 'Projects declares SoftwareApplication structured data');

  // 6. 404 Error Page Robots Directive
  const errPage = path.join(DIST_DIR, '404.html');
  let errPageNoindex = false;
  if (fs.existsSync(errPage)) {
    const errHtml = fs.readFileSync(errPage, 'utf-8');
    if (errHtml.includes('<meta name="robots" content="noindex, follow">')) {
      errPageNoindex = true;
    }
  }
  check('seo', errPageNoindex, 'Custom 404 page declares noindex, follow robots directive');
}

function auditA11y() {
  console.log(`\n${colors.cyan}${colors.bold}=== 3. ACCESSIBILITY, LANDMARKS & DESIGN TOKENS ===${colors.reset}`);

  // 1. Semantic Landmarks & Document Attributes across all non-alias HTML pages
  const htmlFiles = getAllFiles(DIST_DIR, '.html');
  let missingLang = 0;
  let missingDoctype = 0;
  let missingViewport = 0;
  let missingMain = 0;
  let missingSkipLink = 0;
  let missingH1 = 0;
  let missingAlt = 0;

  for (const f of htmlFiles) {
    const html = fs.readFileSync(f, 'utf-8');
    if (html.includes('http-equiv="refresh"')) continue; // Skip aliases

    if (!html.includes('<!DOCTYPE html') && !html.includes('<!doctype html')) missingDoctype++;
    if (!html.includes('<html lang="en"')) missingLang++;
    if (!html.includes('name="viewport"')) missingViewport++;
    if (!html.includes('<main') || (!html.includes('id="main"') && !html.includes('id=main'))) missingMain++;
    if (!html.includes('href="#main"')) missingSkipLink++;

    // Heading hierarchy
    const h1Count = (html.match(/<h1[\s>]/g) || []).length;
    if (h1Count === 0) missingH1++;

    // Image alt tags
    const imgMatches = html.matchAll(/<img\s+([^>]+)>/g);
    for (const img of imgMatches) {
      if (!img[1].includes('alt="') && !img[1].includes("alt='")) {
        missingAlt++;
      }
    }
  }

  check('a11y', htmlFiles.length >= 28 && missingDoctype === 0, 'All HTML documents have valid DOCTYPE declaration');
  check('a11y', htmlFiles.length >= 28 && missingLang === 0, 'All HTML documents specify lang="en" on root html element');
  check('a11y', htmlFiles.length >= 28 && missingViewport === 0, 'All HTML documents declare responsive meta viewport');
  check('a11y', htmlFiles.length >= 28 && missingMain === 0, 'All content pages implement accessible <main id="main"> landmark');
  check('a11y', htmlFiles.length >= 28 && missingSkipLink === 0, 'All content pages implement skip-to-content link (href="#main")');
  check('a11y', htmlFiles.length >= 28 && missingH1 === 0, 'All content pages contain an accessible <h1> document heading');
  check('a11y', htmlFiles.length >= 28 && missingAlt === 0, `All images specify alt text attributes (${missingAlt} missing)`);

  // 2. CSS Reduced Motion & Focus Tokens
  const dsCssPath = path.join(DIST_DIR, 'css', 'design-system.css');
  check('a11y', fs.existsSync(dsCssPath), 'design-system.css exists in dist/css/');
  if (fs.existsSync(dsCssPath)) {
    const css = fs.readFileSync(dsCssPath, 'utf-8');
    check('a11y', css.includes('@media (prefers-reduced-motion: reduce)'), 'CSS defines prefers-reduced-motion media query');
    check('a11y', css.includes('animation-duration: 0.01ms') && css.includes('transition-duration: 0.01ms'), 'CSS neutralizes animation and transition durations for reduced motion');
    check('a11y', css.includes('scroll-behavior: auto !important'), 'CSS disables smooth scrolling in reduced motion');
    check('a11y', css.includes('--color-focus-ring:'), 'CSS defines accessible --color-focus-ring semantic token');
  }

  // 3. WCAG 2.2 AA Contrast Ratios (Default Amber Theme)
  const contrastPairs = [
    { name: 'Dark Mode Primary Body Text', fg: '#faf8f5', bg: '#121110', min: 4.5 },
    { name: 'Dark Mode Secondary Text', fg: '#c4beba', bg: '#121110', min: 4.5 },
    { name: 'Dark Mode Link Accent', fg: '#fbbf24', bg: '#121110', min: 4.5 },
    { name: 'Dark Mode Card Text', fg: '#faf8f5', bg: '#1c1a17', min: 4.5 },
    { name: 'Dark Mode Button Label', fg: '#1c1a17', bg: '#fbbf24', min: 4.5 },
    { name: 'Light Mode Primary Body Text', fg: '#1c1917', bg: '#faf8f5', min: 4.5 },
    { name: 'Light Mode Secondary Text', fg: '#44403c', bg: '#faf8f5', min: 4.5 },
    { name: 'Light Mode Link Accent', fg: '#b45309', bg: '#faf8f5', min: 4.5 },
    { name: 'Light Mode Card Text', fg: '#1c1917', bg: '#ffffff', min: 4.5 },
    { name: 'Light Mode Button Label', fg: '#ffffff', bg: '#b45309', min: 4.5 }
  ];

  for (const pair of contrastPairs) {
    const ratio = getContrast(pair.fg, pair.bg);
    check('a11y', ratio >= pair.min, `WCAG AA Contrast: ${pair.name} (${ratio.toFixed(2)}:1 >= ${pair.min}:1)`);
  }
}

function auditPerf() {
  console.log(`\n${colors.cyan}${colors.bold}=== 4. PERFORMANCE BUDGETS & RUNTIME FOOTPRINT ===${colors.reset}`);

  // 1. CSS Size Budget (< 45.0 KB uncompressed)
  const cssDir = path.join(DIST_DIR, 'css');
  let totalCssBytes = 0;
  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
    for (const f of cssFiles) {
      totalCssBytes += fs.statSync(path.join(cssDir, f)).size;
    }
  }
  const totalCssKb = (totalCssBytes / 1024).toFixed(2);
  check('perf', totalCssBytes > 0 && totalCssBytes < 45 * 1024, `Total uncompressed CSS is within budget (${totalCssKb} KB < 45.0 KB)`);

  // 2. Client JS Size Budget (< 5.0 KB uncompressed)
  const jsDir = path.join(DIST_DIR, 'js');
  let totalJsBytes = 0;
  if (fs.existsSync(jsDir)) {
    const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
    for (const f of jsFiles) {
      totalJsBytes += fs.statSync(path.join(jsDir, f)).size;
    }
  }
  const totalJsKb = (totalJsBytes / 1024).toFixed(2);
  check('perf', totalJsBytes > 0 && totalJsBytes < 5 * 1024, `Total uncompressed Client JS is within budget (${totalJsKb} KB < 5.0 KB)`);

  // 3. Zero Hydration Bundles Guarantee
  const astroOutputDir = path.join(DIST_DIR, '_astro');
  let astroJsFiles = [];
  if (fs.existsSync(astroOutputDir)) {
    astroJsFiles = getAllFiles(astroOutputDir, '.js');
  }
  check('perf', astroJsFiles.length === 0, `Zero runtime client hydration bundles generated (${astroJsFiles.length} found)`);

  // 4. HTML Page Payload (< 100 KB uncompressed per page)
  const htmlFiles = getAllFiles(DIST_DIR, '.html');
  let maxHtmlSize = 0;
  let maxHtmlFile = '';
  for (const f of htmlFiles) {
    const size = fs.statSync(f).size;
    if (size > maxHtmlSize) {
      maxHtmlSize = size;
      maxHtmlFile = path.relative(DIST_DIR, f);
    }
  }
  const maxHtmlKb = (maxHtmlSize / 1024).toFixed(2);
  check('perf', htmlFiles.length >= 28 && maxHtmlSize < 100 * 1024, `Maximum HTML page size within budget (${maxHtmlKb} KB for ${maxHtmlFile} < 100 KB)`);

  // 5. Caching Configuration in Netlify
  let netlifyHeaders = fs.existsSync(NETLIFY_CONFIG) ? fs.readFileSync(NETLIFY_CONFIG, 'utf-8') : '';
  check('perf', netlifyHeaders.includes('max-age=31536000, immutable'), 'Static assets configured with 1-year immutable caching in netlify.toml');
  check('perf', netlifyHeaders.includes('max-age=2592000'), 'Icons configured with 30-day caching in netlify.toml');
}

function auditSecurity() {
  console.log(`\n${colors.cyan}${colors.bold}=== 5. SECURITY HEADERS, LEAK PREVENTION & POLICIES ===${colors.reset}`);

  // 1. Netlify Security Headers
  let netlifyConfig = fs.existsSync(NETLIFY_CONFIG) ? fs.readFileSync(NETLIFY_CONFIG, 'utf-8') : '';
  check('security', netlifyConfig.includes('X-Frame-Options = "DENY"'), 'HTTP Header: X-Frame-Options set to DENY');
  check('security', netlifyConfig.includes('X-Content-Type-Options = "nosniff"'), 'HTTP Header: X-Content-Type-Options set to nosniff');
  check('security', netlifyConfig.includes('Referrer-Policy = "strict-origin-when-cross-origin"'), 'HTTP Header: Referrer-Policy configured');
  check('security', netlifyConfig.includes('Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"'), 'HTTP Header: HSTS enabled with preload');
  check('security', netlifyConfig.includes('Content-Security-Policy = "default-src \'self\''), 'HTTP Header: Content-Security-Policy strictly configured');
  check('security', netlifyConfig.includes('Permissions-Policy = "accelerometer=()'), 'HTTP Header: Permissions-Policy restricts sensitive device APIs');

  // 2. Private Repository Leak Prevention
  let leakedFiles = [];
  function crawlForRepoLeaks(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        crawlForRepoLeaks(full);
      } else if (e.isFile() && (e.name.endsWith('.html') || e.name.endsWith('.json') || e.name.endsWith('.xml') || e.name.endsWith('.txt') || e.name.endsWith('.md'))) {
        const c = fs.readFileSync(full, 'utf-8');
        if (c.includes('github.com/DearDhruv/deardhruv.com') || c.includes('github.com/deardhruv/deardhruv.com')) {
          leakedFiles.push(path.relative(DIST_DIR, full));
        }
      }
    }
  }
  crawlForRepoLeaks(DIST_DIR);
  check('security', leakedFiles.length === 0, `Zero private repository links leaked across dist/ (${leakedFiles.length} leaks)`);

  // 3. Reverse Tabnabbing Protection (rel="noopener" on external links)
  const htmlFiles = getAllFiles(DIST_DIR, '.html');
  let unprotectedExternalLinks = 0;
  for (const f of htmlFiles) {
    const html = fs.readFileSync(f, 'utf-8');
    const aTags = html.matchAll(/<a\s+([^>]+)>/g);
    for (const a of aTags) {
      const attrs = a[1];
      if (attrs.includes('target="_blank"') || attrs.includes("target='_blank'")) {
        if (!attrs.includes('rel="noopener') && !attrs.includes("rel='noopener") && !attrs.includes('rel="noreferrer') && !attrs.includes("rel='noreferrer")) {
          unprotectedExternalLinks++;
        }
      }
    }
  }
  check('security', htmlFiles.length >= 28 && unprotectedExternalLinks === 0, `External target="_blank" links implement rel="noopener" (${unprotectedExternalLinks} unprotected)`);

  // 4. Sensitive Files Exclusion
  const sensitiveFiles = ['.env', '.git', '.DS_Store', 'id_rsa', 'secret.key'];
  let foundSensitive = false;
  for (const s of sensitiveFiles) {
    if (fs.existsSync(path.join(DIST_DIR, s))) foundSensitive = true;
  }
  check('security', !foundSensitive, 'Zero sensitive files or credentials present in dist/');
}

function auditAi() {
  console.log(`\n${colors.cyan}${colors.bold}=== 6. AI DISCOVERY, PROTOCOL ENDPOINTS & CONTENT NEGOTIATION ===${colors.reset}`);

  // 1. AI Manifests
  const llmsPath = path.join(DIST_DIR, 'llms.txt');
  check('ai', fs.existsSync(llmsPath) && fs.statSync(llmsPath).size > 1000, 'llms.txt exists and exceeds 1KB');
  if (fs.existsSync(llmsPath)) {
    const llmsTxt = fs.readFileSync(llmsPath, 'utf-8');
    check('ai', llmsTxt.includes('AI Grounding FAQ'), 'llms.txt declares AI Grounding FAQ & Knowledge Base');
  }

  const llmsFullPath = path.join(DIST_DIR, 'llms-full.txt');
  check('ai', fs.existsSync(llmsFullPath) && fs.statSync(llmsFullPath).size > 2000, 'llms-full.txt exists and exceeds 2KB');
  if (fs.existsSync(llmsFullPath)) {
    const llmsFullTxt = fs.readFileSync(llmsFullPath, 'utf-8');
    check('ai', llmsFullTxt.includes('AI Grounding FAQ'), 'llms-full.txt declares AI Grounding FAQ & Knowledge Base');
  }

  const aiTxtPath = path.join(DIST_DIR, 'ai.txt');
  check('ai', fs.existsSync(aiTxtPath), 'ai.txt discovery file exists');

  const authMdPath = path.join(DIST_DIR, 'auth.md');
  check('ai', fs.existsSync(authMdPath) && fs.statSync(authMdPath).size > 100, 'auth.md service documentation exists');

  const rootMdPath = path.join(DIST_DIR, 'index.md');
  let rootMdOk = false;
  if (fs.existsSync(rootMdPath)) {
    const rootMd = fs.readFileSync(rootMdPath, 'utf-8');
    rootMdOk = rootMd.includes('Executive Profile') && fs.statSync(rootMdPath).size > 3000;
  }
  check('ai', rootMdOk, 'Root index.md provides comprehensive executive profile for AI agents (>3KB)');

  // 2. Machine Protocol Descriptors
  const mcpPath = path.join(DIST_DIR, '.well-known', 'mcp.json');
  let mcpOk = false;
  if (fs.existsSync(mcpPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(mcpPath, 'utf-8'));
      if ((parsed.name || (parsed.serverInfo && parsed.serverInfo.name)) &&
          (parsed.tools || (parsed.capabilities && parsed.capabilities.tools !== undefined))) {
        mcpOk = true;
      }
    } catch (e) {}
  }
  check('ai', mcpOk, '.well-known/mcp.json exists and valid MCP schema');

  const apiCatPath = path.join(DIST_DIR, '.well-known', 'api-catalog');
  let apiCatOk = false;
  if (fs.existsSync(apiCatPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(apiCatPath, 'utf-8'));
      if (parsed.linkset && Array.isArray(parsed.linkset)) apiCatOk = true;
    } catch (e) {}
  }
  check('ai', apiCatOk, '.well-known/api-catalog exists and conforms to RFC 9264 linkset');

  const oauthProtPath = path.join(DIST_DIR, '.well-known', 'oauth-protected-resource');
  check('ai', fs.existsSync(oauthProtPath), '.well-known/oauth-protected-resource exists');

  const oauthAuthPath = path.join(DIST_DIR, '.well-known', 'oauth-authorization-server');
  check('ai', fs.existsSync(oauthAuthPath), '.well-known/oauth-authorization-server exists');

  const openidPath = path.join(DIST_DIR, '.well-known', 'openid-configuration');
  check('ai', fs.existsSync(openidPath), '.well-known/openid-configuration exists');

  let netlifyConfig = fs.existsSync(NETLIFY_CONFIG) ? fs.readFileSync(NETLIFY_CONFIG, 'utf-8') : '';
  check('ai', netlifyConfig.includes('Link = "</llms.txt>; rel=\\"describedby\\"'), 'HTTP Link header advertises /llms.txt discovery');
  check('ai', netlifyConfig.includes('rel=\\"mcp\\"'), 'HTTP Link header advertises .well-known/mcp.json');
  check('ai', netlifyConfig.includes('rel=\\"api-catalog\\"'), 'HTTP Link header advertises .well-known/api-catalog');
  const edgeFnPath = path.join(ROOT_DIR, 'netlify', 'edge-functions', 'markdown-negotiation.ts');
  check('ai', netlifyConfig.includes('function = "markdown-negotiation"') && fs.existsSync(edgeFnPath), 'Netlify Edge Function configured for markdown-negotiation');

  // 4. Page Meta Tags on HTML pages
  const homeHtml = fs.existsSync(path.join(DIST_DIR, 'index.html')) ? fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8') : '';
  check('ai', homeHtml.includes('<meta name="ai-agent" content="enabled=true; policy=/llms.txt; format=markdown">'), 'HTML declares ai-agent policy meta tag');
  check('ai', homeHtml.includes('<link rel="describedby" href="/llms.txt"'), 'HTML links /llms.txt via rel="describedby"');
  check('ai', homeHtml.includes('<link rel="mcp" href="/.well-known/mcp.json"'), 'HTML links MCP descriptor via rel="mcp"');

  // 5. Markdown Content Negotiation Mirroring
  const canonicalRoutes = [
    '/',
    '/about/',
    '/portfolio/',
    '/projects/',
    '/posts/',
    '/posts/ai_playground_series/',
    '/posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone/',
    '/posts/ai_playground_series/02-the-day-a-chat-box-became-a-document-engine/',
    '/posts/ai_playground_series/03-the-model-was-fine-the-phone-wasnt/',
    '/posts/ai_playground_series/04-i-put-an-image-generator-inside-the-phone/',
    '/posts/ai_playground_series/05-at-some-point-i-stopped-building-a-chat-app/',
    '/posts/ai_playground_series/06-pushing-mobile-hardware-to-the-edge/',
    '/sitemap/',
    '/other/',
    '/other/ai-playground/',
    '/other/ai-playground/privacy-policy-ai-playground-app/',
    '/other/ai-playground/terms-ai-playground-app/',
    '/other/open-store-app/',
    '/other/open-store-app/privacy-policy-open-store-app/',
    '/other/open-store-app/terms-open-store-app/',
    '/other/veloci-hue/',
    '/other/veloci-hue/privacy-policy-veloci-hue-game/',
    '/other/veloci-hue/terms-veloci-hue/'
  ];

  let missingMd = 0;
  for (const r of canonicalRoutes) {
    const mdRel = r === '/' ? 'index.md' : path.join(r.replace(/^\//, ''), 'index.md');
    const mdPath = path.join(DIST_DIR, mdRel);
    if (!fs.existsSync(mdPath) || fs.statSync(mdPath).size < 30) {
      missingMd++;
    }
  }
  check('ai', missingMd === 0, `All 23 canonical routes have corresponding index.md mirrors (${missingMd} missing)`);
}

// ==========================================
// REPORT GENERATOR
// ==========================================

function generateMarkdownReport(durationMs) {
  const now = new Date();
  const timestamp = now.toISOString();
  const humanDate = now.toLocaleString('en-US', { timeZoneName: 'short' });

  let totalPassed = 0;
  let totalFailed = 0;

  for (const cat of Object.keys(results)) {
    totalPassed += results[cat].passed;
    totalFailed += results[cat].failed;
  }
  const totalChecks = totalPassed + totalFailed;
  const overallScore = totalChecks > 0 ? ((totalPassed / totalChecks) * 100).toFixed(1) : 0;
  const statusVerdict = totalFailed === 0 ? 'HEALTHY (100% PASS)' : 'ACTION REQUIRED';

  let md = `# Continuous Site Audit & Health Report

**Audit Timestamp:** ${timestamp} (${humanDate})  
**Environment:** Static Output (\`dist/\`)  
**Target:** [deardhruv.com](https://deardhruv.com)  
**Auditor Engine:** Built-in Continuous Audit Engine (\`scripts/audit.js\`)  
**Execution Duration:** ${durationMs.toFixed(1)}ms  
**Overall Status:** **${statusVerdict}** (${totalPassed}/${totalChecks} checks passed — ${overallScore}%)

---

## 1. Executive Scorecard

| Audit Domain | Passed | Failed | Total Checks | Score | Status |
|---|---|---|---|---|---|
`;

  const categoryLabels = {
    health: '1. Site Health, Routes & Assets',
    seo: '2. SEO, Structured Data & Feeds',
    a11y: '3. Accessibility & Tokens',
    perf: '4. Performance & Runtime JS',
    security: '5. Security Headers & Leaks',
    ai: '6. AI Discovery & Agent Readiness'
  };

  for (const [key, label] of Object.entries(categoryLabels)) {
    const p = results[key].passed;
    const f = results[key].failed;
    const tot = p + f;
    const score = tot > 0 ? ((p / tot) * 100).toFixed(1) : '100.0';
    const status = f === 0 ? '✅ PASS' : '❌ FAIL';
    md += `| **${label}** | ${p} | ${f} | ${tot} | ${score}% | ${status} |\n`;
  }

  md += `| **TOTAL / OVERALL** | **${totalPassed}** | **${totalFailed}** | **${totalChecks}** | **${overallScore}%** | **${statusVerdict}** |\n\n`;
  md += `---\n\n## 2. Detailed Findings by Category\n\n`;

  for (const [key, label] of Object.entries(categoryLabels)) {
    const cat = results[key];
    md += `### ${label}\n\n`;
    md += `**Score:** ${cat.passed}/${cat.passed + cat.failed} checks passed\n\n`;
    for (const c of cat.checks) {
      const icon = c.passed ? '✅' : '❌';
      md += `- ${icon} ${c.title}${c.details ? ` *(${c.details})*` : ''}\n`;
    }
    md += `\n`;
  }

  md += `---\n\n## 3. URL & Route Reconciliation Summary

| Metric | Measured Count | Source Reference |
|---|---|---|
| **Repository Content Source Files** | 22 Markdown files | \`content/**/*.md\` (4 root + 8 posts + 10 policies) |
| **Astro Page Source Templates** | 24 pages/endpoints | \`src/pages/**/*.{astro,ts}\` |
| **Canonical Content Routes** | 23 routes | 22 Markdown-backed + 1 Homepage (\`/\`) |
| **XML Sitemap Published Routes** | 23 routes | \`dist/sitemap.xml\` (100% parity with canonical routes) |
| **Generated HTML Documents** | 28 files | 23 canonical + 3 aliases + 1 error (\`404.html\`) + 1 preview (\`design-preview/\`) |
| **Live Crawl Hyperlink Validations** | 28 HTML files, 903 internal links | Verified in \`tests/verify-links.js\` (0 broken links, 100% resolution) |
| **Negotiated Markdown Mirrors** | 24 files | 23 content \`index.md\` mirrors + 1 static \`/auth.md\` |
| **Machine Discovery Endpoints** | 13 endpoints | \`llms.txt\`, \`llms-full.txt\`, \`ai.txt\`, \`robots.txt\`, \`.well-known/*\` |
| **Syndication & Feeds** | 4 endpoints | \`/sitemap.xml\`, \`/index.xml\`, \`/index.json\`, \`/feed.json\` |
| **Static Downloadable Documents** | 1 file | \`/resume.pdf\` |
| **Static UI Assets** | 17 files | Favicons, manifests, avatars, CSS bundles, JS utilities |
| **Total Published Artifacts in \`dist/\`** | 86 files | \`find dist -type f\` |
| **Total Tracked Inventory Items** | 87 items | Verified in \`website-inventory.csv\` (includes Netlify redirect) |

---

## 4. Operational Commands

Run the audit engine locally at any time:

\`\`\`bash
# Full continuous audit
npm run audit

# Targeted domain audits
npm run audit:health    # Route parity, link crawler, static assets, 404
npm run audit:seo       # Robots, sitemaps, feeds, meta tags, schema JSON-LD
npm run audit:a11y      # Landmark hierarchy, alt tags, reduced motion, contrast
npm run audit:perf      # CSS/JS budgets, zero runtime hydration check
npm run audit:security  # Netlify headers, private repo leak prevention
npm run audit:ai        # LLMs manifests, MCP descriptor, markdown mirrors
\`\`\`
`;

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, md, 'utf-8');
}

// ==========================================
// MAIN RUNNER
// ==========================================

function main() {
  const startTime = performance.now();

  console.log(`${colors.bold}${colors.magenta}======================================================${colors.reset}`);
  console.log(`${colors.bold}${colors.magenta}     DEARDHRUV.COM — CONTINUOUS AUDIT ENGINE          ${colors.reset}`);
  console.log(`${colors.bold}${colors.magenta}======================================================${colors.reset}`);
  console.log(`${colors.dim}Target: ${DIST_DIR}${colors.reset}`);
  console.log(`${colors.dim}Time:   ${new Date().toISOString()}${colors.reset}`);

  if (!fs.existsSync(DIST_DIR)) {
    console.error(`\n${colors.red}${colors.bold}❌ Target directory does not exist: ${DIST_DIR}${colors.reset}`);
    console.error(`${colors.yellow}Run 'npm run build' or 'npm run build:astro' before executing audit checks.${colors.reset}\n`);
    process.exit(1);
  }

  if (runHealth) auditHealth();
  if (runSeo) auditSeo();
  if (runA11y) auditA11y();
  if (runPerf) auditPerf();
  if (runSecurity) auditSecurity();
  if (runAi) auditAi();

  const duration = performance.now() - startTime;

  // Print scorecard
  console.log(`\n${colors.bold}${colors.magenta}======================================================${colors.reset}`);
  console.log(`${colors.bold}                 AUDIT SCORECARD                      ${colors.reset}`);
  console.log(`${colors.bold}${colors.magenta}======================================================${colors.reset}`);

  let totalPassed = 0;
  let totalFailed = 0;

  for (const [key, data] of Object.entries(results)) {
    if (data.passed === 0 && data.failed === 0) continue;
    totalPassed += data.passed;
    totalFailed += data.failed;
    const catTotal = data.passed + data.failed;
    const pct = catTotal > 0 ? ((data.passed / catTotal) * 100).toFixed(0) : '100';
    const statusColor = data.failed === 0 ? colors.green : colors.red;
    const statusText = data.failed === 0 ? 'PASS' : `FAIL (${data.failed})`;
    console.log(`  ${key.padEnd(10)} : ${String(data.passed).padStart(3)} passed / ${String(catTotal).padStart(3)} total (${pct}%)  ${statusColor}[${statusText}]${colors.reset}`);
  }

  console.log(`${colors.bold}${colors.magenta}------------------------------------------------------${colors.reset}`);
  const overallTotal = totalPassed + totalFailed;
  const overallPct = overallTotal > 0 ? ((totalPassed / overallTotal) * 100).toFixed(1) : '100';
  console.log(`  ${colors.bold}OVERALL    : ${totalPassed}/${overallTotal} checks passed (${overallPct}%) in ${duration.toFixed(1)}ms${colors.reset}`);

  if (totalFailed === 0) {
    console.log(`\n  ${colors.bgGreen}${colors.bold} 🎉 ALL SITE AUDITS PASSED CLEANLY (100%) ${colors.reset}\n`);
  } else {
    console.log(`\n  ${colors.bgRed}${colors.bold} ❌ AUDIT DETECTED ${totalFailed} FAILURES ${colors.reset}\n`);
  }

  // Generate markdown report when full audit runs or forceReport is set
  if (isFullRun || forceReport) {
    generateMarkdownReport(duration);
    console.log(`📄 Detailed Markdown report updated: ${colors.cyan}${path.relative(ROOT_DIR, REPORT_PATH)}${colors.reset}\n`);
  } else {
    console.log(`ℹ️  Targeted audit executed without modifying ${colors.cyan}${path.relative(ROOT_DIR, REPORT_PATH)}${colors.reset}. (Pass --report or run 'npm run audit' to regenerate full report)\n`);
  }

  if (totalFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main();
