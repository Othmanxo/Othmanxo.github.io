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


  // Scroll progress bar
  const progressEl = document.getElementById("scrollProgress");
  const updateProgress = () => {
    if (!progressEl) return;
    const h = document.documentElement;
    const scrolled = h.scrollTop || document.body.scrollTop;
    const height = (h.scrollHeight - h.clientHeight) || 1;
    const pct = (scrolled / height) * 100;
    progressEl.style.width = pct.toFixed(2) + "%";
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  // Stronger mouse-follow tilt for ALL cards (still controlled)
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tiltTargets = document.querySelectorAll(".card");
  const clamp2 = (v, min, max) => Math.max(min, Math.min(max, v));

  if (!reduceMotion) {
    tiltTargets.forEach((el) => {
      let raf = null;

      const onMove = (ev) => {
        const r = el.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width;
        const y = (ev.clientY - r.top) / r.height;

        // More visible tilt than before
        const rx = clamp2((0.5 - y) * 10, -9, 9);
        const ry = clamp2((x - 0.5) * 12, -10, 10);

        el.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
        el.style.setProperty("--my", (y * 100).toFixed(1) + "%");

        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
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

    // Magnetic buttons (small but noticeable)
    const btns = document.querySelectorAll(".btn");
    btns.forEach((b) => {
      let raf = null;
      const onMove = (ev) => {
        const r = b.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - 0.5;
        const y = (ev.clientY - r.top) / r.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          b.style.transform = `translate(${(x*10).toFixed(2)}px, ${(y*8).toFixed(2)}px)`;
        });
      };
      const onLeave = () => { if (raf) cancelAnimationFrame(raf); b.style.transform = ""; };
      b.addEventListener("mousemove", onMove);
      b.addEventListener("mouseleave", onLeave);
    });
  }

  // Animated particle background (highly visible)
  const canvas = document.getElementById("bgCanvas");
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d", { alpha: true });
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const state = {
      w: 0, h: 0,
      mouseX: null, mouseY: null,
      particles: []
    };

    const resize = () => {
      state.w = Math.floor(window.innerWidth);
      state.h = Math.floor(window.innerHeight);
      canvas.width = Math.floor(state.w * dpr);
      canvas.height = Math.floor(state.h * dpr);
      canvas.style.width = state.w + "px";
      canvas.style.height = state.h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const count = Math.round(Math.min(70, Math.max(38, state.w / 22)));
    const rand = (a, b) => a + Math.random() * (b - a);

    const init = () => {
      state.particles = [];
      for (let i = 0; i < count; i++) {
        state.particles.push({
          x: rand(0, state.w),
          y: rand(0, state.h),
          vx: rand(-0.35, 0.35),
          vy: rand(-0.25, 0.25),
          r: rand(1.2, 2.6)
        });
      }
    };

    const onMouse = (e) => { state.mouseX = e.clientX; state.mouseY = e.clientY; };
    const onLeave = () => { state.mouseX = null; state.mouseY = null; };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", () => { resize(); init(); });

    resize();
    init();

    const step = () => {
      ctx.clearRect(0, 0, state.w, state.h);

      // Background tint (subtle)
      ctx.globalAlpha = 0.22;
      const g = ctx.createRadialGradient(state.w*0.15, state.h*0.15, 10, state.w*0.15, state.h*0.15, Math.max(state.w, state.h)*0.7);
      g.addColorStop(0, "rgba(110,168,254,0.35)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, state.w, state.h);
      ctx.globalAlpha = 1;

      // Draw particles + lines
      const maxDist = 140;
      for (let i = 0; i < state.particles.length; i++) {
        const p = state.particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < -10) p.x = state.w + 10;
        if (p.x > state.w + 10) p.x = -10;
        if (p.y < -10) p.y = state.h + 10;
        if (p.y > state.h + 10) p.y = -10;

        // Mouse interaction (gentle attraction)
        if (state.mouseX !== null) {
          const dx = state.mouseX - p.x;
          const dy = state.mouseY - p.y;
          const d2 = dx*dx + dy*dy;
          if (d2 < 220*220) {
            p.vx += dx * 0.000002;
            p.vy += dy * 0.000002;
          }
        }

        // Dampen slightly
        p.vx *= 0.999;
        p.vy *= 0.999;

        // Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(234,240,255,0.85)";
        ctx.fill();

        // Connections
        for (let j = i + 1; j < state.particles.length; j++) {
          const q = state.particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < maxDist) {
            const a = (1 - dist / maxDist) * 0.22;
            ctx.strokeStyle = `rgba(110,168,254,${a})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

})();