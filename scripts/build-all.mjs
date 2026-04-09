import { execSync } from "node:child_process"
import { readdirSync, mkdirSync, writeFileSync } from "node:fs"
import { join, basename } from "node:path"

const repoRoot = process.cwd()
const decksDir = join(repoRoot, "decks")
const distDir = join(repoRoot, "dist")

const rawBase = process.env.BASE ?? "/"
const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`

const deckFiles = readdirSync(decksDir).filter((f) => f.endsWith(".md"))
const deckNames = deckFiles.map((f) => basename(f, ".md"))

if (deckNames.length === 0) {
  console.error("No decks found in decks/")
  process.exit(1)
}

mkdirSync(distDir, { recursive: true })

for (const deck of deckNames) {
  const deckPath = join(decksDir, `${deck}.md`)
  const outDir = join(distDir, deck)
  const deckBase = `${base}${deck}/`

  console.log(`Building ${deck} -> ${outDir} (base: ${deckBase})`)
  execSync(`pnpm slidev build ${deckPath} --out ${outDir} --base ${deckBase}`, {
    stdio: "inherit",
  })
}

const deckData = deckNames.map((name) => ({
  name,
  href: `${base}${name}/`,
}))

writeFileSync(join(distDir, "decks.json"), JSON.stringify(deckData, null, 2))
console.log("Wrote dist/decks.json")

console.log("Building index app")
execSync("pnpm --filter presentations-index build", {
  stdio: "inherit",
  env: { ...process.env, VITE_BASE: base },
})
