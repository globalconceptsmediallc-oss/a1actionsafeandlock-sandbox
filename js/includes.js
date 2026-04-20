// ===== GLOBAL SALE TOGGLE =====
const SALE_ACTIVE = true;

// ===== SALE BAR CLOSE FUNCTION (GLOBAL) =====
function closeSaleBar() {
  const bar = document.getElementById("saleTopbar");
  if (bar) {
    bar.style.transition = "opacity 0.3s ease";
    bar.style.opacity = "0";
    setTimeout(() => {
      bar.style.display = "none";
    }, 300);
  }
  localStorage.setItem("saleBarClosed", "true");
}

document.addEventListener("DOMContentLoaded", async () => {
  const includeElements = document.querySelectorAll("[data-include]");

  // ===== LOAD PARTIALS =====
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

  // ===== SALE BAR CONTROL =====
  const saleBar = document.getElementById("saleTopbar");

  if (saleBar) {
    if (!SALE_ACTIVE) {
      saleBar.style.display = "none";
    } else {
      if (localStorage.getItem("saleBarClosed") === "true") {
        saleBar.style.display = "none";
      }

      if (window.location.href.includes("spring-cleaning-sale")) {
        saleBar.style.display = "none";
      }

      // ===== SALE BAR SHRINK ON SCROLL =====
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          saleBar.classList.add("shrink");
        } else {
          saleBar.classList.remove("shrink");
        }
      });
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

      dropdowns.forEach((d) => {
        d.classList.remove("open");
        const t = d.querySelector(".nav-dropdown-toggle");
        if (t) t.setAttribute("aria-expanded", "false");
      });

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
