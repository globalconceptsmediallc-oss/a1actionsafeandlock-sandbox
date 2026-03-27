document.addEventListener("DOMContentLoaded", async () => {
  const includeElements = document.querySelectorAll("[data-include]");

  for (const el of includeElements) {
    const file = el.getAttribute("data-include");
    if (!file) continue;

    try {
      const response = await fetch(file);
      const html = await response.text();
      el.innerHTML = html;
    } catch (error) {
      console.error("Include failed:", file);
    }
  }
});
