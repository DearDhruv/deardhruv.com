import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const accept = request.headers.get("accept");

  if (accept && accept.includes("text/markdown")) {
    const url = new URL(request.url);

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

    // Try to fetch the markdown version
    const response = await context.rewrite(markdownPath);

    // If the rewrite was successful (assuming it would 404 if not found,
    // but context.rewrite returns a response we can modify)
    // We want to force the content-type
    const newResponse = new Response(response.body, response);
    newResponse.headers.set("content-type", "text/markdown; charset=utf-8");
    newResponse.headers.set("x-agent-ready", "true");

    return newResponse;
  }
};
