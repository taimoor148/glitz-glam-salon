/* ============================================================
   GLITZ & GLAM — advanced interaction layer
   Award-level motion: custom cursor, scroll progress,
   back-to-top affordance, portfolio 3D tilt.
   All motion is transform/opacity only and guarded by
   reduced-motion + touch/fine-pointer media queries.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- 1. Custom cursor ---------- */
  function initCursor() {
    if (reduceMotion || !finePointer) return;
    var ring = document.querySelector('[data-cursor-ring]');
    var dot = document.querySelector('[data-cursor-dot]');
    if (!ring || !dot) return;

    var x = window.innerWidth / 2;
    var y = window.innerHeight / 2;
    var rx = x, ry = y;
    var hovered = false;
    var HOVER_SELECTOR = 'a, button, [data-magnetic], .svc-row, .pf-card, .svc-filter-btn, .pf-filter-btn, .carousel-arrow, .carousel-dot, .marquee, [data-scroll-to], .to-top';

    function placeDot(cx, cy) {
      dot.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%)';
    }
    function loop() {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%) scale(' + (hovered ? 1.5 : 1) + ')';
      window.requestAnimationFrame(loop);
    }

    document.addEventListener('mousemove', function (e) {
      x = e.clientX; y = e.clientY;
      document.body.classList.add('cursor-on');
      placeDot(x, y);
    }, { passive: true });
    document.addEventListener('mouseleave', function () {
      document.body.classList.remove('cursor-on');
    });
    document.addEventListener('mouseenter', function () {
      document.body.classList.add('cursor-on');
    });
    document.addEventListener('mouseover', function (e) {
      var target = e.target.closest ? e.target.closest(HOVER_SELECTOR) : null;
      hovered = !!target;
      document.body.classList.toggle('cursor-hover', hovered);
    }, { passive: true });

    placeDot(x, y);
    window.requestAnimationFrame(loop);
  }
  initCursor();

  /* ---------- 1b. Preloader fail-safe ---------- */
  var preloader = document.querySelector('.preloader');
  if (preloader) {
    var hidePre = function () {
      preloader.classList.add('is-done');
    };
    window.addEventListener('load', function () {
      setTimeout(hidePre, 2700);
    });
    if (document.readyState === 'complete') setTimeout(hidePre, 2700);
  }

  /* ---------- 2. Scroll progress bar ---------- */
  function initProgress() {
    var bar = document.querySelector('[data-scroll-progress]');
    if (!bar) return;
    var ticking = false;
    function update() {
      ticking = false;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var p = h > 0 ? Math.min(1, window.scrollY / h) : 0;
      bar.style.transform = 'scaleX(' + p + ')';
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }
  initProgress();

  /* ---------- 3. Back-to-top ---------- */
  function initToTop() {
    var btn = document.getElementById('toTop');
    if (!btn) return;
    function setVisible(v) {
      btn.classList.toggle('is-visible', v);
      if (v) { btn.removeAttribute('aria-hidden'); btn.setAttribute('tabindex', '0'); }
      else { btn.setAttribute('aria-hidden', 'true'); btn.setAttribute('tabindex', '-1'); }
    }
    function onScroll() { setVisible(window.scrollY > 640); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }
  initToTop();

  /* ---------- 3b. Physics press (HyperFrames: physics-press-reaction) ----------
     A tactile squeeze on press and a springy overshoot on release. GSAP reads
     any existing transforms (e.g. the arrow's translateY(-50%)) and keeps them
     intact while tweening scale — transform-only, deterministic, gated.        */
  function initPress() {
    if (reduceMotion || typeof window.gsap === 'undefined') return;
    var targets = Array.prototype.slice.call(document.querySelectorAll(
      '.pf-card, .svc-row, .carousel-arrow, .carousel-dot, .pf-filter-btn, .svc-filter-btn, [data-scroll-to], .to-top'
    ));
    if (!targets.length) return;

    targets.forEach(function (el) {
      var down = false;
      el.addEventListener('pointerdown', function () {
        down = true;
        gsap.to(el, { scale: 0.97, duration: 0.12, ease: 'power1.in', overwrite: 'auto' });
      });
      function lift() {
        if (!down) return;
        down = false;
        gsap.to(el, { scale: 1, duration: 0.55, ease: 'back.out(1.8)', overwrite: 'auto' });
      }
      el.addEventListener('pointerup', lift);
      el.addEventListener('pointerleave', lift);
      el.addEventListener('pointercancel', lift);
    });
  }
  initPress();

  /* ---------- 4. Portfolio 3D tilt ---------- */
  function initTilt() {
    if (reduceMotion || !finePointer || typeof window.gsap === 'undefined') return;
    var cards = Array.prototype.slice.call(document.querySelectorAll('.pf-card'));
    cards.forEach(function (card) {
      var media = card.querySelector('.pf-card-media');
      if (!media) return;
      gsap.set(media, { transformPerspective: 800, transformOrigin: '50% 50%' });
      var toRX = gsap.quickTo(media, 'rotationX', { duration: 0.4, ease: 'power3.out' });
      var toRY = gsap.quickTo(media, 'rotationY', { duration: 0.4, ease: 'power3.out' });
      var toScale = gsap.quickTo(media, 'scale', { duration: 0.4, ease: 'power3.out' });
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        toRY(px * 12);
        toRX(-py * 10);
        toScale(1.045);
      });
      card.addEventListener('mouseleave', function () {
        toRY(0); toRX(0); toScale(1);
      });
    });
  }
  initTilt();
})();