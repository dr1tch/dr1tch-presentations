# Slidev Decks

To start a deck:

- `pnpm install`
- `pnpm dev:copilot`
- visit <http://localhost:3030>

Decks live in `decks/`.

Add a new deck:

1. Create `decks/<name>.md`
2. Add scripts in `package.json` like `dev:<name>`, `build:<name>`, `export:<name>`

The root `slides.md` is a small index and can be kept up to date with your deck list.

# GitHub Pages

This repo includes a GitHub Pages workflow that builds the `copilot` deck and deploys `dist/`.

If you change the deck name, update the workflow build step to match the new script.
