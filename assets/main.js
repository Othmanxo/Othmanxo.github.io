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
})();