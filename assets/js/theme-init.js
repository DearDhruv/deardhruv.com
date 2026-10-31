/**
 * Zero-flash theme initialization.
 * Must execute synchronously in <head> before stylesheets render.
 */
(() => {
  try {
    const stored = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (systemDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (_) {}
})();
