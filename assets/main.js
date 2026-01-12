(function () {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const btn = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);

  if (btn) {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "light" ? "" : "light";
      if (next) {
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      } else {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "");
      }
    });
  }

  // Scroll reveal (subtle)
  const candidates = [
    ".page-head",
    ".section-head",
    ".card",
    ".mini-item",
    ".hero h1",
    ".hero .lead",
    ".hero .cta"
  ];
  const nodes = document.querySelectorAll(candidates.join(","));
  nodes.forEach(n => n.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.14 });

    nodes.forEach(n => io.observe(n));
  } else {
    // Fallback: no observer support
    nodes.forEach(n => n.classList.add("in"));
  }


  // Mouse-follow tilt for Featured Work (subtle)
  const tiltEls = document.querySelectorAll(".tilt");
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }

  if (!prefersReduced) {
    tiltEls.forEach((el) => {
      let raf = null;

      const onMove = (ev) => {
        const r = el.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width;   // 0..1
        const y = (ev.clientY - r.top) / r.height;  // 0..1

        // set CSS vars for glow origin
        el.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
        el.style.setProperty("--my", (y * 100).toFixed(1) + "%");

        const rx = clamp((0.5 - y) * 8, -6, 6);  // degrees
        const ry = clamp((x - 0.5) * 10, -8, 8);

        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
        });
      };

      const onLeave = () => {
        if (raf) cancelAnimationFrame(raf);
        el.style.transform = "";
        el.style.removeProperty("--mx");
        el.style.removeProperty("--my");
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
    });
  }

  // Scroll-based gentle parallax for "What I do" cards
  const what = document.getElementById("what-i-do");
  const floatCards = what ? what.querySelectorAll(".grid-3 .card") : [];
  floatCards.forEach(c => c.classList.add("parallax-card"));

  function onScrollParallax(){
    if (!what || prefersReduced) return;
    const rect = what.getBoundingClientRect();
    const viewH = window.innerHeight || document.documentElement.clientHeight;

    // progress 0..1 across viewport
    const start = viewH;
    const end = -rect.height;
    const p = clamp((start - rect.top) / (start - end), 0, 1);

    floatCards.forEach((card, i) => {
      // staggered float: small translateY and tiny rotateZ
      const amp = 10 + i * 4; // px
      const t = (p - 0.5) * 2; // -1..1
      const y = -t * amp;
      const rz = t * (0.5 + i * 0.15); // degrees
      card.style.transform = `translateY(${y.toFixed(2)}px) rotateZ(${rz.toFixed(2)}deg)`;
    });
  }

  window.addEventListener("scroll", onScrollParallax, { passive: true });
  window.addEventListener("resize", onScrollParallax);
  onScrollParallax();

})();