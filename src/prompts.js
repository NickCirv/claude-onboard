export function buildOnboardingPrompt({ tree, keyFiles, entryPoints, stack }) {
  const sections = []

  sections.push(`You are a senior software architect helping a new developer onboard to a codebase.
Analyze the provided repository information and generate a comprehensive onboarding guide.

Be specific and actionable. Reference actual file paths and real code patterns you see.
Write as if you're a knowledgeable teammate explaining the codebase over coffee.
Keep architecture overview to 2-3 focused paragraphs. No fluff.`)

  // Directory tree
  sections.push(`## Directory Structure
\`\`\`
${tree.slice(0, 150).join('\n')}
${tree.length > 150 ? `\n... (${tree.length - 150} more entries)` : ''}
\`\`\``)

  // Detected stack
  if (stack.primary) {
    sections.push(`## Detected Stack
- Primary: ${stack.primary}
- Languages: ${stack.languages.join(', ') || 'Unknown'}
- Frameworks: ${stack.frameworks.join(', ') || 'None detected'}
- Tools: ${stack.tools.join(', ') || 'None detected'}
- Package Manager: ${stack.packageManager || 'Unknown'}`)
  }

  // Key files (most important first)
  const priorityFiles = [
    'package.json', 'pyproject.toml', 'go.mod', 'Cargo.toml',
    'README.md', 'ARCHITECTURE.md', 'docker-compose.yml',
  ]

  const fileEntries = [
    ...priorityFiles.filter(f => keyFiles[f]).map(f => [f, keyFiles[f]]),
    ...Object.entries(keyFiles).filter(([f]) => !priorityFiles.includes(f)).slice(0, 5),
  ]

  if (fileEntries.length > 0) {
    sections.push(`## Key Configuration Files`)
    for (const [filename, content] of fileEntries.slice(0, 8)) {
      const truncated = content.length > 2000 ? content.slice(0, 2000) + '\n... (truncated)' : content
      sections.push(`### ${filename}\n\`\`\`\n${truncated}\n\`\`\``)
    }
  }

  // Entry points
  if (entryPoints.length > 0) {
    sections.push(`## Entry Points`)
    for (const { path, snippet } of entryPoints) {
      sections.push(`### ${path}\n\`\`\`\n${snippet}\n\`\`\``)
    }
  }

  sections.push(`## Your Task

Generate a developer onboarding guide with these EXACT sections (use these exact markdown headers):

# Architecture Overview
2-3 paragraphs explaining what this project does, how it's structured, and the key design decisions you can infer.

# Tech Stack
A clean table or bullet list of every technology, framework, and tool with versions where available.

# Key Files Map
A table with columns: File | Purpose | Why It Matters
List the 8-12 most important files a new dev should know about.

# Getting Started
Numbered steps to get the project running locally. Include exact commands based on the detected stack.

# Common Tasks
How to do the 5 most common developer tasks in this project (e.g., add a feature, run tests, add a route, deploy, add a migration). Use concrete examples.

# Gotchas
3-6 things that might trip up a new developer. Things that aren't obvious from reading the code.

Keep it practical, specific, and reference actual files and patterns you see in the codebase.`)

  return sections.join('\n\n')
}
