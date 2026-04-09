import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { fileURLToPath, URL } from "node:url"
import { basename, extname, join, resolve } from "node:path"
import { createReadStream, existsSync, readdirSync, readFileSync, statSync } from "node:fs"

const base = process.env.VITE_BASE ?? "/"
const normalizedBase = base.endsWith("/") ? base : `${base}/`
const repoRoot = fileURLToPath(new URL("../..", import.meta.url))
const decksDir = join(repoRoot, "decks")
const distDir = join(repoRoot, "dist")
const distDecksJson = join(repoRoot, "dist", "decks.json")

function buildDeckManifest() {
  const deckFiles = readdirSync(decksDir).filter((f) => f.endsWith(".md"))
  return deckFiles.map((file) => {
    const name = basename(file, ".md")
    return {
      name,
      href: `${normalizedBase}${name}/`,
    }
  })
}

const contentTypeByExtension: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".map": "application/json; charset=utf-8",
}

function isFile(path: string) {
  if (!existsSync(path)) return false
  return statSync(path).isFile()
}

function resolveDistPath(pathname: string) {
  const relPath = pathname.replace(/^\/+/, "")
  if (!relPath) return null

  const maybePaths = pathname.endsWith("/")
    ? [resolve(distDir, relPath, "index.html")]
    : [resolve(distDir, relPath), resolve(distDir, relPath, "index.html")]

  for (const maybePath of maybePaths) {
    const isInsideDist = maybePath === distDir || maybePath.startsWith(`${distDir}/`)
    if (!isInsideDist) continue
    if (isFile(maybePath)) return maybePath
  }

  return null
}

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "serve-decks-json",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const path = req.url?.split("?")[0] ?? "/"

          if (path !== "/decks.json") {
            const distFilePath = resolveDistPath(path)
            if (!distFilePath) {
              next()
              return
            }

            const extension = extname(distFilePath).toLowerCase()
            const contentType =
              contentTypeByExtension[extension] ?? "application/octet-stream"

            res.statusCode = 200
            res.setHeader("Content-Type", contentType)
            createReadStream(distFilePath).pipe(res)
            return
          }

          let body: string
          if (existsSync(distDecksJson)) {
            body = readFileSync(distDecksJson, "utf8")
          } else {
            body = JSON.stringify(buildDeckManifest(), null, 2)
          }

          res.statusCode = 200
          res.setHeader("Content-Type", "application/json; charset=utf-8")
          res.end(body)
        })
      },
    },
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "../../dist",
    emptyOutDir: false,
  },
})
