(function () {
  var existing = document.querySelector('link[rel="canonical"]');
  if (existing) existing.remove();

  var origin = window.location.origin;
  var path = window.location.pathname;

  // Homepage normalization
  if (path === '/index.html') path = '/';

  // Remove .html
  if (path !== '/' && path.endsWith('.html')) {
    path = path.replace(/\.html$/, '');
  }

  // Remove trailing slash except homepage
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  var canonical = document.createElement('link');
  canonical.rel = 'canonical';
  canonical.href = origin + path;
  document.head.appendChild(canonical);
})();
