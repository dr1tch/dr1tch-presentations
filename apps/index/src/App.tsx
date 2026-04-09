import { useEffect, useMemo, useState } from "react"

type Deck = {
  name: string
  href: string
}

function formatName(name: string) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function App() {
  const [decks, setDecks] = useState<Deck[]>([])
  const [error, setError] = useState<string | null>(null)
  const decksEndpoint = `${import.meta.env.BASE_URL}decks.json`

  useEffect(() => {
    const loadDecks = async () => {
      try {
        const res = await fetch(decksEndpoint)
        if (!res.ok) {
          throw new Error("Failed to load deck list")
        }

        const raw = await res.text()
        let data: Deck[]
        try {
          data = JSON.parse(raw) as Deck[]
        } catch {
          throw new Error("Deck index endpoint returned non-JSON content")
        }

        setDecks(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load deck list")
      }
    }

    void loadDecks()
  }, [decksEndpoint])

  const stats = useMemo(() => `${decks.length} decks`, [decks.length])

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12 flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.3em] text-sky-300">
            Deck Index
          </span>
          <h1 className="text-4xl font-semibold text-slate-100 md:text-5xl">
            Presentations
          </h1>
          <p className="text-lg text-slate-300">
            Choose a deck to launch the slideshow.
          </p>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-sky-300/90 px-3 py-1 text-xs font-semibold text-slate-900">
            {stats}
          </span>
        </header>

        {error && (
          <div className="mb-8 rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {error}. Make sure you ran <code className="font-mono">pnpm build:all</code> first.
          </div>
        )}

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {decks.map((deck) => (
            <a
              className="group rounded-2xl border border-slate-700/70 bg-slate-900/60 p-5 shadow-lg shadow-slate-900/40 transition hover:-translate-y-1 hover:border-sky-300/70"
              key={deck.name}
              href={deck.href}
            >
              <div className="text-lg font-semibold text-slate-100">
                {formatName(deck.name)}
              </div>
              <div className="mt-2 text-sm text-slate-400">Open presentation</div>
              <div className="mt-6 text-xs font-semibold text-sky-300">
                View deck →
              </div>
            </a>
          ))}
        </section>
      </div>
    </div>
  )
}
