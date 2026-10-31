/**
 * Accessible Theme Toggle Handler.
 * Toggles data-theme attribute directly on documentElement, persists to localStorage,
 * updates aria-pressed / aria-label on all theme toggle buttons, and avoids page reload.
 */
(() => {
  function getEffectiveTheme() {
    return document.documentElement.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  function updateToggleButtons(theme) {
    const isDark = theme === 'dark';
    document.querySelectorAll('.theme-toggle, [data-theme-toggle]').forEach(btn => {
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      const textSpan = btn.querySelector('.theme-toggle-label');
      if (textSpan) {
        textSpan.textContent = isDark ? 'Light' : 'Dark';
      }
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (_) {}
    updateToggleButtons(theme);
  }

  function toggleTheme() {
    const current = getEffectiveTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }

  // Initialize button states on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      updateToggleButtons(getEffectiveTheme());
    });
  } else {
    updateToggleButtons(getEffectiveTheme());
  }

  // Delegate click for theme-toggle buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.theme-toggle, [data-theme-toggle]');
    if (btn) {
      e.preventDefault();
      toggleTheme();
    }
  });

  // Listen for OS system theme changes when user has not explicitly chosen a preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      try {
        if (!localStorage.getItem('theme')) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      } catch (_) {}
    });
  }
})();
