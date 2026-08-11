/* =========================================================
   A1 Action Safe & Lock
   File: js/seo-canonical.js
   Version: 1.1.0
   Status: Production Road-Test Candidate
   Purpose:
   Maintain canonical URL normalization and apply verified shared
   business identity fields to existing LocalBusiness/Locksmith JSON-LD.

   Change Notes:
   - Preserves existing canonical URL normalization behavior.
   - Adds the verified A1 physical address to existing Locksmith or
     LocalBusiness structured data only when address is missing.
   - Preserves each page's existing URL, image, description, areaServed,
     telephone, and other page-specific schema fields.
   - Supports direct JSON-LD objects, arrays, and @graph structures.
   - Does not create a second LocalBusiness/Locksmith entity.
   ========================================================= */

(function () {
  "use strict";

  var preferredOrigin = "https://www.a1actionsafeandlock.com";

  var verifiedBusinessAddress = {
    "@type": "PostalAddress",
    "streetAddress": "2460 Aurora Road",
    "addressLocality": "Melbourne",
    "addressRegion": "FL",
    "postalCode": "32935",
    "addressCountry": "US"
  };

  function normalizeCanonical() {
    var path = window.location.pathname;

    path = path.replace(/\/index\.html$/i, "/");

    if (path !== "/" && path.endsWith(".html")) {
      path = path.replace(/\.html$/i, "");
    }

    if (path.length > 1 && path.endsWith("/")) {
      path = path.slice(0, -1);
    }

    var canonicalUrl = preferredOrigin + path;

    document.querySelectorAll('link[rel="canonical"]').forEach(function (el) {
      el.remove();
    });

    var link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    link.setAttribute("href", canonicalUrl);
    document.head.appendChild(link);
  }

  function isLocalBusinessType(typeValue) {
    if (Array.isArray(typeValue)) {
      return typeValue.some(isLocalBusinessType);
    }

    var type = String(typeValue || "").trim().toLowerCase();

    return type === "locksmith" ||
      type === "localbusiness" ||
      type === "local business";
  }

  function applyVerifiedAddress(node) {
    var changed = false;

    if (Array.isArray(node)) {
      node.forEach(function (item) {
        if (applyVerifiedAddress(item)) {
          changed = true;
        }
      });
      return changed;
    }

    if (!node || typeof node !== "object") {
      return false;
    }

    if (isLocalBusinessType(node["@type"]) && !node.address) {
      node.address = Object.assign({}, verifiedBusinessAddress);
      changed = true;
    }

    if (Array.isArray(node["@graph"])) {
      node["@graph"].forEach(function (item) {
        if (applyVerifiedAddress(item)) {
          changed = true;
        }
      });
    }

    return changed;
  }

  function normalizeBusinessSchema() {
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function (script) {
      var raw = String(script.textContent || "").trim();

      if (!raw) {
        return;
      }

      try {
        var data = JSON.parse(raw);

        if (applyVerifiedAddress(data)) {
          script.textContent = JSON.stringify(data, null, 2);
        }
      } catch (error) {
        console.warn("A1 SEO schema normalization skipped invalid JSON-LD.", error);
      }
    });
  }

  normalizeCanonical();
  normalizeBusinessSchema();
})();
