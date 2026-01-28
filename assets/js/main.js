/**
 * Template Name: Strategy
 * Template URL: https://bootstrapmade.com/strategy-bootstrap-agency-template/
 * Updated: Jun 06 2025 with Bootstrap v5.3.6
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim(),
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
    selector: ".glightbox",
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        },
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false,
        );
      });
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(
      ".faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header",
    )
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

// core-products.js — Sticky stepper scroll animation (no libs)
(() => {
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const smooth = (t) => t * t * (3 - 2 * t);

  function init() {
    const root = document.querySelector("#core-products");
    if (!root) return;

    const track = root.querySelector(".cp-scroll-track");
    const cards = [...root.querySelectorAll(".cp-card")];
    if (!track || cards.length < 3) return;

    // tune giống Phamily: không kéo nhiều nhưng vẫn có dwell
    const SPEED = 1.15;

    function update() {
      if (getComputedStyle(track).display === "none") return;

      const rect = track.getBoundingClientRect();
      const denom = Math.max(1, track.offsetHeight - window.innerHeight);
      const pRaw = clamp(-rect.top / denom, 0, 1);
      const p = clamp(pRaw * SPEED, 0, 1);

      // 0..2
      let af; // 0..2

      // 0..0.40: step1 -> step2 (0 -> 1)
      // 0.40..0.78: HOLD step2 (1)
      // 0.78..1.00: step2 -> step3 (1 -> 2)
      if (p < 0.4) {
        const t = p / 0.4;
        af = 0 + t * 1;
      } else if (p < 0.78) {
        af = 1;
      } else {
        const t = (p - 0.78) / (1 - 0.78);
        af = 1 + t * 1;
      }

      cards.forEach((card, i) => {
        const d = i - af; // 0 = active
        const ad = Math.abs(d);

        // closeness
        const near = clamp(1 - ad, 0, 1);
        const s = smooth(near);

        // Visuals: active rõ, trên mờ nhẹ, dưới mờ nhẹ
        const op = 0.35 + 0.65 * s; // preview vẫn nhìn rõ
        const bl = (1 - s) * 1; // blur nhẹ
        const sh = 0.25 + 0.75 * s;

        // Stack dọc: shift nhẹ theo active, không chồng card
        const ty = d * 10 + (d < 0 ? -6 : 0); // card trên lùi lên chút

        // Body open/close: chỉ active mở
        const open = smooth(clamp(1 - ad / 0.55, 0, 1));

        card.style.setProperty("--op", op.toFixed(3));
        card.style.setProperty("--bl", `${bl.toFixed(2)}px`);
        card.style.setProperty("--ty", `${ty.toFixed(2)}px`);
        card.style.setProperty("--sh", sh.toFixed(3));
        card.style.setProperty("--open", open.toFixed(3));
      });

      const railP = clamp(af / (cards.length - 1), 0, 1);
      root.style.setProperty("--rail", `${Math.round(railP * 100)}%`);
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else init();
})();

(() => {
  const canvas = document.getElementById("heroWave");
  if (!canvas) return;

  const COLORS = {
    black: "#0A0A0A",
    white: "#FFFFFF",
    orange: "#FF7A18",
    gray: "#9CA3AF",
  };

  const ctx = canvas.getContext("2d", { alpha: true });

  let w = 0,
    h = 0,
    dpr = 1;
  let t = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = Math.floor(rect.width);
    h = Math.floor(rect.height);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // helper: rgba from hex + alpha
  function rgba(hex, a) {
    const c = hex.replace("#", "").trim();
    const r = parseInt(c.slice(0, 2), 16);
    const g = parseInt(c.slice(2, 4), 16);
    const b = parseInt(c.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  // right-side mask alpha (focus on right, fade out to left)
  function rightMaskAlpha(x, y) {
    // center near right-middle
    const cx = w * 0.78;
    const cy = h * 0.58;
    const dx = (x - cx) / (w * 0.55);
    const dy = (y - cy) / (h * 0.55);
    const r = Math.sqrt(dx * dx + dy * dy);
    // radial fade
    let a = 1 - Math.max(0, (r - 0.25) / 0.75);
    // extra fade to the left
    a *= Math.max(0, (x - w * 0.25) / (w * 0.75));
    // top clear (header area)
    const topFade = Math.min(1, Math.max(0, (y - h * 0.18) / (h * 0.22)));
    a *= topFade;
    return Math.max(0, Math.min(1, a));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // dotted wave surface
    const cols = 72; // density ngang
    const rows = 26; // density dọc
    const xStart = w * 0.35; // bắt đầu từ giữa -> phải
    const xEnd = w * 1.08; // vượt ra ngoài phải
    const yBase = h * 0.58;
    const amp = h * 0.1;

    // vertical motion (move along Y)
    const yShift = Math.sin(t * 0.0012) * (h * 0.025);

    for (let j = 0; j < rows; j++) {
      const v = j / (rows - 1);
      for (let i = 0; i < cols; i++) {
        const u = i / (cols - 1);

        // perspective: dots nhỏ dần về xa
        const depth = Math.pow(1 - u, 1.6); // trái xa, phải gần
        const x = xStart + (xEnd - xStart) * u;

        const wave = Math.sin(u * 7.5 + t * 0.002 + v * 2.2) * amp;
        const y = yBase + yShift + wave + (v - 0.5) * (h * 0.22);

        const aMask = rightMaskAlpha(x, y);
        if (aMask <= 0.001) continue;

        const r = 1.2 + 2.2 * (1 - depth); // gần to hơn
        const alpha = (0.08 + 0.4 * (1 - depth)) * aMask;

        // color: gray -> white
        const col = j % 6 === 0 ? COLORS.white : COLORS.gray;
        ctx.fillStyle = rgba(col, alpha);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // animated lines
    const lines = 5;
    for (let k = 0; k < lines; k++) {
      const phase = k * 0.55;
      const isAccent = k === 2;

      ctx.lineWidth = isAccent ? 1.6 : 1.1;
      ctx.strokeStyle = isAccent
        ? rgba(COLORS.orange, 0.55)
        : rgba(COLORS.white, 0.18);

      // dashed moving
      ctx.setLineDash(isAccent ? [10, 16] : [6, 14]);
      ctx.lineDashOffset = -t * (isAccent ? 0.09 : 0.06);

      ctx.beginPath();
      const x0 = w * 0.36;
      const x1 = w * 1.05;
      const y0 = h * (0.48 + k * 0.05) + yShift * 0.8;

      for (let s = 0; s <= 60; s++) {
        const u = s / 60;
        const x = x0 + (x1 - x0) * u;
        const y =
          y0 +
          Math.sin(u * 7.2 + t * 0.0022 + phase) * (h * 0.06) +
          Math.sin(u * 2.4 - t * 0.0016 + phase) * (h * 0.025);

        const aMask = rightMaskAlpha(x, y);
        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        // fade stroke overall using globalAlpha trick (cheap)
        ctx.globalAlpha = Math.max(0.05, Math.min(0.85, aMask));
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    ctx.setLineDash([]);
    t += 16;
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
})();

document.addEventListener("DOMContentLoaded", () => {
  const heading = document.querySelector("#services .slide-in-left");

  if (!heading) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        heading.classList.add("is-visible");
        observer.unobserve(entry.target); // chỉ chạy 1 lần
      }
    },
    {
      threshold: 0.6, // xuất hiện 60% thì chạy
      rootMargin: "0px 0px -80px 0px",
    },
  );

  observer.observe(heading);
});

/* =========================================
   Steps: autoplay once + progress + border sweep + reveal step-by-step
========================================= */
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  ready(function () {
    const root = document.getElementById("services");
    if (!root) return;

    const cards = Array.from(root.querySelectorAll(".service-card"));
    if (!cards.length) return;

    const isTouch = window.matchMedia(
      "(hover: none), (pointer: coarse)",
    ).matches;

    const chipsByIndex = [
      ["OTP", "2FA", "Account recovery"],
      ["IVR", "Call routing", "Contact center"],
      ["Payment alerts", "Reminders", "System notifications"],
      ["Buyer–seller calls", "Delivery coordination", "Number masking"],
      ["Confirmations", "No-show reduction", "Reminders"],
      ["Voice bots", "Smart routing", "Follow-ups"],
    ];

    function escapeHtml(str) {
      return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    function chipsHTML(chips) {
      return (chips || [])
        .slice(0, 3)
        .map((c) => `<span class="chip">${escapeHtml(c)}</span>`)
        .join("");
    }

    // ----- Create panel reveal (Concept 1)
    cards.forEach((card, i) => {
      const p = card.querySelector("p");
      const benefit = p ? p.textContent.trim() : "";

      // Mark enhanced AFTER we successfully create panel
      if (!card.querySelector(".service-reveal")) {
        const reveal = document.createElement("div");
        reveal.className = "service-reveal";
        reveal.setAttribute("aria-hidden", "true");
        reveal.innerHTML = `
          <div class="service-reveal__benefit"></div>
          <div class="service-reveal__chips"></div>
        `;
        card.appendChild(reveal);

        reveal.querySelector(".service-reveal__benefit").textContent =
          benefit || "";
        reveal.querySelector(".service-reveal__chips").innerHTML = chipsHTML(
          chipsByIndex[i] || [],
        );
      }

      card.classList.add("is-enhanced");

      // Mobile: tap to toggle panel (don't hijack <a>)
      card.addEventListener("click", (e) => {
        if (!isTouch) return;
        if (e.target.closest("a")) return;
        card.classList.toggle("is-open");
      });
    });

    // ----- Spotlight (Concept 2) desktop only
    if (!isTouch) {
      let raf = null,
        pending = null;

      function onMove(e) {
        const card = e.currentTarget;
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        pending = { card, x, y };
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = null;
          if (!pending) return;
          pending.card.style.setProperty("--mx", `${pending.x}%`);
          pending.card.style.setProperty("--my", `${pending.y}%`);
          pending = null;
        });
      }

      cards.forEach((card) => card.addEventListener("mousemove", onMove));
    }

    // ----- Popover (Concept 5) on arrow only
    const popover = document.createElement("div");
    popover.id = "services-popover";
    popover.innerHTML = `
      <div class="pop-arrow" aria-hidden="true"></div>
      <div class="pop-title"></div>
      <div class="pop-benefit"></div>
      <div class="pop-chips"></div>
    `;
    document.body.appendChild(popover);

    const popTitle = popover.querySelector(".pop-title");
    const popBenefit = popover.querySelector(".pop-benefit");
    const popChips = popover.querySelector(".pop-chips");
    const popArrow = popover.querySelector(".pop-arrow");

    let active = null;

    function positionPopover(anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      const margin = 12;

      popover.classList.remove("is-mobile");

      if (isTouch) {
        popover.classList.add("is-mobile");
        popover.style.left = `${margin}px`;
        popover.style.right = `${margin}px`;
        popover.style.top = `auto`;
        popover.style.bottom = `${margin}px`;
        return;
      }

      const popW = Math.min(360, window.innerWidth - margin * 2);
      popover.style.width = `${popW}px`;

      const spaceRight = window.innerWidth - rect.right;
      const preferRight = spaceRight > popW + 24;

      let top = rect.top - 8;
      top = Math.max(margin, Math.min(top, window.innerHeight - margin - 200));

      let left;
      if (preferRight) {
        left = rect.right + 10;
        popArrow.style.left = `-5px`;
        popArrow.style.right = `auto`;
        popArrow.style.top = `18px`;
      } else {
        left = rect.left - popW - 10;
        popArrow.style.right = `-5px`;
        popArrow.style.left = `auto`;
        popArrow.style.top = `18px`;
      }

      left = Math.max(
        margin,
        Math.min(left, window.innerWidth - margin - popW),
      );
      popover.style.left = `${left}px`;
      popover.style.top = `${top}px`;
      popover.style.bottom = `auto`;
      popover.style.right = `auto`;
    }

    function openPopover(card, anchorEl, idx) {
      active = { card, anchorEl, idx };

      const title = card.querySelector("h3")
        ? card.querySelector("h3").innerText.trim()
        : "Details";
      const p = card.querySelector("p");
      const benefit = p ? p.textContent.trim() : "";

      popTitle.textContent = title;
      popBenefit.textContent = benefit;
      popChips.innerHTML = chipsHTML(chipsByIndex[idx] || []);

      positionPopover(anchorEl);
      popover.classList.add("is-visible");
    }

    function closePopover() {
      active = null;
      popover.classList.remove("is-visible");
    }

    cards.forEach((card, idx) => {
      const action = card.querySelector(".card-action");
      if (!action) return;

      action.addEventListener("mouseenter", () => {
        if (!isTouch) openPopover(card, action, idx);
      });
      action.addEventListener("mouseleave", () => {
        if (!isTouch) closePopover();
      });

      action.addEventListener("click", (e) => {
        if (!isTouch) return;
        e.preventDefault();
        e.stopPropagation();
        if (
          active &&
          active.card === card &&
          popover.classList.contains("is-visible")
        )
          closePopover();
        else openPopover(card, action, idx);
      });
    });

    window.addEventListener(
      "scroll",
      () => {
        if (active) positionPopover(active.anchorEl);
      },
      { passive: true },
    );
    window.addEventListener("resize", () => {
      if (active) positionPopover(active.anchorEl);
    });

    document.addEventListener("pointerdown", (e) => {
      if (!popover.classList.contains("is-visible")) return;
      const t = e.target;
      const clickedOnPopover = popover.contains(t);
      const clickedOnCard = active && active.card.contains(t);
      if (!clickedOnPopover && !clickedOnCard) closePopover();
    });
  });
})();

