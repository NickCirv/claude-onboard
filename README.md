<div align="center">

# claude-onboard

**Point at any codebase, get an instant architecture guide powered by Claude**

[![License: MIT](https://img.shields.io/badge/license-MIT-blue?labelColor=0B0A09)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen?labelColor=0B0A09)](https://nodejs.org)

</div>

## Install

Requires `ANTHROPIC_API_KEY`.

```bash
npx github:NickCirv/claude-onboard
```

## Usage

```bash
# Analyze current directory
npx github:NickCirv/claude-onboard

# Analyze a local path
npx github:NickCirv/claude-onboard ./my-project

# Clone + analyze a remote repo
npx github:NickCirv/claude-onboard https://github.com/user/repo

# Save guide to markdown file
npx github:NickCirv/claude-onboard --output guide.md
```

| Flag | Description |
|---|---|
| `[target]` | Directory path or GitHub URL (default: `.`) |
| `-o, --output <file>` | Save guide to a markdown file |
| `-v, --verbose` | Show token counts and verbose output |

## What it does

Scans a repo (up to 4 levels deep), reads key files and dependency manifests, then sends a structured summary — not full file contents — to `claude-sonnet-4-6`. Typical input is 2,000–4,000 tokens. Returns a guide covering architecture, tech stack, key files, getting-started commands, common tasks, and gotchas.

Detects JS/TS, Python, Go, Rust, Ruby, Java/Kotlin, PHP stacks plus common tooling (Prisma, Tailwind, Docker, GitHub Actions, Vercel, etc.).

## Setup

```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

---
<sub>Node >=18 · MIT · by <a href="https://github.com/NickCirv">NickCirv</a></sub>
