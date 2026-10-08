# 360 Bench

**Fixes for abandoned packages: npm, Go, GitHub Actions and PyPI.**

Some of the most-used packages and actions haven't shipped in years, while real crash reports and fix PRs sit unmerged. 360 Bench takes them, fixes the confirmed bugs with tests, and republishes them as drop-in replacements: `@fitzyracing/*` on npm, `fitzyracing1/*` on GitHub (Go modules and Actions) and `fitzyracing-*` on PyPI. The API stays the same, and every original author is credited.

## The forks

### npm

| Package | Replaces | Upstream last release | What's fixed |
|---|---|---|---|
| [`@fitzyracing/fast-deep-equal`](https://github.com/fitzyracing1/fast-deep-equal) | [`fast-deep-equal`](https://github.com/epoberezkin/fast-deep-equal) (~265M/week) | 3.1.3, June 2020 | `a.valueOf is not a function` crash on `Object.create(null)` objects and on data with a `toString`/`valueOf` field; invalid Dates now equal; TypeScript types |
| [`@fitzyracing/progress`](https://github.com/fitzyracing1/progress) | [`progress`](https://github.com/visionmedia/node-progress) (~69M/week) | 2.0.3, Dec 2018 | `RangeError: Invalid array length` on NaN/missing content-length totals and streams without `columns`; non-numeric `width`; `interrupt()` on piped output |
| [`@fitzyracing/react-transition-group`](https://github.com/fitzyracing1/react-transition-group) | [`react-transition-group`](https://github.com/reactjs/react-transition-group) (~66M/week) | 4.4.5, Aug 2022 | `TypeError: findDOMNode is not a function` on React 19 when no `nodeRef` is passed (`Transition`, `CSSTransition`, `SwitchTransition`, `TransitionGroup`, `ReplaceTransition`) ([#918](https://github.com/reactjs/react-transition-group/issues/918)). React 16.6 to 18 behave exactly as 4.4.5 |

Install one directly:

```sh
npm i @fitzyracing/fast-deep-equal
```

Or fix it everywhere in your dependency tree (for example inside ajv, eslint, Material-UI or react-bootstrap) without touching your code, using npm 9.9+ `overrides` in your `package.json`:

```json
"overrides": {
  "fast-deep-equal": "npm:@fitzyracing/fast-deep-equal@^3.1.4",
  "progress": "npm:@fitzyracing/progress@^2.0.4",
  "react-transition-group": "npm:@fitzyracing/react-transition-group@^4.4.6"
}
```

Yarn uses `"resolutions"`, pnpm uses `"pnpm": { "overrides": { ... } }`.

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
| [`fitzyracing-fs`](https://github.com/fitzyracing1/pyfilesystem2) 2.4.17 (import name `fs`) | [`fs` (PyFilesystem2)](https://github.com/PyFilesystem/pyfilesystem2) (~1.5M/month) | 2.4.16, May 2022 | `import fs` fails with `ModuleNotFoundError: No module named 'pkg_resources'` on setuptools 82+: no `pkg_resources` or `setuptools` needed any more, and `fs.*` extensions and `fs.opener` plugins are still found ([#577](https://github.com/PyFilesystem/pyfilesystem2/issues/577), [#597](https://github.com/PyFilesystem/pyfilesystem2/issues/597)). Python 3.9+ |

The import name is unchanged, so your code stays the same. **Uninstall the original first**, then install the fork (the order matters, because both own the same files):

```sh
pip uninstall -y pydub && pip install fitzyracing-pydub
pip uninstall -y fs && pip install fitzyracing-fs
```

In `requirements.txt` / `pyproject.toml`, replace `pydub` with `fitzyracing-pydub` and `fs` with `fitzyracing-fs`.

pip can't swap a dependency for a differently named package. If another package pulls in the original, **uv** can drop it with an override:

```toml
[project]
dependencies = ["fitzyracing-pydub", "...the package that depends on pydub..."]

[tool.uv]
override-dependencies = ["pydub; sys_platform == 'never'"]
```

(Same for `fs`.) For plain pip, each fork's README has a workaround.

## Rules

- **Only confirmed bugs.** Every fix links to an upstream issue and ships with a test that fails on the original.
- **No surprises.** Same API, same output wherever the original didn't crash. No new dependencies beyond what a fix needs (for example `audioop-lts` on Python 3.13+). Anything else that changes, such as published upstream `master` commits, is listed in the fork's README.
- **Credit stays.** Original LICENSE, author and contributors are kept.
- **Upstream first.** If a maintainer comes back and ships the fix, the fork points people home.

## Suggest a package

Know a widely used package or action that's abandoned and still crashing? [Open an issue](https://github.com/fitzyracing1/360-bench/issues/new) with the package name, the bug and the upstream issue link.

## License

The forks keep their original licenses: MIT (fast-deep-equal, progress, cron, pydub, fs), BSD-3-Clause (react-transition-group) and Apache-2.0 (the two actions). This index is MIT.
