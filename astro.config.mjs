import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function rehypeDemoteHeadings() {
  return (tree) => {
    function visit(node) {
      if (node && node.type === 'element') {
        if (/^h[1-5]$/.test(node.tagName)) {
          const level = parseInt(node.tagName[1], 10);
          node.tagName = `h${level + 1}`;
        }
      }
      if (node && node.children) {
        node.children.forEach(visit);
      }
    }
    visit(tree);
  };
}

function markdownOutputsIntegration() {
  return {
    name: 'markdown-outputs-integration',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const outDir = fileURLToPath(dir);
        const legacyRoutesPath = new URL('./tests/fixtures/legacy-routes.json', import.meta.url);
        if (!fs.existsSync(legacyRoutesPath)) return;

        const legacyRoutes = JSON.parse(fs.readFileSync(legacyRoutesPath, 'utf-8'));

        for (const route of legacyRoutes) {
          if (route.type === 'html' && route.sourceFile && route.sourceFile.endsWith('.md')) {
            const srcPath = fileURLToPath(new URL(route.sourceFile, import.meta.url));
            if (fs.existsSync(srcPath)) {
              const relPath = route.path.replace(/^\//, '').replace(/\/$/, '');
              const targetDir = relPath ? path.join(outDir, relPath) : outDir;
              const targetFile = path.join(targetDir, 'index.md');

              if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
              }
              const content = fs.readFileSync(srcPath, 'utf-8');
              fs.writeFileSync(targetFile, content, 'utf-8');
            }
          }
        }
      }
    }
  };
}

// https://astro.build/config
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  publicDir: './static',
  outDir: './dist',
  build: {
    format: 'directory'
  },
  integrations: [markdownOutputsIntegration()],
  markdown: {
    rehypePlugins: [rehypeDemoteHeadings]
  }
});
