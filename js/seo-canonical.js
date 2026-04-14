(function () {
  var origin = window.location.origin;
  var path = window.location.pathname;

  // Normalize homepage
  path = path.replace(/\/index\.html$/i, "/");

  // Remove .html from all pages except root
  if (path !== "/" && path.endsWith(".html")) {
    path = path.replace(/\.html$/i, "");
  }

  // Remove trailing slash (except homepage)
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  var canonicalUrl = origin + path;

  // Remove ALL existing canonicals (not just one)
  document.querySelectorAll('link[rel="canonical"]').forEach(function(el) {
    el.remove();
  });

  // Add canonical
  var link = document.createElement("link");
  link.setAttribute("rel", "canonical");
  link.setAttribute("href", canonicalUrl);
  document.head.appendChild(link);
})();
