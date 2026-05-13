/**
 * Tenda Analytics — Premium Animations
 * - Animated number counters
 * - IntersectionObserver scroll reveal
 * - Sticky navbar transparency on scroll
 * - Cursor glow (optional enhancement)
 */

(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ══════════════════════════════════════════════════════════════
     1. SCROLL REVEAL — adds .ta-is-visible when element enters viewport
     ══════════════════════════════════════════════════════════════ */

  function initScrollReveal() {
    const els = document.querySelectorAll('.ta-animate');
    if (!els.length) return;

    if (reducedMotion) {
      els.forEach((el) => el.classList.add('ta-is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ta-is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
    );

    els.forEach((el) => observer.observe(el));
  }

  /* ══════════════════════════════════════════════════════════════
     2. ANIMATED COUNTERS
     Usage: <span data-ta-counter="1500" data-ta-suffix="+">0</span>
     ══════════════════════════════════════════════════════════════ */

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCounter(el) {
    const target   = parseFloat(el.getAttribute('data-ta-counter') || '0');
    const suffix   = el.getAttribute('data-ta-suffix') || '';
    const prefix   = el.getAttribute('data-ta-prefix') || '';
    const duration = parseInt(el.getAttribute('data-ta-duration') || '1800', 10);
    const decimals = (String(target).split('.')[1] || '').length;
    const start    = performance.now();

    function frame(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current  = easeOutQuart(progress) * target;
      el.textContent = prefix + current.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-ta-counter]');
    if (!counters.length) return;

    if (reducedMotion) {
      counters.forEach((el) => {
        const target = el.getAttribute('data-ta-counter') || '0';
        const suffix = el.getAttribute('data-ta-suffix') || '';
        const prefix = el.getAttribute('data-ta-prefix') || '';
        el.textContent = prefix + target + suffix;
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  /* ══════════════════════════════════════════════════════════════
     3. STICKY TRANSPARENT NAVBAR
     Adds .ta-navbar-scroll to <body> when scrolled past threshold
     ══════════════════════════════════════════════════════════════ */

  function initStickyNav() {
    const THRESHOLD = 20;

    function onScroll() {
      if (window.scrollY > THRESHOLD) {
        document.body.classList.add('ta-navbar-scroll');
      } else {
        document.body.classList.remove('ta-navbar-scroll');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial state
  }

  /* ══════════════════════════════════════════════════════════════
     4. SMOOTH SCROLL for anchor links
     ══════════════════════════════════════════════════════════════ */

  function initSmoothScroll() {
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.querySelector('.header-wrapper')?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  }

  /* ══════════════════════════════════════════════════════════════
     5. PARALLAX ORBS (subtle, performance-safe)
     ══════════════════════════════════════════════════════════════ */

  function initParallaxOrbs() {
    if (reducedMotion) return;
    const orbs = document.querySelectorAll('.ta-orb-parallax');
    if (!orbs.length) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          orbs.forEach((orb) => {
            const speed = parseFloat(orb.getAttribute('data-speed') || '0.15');
            orb.style.transform = `translateY(${y * speed}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ══════════════════════════════════════════════════════════════
     6. MARQUEE — duplicate items if needed for seamless loop
     ══════════════════════════════════════════════════════════════ */

  function initMarquees() {
    document.querySelectorAll('.ta-marquee-inner').forEach((inner) => {
      // Clone children to ensure continuous loop
      const clone = inner.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      inner.parentElement.appendChild(clone);
    });
  }

  /* ══════════════════════════════════════════════════════════════
     7. HOVER TILT on cards (subtle 3D effect)
     ══════════════════════════════════════════════════════════════ */

  function initTiltCards() {
    if (reducedMotion) return;
    const cards = document.querySelectorAll('[data-ta-tilt]');
    if (!cards.length) return;

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect   = card.getBoundingClientRect();
        const x      = e.clientX - rect.left;
        const y      = e.clientY - rect.top;
        const cx     = rect.width  / 2;
        const cy     = rect.height / 2;
        const tiltX  = ((y - cy) / cy) * -6;
        const tiltY  = ((x - cx) / cx) *  6;
        card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ══════════════════════════════════════════════════════════════
     8. INIT ALL
     ══════════════════════════════════════════════════════════════ */

  function init() {
    initScrollReveal();
    initCounters();
    initStickyNav();
    initSmoothScroll();
    initParallaxOrbs();
    initMarquees();
    initTiltCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-run reveal + counters when Shopify loads a new section in the editor
  if (window.Shopify?.designMode) {
    document.addEventListener('shopify:section:load', () => {
      initScrollReveal();
      initCounters();
      initMarquees();
      initTiltCards();
    });
  }

})();