/* =========================================
   Steps: autoplay once + progress + border sweep + reveal step-by-step
========================================= */
(function(){
  function ready(fn){
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  ready(function(){
    const section = document.querySelector("#steps");
    if (!section) return;

    const wrapper = section.querySelector(".steps-wrapper");
    const items = Array.from(section.querySelectorAll(".step-item"));
    if (!wrapper || items.length === 0) return;

    // inject progress fill if missing
    if (!wrapper.querySelector(".steps-line-fill")){
      const fill = document.createElement("div");
      fill.className = "steps-line-fill";
      wrapper.appendChild(fill);
    }

    // sync line x (desktop 50% / mobile 25px)
    const mq = window.matchMedia("(max-width: 991px)");
    const syncLineX = () => wrapper.style.setProperty("--steps-line-x", mq.matches ? "25px" : "50%");
    syncLineX();
    mq.addEventListener?.("change", syncLineX);

    const getNodeYs = () => {
      const wRect = wrapper.getBoundingClientRect();
      return items.map(it => {
        const icon = it.querySelector(".step-icon") || it;
        const r = icon.getBoundingClientRect();
        return (r.top + r.height/2) - wRect.top;
      });
    };

    const moveProgressTo = (idx) => {
      const ys = getNodeYs();
      const y = Math.max(0, ys[idx] ?? 0);
      wrapper.style.setProperty("--steps-progress", `${y}px`);
    };

    function setState(idx){
      items.forEach((it, i) => {
        it.classList.remove("is-done","is-active","is-upcoming","pulse","is-revealed","is-sweep");
        if (i === 0) it.classList.add("is-revealed");
        if (i < idx) it.classList.add("is-done","is-revealed");
        else if (i === idx) it.classList.add("is-active","is-revealed");
        else it.classList.add("is-upcoming"); // hidden
      });

      const active = items[idx];
      if (active) {
        active.classList.add("pulse");
        setTimeout(() => active.classList.remove("pulse"), 450);
      }
    }

    // retrigger border sweep each step (reliable)
    function triggerSweep(el){
      el.classList.remove("is-sweep");
      el.offsetHeight; // reflow
      el.classList.add("is-sweep");
    }

    async function playOnce(){
      const sweepMs = 2000; // match your CSS borderSweep duration
      const gapMs = 250;

      // init: only step 1 visible
      items.forEach((it, i) => {
        it.classList.remove("is-done","is-active","is-upcoming","pulse","is-revealed","is-sweep");
        if (i === 0) it.classList.add("is-revealed","is-active");
        else it.classList.add("is-upcoming");
      });
      moveProgressTo(0);
      triggerSweep(items[0]);

      // step-by-step
      for (let i = 1; i < items.length; i++){
        // mark previous done
            items[i].classList.add("is-revealed");
          items[i].classList.remove("is-active");
          items[i].offsetHeight;
          items[i].classList.add("is-active");

        // progress moves first
        moveProgressTo(i);

        // wait sweep finishes then reveal next
        await sleep(sweepMs + gapMs);

        items[i].classList.remove("is-upcoming");
        items[i].classList.add("is-revealed","is-active");

        triggerSweep(items[i]);
      }

      // end: keep last active
      items[items.length - 1].classList.add("is-active","is-revealed");
    }

    // autoplay once when section enters viewport
    let played = false;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !played){
        played = true;
        requestAnimationFrame(() => requestAnimationFrame(playOnce));
        io.unobserve(e.target);
      }
    }, { threshold: 0.35, rootMargin: "0px 0px -120px 0px" });

    io.observe(section);
  });
})();
