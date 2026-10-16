# presentomatic

Markdown presentations made simple.

Presentomatic turns a directory of Markdown files into a browser-based slideshow. Write slides in plain Markdown, run one command, and present, export to PDF, or publish a static site.

A live example is available at https://tran-engineering.github.io/presentomatic. Its source is the [`example-presentation`](example-presentation) directory in this repository.

## Features

- Slides written in Markdown, separated by `---`
- Syntax highlighting (highlight.js) with click-to-copy code blocks
- [Mermaid](https://mermaid.js.org) diagrams, with a fullscreen pan and zoom view
- Step-by-step list reveals
- Laser pointer
- Multiple Markdown files per presentation
- Custom styling with your own CSS files
- Live reload while you edit
- PDF export and static HTML build

## Installation

Install globally from npm:

```bash
npm i -g presentomatic
```

You can also run it without installing: `npx presentomatic`.

Requires Node.js 14 or newer.

PDF export uses [Puppeteer](https://pptr.dev), which downloads a Chromium build when the package is installed.

## Quick start

Put your Markdown files and assets (images, CSS) in a directory, then run this in that directory:

```bash
presentomatic
```

The presentation is served on port 1337 (open the printed URL, e.g. http://localhost:1337). Edits to `.md` and `.css` files reload the browser automatically.

Separate slides with `---`:

```md
# My Presentation

---

## Slide 1

Today is a beautiful day.

---

## Slide 2

Tomorrow will also be sunny.
```

## Writing slides

- A slide containing a level-1 heading (`#`) is a title slide; other slides are content slides.
- Use `***` inside a slide to split it into several sections.
- Images and other assets are referenced relative to the presentation directory, for example `![A cat](cat.png)`.
- Links open in a new tab.
- Mermaid diagrams go in ` ```mermaid ` code blocks. Click a diagram to open it fullscreen.
- To reveal list items one at a time with the right arrow key, add an HTML comment with options to the slide:

  ```md
  ## My list

  <!-- {"animate-li": true} -->

  - First
  - Second
  ```

- If a directory contains several `.md` files, they are all available and sorted by file name. Use the previous/next file buttons at the bottom of the screen to switch between them, or open one directly with `?f=<file name>` in the URL. `README.md` is ignored.

The [example presentation](example-presentation) demonstrates each of these features.

### Keyboard shortcuts

| Key         | Action                                 |
| ----------- | -------------------------------------- |
| Right arrow | Next slide (or next list item)         |
| Left arrow  | Previous slide (or previous list item) |
| Home / End  | First / last slide                     |
| L           | Toggle the laser pointer               |
| Esc         | Close the fullscreen diagram           |

The current slide number is kept in the URL hash (for example `#3`), so you can bookmark or share a link to a specific slide.

### Custom styling

Presentomatic automatically includes every `.css` file in your presentation directory. Override the theme with these CSS variables:

| Variable            | Default   | Role                     |
| ------------------- | --------- | ------------------------ |
| `--title-slide-bg`  | `#1e5a96` | Title slide background   |
| `--title-slide-fg`  | `white`   | Title slide text         |
| `--normal-slide-bg` | `white`   | Content slide background |
| `--normal-slide-fg` | `#1e5a96` | Content slide text       |

```css
/* custom.css */
:root {
  --title-slide-bg: #2d1b69;
  --title-slide-fg: #e8d5ff;
}
```

## Commands

Every command takes an optional path to the presentation directory (default: the current directory). The directory must contain at least one `.md` file.

| Command                                     | Description                                                                                                                        |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `presentomatic [serve] [dir]`               | Start the dev server. Option: `-p, --port <port>` (default `1337`).                                                                |
| `presentomatic build [dir]`                 | Build static HTML. Option: `-o, --output <dir>` (default `dist`).                                                                  |
| `presentomatic pdf [dir]`                   | Write one PDF per Markdown file. Options: `-o, --output <dir>` (default `.`), `-p, --port <port>`.                                 |
| `presentomatic setup-github-workflow [dir]` | Write a GitHub Actions workflow that publishes the presentation to GitHub Pages. Option: `-b, --branch <branch>` (default `main`). |

### Building PDFs

```bash
presentomatic pdf .
```

Creates `<name>.pdf` for each Markdown file, with one landscape A4 page per slide and animations disabled.

### Static site

```bash
presentomatic build .
```

Writes static files to `dist/` that can be hosted on any web server.

### Publishing to GitHub Pages

From the root of your presentation repository:

```bash
presentomatic setup-github-workflow
```

This writes `.github/workflows/static.yml`, which builds the presentation and deploys it on every push to `main`. Afterwards, enable GitHub Pages for the repository and set its source to "GitHub Actions". If your slides are in a subdirectory, pass it as an argument, for example `presentomatic setup-github-workflow slides`.

## Development

Requirements: a current Node.js LTS release and npm.

```bash
git clone https://github.com/tran-engineering/presentomatic.git
cd presentomatic
npm ci
npm start
```

`npm start` serves the bundled `example-presentation` directory.

| Script                 | Description                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| `npm start`            | Serve `example-presentation`                                                                |
| `npm run build`        | Build `example-presentation` to static HTML                                                 |
| `npm run pdf`          | Export `example-presentation` to PDF                                                        |
| `npm test`             | Run the unit tests (Vitest)                                                                 |
| `npm run test:install` | Slow smoke test: packs the package, installs it globally in a temporary prefix, and runs it |
| `npm run lint`         | Lint with ESLint (`npm run lint:fix` to auto-fix)                                           |
| `npm run format`       | Format with Prettier (`npm run format:check` to only check)                                 |

### How it works

The npm package ships its Svelte source rather than a pre-built bundle. When you run the CLI, `presentomatic.js` starts Vite against the package's own `src/` and `index.html`, with your presentation directory mounted as the public directory. The Markdown files are parsed in the browser by `src/util/MarkdownParser.ts` and rendered by `src/Presentomatic.svelte`. See [CLAUDE.md](CLAUDE.md) for a more detailed architecture overview.

`vite` and `@sveltejs/vite-plugin-svelte` are intentionally pinned to their current major versions because newer majors break `presentomatic serve` for globally installed users. See [CLAUDE.md](CLAUDE.md) before bumping them.

## Contributing

Issues and pull requests are welcome.

1. Open an issue to discuss larger changes first.
2. Create a branch, make your change, and add or update tests where it makes sense.
3. Run `npm test`, `npm run lint`, and `npm run format:check`. Run `npm run test:install` if you touched dependencies or the CLI.
4. Open a pull request against `main`.

Releases are automated with [semantic-release](https://semantic-release.gitbook.io), so please write [Conventional Commit](https://www.conventionalcommits.org) messages (`feat: ...`, `fix: ...`, `docs: ...`). The version and `CHANGELOG.md` are updated automatically.

## License

[MIT](LICENSE)
