import type { Context } from "https://edge.netlify.com";

function prefersMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader || !acceptHeader.includes("text/markdown")) {
    return false;
  }

  try {
    // Parse comma-separated MIME types with optional ;q= weights
    const items = acceptHeader.split(",").map(part => {
      const [mime, ...params] = part.trim().split(";");
      let q = 1.0;
      for (const p of params) {
        const [k, v] = p.trim().split("=");
        if (k && k.trim() === "q" && v) {
          const parsed = parseFloat(v.trim());
          if (!isNaN(parsed)) q = parsed;
        }
      }
      return { mime: mime.trim().toLowerCase(), q };
    });

    const markdownItem = items.find(i => i.mime === "text/markdown");
    if (!markdownItem || markdownItem.q <= 0) return false;

    // Check if text/html is explicitly preferred over text/markdown
    const htmlItem = items.find(i => i.mime === "text/html");
    if (htmlItem && htmlItem.q > markdownItem.q) {
      return false; // Client explicitly prioritizes HTML
    }

    return true;
  } catch {
    return false;
  }
}

export default async (request: Request, context: Context) => {
  const accept = request.headers.get("accept");

  if (prefersMarkdown(accept)) {
    const url = new URL(request.url);

    // Defense-in-depth: Reject path traversal or null-byte probes
    if (url.pathname.includes("..") || url.pathname.includes("\0")) {
      return;
    }

    // Skip if it's already a file request (has extension) unless it's a directory
    if (url.pathname.includes(".") && !url.pathname.endsWith("/")) {
      return;
    }

    // Determine the markdown path
    let markdownPath = url.pathname;
    if (markdownPath.endsWith("/")) {
      markdownPath += "index.md";
    } else {
      markdownPath += "/index.md";
    }

    // Preserve search params on rewrite
    const rewriteTarget = markdownPath + url.search;

    try {
      // Try to fetch the markdown version
      const response = await context.rewrite(rewriteTarget);

      // If the rewrite was not successful (e.g. 404), return response without claiming agent readiness
      if (!response.ok) {
        return response;
      }

      // We want to force the content-type for markdown
      const newResponse = new Response(response.body, response);
      newResponse.headers.set("content-type", "text/markdown; charset=utf-8");
      newResponse.headers.set("x-agent-ready", "true");

      return newResponse;
    } catch {
      return; // Fallback to standard pipeline on rewrite failure
    }
  }
};
