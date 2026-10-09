/*
 * 360 Bench — project data (single source of truth for the site).
 *
 * Every fact here comes from the 360-bench README.md. Keep the two in sync.
 * To add a project: append an object to `projects` (and, if it is a new
 * ecosystem, to `ecosystems`). Then optionally run `node site/tools/prerender.mjs`
 * to refresh the no-JavaScript HTML in index.html. The page re-renders from this
 * file at runtime, so JavaScript visitors always see the current data.
 *
 * Snippets: `code` is what is shown; optional `copy` is what the Copy button copies
 * (used for diffs). Text fields support `inline code` with backticks. Everything is HTML-escaped.
 */
var BENCH_DATA = {
  links: {
    github: "https://github.com/fitzyracing1",
    repo: "https://github.com/fitzyracing1/360-bench",
    readme: "https://github.com/fitzyracing1/360-bench#readme",
    x: "https://x.com/fitzyracing1",
    xHandle: "@fitzyracing1",
    email: "Fitzyracing1@gmail.com",
    issues: "https://github.com/fitzyracing1/360-bench/issues/new"
  },

  ecosystems: [
    {
      id: "npm",
      label: "npm",
      registryLabel: "npm",
      blurb: "Install one directly, or fix it everywhere in your dependency tree (for example inside ajv, eslint, Material-UI or react-bootstrap) without touching your code, using npm 9.9+ `overrides` in your `package.json`. Yarn uses `\"resolutions\"`, pnpm uses `\"pnpm\": { \"overrides\": { ... } }`."
    },
    {
      id: "go",
      label: "Go",
      registryLabel: "pkg.go.dev",
      blurb: "Keep your imports (and fix it for dependencies that import the original too) with a `replace` in your `go.mod`, or switch your imports to the fork."
    },
    {
      id: "actions",
      label: "GitHub Actions",
      registryLabel: "Marketplace",
      blurb: "Same inputs, no outputs, same API calls. Change only the `uses:` line. For the strictest setup, pin the full commit SHA of the release instead of `@v1`."
    },
    {
      id: "pypi",
      label: "PyPI",
      registryLabel: "PyPI",
      blurb: "The import name is unchanged, so your code stays the same. Uninstall the original first, then install the fork (the order matters, because both own the same files). pip can't swap a dependency for a differently named package; if another package pulls in the original, uv can drop it with an override."
    }
  ],

  projects: [
    {
      id: "fast-deep-equal",
      ecosystem: "npm",
      name: "@fitzyracing/fast-deep-equal",
      version: "3.1.4",
      replaces: "fast-deep-equal",
      upstreamUrl: "https://github.com/epoberezkin/fast-deep-equal",
      upstreamLastRelease: "3.1.3, June 2020",
      upstreamUsage: "~265M/week",
      license: "MIT",
      repoUrl: "https://github.com/fitzyracing1/fast-deep-equal",
      registryUrl: "https://www.npmjs.com/package/@fitzyracing/fast-deep-equal",
      fixed: "No more `a.valueOf is not a function` crash on `Object.create(null)` objects or on data with a `toString`/`valueOf` field. Invalid Dates now compare equal. Ships TypeScript types.",
      issues: [],
      snippets: [
        { label: "package.json overrides", lang: "json", code: "\"overrides\": {\n  \"fast-deep-equal\": \"npm:@fitzyracing/fast-deep-equal@^3.1.4\"\n}" },
        { label: "Install directly", lang: "sh", code: "npm i @fitzyracing/fast-deep-equal" }
      ]
    },
    {
      id: "progress",
      ecosystem: "npm",
      name: "@fitzyracing/progress",
      version: "2.0.4",
      replaces: "progress",
      upstreamUrl: "https://github.com/visionmedia/node-progress",
      upstreamLastRelease: "2.0.3, Dec 2018",
      upstreamUsage: "~69M/week",
      license: "MIT",
      repoUrl: "https://github.com/fitzyracing1/progress",
      registryUrl: "https://www.npmjs.com/package/@fitzyracing/progress",
      fixed: "No more `RangeError: Invalid array length` on NaN or missing content-length totals and on streams without `columns`. Handles a non-numeric `width`, and `interrupt()` works on piped output.",
      issues: [],
      snippets: [
        { label: "package.json overrides", lang: "json", code: "\"overrides\": {\n  \"progress\": \"npm:@fitzyracing/progress@^2.0.4\"\n}" },
        { label: "Install directly", lang: "sh", code: "npm i @fitzyracing/progress" }
      ]
    },
    {
      id: "react-transition-group",
      ecosystem: "npm",
      name: "@fitzyracing/react-transition-group",
      version: "4.4.6",
      replaces: "react-transition-group",
      upstreamUrl: "https://github.com/reactjs/react-transition-group",
      upstreamLastRelease: "4.4.5, Aug 2022",
      upstreamUsage: "~66M/week",
      license: "BSD-3-Clause",
      repoUrl: "https://github.com/fitzyracing1/react-transition-group",
      registryUrl: "https://www.npmjs.com/package/@fitzyracing/react-transition-group",
      fixed: "No more `TypeError: findDOMNode is not a function` on React 19 when no `nodeRef` is passed (`Transition`, `CSSTransition`, `SwitchTransition`, `TransitionGroup`, `ReplaceTransition`). React 16.6 to 18 behave exactly as 4.4.5.",
      note: "On React 19 without `nodeRef`, the child of a transition has to accept a `ref` (a DOM element, a `forwardRef` component, or a function component that passes `ref` on).",
      noteUrl: "https://github.com/fitzyracing1/react-transition-group#on-react-19-the-child-has-to-accept-a-ref",
      issues: [{ label: "#918", url: "https://github.com/reactjs/react-transition-group/issues/918" }],
      snippets: [
        { label: "package.json overrides", lang: "json", code: "\"overrides\": {\n  \"react-transition-group\": \"npm:@fitzyracing/react-transition-group@^4.4.6\"\n}" },
        { label: "Install directly", lang: "sh", code: "npm i @fitzyracing/react-transition-group" }
      ]
    },
    {
      id: "fetch-event-source",
      ecosystem: "npm",
      name: "@fitzyracing/fetch-event-source",
      version: "2.0.2",
      replaces: "@microsoft/fetch-event-source",
      upstreamUrl: "https://github.com/Azure/fetch-event-source",
      upstreamLastRelease: "2.0.1, Apr 2021",
      upstreamUsage: "~3.6M/week",
      license: "MIT",
      repoUrl: "https://github.com/fitzyracing1/fetch-event-source",
      registryUrl: "https://www.npmjs.com/package/@fitzyracing/fetch-event-source",
      fixed: "No more `ReferenceError: document is not defined` or `window is not defined` in Node.js (also Bun and web workers): `document` is only used when it exists, and `fetch` and the retry timers fall back to `globalThis` when there is no `window`. Nothing changes in the browser: the same `visibilitychange` handling, parser, retries, callbacks and types.",
      note: "If you also depend on it directly, npm requires the override to match: do the aliased install first, then use `\"$@microsoft/fetch-event-source\"` as the override value.",
      noteUrl: "https://github.com/fitzyracing1/fetch-event-source#using-it-as-a-drop-in-replacement",
      issues: [
        { label: "#39", url: "https://github.com/Azure/fetch-event-source/issues/39" },
        { label: "#20", url: "https://github.com/Azure/fetch-event-source/issues/20" }
      ],
      snippets: [
        { label: "Install under the old name", lang: "sh", code: "npm i @microsoft/fetch-event-source@npm:@fitzyracing/fetch-event-source@^2.0.2" },
        { label: "package.json overrides", lang: "json", code: "\"overrides\": {\n  \"@microsoft/fetch-event-source\": \"npm:@fitzyracing/fetch-event-source@^2.0.2\"\n}" }
      ]
    },
    {
      id: "cron",
      ecosystem: "go",
      name: "github.com/fitzyracing1/cron/v3",
      version: "v3.0.2",
      replaces: "github.com/robfig/cron/v3",
      upstreamUrl: "https://github.com/robfig/cron",
      upstreamLastRelease: "v3.0.1, Jan 2020",
      upstreamUsage: "imported by ~5.6k modules",
      license: "MIT",
      repoUrl: "https://github.com/fitzyracing1/cron",
      registryUrl: "https://pkg.go.dev/github.com/fitzyracing1/cron/v3",
      fixed: "No more `panic: runtime error: slice bounds out of range [:-1]` when a spec is only a timezone prefix (`cron.ParseStandard(\"TZ=0\")`, `\"CRON_TZ=Asia/Tokyo\"`, ...): these now return an error. It is v3.0.1 plus this fix only; every spec that parsed before parses the same way.",
      issues: [
        { label: "#554", url: "https://github.com/robfig/cron/issues/554" },
        { label: "#470", url: "https://github.com/robfig/cron/issues/470" }
      ],
      snippets: [
        { label: "go.mod replace", lang: "go", code: "replace github.com/robfig/cron/v3 => github.com/fitzyracing1/cron/v3 v3.0.2" },
        { label: "Switch imports", lang: "sh", code: "go get github.com/fitzyracing1/cron/v3@v3.0.2" }
      ]
    },
    {
      id: "action-add-labels",
      ecosystem: "actions",
      name: "fitzyracing1/action-add-labels@v1",
      displayName: "360 Bench Add Labels",
      version: "v1.1.4",
      replaces: "actions-ecosystem/action-add-labels",
      upstreamUrl: "https://github.com/actions-ecosystem/action-add-labels",
      upstreamLastRelease: "v1.1.3, Aug 2021",
      upstreamUsage: "~15.6k dependent repos",
      license: "Apache-2.0",
      repoUrl: "https://github.com/fitzyracing1/action-add-labels",
      registryUrl: "https://github.com/marketplace/actions/360-bench-add-labels",
      fixed: "Declares `using: node24` instead of `node12`, so runs no longer get the forced-runtime deprecation warning now that GitHub removed Node 20. Current `@actions/core`/`@actions/github` with no Node deprecation warnings. Follows `GITHUB_API_URL`, so it works on GitHub Enterprise Server.",
      issues: [
        { label: "#459", url: "https://github.com/actions-ecosystem/action-add-labels/issues/459" },
        { label: "#483", url: "https://github.com/actions-ecosystem/action-add-labels/issues/483" },
        { label: "Node 20 removal (GitHub changelog)", url: "https://github.blog/changelog/2026-09-23-node-20-is-no-longer-available-in-github-actions/" }
      ],
      snippets: [
        { label: "workflow uses:", lang: "diff", code: "-      - uses: actions-ecosystem/action-add-labels@v1\n+      - uses: fitzyracing1/action-add-labels@v1", copy: "- uses: fitzyracing1/action-add-labels@v1" }
      ]
    },
    {
      id: "action-remove-labels",
      ecosystem: "actions",
      name: "fitzyracing1/action-remove-labels@v1",
      displayName: "360 Bench Remove Labels",
      version: "v1.3.1",
      replaces: "actions-ecosystem/action-remove-labels",
      upstreamUrl: "https://github.com/actions-ecosystem/action-remove-labels",
      upstreamLastRelease: "v1.3.0, Sep 2021",
      upstreamUsage: "~10.7k dependent repos",
      license: "Apache-2.0",
      repoUrl: "https://github.com/fitzyracing1/action-remove-labels",
      registryUrl: "https://github.com/marketplace/actions/360-bench-remove-labels",
      fixed: "Declares `using: node24` instead of `node12`. Current `@actions/core`/`@actions/github` with no Node deprecation warnings.",
      issues: [{ label: "#413", url: "https://github.com/actions-ecosystem/action-remove-labels/issues/413" }],
      snippets: [
        { label: "workflow uses:", lang: "diff", code: "-      - uses: actions-ecosystem/action-remove-labels@v1\n+      - uses: fitzyracing1/action-remove-labels@v1", copy: "- uses: fitzyracing1/action-remove-labels@v1" }
      ]
    },
    {
      id: "pydub",
      ecosystem: "pypi",
      name: "fitzyracing-pydub",
      importName: "pydub",
      version: "0.25.2",
      replaces: "pydub",
      upstreamUrl: "https://github.com/jiaaro/pydub",
      upstreamLastRelease: "0.25.1, Mar 2021",
      upstreamUsage: "~17.8M/month",
      license: "MIT",
      repoUrl: "https://github.com/fitzyracing1/pydub",
      registryUrl: "https://pypi.org/project/fitzyracing-pydub/",
      fixed: "No more `ModuleNotFoundError: No module named 'pyaudioop'` on `from pydub import AudioSegment` on Python 3.13+ (depends on `audioop-lts` there only, with a working Python 3 fallback). No `SyntaxWarning: invalid escape sequence`. Built from upstream `master`, so it also ships the maintainer's merged but unreleased fixes. Python 3.9+.",
      issues: [
        { label: "#725", url: "https://github.com/jiaaro/pydub/issues/725" },
        { label: "#839", url: "https://github.com/jiaaro/pydub/issues/839" },
        { label: "#863", url: "https://github.com/jiaaro/pydub/issues/863" },
        { label: "#867", url: "https://github.com/jiaaro/pydub/issues/867" },
        { label: "#801", url: "https://github.com/jiaaro/pydub/issues/801" }
      ],
      snippets: [
        { label: "pip (uninstall first)", lang: "sh", code: "pip uninstall -y pydub && pip install fitzyracing-pydub" },
        { label: "uv override", lang: "toml", code: "[project]\ndependencies = [\"fitzyracing-pydub\", \"...the package that depends on pydub...\"]\n\n[tool.uv]\noverride-dependencies = [\"pydub; sys_platform == 'never'\"]" }
      ]
    },
    {
      id: "fs",
      ecosystem: "pypi",
      name: "fitzyracing-fs",
      importName: "fs",
      version: "2.4.18",
      replaces: "fs (PyFilesystem2)",
      upstreamUrl: "https://github.com/PyFilesystem/pyfilesystem2",
      upstreamLastRelease: "2.4.16, May 2022",
      upstreamUsage: "~1.5M/month",
      license: "MIT",
      repoUrl: "https://github.com/fitzyracing1/pyfilesystem2",
      registryUrl: "https://pypi.org/project/fitzyracing-fs/",
      fixed: "`import fs` no longer fails with `ModuleNotFoundError: No module named 'pkg_resources'` on setuptools 82+: no `pkg_resources` or `setuptools` needed, and `fs.*` extensions and `fs.opener` plugins are still found. `geturl(..., purpose=\"fs\")` returns `osfs:///tmp/x` on Python 3.14, as on earlier versions. Python 3.9+.",
      issues: [
        { label: "#577", url: "https://github.com/PyFilesystem/pyfilesystem2/issues/577" },
        { label: "#597", url: "https://github.com/PyFilesystem/pyfilesystem2/issues/597" }
      ],
      snippets: [
        { label: "pip (uninstall first)", lang: "sh", code: "pip uninstall -y fs && pip install fitzyracing-fs" },
        { label: "uv override", lang: "toml", code: "[project]\ndependencies = [\"fitzyracing-fs\", \"...the package that depends on fs...\"]\n\n[tool.uv]\noverride-dependencies = [\"fs; sys_platform == 'never'\"]" }
      ]
    },
    {
      id: "rank-bm25",
      ecosystem: "pypi",
      name: "fitzyracing-rank-bm25",
      importName: "rank_bm25",
      version: "0.2.3",
      replaces: "rank-bm25",
      upstreamUrl: "https://github.com/dorianbrown/rank_bm25",
      upstreamLastRelease: "0.2.2, Feb 2022",
      upstreamUsage: "~8.7M/month",
      license: "Apache-2.0",
      repoUrl: "https://github.com/fitzyracing1/rank_bm25",
      registryUrl: "https://pypi.org/project/fitzyracing-rank-bm25/",
      fixed: "`BM25Okapi([])` (and `BM25L`, `BM25Plus`) raises a clear `EmptyCorpusException` instead of `ZeroDivisionError: division by zero`; it still subclasses `ZeroDivisionError`. `BM25Okapi` no longer gives a term in exactly half the documents an idf of 0 (so matching documents scored 0): it gets the same `epsilon * average_idf` floor as more common terms. That is the only score change, and no score goes down. The sdist builds again under PEP 517. Python 3.8+.",
      issues: [
        { label: "#36", url: "https://github.com/dorianbrown/rank_bm25/issues/36" },
        { label: "#39", url: "https://github.com/dorianbrown/rank_bm25/issues/39" },
        { label: "#43", url: "https://github.com/dorianbrown/rank_bm25/issues/43" },
        { label: "#56", url: "https://github.com/dorianbrown/rank_bm25/issues/56" }
      ],
      snippets: [
        { label: "pip (uninstall first)", lang: "sh", code: "pip uninstall -y rank-bm25 && pip install fitzyracing-rank-bm25" },
        { label: "uv override", lang: "toml", code: "[project]\ndependencies = [\"fitzyracing-rank-bm25\", \"...the package that depends on rank-bm25...\"]\n\n[tool.uv]\noverride-dependencies = [\"rank-bm25; sys_platform == 'never'\"]" }
      ]
    },
    {
      id: "bert-score",
      ecosystem: "pypi",
      name: "fitzyracing-bert-score",
      importName: "bert_score",
      version: "0.3.14",
      replaces: "bert-score",
      upstreamUrl: "https://github.com/Tiiiger/bert_score",
      upstreamLastRelease: "0.3.13, Feb 2023",
      upstreamUsage: "~420k/month",
      license: "MIT",
      repoUrl: "https://github.com/fitzyracing1/bert_score",
      registryUrl: "https://pypi.org/project/fitzyracing-bert-score/",
      fixed: "No more `OverflowError: int too big to convert` with DeBERTa-v3 (including `microsoft/deberta-xlarge-mnli`) and other models whose tokenizer declares no maximum length, with fast tokenizers on transformers 4 and every time on transformers 5. These inputs are encoded without truncation, as the slow tokenizers did, so you get the same scores 0.3.13 gave with its default slow tokenizer on transformers 4. Also fixes `evaluate`'s `bertscore` metric.",
      issues: [
        { label: "#205", url: "https://github.com/Tiiiger/bert_score/issues/205" },
        { label: "huggingface/evaluate#739", url: "https://github.com/huggingface/evaluate/issues/739" }
      ],
      snippets: [
        { label: "pip (uninstall first)", lang: "sh", code: "pip uninstall -y bert-score && pip install fitzyracing-bert-score" },
        { label: "uv override", lang: "toml", code: "[project]\ndependencies = [\"fitzyracing-bert-score\", \"...the package that depends on bert-score...\"]\n\n[tool.uv]\noverride-dependencies = [\"bert-score; sys_platform == 'never'\"]" }
      ]
    },
    {
      id: "rouge",
      ecosystem: "pypi",
      name: "fitzyracing-rouge",
      importName: "rouge",
      version: "1.0.2",
      replaces: "rouge",
      upstreamUrl: "https://github.com/pltrdy/rouge",
      upstreamLastRelease: "1.0.1, Jul 2021",
      upstreamUsage: "~640k/month",
      license: "Apache-2.0",
      repoUrl: "https://github.com/fitzyracing1/rouge",
      registryUrl: "https://pypi.org/project/fitzyracing-rouge/",
      fixed: "Unrelated texts no longer share a phantom empty word: whitespace-only sentence segments (the `\" \"` in `\"cat. \"`) were counted as an empty `\"\"` word, so `\"the cat. . dog\"` vs `\"a bird. . fish\"` scored rouge-1 f=0.25 instead of 0. All other inputs score exactly as in 1.0.1. ROUGE-L no longer hits `RecursionError` on long sentences (upstream PR #69, merged but never released).",
      issues: [
        { label: "#77", url: "https://github.com/pltrdy/rouge/issues/77" },
        { label: "#69", url: "https://github.com/pltrdy/rouge/pull/69" }
      ],
      snippets: [
        { label: "pip (uninstall first)", lang: "sh", code: "pip uninstall -y rouge && pip install fitzyracing-rouge" },
        { label: "uv override", lang: "toml", code: "[project]\ndependencies = [\"fitzyracing-rouge\", \"...the package that depends on rouge...\"]\n\n[tool.uv]\noverride-dependencies = [\"rouge; sys_platform == 'never'\"]" }
      ]
    },
    {
      id: "transformers-stream-generator",
      ecosystem: "pypi",
      name: "fitzyracing-transformers-stream-generator",
      importName: "transformers_stream_generator",
      version: "0.0.6",
      replaces: "transformers-stream-generator",
      upstreamUrl: "https://github.com/LowinLi/transformers-stream-generator",
      upstreamLastRelease: "0.0.5, Mar 2024",
      upstreamUsage: "~360k/month",
      license: "MIT",
      repoUrl: "https://github.com/fitzyracing1/transformers-stream-generator",
      registryUrl: "https://pypi.org/project/fitzyracing-transformers-stream-generator/",
      fixed: "Works on transformers 4.41+ and 5.x: no more `ImportError: cannot import name 'BeamSearchScorer'` (4.57) / `'DisjunctiveConstraint'` (5.x) on import, and `init_stream_support()` no longer breaks every `model.generate()` call on 4.41 to 4.56. `do_stream=True` streams through transformers' public `generate(streamer=...)`; beam search with streaming raises a clear `ValueError`. On transformers 4.26 to 4.40 the 0.0.5 code runs unchanged.",
      issues: [
        { label: "#15", url: "https://github.com/LowinLi/transformers-stream-generator/issues/15" }
      ],
      snippets: [
        { label: "pip (uninstall first)", lang: "sh", code: "pip uninstall -y transformers-stream-generator && pip install fitzyracing-transformers-stream-generator" },
        { label: "uv override", lang: "toml", code: "[project]\ndependencies = [\"fitzyracing-transformers-stream-generator\", \"...the package that depends on transformers-stream-generator...\"]\n\n[tool.uv]\noverride-dependencies = [\"transformers-stream-generator; sys_platform == 'never'\"]" }
      ]
    }
  ]
};

if (typeof window !== "undefined") window.BENCH_DATA = BENCH_DATA;
