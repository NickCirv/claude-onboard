import Anthropic from '@anthropic-ai/sdk'
import chalk from 'chalk'
import { writeFile } from 'fs/promises'
import { mkdtempSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join, basename, resolve } from 'path'

import { scanDirectory, cloneRepo } from './scanner.js'
import { detectStack } from './detector.js'
import { buildOnboardingPrompt } from './prompts.js'
import { formatForTerminal, formatAsMarkdown } from './formatter.js'

export async function run({ target = '.', output = null, verbose = false } = {}) {
  const client = new Anthropic()

  let targetPath = target
  let tempDir = null
  let isRemote = false

  // Handle remote repos
  if (target.startsWith('https://') || target.startsWith('git@')) {
    isRemote = true
    tempDir = mkdtempSync(join(tmpdir(), 'claude-onboard-'))
    log(chalk.dim(`  Cloning ${target}...`))
    try {
      await cloneRepo(target, tempDir)
      targetPath = tempDir
    } catch (err) {
      cleanup(tempDir)
      throw new Error(`Failed to clone repo: ${err.message}`)
    }
  } else {
    targetPath = resolve(target)
  }

  const repoName = isRemote
    ? basename(target, '.git')
    : basename(targetPath)

  log(chalk.bold.yellow('\n  claude-onboard') + chalk.dim(' — scanning repo...'))
  log(chalk.dim(`  Target: ${targetPath}\n`))

  // Scan
  log(chalk.dim('  [1/4] Scanning directory structure...'))
  const scanResult = await scanDirectory(targetPath)

  // Detect stack
  log(chalk.dim('  [2/4] Detecting tech stack...'))
  const stack = detectStack(targetPath, scanResult.keyFiles)

  if (stack.primary) {
    log(chalk.dim(`         Detected: ${chalk.white(stack.primary)}`) +
      (stack.frameworks.length ? chalk.dim(` + ${stack.frameworks.slice(0, 3).join(', ')}`) : ''))
  }

  // Build prompt
  log(chalk.dim('  [3/4] Building analysis prompt...'))
  const prompt = buildOnboardingPrompt({
    tree: scanResult.tree,
    keyFiles: scanResult.keyFiles,
    entryPoints: scanResult.entryPoints,
    stack,
  })

  if (verbose) {
    log(chalk.dim(`\n  Prompt length: ${prompt.length} chars\n`))
  }

  // Call Claude
  log(chalk.dim('  [4/4] Generating onboarding guide with Claude...\n'))

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const guide = message.content[0].text

  // Output
  if (output) {
    const markdown = formatAsMarkdown(guide, repoName)
    await writeFile(output, markdown, 'utf8')
    log(chalk.green(`\n  Guide saved to: ${chalk.bold(output)}`))
    log(chalk.dim(`  ${message.usage.input_tokens} input tokens | ${message.usage.output_tokens} output tokens\n`))
  } else {
    const terminal = formatForTerminal(guide, repoName)
    process.stdout.write(terminal + '\n')
    log(chalk.dim(`  Tokens used: ${message.usage.input_tokens} in / ${message.usage.output_tokens} out\n`))
  }

  // Cleanup temp dir
  if (tempDir) cleanup(tempDir)

  return guide
}

function log(msg) {
  process.stderr.write(msg + '\n')
}

function cleanup(dir) {
  try {
    rmSync(dir, { recursive: true, force: true })
  } catch {
    // Best effort
  }
}
