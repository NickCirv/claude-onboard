# claude-onboard — implementation reference

Source revision: `9d33f1639bc9c4ef81698d7a073c70307bfc7eb0`. This reference records source declarations; it is not a transcript of a successful run.

## Entrypoint and runtime

[package.json](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/package.json) declares `bin/onboard.js`. Node.js `>=20` and npm; Git is also used by the implementation.

Executable mapping: `claude-onboard` → `./bin/onboard.js`.

## Supported workflow

Directory or GitHub URL input; stack/entry-point detection; terminal presentation; optional Markdown output.

Selected source leaves the machine for Anthropic. Scanning and file selection are bounded; generated architecture explanations can be incomplete. Repository URLs are cloned locally.

## Declared command interface

Options belong to the preceding command in the linked source; they are not necessarily global.

| Kind | Declaration | Source description | Source |
| --- | --- | --- | --- |
| argument | `[target]` | Directory path or GitHub URL (default: current directory) | [bin/onboard.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/bin/onboard.js) |
| option | `-o, --output <file>` | Save guide to markdown file (e.g., guide.md) | [bin/onboard.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/bin/onboard.js) |
| option | `-v, --verbose` | Show verbose output including token counts | [bin/onboard.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/bin/onboard.js) |

## Package scripts

| Script | Exact command |
| --- | --- |
| `start` | `node bin/onboard.js` |
| `test` | `node --test` |

## Environment references

The implementation reads `ANTHROPIC_API_KEY`. Some are optional or mode-specific; inspect their call sites before configuring a service. Credentials and endpoint values are never supplied by this document.

## Implementation sources

[src/index.js](https://github.com/NickCirv/claude-onboard/blob/9d33f1639bc9c4ef81698d7a073c70307bfc7eb0/src/index.js).

## Verification boundary

No repository code, tests, network operation, hook installer or migration was executed for this review. Source inspection supports the documented interface; runtime correctness and external-service compatibility remain unverified.
