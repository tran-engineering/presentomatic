# presentomatic

Markdown presentations made simple

## Installation

`npm i -g presentomatic`

## Quick start

Put your assets (images), Markdown files into a directory and then run in that directory:

`presentomatic`

## Quick docs

Separate your slides with `---`.

```md
# My Presentation

---

## Slide 1

Today is a beautiful day.

---

## Slide 2

Tomorrow will also be sunny.

```

## Advanced features
### Building PDFs

Generate a PDF version of your presentation:

```bash
presentomatic pdf .
```

This creates a PDF file from your markdown presentation, perfect for sharing or printing.

### Static Site Generation

Create a static website version of your presentation:

```bash
presentomatic build .
```

This generates static HTML files that can be hosted on any web server.

### Custom Styling

Presentomatic automatically includes all `.css` files found in your presentation directory, allowing you to customize the appearance of your slides. Simply add your CSS files alongside your markdown and assets, and they'll be applied to your presentation.
