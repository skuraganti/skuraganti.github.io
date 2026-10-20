// Progressive enhancement only: theme toggle and project filter.
// Everything on the page is readable without this file.
(function () {
  "use strict";
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function stored() {
    try {
      var t = localStorage.getItem("theme");
      return t === "light" || t === "dark" ? t : null;
    } catch (e) { return null; }
  }
  function save(t) {
    try { localStorage.setItem("theme", t); } catch (e) { /* storage blocked: choice lasts for this page view */ }
  }
  function current() {
    var t = root.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return media && media.matches ? "dark" : "light";
  }

  function initTheme() {
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    var t = stored();
    if (t) root.setAttribute("data-theme", t);
    function sync() {
      var dark = current() === "dark";
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
      btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      btn.setAttribute("title", dark ? "Switch to light theme" : "Switch to dark theme");
    }
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      save(next);
      sync();
    });
    if (media) {
      var onChange = function () { if (!root.hasAttribute("data-theme")) sync(); };
      if (media.addEventListener) media.addEventListener("change", onChange);
      else if (media.addListener) media.addListener(onChange);
    }
    sync();
    btn.hidden = false;
  }

  function initFilter() {
    var bar = document.querySelector(".filter");
    if (!bar) return;
    var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
    var projects = Array.prototype.slice.call(document.querySelectorAll(".project[data-cat]"));
    var count = bar.querySelector(".filter-count");
    var empty = document.querySelector(".filter-empty");
    var groups = Array.prototype.slice.call(document.querySelectorAll("[data-group-list]"));

    function apply(cat) {
      var shown = 0;
      projects.forEach(function (p) {
        var match = cat === "all" || p.getAttribute("data-cat") === cat;
        p.hidden = !match;
        if (match) shown++;
      });
      groups.forEach(function (list) {
        var any = list.querySelector(".project:not([hidden])");
        var title = document.querySelector('[data-group="' + list.getAttribute("data-group-list") + '"]');
        list.hidden = !any;
        if (title) title.hidden = !any;
      });
      bar.querySelectorAll("button[data-filter]").forEach(function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-filter") === cat ? "true" : "false");
      });
      var noun = projects.length === 1 ? "project" : "projects";
      count.textContent = "Showing " + shown + " of " + projects.length + " " + noun;
      if (empty) empty.hidden = shown !== 0;
    }

    buttons.forEach(function (b) {
      b.addEventListener("click", function () { apply(b.getAttribute("data-filter")); });
    });
    bar.hidden = false;
    apply("all");
  }

  function start() { initTheme(); initFilter(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
