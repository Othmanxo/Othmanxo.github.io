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

})();