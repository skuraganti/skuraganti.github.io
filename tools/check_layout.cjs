#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT = process.env.QA_OUTPUT && path.resolve(process.env.QA_OUTPUT);
const VIEWPORTS = [320, 390, 768, 1023, 1024, 1279, 1280, 1440, 1920, 2560];
const TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function closeEnough(actual, expected, label) {
  assert.ok(Math.abs(actual - expected) <= 0.5, `${label}: expected ${expected}, got ${actual}`);
}

function startServer() {
  const server = http.createServer((request, response) => {
    const pathname = new URL(request.url, "http://localhost").pathname;
    const relative = pathname === "/" ? "index.html" : decodeURIComponent(pathname.slice(1));
    const file = path.resolve(ROOT, relative);
    if (!file.startsWith(`${ROOT}${path.sep}`)) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    fs.readFile(file, (error, body) => {
      if (error) {
        response.writeHead(error.code === "ENOENT" ? 404 : 500).end("Not found");
        return;
      }
      response.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" }).end(body);
    });
  });
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

async function main() {
  let server;
  let browser;
  const results = [];
  try {
    const baseUrl = process.env.QA_URL;
    server = baseUrl ? null : await startServer();
    const url = baseUrl || `http://127.0.0.1:${server.address().port}/`;
    const siteOrigin = new URL(url).origin;
    if (OUTPUT) fs.mkdirSync(OUTPUT, { recursive: true });

    browser = await chromium.launch({ headless: true });
    for (const width of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      page.setDefaultTimeout(7000);
      page.setDefaultNavigationTimeout(30000);
      await page.route("**/*", route => {
        const target = new URL(route.request().url());
        return target.origin === siteOrigin ? route.continue() : route.abort("blockedbyclient");
      });
      await page.goto(url, { waitUntil: "networkidle" });

      for (const theme of ["light", "dark"]) {
        await page.evaluate(value => document.documentElement.setAttribute("data-theme", value), theme);
        const layout = await page.evaluate(() => {
          const box = selector => document.querySelector(selector).getBoundingClientRect();
          const wrap = box("#work");
          const heading = box("#work-title");
          const alternate = box("#folio");
          const alternateContent = box("#folio .feature-text");
          return {
            wrap: { left: wrap.left, width: wrap.width },
            contentLeft: heading.left,
            alternateLeft: alternate.left,
            alternateRight: alternate.right,
            alternateContentLeft: alternateContent.left,
            overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          };
        });

        const gutter = width >= 1024 ? 32 : 20;
        closeEnough(layout.contentLeft - layout.wrap.left, gutter, `${width}/${theme} wrapper gutter`);
        closeEnough(layout.alternateLeft, layout.wrap.left, `${width}/${theme} alternate boundary`);
        closeEnough(layout.alternateRight, layout.wrap.left + layout.wrap.width, `${width}/${theme} alternate right boundary`);
        closeEnough(layout.alternateContentLeft, layout.contentLeft, `${width}/${theme} alternate content alignment`);
        assert.ok(layout.overflow <= 0, `${width}/${theme} viewport overflowed by ${layout.overflow}px`);
        if (width === 1920) {
          closeEnough(layout.wrap.width, 1536, `${width}/${theme} wrapper width`);
          closeEnough(layout.wrap.left, 192, `${width}/${theme} wrapper left`);
          closeEnough(layout.contentLeft, 224, `${width}/${theme} content left`);
        }
        if (width === 1440) closeEnough(layout.contentLeft, 32, `${width}/${theme} content left`);
        closeEnough(layout.wrap.width, Math.min(width, 1536), `${width}/${theme} bounded wrapper width`);

        const enlarged = await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        assert.ok(overflow <= 0, `${width}/${theme} enlarged text overflowed by ${overflow}px`);
        await enlarged.evaluate(element => element.remove());

        results.push({ width, theme, ...layout });
        if (OUTPUT) await page.screenshot({ path: path.join(OUTPUT, `${width}-${theme}.png`), fullPage: true });
      }
      await page.close();
    }

    if (OUTPUT) fs.writeFileSync(path.join(OUTPUT, "layout-report.json"), `${JSON.stringify(results, null, 2)}\n`);
    console.log(`OK: ${results.length} rendered layout checks passed at ${url}`);
  } finally {
    if (browser) await browser.close();
    if (server) await new Promise(resolve => server.close(resolve));
  }
}

main().catch(error => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
