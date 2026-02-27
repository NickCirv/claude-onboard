import { existsSync } from 'fs'
import { join } from 'path'

export function detectStack(dirPath, keyFiles) {
  const stack = {
    primary: null,
    frameworks: [],
    tools: [],
    languages: [],
    runtime: null,
    packageManager: null,
  }

  // Node.js ecosystem
  if (keyFiles['package.json']) {
    try {
      const pkg = JSON.parse(keyFiles['package.json'])
      stack.languages.push('JavaScript/TypeScript')
      stack.runtime = 'Node.js'
      stack.primary = 'Node.js'

      const allDeps = {
        ...pkg.dependencies,
        ...pkg.devDependencies,
      }

      // Frameworks
      if (allDeps['next']) stack.frameworks.push(`Next.js ${allDeps['next']}`)
      if (allDeps['nuxt'] || allDeps['nuxt3']) stack.frameworks.push('Nuxt.js')
      if (allDeps['@remix-run/node'] || allDeps['@remix-run/react']) stack.frameworks.push('Remix')
      if (allDeps['express']) stack.frameworks.push(`Express ${allDeps['express']}`)
      if (allDeps['fastify']) stack.frameworks.push(`Fastify ${allDeps['fastify']}`)
      if (allDeps['hono']) stack.frameworks.push(`Hono ${allDeps['hono']}`)
      if (allDeps['react'] && !allDeps['next'] && !allDeps['nuxt']) {
        stack.frameworks.push(`React ${allDeps['react']}`)
      }
      if (allDeps['vue'] && !allDeps['nuxt']) stack.frameworks.push(`Vue ${allDeps['vue']}`)
      if (allDeps['svelte']) stack.frameworks.push(`Svelte ${allDeps['svelte']}`)
      if (allDeps['@angular/core']) stack.frameworks.push('Angular')
      if (allDeps['astro']) stack.frameworks.push(`Astro ${allDeps['astro']}`)

      // Databases
      if (allDeps['prisma'] || allDeps['@prisma/client']) stack.tools.push('Prisma ORM')
      if (allDeps['drizzle-orm']) stack.tools.push('Drizzle ORM')
      if (allDeps['mongoose']) stack.tools.push('Mongoose (MongoDB)')
      if (allDeps['pg'] || allDeps['postgres']) stack.tools.push('PostgreSQL')
      if (allDeps['mysql2'] || allDeps['mysql']) stack.tools.push('MySQL')
      if (allDeps['redis'] || allDeps['ioredis']) stack.tools.push('Redis')

      // Auth
      if (allDeps['next-auth'] || allDeps['@auth/core']) stack.tools.push('Auth.js (NextAuth)')
      if (allDeps['@clerk/nextjs'] || allDeps['@clerk/clerk-sdk-node']) stack.tools.push('Clerk Auth')
      if (allDeps['passport']) stack.tools.push('Passport.js')

      // Styling
      if (allDeps['tailwindcss']) stack.tools.push('Tailwind CSS')
      if (allDeps['styled-components']) stack.tools.push('styled-components')
      if (allDeps['@emotion/react']) stack.tools.push('Emotion CSS')

      // Testing
      if (allDeps['vitest']) stack.tools.push('Vitest')
      if (allDeps['jest']) stack.tools.push('Jest')
      if (allDeps['playwright'] || allDeps['@playwright/test']) stack.tools.push('Playwright')
      if (allDeps['cypress']) stack.tools.push('Cypress')

      // Build tools
      if (allDeps['vite']) stack.tools.push(`Vite ${allDeps['vite']}`)
      if (allDeps['turbo'] || allDeps['turborepo']) stack.tools.push('Turborepo (monorepo)')

      // TypeScript
      if (allDeps['typescript']) {
        stack.languages = ['TypeScript']
        stack.tools.push(`TypeScript ${allDeps['typescript']}`)
      }

      // Package manager
      if (existsSync(join(dirPath, 'bun.lockb'))) stack.packageManager = 'bun'
      else if (existsSync(join(dirPath, 'pnpm-lock.yaml'))) stack.packageManager = 'pnpm'
      else if (existsSync(join(dirPath, 'yarn.lock'))) stack.packageManager = 'yarn'
      else stack.packageManager = 'npm'

    } catch {
      // Malformed package.json
    }
  }

  // Python ecosystem
  if (keyFiles['requirements.txt'] || keyFiles['pyproject.toml'] || keyFiles['setup.py']) {
    stack.languages.push('Python')
    stack.primary = stack.primary || 'Python'

    const reqs = keyFiles['requirements.txt'] || keyFiles['pyproject.toml'] || ''

    if (/django/i.test(reqs)) stack.frameworks.push('Django')
    if (/fastapi/i.test(reqs)) stack.frameworks.push('FastAPI')
    if (/flask/i.test(reqs)) stack.frameworks.push('Flask')
    if (/sqlalchemy/i.test(reqs)) stack.tools.push('SQLAlchemy')
    if (/alembic/i.test(reqs)) stack.tools.push('Alembic (migrations)')
    if (/celery/i.test(reqs)) stack.tools.push('Celery (task queue)')
    if (/pytest/i.test(reqs)) stack.tools.push('pytest')
    if (/pydantic/i.test(reqs)) stack.tools.push('Pydantic')
    if (/anthropic/i.test(reqs)) stack.tools.push('Anthropic SDK')
    if (/openai/i.test(reqs)) stack.tools.push('OpenAI SDK')
    if (/langchain/i.test(reqs)) stack.tools.push('LangChain')
  }

  // Go ecosystem
  if (keyFiles['go.mod']) {
    stack.languages.push('Go')
    stack.primary = stack.primary || 'Go'
    const goMod = keyFiles['go.mod']
    if (/github\.com\/gin-gonic\/gin/.test(goMod)) stack.frameworks.push('Gin')
    if (/github\.com\/labstack\/echo/.test(goMod)) stack.frameworks.push('Echo')
    if (/github\.com\/gofiber\/fiber/.test(goMod)) stack.frameworks.push('Fiber')
    if (/github\.com\/go-chi\/chi/.test(goMod)) stack.frameworks.push('Chi')
  }

  // Rust ecosystem
  if (keyFiles['Cargo.toml']) {
    stack.languages.push('Rust')
    stack.primary = stack.primary || 'Rust'
    const cargo = keyFiles['Cargo.toml']
    if (/actix-web/.test(cargo)) stack.frameworks.push('Actix Web')
    if (/axum/.test(cargo)) stack.frameworks.push('Axum')
    if (/warp/.test(cargo)) stack.frameworks.push('Warp')
    if (/tokio/.test(cargo)) stack.tools.push('Tokio (async runtime)')
    if (/serde/.test(cargo)) stack.tools.push('Serde (serialization)')
  }

  // Ruby ecosystem
  if (keyFiles['Gemfile']) {
    stack.languages.push('Ruby')
    stack.primary = stack.primary || 'Ruby'
    const gemfile = keyFiles['Gemfile']
    if (/rails/.test(gemfile)) stack.frameworks.push('Ruby on Rails')
    if (/sinatra/.test(gemfile)) stack.frameworks.push('Sinatra')
    if (/rspec/.test(gemfile)) stack.tools.push('RSpec')
    if (/sidekiq/.test(gemfile)) stack.tools.push('Sidekiq (jobs)')
  }

  // Java / Kotlin / Scala
  if (keyFiles['pom.xml'] || keyFiles['build.gradle']) {
    stack.languages.push('Java/Kotlin')
    stack.primary = stack.primary || 'JVM'
    const build = keyFiles['pom.xml'] || keyFiles['build.gradle'] || ''
    if (/spring/.test(build)) stack.frameworks.push('Spring Boot')
    if (/quarkus/.test(build)) stack.frameworks.push('Quarkus')
    if (/micronaut/.test(build)) stack.frameworks.push('Micronaut')
  }

  // PHP
  if (keyFiles['composer.json']) {
    stack.languages.push('PHP')
    stack.primary = stack.primary || 'PHP'
    try {
      const composer = JSON.parse(keyFiles['composer.json'])
      const deps = { ...composer.require, ...composer['require-dev'] }
      if (deps['laravel/framework']) stack.frameworks.push('Laravel')
      if (deps['symfony/symfony'] || deps['symfony/framework-bundle']) stack.frameworks.push('Symfony')
      if (deps['slim/slim']) stack.frameworks.push('Slim')
    } catch {}
  }

  // Docker
  if (keyFiles['Dockerfile'] || keyFiles['docker-compose.yml'] || keyFiles['docker-compose.yaml']) {
    stack.tools.push('Docker')
  }

  // CI/CD
  if (existsSync(join(dirPath, '.github/workflows'))) stack.tools.push('GitHub Actions')
  if (keyFiles['render.yaml']) stack.tools.push('Render (deploy)')
  if (keyFiles['fly.toml']) stack.tools.push('Fly.io (deploy)')
  if (keyFiles['vercel.json']) stack.tools.push('Vercel (deploy)')
  if (keyFiles['netlify.toml']) stack.tools.push('Netlify (deploy)')

  return stack
}
