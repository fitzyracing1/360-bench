# 360 Bench

**Fixes for abandoned packages: npm, Go, GitHub Actions and PyPI.**

**Website: [fitzyracing1.github.io/360-bench](https://fitzyracing1.github.io/360-bench/)**

Some of the most-used packages and actions haven't shipped in years, while real crash reports and fix PRs sit unmerged. 360 Bench takes them, fixes the confirmed bugs with tests, and republishes them as drop-in replacements: `@fitzyracing/*` on npm, `fitzyracing1/*` on GitHub (Go modules and Actions) and `fitzyracing-*` on PyPI. The API stays the same, and every original author is credited.

## The forks

### npm

| Package | Replaces | Upstream last release | What's fixed |
|---|---|---|---|
| [`@fitzyracing/fast-deep-equal`](https://github.com/fitzyracing1/fast-deep-equal) | [`fast-deep-equal`](https://github.com/epoberezkin/fast-deep-equal) (~265M/week) | 3.1.3, June 2020 | `a.valueOf is not a function` crash on `Object.create(null)` objects and on data with a `toString`/`valueOf` field; invalid Dates now equal; TypeScript types |
| [`@fitzyracing/progress`](https://github.com/fitzyracing1/progress) | [`progress`](https://github.com/visionmedia/node-progress) (~69M/week) | 2.0.3, Dec 2018 | `RangeError: Invalid array length` on NaN/missing content-length totals and streams without `columns`; non-numeric `width`; `interrupt()` on piped output |
| [`@fitzyracing/react-transition-group`](https://github.com/fitzyracing1/react-transition-group) | [`react-transition-group`](https://github.com/reactjs/react-transition-group) (~66M/week) | 4.4.5, Aug 2022 | `TypeError: findDOMNode is not a function` on React 19 when no `nodeRef` is passed (`Transition`, `CSSTransition`, `SwitchTransition`, `TransitionGroup`, `ReplaceTransition`) ([#918](https://github.com/reactjs/react-transition-group/issues/918)). React 16.6 to 18 behave exactly as 4.4.5 |
| [`@fitzyracing/fetch-event-source`](https://github.com/fitzyracing1/fetch-event-source) | [`@microsoft/fetch-event-source`](https://github.com/Azure/fetch-event-source) (~3.6M/week) | 2.0.1, Apr 2021 | `ReferenceError: document is not defined` and `window is not defined` in Node.js (also Bun and web workers): uses `document` only when it exists and falls back to `globalThis` for `fetch` and the retry timers ([#39](https://github.com/Azure/fetch-event-source/issues/39), [#20](https://github.com/Azure/fetch-event-source/issues/20)). Browser behaviour is unchanged |

Install one directly:

```sh
npm i @fitzyracing/fast-deep-equal
```

Or fix it everywhere in your dependency tree (for example inside ajv, eslint, Material-UI or react-bootstrap) without touching your code, using npm 9.9+ `overrides` in your `package.json`:

```json
"overrides": {
  "fast-deep-equal": "npm:@fitzyracing/fast-deep-equal@^3.1.4",
  "progress": "npm:@fitzyracing/progress@^2.0.4",
  "react-transition-group": "npm:@fitzyracing/react-transition-group@^4.4.6",
  "@microsoft/fetch-event-source": "npm:@fitzyracing/fetch-event-source@^2.0.2"
}
```

Yarn uses `"resolutions"`, pnpm uses `"pnpm": { "overrides": { ... } }`.

If you depend on `@microsoft/fetch-event-source` directly, install the fork under the old name so your imports keep working (and, if you also add the override above, use `"$@microsoft/fetch-event-source"` as its value, because npm requires the override to match a direct dependency):

```sh
npm i @microsoft/fetch-event-source@npm:@fitzyracing/fetch-event-source@^2.0.2
```

On React 19 without `nodeRef`, the child of a transition has to accept a `ref` (a DOM element, a `forwardRef` component, or a function component that passes `ref` on). See the [fork's README](https://github.com/fitzyracing1/react-transition-group#on-react-19-the-child-has-to-accept-a-ref) for details.

### Go

| Module | Replaces | Upstream last release | What's fixed |
|---|---|---|---|
| [`github.com/fitzyracing1/cron/v3`](https://github.com/fitzyracing1/cron) v3.0.2 | [`github.com/robfig/cron/v3`](https://github.com/robfig/cron) (imported by ~5.6k modules) | v3.0.1, Jan 2020 | `panic: runtime error: slice bounds out of range [:-1]` when a spec is only a timezone prefix (`cron.ParseStandard("TZ=0")`, `"CRON_TZ=Asia/Tokyo"`, ...). These now return an error ([#554](https://github.com/robfig/cron/issues/554), [#470](https://github.com/robfig/cron/issues/470)). It is v3.0.1 plus this fix only; every spec that parsed before parses the same way |

Keep your imports (and fix it for dependencies that import robfig/cron too) with a `replace` in your `go.mod`:

```
replace github.com/robfig/cron/v3 => github.com/fitzyracing1/cron/v3 v3.0.2
```

Or switch your imports to `github.com/fitzyracing1/cron/v3` and `go get github.com/fitzyracing1/cron/v3@v3.0.2`.

### GitHub Actions

| Action | Replaces | Upstream last release | What's fixed |
|---|---|---|---|
| [`fitzyracing1/action-add-labels@v1`](https://github.com/fitzyracing1/action-add-labels) (360 Bench Add Labels) | [`actions-ecosystem/action-add-labels`](https://github.com/actions-ecosystem/action-add-labels) (~15.6k dependent repos) | v1.1.3, Aug 2021 | Declares `using: node24` instead of `node12`, so runs no longer get the forced-runtime deprecation warning now that GitHub [removed Node 20](https://github.blog/changelog/2026-09-23-node-20-is-no-longer-available-in-github-actions/) ([#459](https://github.com/actions-ecosystem/action-add-labels/issues/459), [#483](https://github.com/actions-ecosystem/action-add-labels/issues/483)); current `@actions/core`/`@actions/github` with no Node deprecation warnings; follows `GITHUB_API_URL`, so it works on GitHub Enterprise Server |
| [`fitzyracing1/action-remove-labels@v1`](https://github.com/fitzyracing1/action-remove-labels) (360 Bench Remove Labels) | [`actions-ecosystem/action-remove-labels`](https://github.com/actions-ecosystem/action-remove-labels) (~10.7k dependent repos) | v1.3.0, Sep 2021 | Declares `using: node24` instead of `node12` ([#413](https://github.com/actions-ecosystem/action-remove-labels/issues/413)); current `@actions/core`/`@actions/github` with no Node deprecation warnings |

Same inputs, no outputs, same API calls. Change only the `uses:` line:

```diff
-      - uses: actions-ecosystem/action-add-labels@v1
+      - uses: fitzyracing1/action-add-labels@v1
-      - uses: actions-ecosystem/action-remove-labels@v1
+      - uses: fitzyracing1/action-remove-labels@v1
```

For the strictest setup, pin the full commit SHA of the release instead of `@v1`.

### PyPI

| Distribution | Replaces | Upstream last release | What's fixed |
|---|---|---|---|
| [`fitzyracing-pydub`](https://github.com/fitzyracing1/pydub) 0.25.2 (import name `pydub`) | [`pydub`](https://github.com/jiaaro/pydub) (~17.8M/month) | 0.25.1, Mar 2021 | `ModuleNotFoundError: No module named 'pyaudioop'` on `from pydub import AudioSegment` on Python 3.13+: depends on `audioop-lts` on 3.13+ only, fixes the fallback import and replaces the Python 2 fallback with a working Python 3 one ([#725](https://github.com/jiaaro/pydub/issues/725), [#839](https://github.com/jiaaro/pydub/issues/839), [#863](https://github.com/jiaaro/pydub/issues/863), [#867](https://github.com/jiaaro/pydub/issues/867)); no `SyntaxWarning: invalid escape sequence` ([#801](https://github.com/jiaaro/pydub/issues/801)). Built from upstream `master`, so it also ships the maintainer's merged but unreleased fixes (listed in its README). Python 3.9+ |
| [`fitzyracing-fs`](https://github.com/fitzyracing1/pyfilesystem2) 2.4.18 (import name `fs`) | [`fs` (PyFilesystem2)](https://github.com/PyFilesystem/pyfilesystem2) (~1.5M/month) | 2.4.16, May 2022 | `import fs` fails with `ModuleNotFoundError: No module named 'pkg_resources'` on setuptools 82+: no `pkg_resources` or `setuptools` needed any more, and `fs.*` extensions and `fs.opener` plugins are still found ([#577](https://github.com/PyFilesystem/pyfilesystem2/issues/577), [#597](https://github.com/PyFilesystem/pyfilesystem2/issues/597)); `geturl(..., purpose="fs")` returns `osfs:///tmp/x` on Python 3.14, as on earlier versions, instead of `osfs://///tmp/x`. Python 3.9+ |
| [`fitzyracing-rank-bm25`](https://github.com/fitzyracing1/rank_bm25) 0.2.3 (import name `rank_bm25`) | [`rank-bm25`](https://github.com/dorianbrown/rank_bm25) (~8.7M/month) | 0.2.2, Feb 2022 | `BM25Okapi([])` (and `BM25L`, `BM25Plus`) raises a clear `EmptyCorpusException` (still a `ZeroDivisionError` subclass) instead of `ZeroDivisionError: division by zero` ([#36](https://github.com/dorianbrown/rank_bm25/issues/36)); `BM25Okapi` no longer gives a term in exactly half the documents an idf of 0, so documents matching it no longer score 0 ([#39](https://github.com/dorianbrown/rank_bm25/issues/39), [#43](https://github.com/dorianbrown/rank_bm25/issues/43)). That is the only score change, and no score goes down. The sdist builds again under PEP 517 ([#56](https://github.com/dorianbrown/rank_bm25/issues/56)). Python 3.8+ |
| [`fitzyracing-bert-score`](https://github.com/fitzyracing1/bert_score) 0.3.14 (import name `bert_score`) | [`bert-score`](https://github.com/Tiiiger/bert_score) (~420k/month) | 0.3.13, Feb 2023 | `OverflowError: int too big to convert` with DeBERTa-v3 (including `microsoft/deberta-xlarge-mnli`) and other models whose tokenizer declares no maximum length, with fast tokenizers on transformers 4 and every time on transformers 5 ([#205](https://github.com/Tiiiger/bert_score/issues/205), [huggingface/evaluate#739](https://github.com/huggingface/evaluate/issues/739)). These inputs are encoded without truncation, as the slow tokenizers did, so scores match 0.3.13 with its default slow tokenizer on transformers 4 |
| [`fitzyracing-rouge`](https://github.com/fitzyracing1/rouge) 1.0.2 (import name `rouge`) | [`rouge`](https://github.com/pltrdy/rouge) (~640k/month) | 1.0.1, Jul 2021 | Whitespace-only sentence segments (the `" "` in `"cat. "`) were counted as a shared empty word, so `"the cat. . dog"` vs `"a bird. . fish"` scored rouge-1 f=0.25 instead of 0 ([#77](https://github.com/pltrdy/rouge/issues/77)); all other inputs score exactly as in 1.0.1. ROUGE-L no longer hits `RecursionError` on long sentences (upstream PR [#69](https://github.com/pltrdy/rouge/pull/69), merged but never released) |
| [`fitzyracing-transformers-stream-generator`](https://github.com/fitzyracing1/transformers-stream-generator) 0.0.6 (import name `transformers_stream_generator`) | [`transformers-stream-generator`](https://github.com/LowinLi/transformers-stream-generator) (~360k/month) | 0.0.5, Mar 2024 | `ImportError: cannot import name 'BeamSearchScorer'` (transformers 4.57) / `'DisjunctiveConstraint'` (5.x) on import, and every `model.generate()` call failing after `init_stream_support()` on 4.41 to 4.56 ([#15](https://github.com/LowinLi/transformers-stream-generator/issues/15)). `do_stream=True` streams through transformers' public `generate(streamer=...)`; streaming with beam search raises a clear `ValueError`. On 4.26 to 4.40 the 0.0.5 code runs unchanged |

The import name is unchanged, so your code stays the same. **Uninstall the original first**, then install the fork (the order matters, because both own the same files):

```sh
pip uninstall -y pydub && pip install fitzyracing-pydub
pip uninstall -y fs && pip install fitzyracing-fs
pip uninstall -y rank-bm25 && pip install fitzyracing-rank-bm25
pip uninstall -y bert-score && pip install fitzyracing-bert-score
pip uninstall -y rouge && pip install fitzyracing-rouge
pip uninstall -y transformers-stream-generator && pip install fitzyracing-transformers-stream-generator
```

In `requirements.txt` / `pyproject.toml`, replace the original name with the fork's (`pydub` with `fitzyracing-pydub`, `fs` with `fitzyracing-fs`, `rank-bm25` with `fitzyracing-rank-bm25`, and so on).

pip can't swap a dependency for a differently named package. If another package pulls in the original, **uv** can drop it with an override:

```toml
[project]
dependencies = ["fitzyracing-pydub", "...the package that depends on pydub..."]

[tool.uv]
override-dependencies = ["pydub; sys_platform == 'never'"]
```

(Same for the others.) For plain pip, each fork's README has a workaround.

## Rules

- **Only confirmed bugs.** Every fix links to an upstream issue and ships with a test that fails on the original.
- **No surprises.** Same API, same output wherever the original didn't crash. No new dependencies beyond what a fix needs (for example `audioop-lts` on Python 3.13+). Anything else that changes, such as published upstream `master` commits, is listed in the fork's README.
- **Credit stays.** Original LICENSE, author and contributors are kept.
- **Upstream first.** If a maintainer comes back and ships the fix, the fork points people home.

## Suggest a package

Know a widely used package or action that's abandoned and still crashing? [Submit it on the website](https://fitzyracing1.github.io/360-bench/#submit): the form sends it by email or as a public GitHub issue. You can also [open an issue](https://github.com/fitzyracing1/360-bench/issues/new?template=submit-project.yml) directly.

## License

The forks keep their original licenses: MIT (fast-deep-equal, progress, cron, pydub, fs), BSD-3-Clause (react-transition-group) and Apache-2.0 (the two actions). This index is MIT.
