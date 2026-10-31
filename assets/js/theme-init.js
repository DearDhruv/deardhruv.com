(() => {
  try {
    const q = new URLSearchParams(location.search), ls = localStorage, d = document.documentElement;
    const t = q.get('theme'), p = q.get('palette'), sw = q.get('palette-switcher'), v = ['cyan', 'emerald', 'amber', 'indigo'];
    d.setAttribute('data-theme', t === 'light' || t === 'dark' ? t : (ls.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')));
    const vp = v.includes(p) ? p : null;
    d.setAttribute('data-palette', vp || (v.includes(ls.getItem('palette')) ? ls.getItem('palette') : 'cyan'));
    if (vp) try { ls.setItem('palette', vp); } catch (_) {}
    if (sw === 'true' || sw === '1' || p === 'true' || p === '1' || vp) try { ls.setItem('palette_switcher_enabled', 'true'); } catch (_) {}
    else if (sw === 'false' || sw === '0' || p === 'false' || p === '0') try { ls.setItem('palette_switcher_enabled', 'false'); } catch (_) {}
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) d.classList.add('js-scroll-animate');
  } catch (_) {}
})();
