document.addEventListener("DOMContentLoaded", async () => {
  const includeElements = document.querySelectorAll("[data-include]");

  for (const el of includeElements) {
    const file = el.getAttribute("data-include");
    if (!file) continue;

    try {
      const response = await fetch(file);

      if (!response.ok) {
        throw new Error(`Failed to load ${file}: ${response.status}`);
      }

      const html = await response.text();
      el.innerHTML = html;
    } catch (error) {
      console.error(error);
      el.innerHTML = `<!-- Failed to load ${file} -->`;
    }
  }

  /* ===== NAV DROPDOWN (CLICK SUPPORT) ===== */
  const dropdowns = document.querySelectorAll(".nav-dropdown");

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".nav-dropdown-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isOpen = dropdown.classList.contains("open");

      // Close all dropdowns first
      dropdowns.forEach((d) => {
        d.classList.remove("open");
        const t = d.querySelector(".nav-dropdown-toggle");
        if (t) t.setAttribute("aria-expanded", "false");
      });

      // Open clicked one if it was closed
      if (!isOpen) {
        dropdown.classList.add("open");
        toggle.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ===== CLICK OUTSIDE CLOSE ===== */
  document.addEventListener("click", (event) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("open");
        const toggle = dropdown.querySelector(".nav-dropdown-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* ===== ESC KEY CLOSE ===== */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const toggle = dropdown.querySelector(".nav-dropdown-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    }
  });
});
