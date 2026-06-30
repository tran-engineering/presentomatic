# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Presentomatic is an npm-installed CLI (`npm i -g presentomatic`) that turns a directory of Markdown files into a Svelte-rendered slideshow. Unlike a typical library, the package does **not** ship pre-built output — its own `src/` and `index.html` are published as-is, and `presentomatic.js` runs a real Vite dev server / build against them at the time the end user invokes the CLI, with the user's presentation directory mounted as Vite's `publicDir`. This matters: bugs in the Vite/bundler toolchain itself break the tool for every installed user, not just contributors (see Known issues below).

## Commands

- `npm test` — run the vitest unit suite (jsdom, Svelte component tests)
- `npx vitest run src/Presentomatic.test.ts -t "<test name>"` — run a single test
- `npm run test:install` — slow (~10s) smoke test: packs the repo, installs it into a throwaway global prefix, and runs `presentomatic serve` through the installed `bin` symlink to catch toolchain regressions that only show up on a real global install (see Known issues)
- `npm run build` / `npm start` / `npm run pdf` — run `presentomatic.js`'s `build`/`serve`/`pdf` commands against the bundled `example-presentation/`
- `npm run lint` / `npm run lint:fix` — eslint (flat config, typescript-eslint + eslint-plugin-svelte)
- `npm run format` / `npm run format:check` — prettier (with prettier-plugin-svelte)

## Architecture

- `presentomatic.js` is the CLI entrypoint (commander), with three commands: `serve` (default), `build`, `pdf`. All three build a Vite config via the local `viteConfig()` helper. **`root` is always `__dirname`** — the package's own install directory — never the user's presentation directory; the user's directory is only mounted as `publicDir`. The `.md` and `.css` files found in the user's directory are read with `fs.readdir` and injected into the client bundle as the global constants `MARKDOWN_FILES` / `CSS_FILES` (declared in `src/globals.d.ts`) via Vite's `define`.
- `index.html` → `src/main.ts` mounts the single Svelte component `src/Presentomatic.svelte`, which on mount fetches the requested markdown file (from the `?f=` query param, defaulting to `MARKDOWN_FILES[0]`), parses it with `src/util/MarkdownParser.ts`, and renders the current slide via `src/presentomatic/Slide.svelte`, with `Navigation.svelte` and `Laserpointer.svelte` as overlay controls. The current slide index is tracked in `window.location.hash` so navigation is bookmarkable/shareable.
- `MarkdownParser` wraps `marked`: it pre-processes ` ```mermaid ` fences into `<pre mermaid>` and `***` into `<hr split>` (multi-section title slides), converts to HTML, then splits on `<hr>` (the `---` slide separator) into `Slide[]` objects. Per-slide options (e.g. `animate-li`) are read from an HTML comment on the slide.
- `pdf` command starts the dev server itself, drives Puppeteer across every page of every markdown file, screenshots each slide, and assembles the result with `pdf-lib`.
- There is no `files` field in `package.json` and no `.npmignore`, so the published npm package is effectively the whole repo (minus `.gitignore`d paths) — `src/` ships as source, not as a build artifact.

## Known issues / gotchas

- **`vite` and `@sveltejs/vite-plugin-svelte` are intentionally pinned** (`vite: ^7.3.6`, `@sveltejs/vite-plugin-svelte: ^6.2.4`) — do not bump to `vite@8.x` / `vite-plugin-svelte@7.x`. Vite 8 defaults to the Rolldown bundler for dependency pre-bundling, and Rolldown's scanner cannot resolve relative `.svelte` imports inside Svelte's virtual modules (e.g. `Presentomatic.svelte?id=0` importing `./presentomatic/Slide.svelte`), which breaks `presentomatic serve` for every globally-installed user. Upstream: [vitejs/rolldown-vite#304](https://github.com/vitejs/rolldown-vite/issues/304), [storybookjs/storybook#34304](https://github.com/storybookjs/storybook/issues/34304).
- This bug **only reproduces on a real, freshly-`npm install`ed package run through its `bin` symlink from outside the package directory** — it does not occur running `node presentomatic.js` inside this repo's own `node_modules`. That's why the ordinary vitest suite (`npm test`) can't catch it; `npm run test:install` (`scripts/smoke-test-install.mjs`) reproduces the real install shape specifically to guard against this.
- `renovate.json` has `"automerge": true` with only non-major updates grouped, so a renovate PR could re-propose the vite 8 bump as its own (non-grouped, major) PR. `npm run test:install` is wired into both `.github/workflows/test.yml` and `.github/workflows/release.yml` specifically so CI fails and blocks automerge/release if this regresses.
