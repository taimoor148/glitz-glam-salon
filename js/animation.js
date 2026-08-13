/* ============================================================
   GLITZ & GLAM — HyperFrames-style motion layer
   Composing HyperFrames animation rules on a live site:

   - waterfall-entry        → hero text cascade on load (after preloader)
   - spring-pop-entrance    → hero filigree settles in place
   - svg-path-draw          → section orn-dividers draw on arrival
   - spring-pop-entrance    → divider gems pop, trust strip stats land
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 0. Hero load reveal (purge → reveal) ----------
     A single deterministic GSAP timeline starts the moment the
     preloader begins to clear and choreographs the hero's entrance:
     the media softens in, text lines cascade (waterfall-entry driven
     by the CSS transitions that already own their transforms — each
     line carries a data-delay), filigree settles into place and the
     vertical side labels glide in. ClearProps hands the filigree back
     to the stylesheet so responsive opacities are preserved.
     Reduced-motion and missing GSAP show the hero instantly.        */
  function initHeroLoad() {
    var hero = document.querySelector('.hero');
    if (!hero) return;

    var reveals = Array.prototype.slice.call(hero.querySelectorAll('.reveal-up, .reveal'));
    var orns = Array.prototype.slice.call(hero.querySelectorAll('.hero-orn'));
    var index = hero.querySelector('.hero-index');
    var side = hero.querySelector('.hero-side');
    var media = hero.querySelector('.hero-media');

    function showText() {
      reveals.forEach(function (el) { el.classList.add('in'); });
    }

    if (reduceMotion || typeof window.gsap === 'undefined') { showText(); return; }

    var started = false;
    function play() {
      if (started) return;
      started = true;

      var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (media) tl.fromTo(media, { opacity: 0.35 }, { opacity: 1, duration: 1.2 }, 0);
      if (orns.length) tl.fromTo(orns, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 0.5, duration: 0.9, ease: 'power2.out', stagger: 0.14 }, 0.15);
      /* the text cascade is driven by a plain timer so the reveal never
         depends on the GSAP ticker (also keeps it robust, and testable
         in environments where rAF-based timers are throttled) */
      window.setTimeout(showText, 450);
      if (index) tl.fromTo(index, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.0);
      if (side) tl.fromTo(side, { x: 18, opacity: 0 }, { x: 0, opacity: 0.75, duration: 0.7 }, 1.15);
      /* hand the filigree back to the stylesheet (restores responsive opacity) */
      tl.set([orns, index, side], { clearProps: 'all' }, 1.7);
    }

    function forceVisible() {
      if (started) return;
      started = true;
      showText();
      if (typeof window.gsap !== 'undefined') {
        gsap.set([media, orns, index, side], { clearProps: 'all' });
      }
    }

    window.addEventListener('load', function () {
      var preloader = document.querySelector('.preloader');
      var failsafe = window.setTimeout(forceVisible, 4000); /* the hero must never stay hidden */

      function ready() {
        if (!preloader || preloader.classList.contains('is-done')) {
          if (observer) observer.disconnect();
          window.clearTimeout(failsafe);
          window.setTimeout(play, 300);
        }
      }
      var observer = preloader ? new MutationObserver(ready) : null;
      if (observer) observer.observe(preloader, { attributes: true, attributeFilter: ['class'] });
      ready();
    });
  }
  initHeroLoad();

  if (typeof window.gsap === 'undefined' || reduceMotion) return;

  /* ---------- 1. Ornament dividers: svg-path-draw + spring-pop-entrance ---------- */
  function initDividerDraw() {
    var dividers = Array.prototype.slice.call(document.querySelectorAll('.orn-divider'));
    if (!dividers.length || !('IntersectionObserver' in window)) return;

    function draw(div) {
      var svg = div.querySelector('svg') || div;
      var lines = Array.prototype.slice.call(svg.querySelectorAll('g path:not([stroke])'));
      var sideGems = Array.prototype.slice.call(svg.querySelectorAll('g path[stroke="none"]'));
      var dots = Array.prototype.slice.call(svg.querySelectorAll('g circle'));
      var centerGem = svg.querySelector('g + path') || svg.querySelector(':scope > path');

      lines.forEach(function (line, i) {
        var len = line.getTotalLength() || 66;
        /* left line draws outer→center (+len), right line reverses (draws end→start) */
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: i === 0 ? len : -len });
      });

      var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (lines.length) tl.to(lines, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' }, 0);
      if (centerGem) {
        tl.fromTo(centerGem,
          { scale: 0, rotation: -60, transformOrigin: '50% 50%', transformBox: 'fill-box' },
          { scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(2)' }, 0.15);
      }
      if (sideGems.length) {
        tl.fromTo(sideGems,
          { scale: 0, transformOrigin: '50% 50%', transformBox: 'fill-box' },
          { scale: 1, duration: 0.5, ease: 'back.out(3)', stagger: 0.08 }, 0.3);
      }
      if (dots.length) {
        tl.fromTo(dots,
          { scale: 0, transformOrigin: '50% 50%', transformBox: 'fill-box' },
          { scale: 1, duration: 0.5, ease: 'back.out(3)', stagger: 0.08 }, 0.4);
      }
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { draw(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    dividers.forEach(function (d) { obs.observe(d); });
  }
  initDividerDraw();

  /* ---------- 2. Trust strip: spring-pop-entrance as one beat ---------- */
  function initTrustEntrance() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.trust-item'));
    if (!items.length || !('IntersectionObserver' in window)) return;

    var section = items[0].parentElement;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          gsap.fromTo(items,
            { y: 26, autoAlpha: 0, scale: 0.96 },
            { y: 0, autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power3.out', stagger: 0.09 });
          obs.disconnect();
        }
      });
    }, { threshold: 0.35 });
    obs.observe(section);
  }
  initTrustEntrance();
})();