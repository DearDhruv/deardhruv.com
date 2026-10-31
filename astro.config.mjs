import { defineConfig } from 'astro/config';

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

// https://astro.build/config
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  publicDir: './static',
  outDir: './dist',
  build: {
    format: 'directory'
  },
  markdown: {
    rehypePlugins: [rehypeDemoteHeadings]
  }
});
