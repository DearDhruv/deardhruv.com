/**
 * Zero-flash theme initialization.
 * Must execute synchronously in <head> before stylesheets render.
 */
(() => {
  try {
    const params = new URLSearchParams(window.location.search);
    const paramTheme = params.get('theme');
    const stored = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = (paramTheme === 'light' || paramTheme === 'dark') ? paramTheme : (stored || (systemDark ? 'dark' : 'light'));
    document.documentElement.setAttribute('data-theme', theme);
  } catch (_) {}
})();
