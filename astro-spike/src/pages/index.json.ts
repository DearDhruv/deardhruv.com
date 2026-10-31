import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const GET: APIRoute = async () => {
  // Read canonical JSON feed
  const rootPath = path.resolve('..');
  const jsonPath = path.join(rootPath, 'public', 'index.json');
  const data = fs.readFileSync(jsonPath, 'utf8');

  return new Response(data, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
