/* ============================================================
   GLITZ & GLAM BEAUTY SALON — site interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---------- CENTRAL CONFIG ----------
     Change contact details in one place below.
     whatsapp: international code + number WITHOUT "+", "00" or spaces.
     phone:    full international number for tel: links.
     phoneDisplay: how the number is shown to visitors.            */
  var CONFIG = {
    whatsapp: '923000000000',                 // TODO: replace with real WhatsApp number
    whatsappMessage: 'Hello Glitz & Glam, I would like to book an appointment.',
    phone: '+923000000000',                   // TODO: replace with real salon phone
    phoneDisplay: '+92 300 0000000',          // TODO: replace with real salon phone
    instagram: 'https://instagram.com/',      // TODO: replace with real profile
    facebook: 'https://facebook.com/',        // TODO: replace with real profile
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=WAPDA+Town+Phase+1,+Lahore,+Pakistan'
  };

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- 1. Apply contact configuration ---------- */
  function applyConfig() {
    var waHref = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(CONFIG.whatsappMessage);
    document.querySelectorAll('[data-wa]').forEach(function (a) {
      a.setAttribute('href', waHref);
    });
    document.querySelectorAll('[data-phone]').forEach(function (a) {
      a.setAttribute('href', 'tel:' + CONFIG.phone);
    });
    document.querySelectorAll('[data-phone-label]').forEach(function (el) {
      el.textContent = CONFIG.phoneDisplay;
      el.setAttribute('href', 'tel:' + CONFIG.phone);
    });
    document.querySelectorAll('[data-instagram]').forEach(function (a) {
      a.setAttribute('href', CONFIG.instagram);
    });
    document.querySelectorAll('[data-facebook]').forEach(function (a) {
      a.setAttribute('href', CONFIG.facebook);
    });
  }

  /* ---------- 2. Header scroll state ---------- */
  var header = document.getElementById('siteHeader');

  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- 3. Mobile menu ---------- */
  var navToggle = document.getElementById('navToggle');
  var siteNav = document.getElementById('siteNav');

  function setMenu(open) {
    if (!navToggle || !siteNav) return;
    siteNav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      setMenu(!siteNav.classList.contains('is-open'));
    });
    siteNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1020) setMenu(false);
    });
  }

  /* ---------- 4. Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-up, .hero .eyebrow, .hero .t-line');

  revealEls.forEach(function (el) {
    var d = parseFloat(el.getAttribute('data-delay') || 0);
    if (d > 0) el.style.transitionDelay = d * 0.14 + 's';
  });

  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- 5. Counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-dec') || 0, 10);
    var prefix = el.getAttribute('data-prefix') || '';
    if (isNaN(target)) return;
    if (reduceMotion) { el.textContent = target.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }); return; }

    var duration = 1800;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = prefix + val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll('[data-count]');
  if (reduceMotion) {
    counters.forEach(animateCount);
  } else if ('IntersectionObserver' in window) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countObs.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- 6. Subtle parallax ---------- */
  function initParallax() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
    if (!els.length || reduceMotion || !finePointer) return;

    els.forEach(function (el) { el.classList.add('is-parallax'); });

    var ticking = false;
    function update() {
      ticking = false;
      var vh = window.innerHeight;
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var offset = r.top + r.height / 2 - vh / 2;
        var factor = parseFloat(el.getAttribute('data-parallax')) || 0.1;
        var y = Math.max(-70, Math.min(70, offset * -factor));
        el.style.transform = 'translateY(' + y.toFixed(1) + 'px)';
      });
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }
  initParallax();

  /* ---------- 7. Magnetic buttons ---------- */
  function initMagnetic() {
    if (!finePointer || reduceMotion) return;
    document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        var mx = Math.max(-7, Math.min(7, dx * 0.18));
        var my = Math.max(-7, Math.min(7, dy * 0.3));
        btn.style.transform = 'translate(' + mx.toFixed(1) + 'px, ' + my.toFixed(1) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }
  initMagnetic();

  /* ---------- 8. Active navigation highlight ---------- */
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));

  if ('IntersectionObserver' in window) {
    var spyObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) {
            l.classList.toggle('is-active', l.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-42% 0px -55% 0px', threshold: 0 });
    sections.forEach(function (s) { spyObs.observe(s); });

    // ensure the last linked section stays active at the very bottom
    var lastLink = navLinks[navLinks.length - 1];
    window.addEventListener('scroll', function () {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        navLinks.forEach(function (l) { l.classList.toggle('is-active', l === lastLink); });
      }
    }, { passive: true });
  }

  /* ---------- 9. Scroll indicator ---------- */
  var scrollBtn = document.querySelector('[data-scroll-to]');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', function () {
      var target = document.querySelector(scrollBtn.getAttribute('data-scroll-to'));
      if (target) target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  }

  /* ---------- 10. Portfolio showcase carousel ---------- */
  function initCarousel() {
    var carousel = document.querySelector('[data-carousel]');
    if (!carousel) return;
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('[data-slide]'));
    var dots = Array.prototype.slice.call(carousel.querySelectorAll('[data-dot]'));
    var prev = carousel.querySelector('[data-carousel-prev]');
    var next = carousel.querySelector('[data-carousel-next]');
    if (!slides.length) return;

    var current = 0;
    var timer = null;
    var INTERVAL = reduceMotion ? 0 : 6000;

    function go(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('is-active', i === current); });
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === current); });
    }

    function auto() {
      if (!INTERVAL) return;
      clearInterval(timer);
      timer = setInterval(function () { go(current + 1); }, INTERVAL);
    }
    function restart() { auto(); }

    if (prev) prev.addEventListener('click', function () { go(current - 1); restart(); });
    if (next) next.addEventListener('click', function () { go(current + 1); restart(); });
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { go(i); restart(); });
    });
    carousel.addEventListener('mouseenter', function () { clearInterval(timer); });
    carousel.addEventListener('mouseleave', auto);
    carousel.addEventListener('focusin', function () { clearInterval(timer); });
    carousel.addEventListener('focusout', auto);

    document.addEventListener('keydown', function (e) {
      if (!carousel.matches(':hover') && !carousel.contains(document.activeElement)) return;
      if (e.key === 'ArrowLeft') { go(current - 1); restart(); }
      if (e.key === 'ArrowRight') { go(current + 1); restart(); }
    });

    go(0);
    auto();
  }
  initCarousel();

  /* ---------- 11. Filterable sections (portfolio + services) ---------- */
  function initFilter(bar, grid, cardSel) {
    if (!bar || !grid) return;
    var btns = Array.prototype.slice.call(bar.querySelectorAll('[data-filter]'));
    var cards = Array.prototype.slice.call(grid.querySelectorAll(cardSel));

    var filter = 'all';
    function apply() {
      cards.forEach(function (card) {
        var match = filter === 'all' || card.getAttribute('data-cat') === filter;
        card.classList.toggle('is-hiding', !match);
      });
      // restore reveal state so freshly-shown cards animate in
      if ('IntersectionObserver' in window && !reduceMotion) {
        cards.forEach(function (card) {
          if (!card.classList.contains('is-hiding') && !card.classList.contains('in')) {
            card.classList.add('in');
          }
        });
      }
    }

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.classList.contains('is-active')) return;
        btns.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        filter = btn.getAttribute('data-filter');
        apply();
      });
    });

    apply();
  }
  initFilter(document.querySelector('[data-filter-bar]'), document.querySelector('[data-portfolio-grid]'), '.pf-card');
  initFilter(document.querySelector('[data-services-filter]'), document.querySelector('.service-grid'), '.service-card');

  /* ---------- 12. Lightbox ---------- */
  function initLightbox() {
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    var img = lb.querySelector('.lightbox-img');
    var caption = lb.querySelector('.lightbox-caption');
    var closeBtn = lb.querySelector('[data-lightbox-close]');
    var prevBtn = lb.querySelector('[data-lightbox-prev]');
    var nextBtn = lb.querySelector('[data-lightbox-next]');

    var items = [];
    var current = -1;
    var lastFocus = null;

    function collect() {
      var map = {};
      items = [];
      Array.prototype.forEach.call(document.querySelectorAll('[data-full]'), function (el) {
        var src = el.getAttribute('data-full');
        if (map[src] !== undefined) return;
        map[src] = items.length;
        var title = el.querySelector('.pf-title, .carousel-title') || null;
        items.push({ src: src, title: title ? title.textContent.trim() : '' });
      });
    }

    function open(index) {
      if (!items.length) return;
      current = (index + items.length) % items.length;
      lastFocus = document.activeElement;
      var item = items[current];
      img.setAttribute('src', item.src);
      img.setAttribute('alt', item.title);
      caption.textContent = item.title;
      lb.classList.add('is-open');
      lb.classList.remove('is-ready');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function close() {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function show() {
      lb.classList.add('is-ready');
      img.focus && img.focus();
    }

    collect();
    gridDelegates();

    function gridDelegates() {
      var grid = document.querySelector('[data-portfolio-grid]');
      var carousel = document.querySelector('[data-carousel]');
      [grid, carousel].forEach(function (root) {
        if (!root) return;
        root.addEventListener('click', function (e) {
          var card = e.target.closest('.pf-card, .carousel-slide');
          if (!card) return;
          collect();
          var idx = items.findIndex(function (i) { return i.src === card.getAttribute('data-full'); });
          if (idx !== -1) open(idx);
        });
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', close);
    if (prevBtn) prevBtn.addEventListener('click', function () { open(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { open(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') open(current - 1);
      if (e.key === 'ArrowRight') open(current + 1);
    });

    img.addEventListener('load', show);
  }
  initLightbox();

  /* ---------- Init ---------- */
  applyConfig();
})();