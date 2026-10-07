# 360 Bench

**Fixes for abandoned npm packages.**

Some of the most-downloaded packages on npm haven't shipped in years, while real crash reports and fix PRs sit unmerged. 360 Bench takes those packages, fixes the confirmed bugs with tests, and republishes them as drop-in replacements under the `@fitzyracing` scope. The API stays the same, and every original author is credited.

## The forks

| Package | Replaces | Upstream last release | What's fixed |
|---|---|---|---|
| [`@fitzyracing/fast-deep-equal`](https://github.com/fitzyracing1/fast-deep-equal) | [`fast-deep-equal`](https://github.com/epoberezkin/fast-deep-equal) (~265M/week) | 3.1.3, June 2020 | `a.valueOf is not a function` crash on `Object.create(null)` objects and on data with a `toString`/`valueOf` field; invalid Dates now equal; TypeScript types |
| [`@fitzyracing/progress`](https://github.com/fitzyracing1/progress) | [`progress`](https://github.com/visionmedia/node-progress) (~69M/week) | 2.0.3, Dec 2018 | `RangeError: Invalid array length` on NaN/missing content-length totals and streams without `columns`; non-numeric `width`; `interrupt()` on piped output |

## Swapping one in

Install it directly:

```sh
npm i @fitzyracing/fast-deep-equal
```

Or fix it everywhere in your dependency tree (for example inside ajv or eslint) without touching your code, using npm 9.9+ `overrides` in your `package.json`:

```json
"overrides": {
  "fast-deep-equal": "npm:@fitzyracing/fast-deep-equal@^3.1.4",
  "progress": "npm:@fitzyracing/progress@^2.0.4"
}
```

## Rules

- **Only confirmed bugs.** Every fix links to an upstream issue and ships with a test that fails on the original.
- **No surprises.** Same API, same output wherever the original didn't crash. No new dependencies.
- **Credit stays.** Original LICENSE, author and contributors are kept.
- **Upstream first.** If a maintainer comes back and ships the fix, the fork points people home.

## Suggest a package

Know a widely used package that's abandoned and still crashing? [Open an issue](https://github.com/fitzyracing1/360-bench/issues/new) with the package name, the bug and the upstream issue link.

## License

The forks keep their original licenses (both MIT). This index is MIT.
