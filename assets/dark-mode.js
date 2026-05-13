/**
 * Tenda Analytics — Dark / Light Mode System
 * - System preference detection via prefers-color-scheme
 * - Manual toggle with localStorage persistence
 * - Smooth transition between modes
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'ta-theme';
  const DARK  = 'dark';
  const LIGHT = 'light';
  const TRANSITION_CLASS = 'ta-theme-transitioning';
  const TRANSITION_DURATION = 360;

  /* ── 1. Determine initial theme ─────────────────────────────── */

  function getSystemPreference() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? LIGHT : DARK;
  }

  function getSavedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      return null;
    }
  }

  function getInitialTheme() {
    const saved = getSavedTheme();
    return saved === LIGHT || saved === DARK ? saved : getSystemPreference();
  }

  /* ── 2. Apply theme ─────────────────────────────────────────── */

  function applyTheme(theme, animate) {
    const html = document.documentElement;

    if (animate) {
      html.classList.add(TRANSITION_CLASS);
      setTimeout(() => html.classList.remove(TRANSITION_CLASS), TRANSITION_DURATION);
    }

    html.setAttribute('data-theme', theme);

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {}

    // Sync meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === DARK ? '#08080A' : '#FAFAFA');
    }

    // Dispatch custom event for other scripts to react
    window.dispatchEvent(new CustomEvent('ta:themechange', { detail: { theme } }));
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || getSystemPreference();
    applyTheme(current === DARK ? LIGHT : DARK, true);
  }

  /* ── 3. Apply immediately (before paint) ────────────────────── */

  applyTheme(getInitialTheme(), false);

  /* ── 4. Wire toggle buttons on DOM ready ────────────────────── */

  function wireToggles() {
    document.querySelectorAll('[data-ta-theme-toggle]').forEach((btn) => {
      btn.addEventListener('click', toggleTheme);
      btn.setAttribute('aria-label', 'Toggle color theme');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireToggles);
  } else {
    wireToggles();
  }

  /* ── 5. React to OS-level preference changes ────────────────── */

  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    // Only follow system if user has not explicitly chosen
    if (!getSavedTheme()) {
      applyTheme(e.matches ? LIGHT : DARK, true);
    }
  });

  /* ── 6. Expose public API ────────────────────────────────────── */

  window.TendaTheme = {
    toggle: toggleTheme,
    set: (theme) => applyTheme(theme, true),
    get: () => document.documentElement.getAttribute('data-theme') || getSystemPreference(),
    reset: () => {
      try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
      applyTheme(getSystemPreference(), true);
    },
  };
})();
