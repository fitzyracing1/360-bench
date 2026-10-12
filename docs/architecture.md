# Architecture (website)

The site is plain HTML, CSS and vanilla JS in `site/`, with no build step. `.github/workflows/pages.yml` deploys it on pushes to `main` that touch `site/**`, or on manual dispatch.

| File | Role |
|---|---|
| `site/index.html` | page with prerendered project cards (`<!-- PROJECTS:START/END -->`, `<!-- DIAL:START/END -->`) |
| `site/projects.js` | all project data |
| `site/render.js` | data → HTML (browser and prerender) |
| `site/app.js` | filters, snippet tabs, copy buttons, submission form |
| `site/tools/prerender.mjs` | `node site/tools/prerender.mjs` refreshes the no-JS HTML |
| `.github/ISSUE_TEMPLATE/submit-project.yml` | issue form for suggesting a project |

Preview the site locally with `cd site && python3 -m http.server 8360`.

The submission form has no backend. It builds either a `mailto:` link or a prefilled public GitHub issue URL.
