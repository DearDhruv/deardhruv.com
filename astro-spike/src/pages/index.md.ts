import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const GET: APIRoute = async () => {
  // Read canonical markdown mirror
  const rootPath = path.resolve('..');
  const mdPath = path.join(rootPath, 'public', 'index.md');
  const data = fs.readFileSync(mdPath, 'utf8');

  return new Response(data, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8'
    }
  });
};
