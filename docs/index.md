# 360 Bench

360 Bench is the index and website for drop-in forks of widely used packages and actions that are no longer maintained. Each fork fixes confirmed bugs with tests and is republished as `@fitzyracing/*` on npm, `fitzyracing1/*` on GitHub (Go modules and Actions), or `fitzyracing-*` on PyPI. The API stays the same and the original authors are credited.

Website: https://fitzyracing1.github.io/360-bench/

## The forks (from README.md)

| Ecosystem | Repos |
|---|---|
| npm | [fast-deep-equal](https://github.com/fitzyracing1/fast-deep-equal), [progress](https://github.com/fitzyracing1/progress), [react-transition-group](https://github.com/fitzyracing1/react-transition-group), [fetch-event-source](https://github.com/fitzyracing1/fetch-event-source) |
| Go | [cron](https://github.com/fitzyracing1/cron) |
| GitHub Actions | [action-add-labels](https://github.com/fitzyracing1/action-add-labels), [action-remove-labels](https://github.com/fitzyracing1/action-remove-labels) |
| PyPI | [pydub](https://github.com/fitzyracing1/pydub), [pyfilesystem2](https://github.com/fitzyracing1/pyfilesystem2), [rank_bm25](https://github.com/fitzyracing1/rank_bm25), [bert_score](https://github.com/fitzyracing1/bert_score), [rouge](https://github.com/fitzyracing1/rouge), [transformers-stream-generator](https://github.com/fitzyracing1/transformers-stream-generator) |

The README has install and override instructions for each ecosystem: npm `overrides`, Go `replace`, a changed `uses:` line for Actions, and uninstall-then-install for PyPI. The README is the source of truth for every fact about a fork.

Pages: [Architecture](architecture.md) · [Contributing](contributing.md)

## Rules
Only confirmed bugs are fixed, each with a test that fails on the original. The API stays the same, credit stays with the original authors, and upstream comes first.

## License
The forks keep their original licenses. Per the README, this index is MIT. The repo has no LICENSE file.

Copyright (c) 2026 Joshua Almeida
