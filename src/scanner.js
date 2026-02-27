import { readdir, readFile, stat } from 'fs/promises'
import { join, extname, basename, relative } from 'path'
import { existsSync } from 'fs'
import { execFile } from 'child_process'
import { promisify } from 'util'

const execFileAsync = promisify(execFile)

const SKIP_DIRS = new Set([
  'node_modules', '.git', '.svn', 'dist', 'build', 'out', '.next', '.nuxt',
  '.turbo', 'coverage', '.nyc_output', '__pycache__', '.pytest_cache',
  'venv', '.venv', 'env', '.env', 'vendor', 'target', '.gradle',
  '.idea', '.vscode', '.DS_Store', 'tmp', '.tmp', 'temp', 'logs',
])

const KEY_FILE_PATTERNS = [
  'package.json', 'requirements.txt', 'go.mod', 'Cargo.toml', 'pom.xml',
  'build.gradle', 'composer.json', 'Gemfile', 'pyproject.toml', 'setup.py',
  'setup.cfg', 'mix.exs', 'build.sbt', 'CMakeLists.txt', 'Makefile',
  'Dockerfile', 'docker-compose.yml', 'docker-compose.yaml',
  '.env.example', '.env.sample', 'config.yml', 'config.yaml', 'config.json',
  'tsconfig.json', 'jsconfig.json', 'babel.config.js', 'babel.config.json',
  'vite.config.js', 'vite.config.ts', 'next.config.js', 'next.config.ts',
  'nuxt.config.js', 'nuxt.config.ts', 'webpack.config.js',
  'tailwind.config.js', 'tailwind.config.ts',
  'README.md', 'README.txt', 'README', 'CONTRIBUTING.md', 'ARCHITECTURE.md',
  'render.yaml', 'fly.toml', 'vercel.json', 'netlify.toml',
  'main.go', 'main.py', 'index.js', 'index.ts', 'app.js', 'app.ts',
  'server.js', 'server.ts', 'app.py', 'manage.py', 'main.rs', 'lib.rs',
]

const MAX_FILE_SIZE = 50_000  // 50KB
const MAX_DEPTH = 4

export async function scanDirectory(dirPath) {
  const tree = await buildTree(dirPath, 0)
  const keyFiles = await readKeyFiles(dirPath)
  const entryPoints = await detectEntryPoints(dirPath)

  return { tree, keyFiles, entryPoints, rootPath: dirPath }
}

async function buildTree(dirPath, depth, prefix = '') {
  if (depth > MAX_DEPTH) return []

  let entries
  try {
    entries = await readdir(dirPath, { withFileTypes: true })
  } catch {
    return []
  }

  const filtered = entries
    .filter(e => {
      if (e.name.startsWith('.') && e.name !== '.github') return false
      return !SKIP_DIRS.has(e.name)
    })
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1
      if (!a.isDirectory() && b.isDirectory()) return 1
      return a.name.localeCompare(b.name)
    })

  const lines = []
  for (let i = 0; i < filtered.length; i++) {
    const entry = filtered[i]
    const isLast = i === filtered.length - 1
    const connector = isLast ? '└── ' : '├── '
    const childPrefix = isLast ? '    ' : '│   '
    const fullPath = join(dirPath, entry.name)

    if (entry.isDirectory()) {
      lines.push(`${prefix}${connector}${entry.name}/`)
      const children = await buildTree(fullPath, depth + 1, prefix + childPrefix)
      lines.push(...children)
    } else {
      lines.push(`${prefix}${connector}${entry.name}`)
    }
  }

  return lines
}

async function readKeyFiles(dirPath) {
  const result = {}

  for (const pattern of KEY_FILE_PATTERNS) {
    const filePath = join(dirPath, pattern)
    if (!existsSync(filePath)) continue

    try {
      const stats = await stat(filePath)
      if (!stats.isFile() || stats.size > MAX_FILE_SIZE) continue

      const content = await readFile(filePath, 'utf8')
      result[pattern] = content.slice(0, 8000)
    } catch {
      // Skip unreadable files
    }
  }

  return result
}

async function detectEntryPoints(dirPath) {
  const candidates = [
    'src/index.js', 'src/index.ts', 'src/main.js', 'src/main.ts',
    'src/app.js', 'src/app.ts', 'src/server.js', 'src/server.ts',
    'index.js', 'index.ts', 'main.js', 'main.ts', 'app.js', 'app.ts',
    'server.js', 'server.ts', 'main.go', 'main.py', 'app.py', 'manage.py',
    'src/main.rs', 'src/lib.rs', 'lib/index.js', 'lib/index.ts',
  ]

  const found = []
  for (const candidate of candidates) {
    const filePath = join(dirPath, candidate)
    if (!existsSync(filePath)) continue

    try {
      const content = await readFile(filePath, 'utf8')
      found.push({ path: candidate, snippet: content.slice(0, 2000) })
      if (found.length >= 3) break
    } catch {
      // Skip
    }
  }

  return found
}

export async function cloneRepo(url, targetDir) {
  // Uses execFile (not exec) — args passed as array, no shell injection possible
  await execFileAsync('git', ['clone', '--depth', '1', '--', url, targetDir])
  return targetDir
}
