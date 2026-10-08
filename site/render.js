/*
 * 360 Bench — HTML renderers shared by the browser (app.js) and the optional
 * no-JS prerender script (tools/prerender.mjs). Pure string functions, no DOM.
 */
(function (root) {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Escape, then turn `backtick spans` into <code>.
  function rich(s) {
    return esc(s).replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  var EXT = '<svg class="ext" aria-hidden="true" viewBox="0 0 12 12" width="10" height="10"><path d="M4 2h6v6M10 2 3 9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function extLink(url, label, cls) {
    return '<a class="' + (cls || "") + '" href="' + esc(url) + '" rel="noopener" target="_blank">' +
      label + EXT + '<span class="visually-hidden"> (opens in a new tab)</span></a>';
  }

  function ecoById(data, id) {
    for (var i = 0; i < data.ecosystems.length; i++) if (data.ecosystems[i].id === id) return data.ecosystems[i];
    return { id: id, label: id, registryLabel: "Registry" };
  }

  // Split a package name into a dim "namespace" part and the bright short name.
  function splitName(p) {
    var n = p.ecosystem === "actions" ? p.name.replace(/@[^@]*$/, "") : p.name;
    var m;
    if ((m = /^(fitzyracing-)(.+)$/.exec(n))) return [m[1], m[2]];
    var i = n.lastIndexOf("/");
    if (p.ecosystem === "go" && /\/v\d+$/.test(n)) i = n.lastIndexOf("/", i - 1);
    return i > 0 ? [n.slice(0, i + 1), n.slice(i + 1)] : ["", n];
  }

  function renderSnippets(p) {
    var id = "snip-" + p.id;
    var multi = p.snippets.length > 1;
    var tabs = "";
    if (multi) {
      tabs = '<div class="snip__tabs" role="tablist" aria-label="Swap-in options for ' + esc(p.name) + '">' +
        p.snippets.map(function (s, i) {
          return '<button type="button" role="tab" class="snip__tab" id="' + id + '-tab-' + i + '" aria-controls="' + id + '-panel-' + i +
            '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? "0" : "-1") + '">' + esc(s.label) + "</button>";
        }).join("") + "</div>";
    }
    var panels = p.snippets.map(function (s, i) {
      var lines = esc(s.code).split("\n").map(function (l) {
        if (s.lang === "diff" && /^\+/.test(l)) return '<span class="ln ln--add">' + l + "</span>";
        if (s.lang === "diff" && /^-/.test(l)) return '<span class="ln ln--del">' + l + "</span>";
        return '<span class="ln">' + l + "</span>";
      }).join("\n");
      var labelled = multi ? ' role="tabpanel" aria-labelledby="' + id + "-tab-" + i + '"' : "";
      return '<div class="snip__panel" id="' + id + "-panel-" + i + '"' + labelled + ">" +
        '<div class="snip__bar"><span class="snip__label">' + esc(s.label) + '</span>' +
        '<button type="button" class="copy" data-copy="' + esc(s.copy || s.code) + '" aria-label="Copy ' + esc(s.label) + ' snippet for ' + esc(p.name) + '">' +
        '<svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14"><rect x="5" y="5" width="9" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M11 3.5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>' +
        '<span class="copy__text">Copy</span></button></div>' +
        '<pre tabindex="0" aria-label="' + esc(s.label) + ' code"><code class="lang-' + esc(s.lang) + '">' + lines + "</code></pre></div>";
    }).join("");
    return '<div class="snip' + (multi ? " snip--multi" : "") + '">' + tabs + panels + "</div>";
  }

  function renderCard(data, p) {
    var eco = ecoById(data, p.ecosystem);
    var parts = splitName(p);
    var hid = "p-" + p.id + "-title";
    var title = p.displayName
      ? '<h4 class="card__name" id="' + hid + '">' + esc(p.displayName) + '</h4><p class="card__pkg"><code>' + esc(p.name) + "</code></p>"
      : '<h4 class="card__name card__name--mono" id="' + hid + '"><span class="ns">' + esc(parts[0]) + "</span>" + esc(parts[1]) + "</h4>" +
        (p.importName ? '<p class="card__pkg">import name <code>' + esc(p.importName) + "</code></p>" : "");
    var refs = (p.issues && p.issues.length)
      ? '<p class="card__refs"><span class="k">Upstream refs</span> ' + p.issues.map(function (r) { return extLink(r.url, esc(r.label), "ref"); }).join(" ") + "</p>"
      : "";
    var note = p.note
      ? '<p class="card__note"><span class="k">Note</span> ' + rich(p.note) + (p.noteUrl ? " " + extLink(p.noteUrl, "Details") : "") + "</p>"
      : "";
    return '<article class="card" data-eco="' + esc(p.ecosystem) + '" id="p-' + esc(p.id) + '" aria-labelledby="' + hid + '">' +
      '<div class="card__top"><span class="chip chip--' + esc(p.ecosystem) + '">' + esc(eco.label) + "</span>" +
      '<span class="card__ver" title="Current fork version">' + esc(p.version) + "</span></div>" +
      title +
      '<p class="card__replaces"><span class="k">Replaces</span> ' + extLink(p.upstreamUrl, "<code>" + esc(p.replaces) + "</code>", "upstream") + "</p>" +
      '<dl class="card__meta">' +
      "<div><dt>Upstream last release</dt><dd>" + esc(p.upstreamLastRelease) + "</dd></div>" +
      "<div><dt>Upstream usage</dt><dd>" + esc(p.upstreamUsage) + "</dd></div>" +
      "<div><dt>License</dt><dd>" + esc(p.license) + "</dd></div>" +
      "</dl>" +
      '<div class="card__fixed"><h5>What&rsquo;s fixed</h5><p>' + rich(p.fixed) + "</p>" + refs + note + "</div>" +
      renderSnippets(p) +
      '<p class="card__links">' +
      extLink(p.repoUrl, "Repo", "btn-link") +
      extLink(p.registryUrl, esc(eco.registryLabel), "btn-link") +
      extLink(p.upstreamUrl, "Upstream", "btn-link") +
      "</p></article>";
  }

  function renderProjects(data) {
    return data.ecosystems.map(function (eco) {
      var items = data.projects.filter(function (p) { return p.ecosystem === eco.id; });
      if (!items.length) return "";
      return '<section class="eco" data-eco="' + esc(eco.id) + '" aria-labelledby="eco-' + esc(eco.id) + '">' +
        '<div class="eco__head"><h3 id="eco-' + esc(eco.id) + '"><span class="chip chip--' + esc(eco.id) + '">' + esc(eco.label) + "</span>" +
        '<span class="eco__count">' + items.length + (items.length === 1 ? " fork" : " forks") + "</span></h3>" +
        '<p class="eco__blurb">' + rich(eco.blurb) + "</p></div>" +
        '<div class="cards">' + items.map(function (p) { return renderCard(data, p); }).join("") + "</div></section>";
    }).join("");
  }

  // Markers around the hero dial: one per fork, evenly spaced, linking to its card.
  function renderDial(data) {
    var n = data.projects.length;
    return data.projects.map(function (p, i) {
      var a = Math.round((360 / n) * i * 100) / 100;
      return '<a class="dial__dot dot--' + esc(p.ecosystem) + '" style="--a:' + a + 'deg" href="#p-' + esc(p.id) + '" title="' + esc(p.displayName || p.name) + '">' +
        '<span class="visually-hidden">' + esc(p.displayName || p.name) + " (" + esc(ecoById(data, p.ecosystem).label) + ")</span></a>";
    }).join("");
  }

  function stats(data) {
    return { forks: data.projects.length, ecosystems: data.ecosystems.filter(function (e) {
      return data.projects.some(function (p) { return p.ecosystem === e.id; });
    }).length };
  }

  root.BenchRender = { esc: esc, rich: rich, renderProjects: renderProjects, renderCard: renderCard, renderDial: renderDial, stats: stats };
})(typeof window !== "undefined" ? window : globalThis);
