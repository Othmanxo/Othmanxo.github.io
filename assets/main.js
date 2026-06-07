(function () {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

  if (themeToggle) {
    const updateThemeLabel = () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      themeToggle.textContent = isLight ? "Dark" : "Light";
      themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    };

    updateThemeLabel();
    themeToggle.addEventListener("click", () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      if (isLight) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
      updateThemeLabel();
    });
  }

  const progressEl = document.getElementById("scrollProgress");
  const updateProgress = () => {
    if (!progressEl) return;
    const page = document.documentElement;
    const distance = page.scrollHeight - page.clientHeight || 1;
    const progress = ((page.scrollTop || document.body.scrollTop) / distance) * 100;
    progressEl.style.width = progress.toFixed(2) + "%";
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  const revealNodes = document.querySelectorAll([
    ".page-head",
    ".section-head",
    ".card",
    ".mini-item",
    ".hero h1",
    ".hero .lead",
    ".hero .cta",
    ".pills li"
  ].join(","));

  revealNodes.forEach((node) => node.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14 });

    revealNodes.forEach((node) => observer.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add("in"));
  }
})();
