# 360 Bench website

Static site for https://fitzyracing1.github.io/360-bench/. Plain HTML, CSS and vanilla JS: no build step, no external requests, no trackers.

Deployed by `.github/workflows/pages.yml` on every push to `main` that touches `site/**` (or run it by hand from the Actions tab). The workflow uploads this folder as-is; `preview/` is git-ignored, so it never reaches the checkout or the artifact.

| File | What it is |
|---|---|
| `index.html` | The page. Project cards and dial markers are prerendered between `<!-- PROJECTS:START/END -->` and `<!-- DIAL:START/END -->` so it works without JavaScript. |
| `projects.js` | **All project data.** Edit this to add or change a fork. Every fact must come from the repo's `README.md`. |
| `render.js` | Turns the data into HTML (used by the browser and by the prerender script). |
| `app.js` | Filters, snippet tabs, copy buttons, and the submission form (validation, mailto and GitHub issue URL builders). |
| `styles.css` | Styles. Light and dark via `prefers-color-scheme`. |
| `fonts/` | Self-hosted, Latin-subset Space Grotesk and JetBrains Mono (SIL OFL 1.1, licenses included). |
| `tools/prerender.mjs` | Optional: `node site/tools/prerender.mjs` refreshes the no-JS HTML in `index.html` from `projects.js`. |
| `preview/` | Local review screenshots. Git-ignored, never publish. |

## Add a project

1. Add it to the README first (source of truth).
2. Append an object to `projects` in `projects.js` (copy an existing one in the same ecosystem).
3. Run `node site/tools/prerender.mjs`.
4. Preview: `cd site && python3 -m http.server 8360`, then open http://127.0.0.1:8360/.

## Submission form

There's no backend. "Compose email" opens a `mailto:Fitzyracing1@gmail.com` link with the subject `360 Bench submission: <project>` and a formatted body. "Open a public GitHub issue" opens `https://github.com/fitzyracing1/360-bench/issues/new?title=…&body=…&labels=submission`. The submitter's email goes into the public issue only if they tick the box. The matching issue form lives at `.github/ISSUE_TEMPLATE/submit-project.yml`.
