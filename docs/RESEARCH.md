# claude-onboard — documentation research

Reviewed 21 September 2026. Public GitHub source only.

## Revision and scope

- Commit: [`9d33f1639bc9c4ef81698d7a073c70307bfc7eb0`](https://github.com/NickCirv/claude-onboard/commit/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0).
- Tree: `3e91c7c33caa8516471ef8a3c93570ed0bec378b`; truncated: `false`.
- Capture: 11 of 11 eligible text files; all eligible text files.
- Method: package and entrypoint inspection, implementation-interface review, targeted behavior/limitation inspection, and test-source review. This is not an exhaustive correctness or security audit.
- Commands run against repository code: **none**. External services, deployment and npm publication were not verified.

## Claim and evidence map

| Documentation claim | Pinned evidence | Assessment |
| --- | --- | --- |
| Runtime, executable and development commands | [package.json](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/package.json) | Source declaration inspected; runtime unverified |
| Builds an onboarding guide by sending selected repository structure and files to Claude. | [bin/onboard.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/bin/onboard.js) · [src/index.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/src/index.js) | Implementation interfaces inspected; behavior not executed |
| Directory or GitHub URL input; stack/entry-point detection; terminal presentation; optional Markdown output. | [bin/onboard.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/bin/onboard.js), [src/detector.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/src/detector.js), [src/formatter.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/src/formatter.js), [src/index.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/src/index.js), [src/prompts.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/src/prompts.js), [src/scanner.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/src/scanner.js) | Source-backed scope, not a test result |
| Selected source leaves the machine for Anthropic. Scanning and file selection are bounded; generated architecture explanations can be incomplete. Repository URLs are cloned locally. | [bin/onboard.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/bin/onboard.js), [src/detector.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/src/detector.js), [src/formatter.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/src/formatter.js), [src/index.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/src/index.js), [src/prompts.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/src/prompts.js), [src/scanner.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/src/scanner.js) | Material limits documented; service compatibility remains open |
| Existing checks | [test/smoke.test.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/test/smoke.test.js) | Test source read; no passing-run claim |

## Documentation inventory and disposition

| Existing document | Decision |
| --- | --- |
| [README.md](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/README.md) | Rewritten with source-specific purpose, direct checkout setup, limitations and verification status. Old section fragments retained where practical. |

Added `docs/REFERENCE.md` for the observed implementation and command surface, and this research record. Protected license and attribution files remain in their original locations without edits. No source or product UI was changed.

## Quality dimensions

| Dimension | Status | Evidence / next step |
| --- | --- | --- |
| Pinned provenance | Verified | Captured commit, tree and per-file hashes recorded below |
| Interface documentation | Partially verified | Source inspection only; run clean-checkout quickstart |
| Runtime behavior | Unverified | No repository execution in this review |
| Test results | Unverified | Existing tests were not run |
| Deployment / package availability | Unverified | No remote publish or live-service check |
| Visual / link checks | Unverified | Portfolio renderer and independent QA are separate from this authoring step |

## Unresolved issues

Selected source leaves the machine for Anthropic. Scanning and file selection are bounded; generated architecture explanations can be incomplete. Repository URLs are cloned locally.

## Captured source inventory

This lists captured provenance, not a claim that every line received a full audit. Binary/generated/excluded files are outside the eligible text capture.

| File | SHA-256 | Bytes |
| --- | --- | --- |
| [LICENSE](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/LICENSE) | `8edf13ba2a2e443fa49e42493414f6952a4a14b6c407983a7c95162ab37f6265` | 1065 |
| [README.md](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/README.md) | `7af4f66f5cbdb024c7ac7502751f3a8b0713eb1317f30d8e9e24e714de5e7b4d` | 1594 |
| [package.json](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/package.json) | `167101fb6ace46392d0eb6bc167279f7ae4d5f5d9a6aaf458e52a0e1f8e2efe0` | 929 |
| [.github/workflows/ci.yml](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/.github/workflows/ci.yml) | `e818f4e6bd805f798665dbbf04964d02f12fc59dd7f18903ad63d26d374ae3f0` | 380 |
| [bin/onboard.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/bin/onboard.js) | `1752a1fa6263a3dd027db6db09bdb909073f9b2a1a50cf10ff6e64183c3a1432` | 1481 |
| [src/detector.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/src/detector.js) | `ac1b127fa6ddf5f882c2b874f14bd10ce8c3c0f8a69104165df5e32d1214e47f` | 7456 |
| [src/formatter.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/src/formatter.js) | `3f4830a9505a93851fe92296e749ec398bee0684edafda7e5ceae72e3a7e7003` | 1923 |
| [src/index.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/src/index.js) | `e6bbadad25ac84c6f4cf6ae4308eaafef08249dd6ede33e3c1b5f5d8f5c8ebd0` | 3199 |
| [src/prompts.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/src/prompts.js) | `fcfbda869954984f561a1d3a451e58e2b762e873b420a68fd07884d8ca67d8b9` | 3032 |
| [src/scanner.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/src/scanner.js) | `3d72c5121bfe00b23081d44088917f92b4c6bb56bcd80aa0901920bb56008117` | 4457 |
| [test/smoke.test.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/test/smoke.test.js) | `38dbf73a6523c3b2ec6997ab2baa2656de5fd628889e1b1c23008b3cac94e2a5` | 465 |
