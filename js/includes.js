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
});
