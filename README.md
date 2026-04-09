# dr1tch-presentations

To start a deck:

- `pnpm install`
- `pnpm dev:copilot`
- visit <http://localhost:3030>

Decks live in `decks/`.

Add a new deck:

1. Create `decks/<name>.md`
2. Add scripts in `package.json` like `dev:<name>`, `build:<name>`, `export:<name>`

The root `slides.md` is a small index and can be kept up to date with your deck list.

# React Index (Tailwind v4)

The index page is a React 19 app under `apps/index` and reads `dist/decks.json`.

- `pnpm dev:index` runs the index app locally
- `pnpm build:all` builds every deck and then builds the React index into `dist/`

# Code Quality

- `pnpm lint`
- `pnpm format`
- `pnpm typecheck`

# GitHub Pages

The workflow builds all decks and deploys `dist/`.
