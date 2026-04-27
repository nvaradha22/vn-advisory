/* ============================================================
   main.js — VN Advisory
   Shared behaviours across all pages.
   components.js handles nav/footer injection.
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. Scroll reveal ── */
  function initReveal () {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length || !window.IntersectionObserver) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ── 2. Reading progress bar (insight & case study pages) ── */
  function initReadingProgress () {
    var bar = document.getElementById('reading-progress');
    if (!bar) return;
    function update () {
      var st  = window.scrollY;
      var dh  = Math.max(
        document.body.scrollHeight, document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      var wh  = window.innerHeight;
      var s   = dh - wh;
      bar.style.width = Math.min(s > 0 ? (st / s) * 100 : 0, 100) + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── 3. Nav shrink on scroll ── */
  function initNavShrink () {
    var nav = document.getElementById('site-nav');
    if (!nav) return;
    function onScroll () {
      if (window.scrollY > 40) {
        nav.style.boxShadow = '0 2px 32px rgba(0,0,0,.35)';
      } else {
        nav.style.boxShadow = '0 1px 24px rgba(0,0,0,.25)';
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── 4. Smooth scroll for anchor links ── */
  function initSmoothScroll () {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ── 5. Form validation feedback (contact page) ── */
  function initFormValidation () {
    var form = document.getElementById('contact-form');
    if (!form) return;
    var inputs = form.querySelectorAll('[required]');
    inputs.forEach(function (input) {
      input.addEventListener('blur', function () {
        if (!this.value.trim()) {
          this.style.borderColor = '#c0392b';
        } else {
          this.style.borderColor = '';
        }
      });
      input.addEventListener('input', function () {
        if (this.value.trim()) {
          this.style.borderColor = '';
        }
      });
    });
  }

  /* ── 6. Insight card hover lift ── */
  function initCardHover () {
    var cards = document.querySelectorAll('.insight-card, .service-card');
    cards.forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px)';
      });
      card.addEventListener('mouseleave', function () {
        this.style.transform = '';
      });
    });
  }

  /* ── Init on DOM ready ── */
  function init () {
    initReveal();
    initReadingProgress();
    initSmoothScroll();
    initFormValidation();
    initCardHover();
    /* Nav shrink runs after components.js injects the nav */
    setTimeout(initNavShrink, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
