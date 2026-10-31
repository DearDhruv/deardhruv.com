import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  publicDir: './static',
  outDir: './dist',
  build: {
    format: 'directory'
  }
});
