#!/usr/bin/env node

import { program } from 'commander'
import chalk from 'chalk'
import { run } from '../src/index.js'

program
  .name('claude-onboard')
  .description('AI-powered repo onboarding — instant architecture guides from any codebase')
  .version('1.0.0')
  .argument('[target]', 'Directory path or GitHub URL (default: current directory)', '.')
  .option('-o, --output <file>', 'Save guide to markdown file (e.g., guide.md)')
  .option('-v, --verbose', 'Show verbose output including token counts')
  .addHelpText('after', `
Examples:
  $ npx claude-onboard                          Analyze current directory
  $ npx claude-onboard ./my-project             Analyze a local path
  $ npx claude-onboard https://github.com/user/repo  Clone and analyze remote repo
  $ npx claude-onboard --output guide.md        Save guide to file
  $ npx claude-onboard https://github.com/facebook/react --output react-guide.md

Environment:
  ANTHROPIC_API_KEY   Required. Your Anthropic API key.
`)

program.parse()

const [target] = program.args
const { output, verbose } = program.opts()

if (!process.env.ANTHROPIC_API_KEY) {
  process.stderr.write(
    chalk.red('\n  Error: ANTHROPIC_API_KEY environment variable is not set.\n') +
    chalk.dim('  Get your key at: https://console.anthropic.com\n\n')
  )
  process.exit(1)
}

run({ target: target || '.', output, verbose }).catch(err => {
  process.stderr.write(chalk.red(`\n  Error: ${err.message}\n\n`))
  process.exit(1)
})
