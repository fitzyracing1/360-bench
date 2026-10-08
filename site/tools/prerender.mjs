#!/usr/bin/env node
// Optional: refresh the prerendered (no-JavaScript) project cards, dial markers and
// stats in index.html from projects.js. The live page re-renders from projects.js
// anyway, so this only matters for visitors without JavaScript and for crawlers.
//
//   node site/tools/prerender.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const site = join(dirname(fileURLToPath(import.meta.url)), "..");
const ctx = {};
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(readFileSync(join(site, "projects.js"), "utf8"), ctx);
vm.runInContext(readFileSync(join(site, "render.js"), "utf8"), ctx);
const { BENCH_DATA: data, BenchRender: R } = ctx;

const file = join(site, "index.html");
let html = readFileSync(file, "utf8");
function between(name, content) {
  const re = new RegExp(`(<!-- ${name}:START -->)[\\s\\S]*?(<!-- ${name}:END -->)`);
  if (!re.test(html)) throw new Error(`marker ${name} not found`);
  html = html.replace(re, `$1${content}$2`);
}
between("PROJECTS", R.renderProjects(data));
between("DIAL", R.renderDial(data));
const st = R.stats(data);
html = html.replace(/(<strong data-stat="(\w+)">)[^<]*(<\/strong>)/g, (_, a, k, b) => a + st[k] + b);
writeFileSync(file, html);
console.log(`prerendered ${data.projects.length} projects in ${st.ecosystems} ecosystems into index.html`);
