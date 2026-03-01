# Images & Layout

Embed images alongside text and other content

---

## Images

Images scale automatically to fit the slide (max 80vw × 80vh):

![A cat giving a keynote](keynote_cat.png)

---

## Image with Caption

Standard markdown image syntax:

```markdown
![alt text](path/to/image.png)
```

The alt text is displayed as the image caption if the image fails to load.

---

## Image + Text

Images and text can coexist on the same slide.

Here is some context **before** the image:

![A cat giving a keynote](keynote_cat.png)

And some commentary **after** the image.

---

## Columns

Use `***` to split a slide into columns:

```markdown
## Two Columns

Left column content

***

Right column content
```

---

## Custom CSS

Drop a `.css` file into your presentation directory and it's automatically applied.

```css
/* custom.css */
:root {
  --title-slide-bg: #2d1b69;
  --title-slide-fg: #e8d5ff;
  --normal-slide-fg: #2d1b69;
}

h2 {
  border-bottom: 3px solid currentColor;
  padding-bottom: 0.25em;
}
```

---

## Color Variables

Override these CSS variables to theme your presentation:

| Variable              | Default   | Role                     |
| --------------------- | --------- | ------------------------ |
| `--title-slide-bg`    | `#1e5a96` | Title slide background   |
| `--title-slide-fg`    | `white`   | Title slide text         |
| `--normal-slide-bg`   | `white`   | Content slide background |
| `--normal-slide-fg`   | `#1e5a96` | Content slide text       |

---

## Multi-file Presentations

Split a long presentation into multiple files:

```
my-talk/
├── 01-intro.md
├── 02-deep-dive.md
├── 03-demo.md
└── 04-conclusion.md
```

Files load in alphabetical order. Navigate between files using the **Previous / Next** buttons in the bottom bar.

---

## Disable Animations

Add `?no-animations` to the URL to skip all entrance animations — useful for PDF export or low-motion preference:

```
http://localhost:1337/?no-animations
```

---

## Export to PDF

```bash
presentomatic pdf my-talk/ -o slides.pdf
```

Puppeteer renders each slide at full resolution. Great for sharing or printing.

---

## Build a Static Site

```bash
presentomatic build my-talk/ -o ./dist
```

Generates standalone HTML you can host anywhere — GitHub Pages, Netlify, S3, etc.

---

# You're all set!

- Put markdown files in a directory
- Run `presentomatic`
- Present from your browser
