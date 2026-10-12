# Contributing

To suggest a package, use the website form or the "Submit an abandoned project" issue template.

To add a project to the index:
1. Add it to `README.md` first. The README is the source of truth.
2. Append an entry to `projects` in `site/projects.js`.
3. Run `node site/tools/prerender.mjs`.
4. Preview with `cd site && python3 -m http.server 8360`.
