(() => {
  const d = document.documentElement, ls = localStorage, $ = s => document.querySelectorAll(s), byId = id => document.getElementById(id);
  const sa = (el, k, v) => el && el.setAttribute(k, String(v));
  const getTheme = () => d.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const getPalette = () => d.getAttribute('data-palette') || 'cyan';
  const FLAG = 'palette_switcher_enabled';

  function setBtn(t) {
    const dark = t === 'dark';
    $('.theme-toggle, [data-theme-toggle]').forEach(b => {
      sa(b, 'aria-pressed', dark);
      sa(b, 'aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      const l = b.querySelector('.theme-toggle-label');
      if (l) l.textContent = dark ? 'Light' : 'Dark';
    });
  }

  function applyTheme(t) {
    d.setAttribute('data-theme', t);
    try { ls.setItem('theme', t); } catch (_) {}
    setBtn(t);
  }

  function applyPalette(id) {
    d.setAttribute('data-palette', id);
    try { ls.setItem('palette', id); } catch (_) {}
    $('[data-palette-choice]').forEach(b => sa(b, 'aria-pressed', b.dataset.paletteChoice === id));
  }

  function syncSwitcher(show) {
    const bar = byId('palette-switcher-bar'), tog = byId('toggle-palette-feature');
    sa(tog, 'aria-expanded', show);
    if (!bar) return;
    bar.hidden = !show;
    if (show) {
      const cur = getPalette();
      $('[data-palette-choice]').forEach(b => sa(b, 'aria-pressed', b.dataset.paletteChoice === cur));
    }
  }

  function toggleSwitcher(focus) {
    const next = ls.getItem(FLAG) !== 'true';
    try { ls.setItem(FLAG, String(next)); } catch (_) {}
    syncSwitcher(next);
    if (next && focus) {
      const btn = document.querySelector('[data-palette-choice][aria-pressed="true"]') || document.querySelector('[data-palette-choice]');
      if (btn) btn.focus();
    }
  }

  function closeSwitcher() {
    try { ls.setItem(FLAG, 'false'); } catch (_) {}
    syncSwitcher(false);
    const tog = byId('toggle-palette-feature');
    if (tog) tog.focus();
  }

  function initScroll() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const els = $('.card, .hero-panel, .timeline-item, .callout, .table-container, .scroll-reveal');
    if (window.CSS && CSS.supports && CSS.supports('animation-timeline', 'view()')) {
      return els.forEach(el => el.classList.add('scroll-reveal'));
    }
    const obs = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-revealed');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    els.forEach((el, i) => {
      el.classList.add('scroll-reveal');
      if (!el.dataset.delay && el.parentElement && el.parentElement.classList.contains('layout-grid-2')) {
        el.dataset.delay = (i % 2) + 1;
      }
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-revealed');
      else obs.observe(el);
    });
  }

  function init() {
    setBtn(getTheme());
    syncSwitcher(ls.getItem(FLAG) === 'true');
    initScroll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  document.addEventListener('click', e => {
    const t = e.target, btn = t.closest('.theme-toggle, [data-theme-toggle]'), pal = t.closest('[data-palette-choice]');
    if (btn) { e.preventDefault(); applyTheme(getTheme() === 'dark' ? 'light' : 'dark'); }
    else if (pal) { e.preventDefault(); applyPalette(pal.dataset.paletteChoice); }
    else if (t.closest('#palette-close-btn')) { e.preventDefault(); closeSwitcher(); }
    else if (t.closest('#toggle-palette-feature')) { e.preventDefault(); toggleSwitcher(true); }
  });

  document.addEventListener('keydown', e => {
    if (e.altKey && (e.key === 'p' || e.key === 'P')) {
      e.preventDefault();
      toggleSwitcher(true);
    } else if (e.key === 'Escape') {
      const bar = byId('palette-switcher-bar');
      if (bar && !bar.hidden) closeSwitcher();
    }
  });

  if (window.matchMedia) {
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      try {
        if (!ls.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light');
      } catch (_) {}
    });
  }
})();
