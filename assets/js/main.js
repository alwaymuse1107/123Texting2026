/**
* Template Name: Strategy
* Template URL: https://bootstrapmade.com/strategy-bootstrap-agency-template/
* Updated: Jun 06 2025 with Bootstrap v5.3.6
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// core-products.js — Sticky stepper scroll animation (no libs)
(() => {
  function init() {
    const root = document.querySelector('#core-products');
    if (!root) return;

    const stage = root.querySelector('.cp-stage');
    const track = root.querySelector('.cp-scroll-track');

    const cards = [
      root.querySelector('#cp-voice'),
      root.querySelector('#cp-sms'),
      root.querySelector('#cp-mms'),
    ];

    // Debug (you can remove later)
    // console.log('[core-products] cards:', cards.map(Boolean), 'stage:', !!stage, 'track:', !!track);

    if (!stage || !track || cards.some(c => !c)) {
      // console.warn('[core-products] Missing DOM nodes. Check IDs/classes.');
      return;
    }

    const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
    const smoothstep = (t) => t * t * (3 - 2 * t);

    // Tune
    const STEP_Y = 56;
    const EXIT_Y = 34;
    const MAX_BLUR = 10;

    let ticking = false;

    function update() {
      // If track is display:none (mobile breakpoint), stop doing work
      if (getComputedStyle(track).display === 'none') return;

      const stageRect = stage.getBoundingClientRect();
      const trackH = track.offsetHeight;

      // Guard: if track height is 0, animation can't progress
      if (trackH <= 1) return;

      // timeline: from when stage enters -> until stage + track has been consumed
      const start = window.scrollY + stageRect.top;
      const end = start + trackH - window.innerHeight;

      const denom = Math.max(1, end - start);
      const p = clamp((window.scrollY - start) / denom, 0, 1);

      // rail
      root.style.setProperty('--rail', `${Math.round(p * 100)}%`);

      // activeFloat 0..2
      const af = p * (cards.length - 1);

      cards.forEach((card, i) => {
        const d = i - af;
        const ad = Math.abs(d);

        const near = clamp(1 - ad, 0, 1);
        const s = smoothstep(near);

        // visuals
        const op = 0.20 + 0.80 * s;      // keep previews visible
        const bl = (1 - s) * MAX_BLUR;
        const sc = 0.985 + 0.015 * s;
        const sh = 0.20 + 0.80 * s;

        // stack moves UP as you scroll down
        const base = i * STEP_Y;
        const shift = af * STEP_Y;
        const extraExit = d < 0 ? (1 - s) * EXIT_Y : 0;
        const ty = (base - shift) - extraExit;

        card.style.setProperty('--op', op.toFixed(3));
        card.style.setProperty('--bl', `${bl.toFixed(2)}px`);
        card.style.setProperty('--ty', `${ty.toFixed(2)}px`);
        card.style.setProperty('--sc', sc.toFixed(4));
        card.style.setProperty('--sh', sh.toFixed(3));

        // keep header, collapse body for non-active
        const isActive = ad < 0.45;
        card.classList.toggle('is-active', isActive);
        card.classList.toggle('is-compact', !isActive);

        // ensure stacking order
        card.style.zIndex = String(100 - Math.round(ad * 10) - i);
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // init
    update();
  }

  // Always wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

document.querySelectorAll('#core-products .cp-card').length
getComputedStyle(document.querySelector('#cp-mms')).getPropertyValue('--ty')

