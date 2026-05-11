(function () {
  var preferredOrigin = "https://www.a1actionsafeandlock.com";
  var path = window.location.pathname;

  path = path.replace(/\/index\.html$/i, "/");

  if (path !== "/" && path.endsWith(".html")) {
    path = path.replace(/\.html$/i, "");
  }

  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  var canonicalUrl = preferredOrigin + path;

  document.querySelectorAll('link[rel="canonical"]').forEach(function(el) {
    el.remove();
  });

  var link = document.createElement("link");
  link.setAttribute("rel", "canonical");
  link.setAttribute("href", canonicalUrl);
  document.head.appendChild(link);
})();
