# onpenn

[English](README.md) · [中文](README.zh.md) · [Русский](README.ru.md)

A comic a day, in a language you can read. Each day a comic is shown with translated speech-bubble overlays in Chinese, English, and Russian.

**Live site:** deployed via GitHub Pages — see the `gh-pages` branch.

---

## Contributing a Translation

### 1. Open the visual editor

Navigate to `/zh/editor` (or `/en/editor`, `/ru/editor`) in your browser while running the dev server.

```bash
pnpm dev
# open http://localhost:3000/zh/editor
```

### 2. Place bubbles on the image

- **Click** anywhere on the comic image to create a new bubble at that position.
- **Drag the bubble body** to reposition it.
- **Drag the right edge** to resize the width.
- **Drag the bottom edge** to resize the height.

### 3. Configure each bubble in the side panel

| Field | Description |
|-------|-------------|
| Font size | Slider — value is in `vw` units (scales with image width) |
| Font | Choose from the available fonts (see [Custom Fonts](#custom-fonts) below) |
| Shape | `rect` (rounded rectangle) or `ellipse` |
| Background | Color picker + opacity slider |
| Position | `left` / `right` — which speaker the bubble belongs to |
| Text | The translated text for this bubble |

### 4. Copy the output and paste it into `comics.ts`

Click **Copy** in the side panel. The output looks like:

```ts
bubbles: [
  { id: 'b1', text: 'Your translation here', position: 'left', x: 23.8, y: 18.4, w: 43.6, h: 16.8, fontSize: 1.5, bg: 'rgba(255,255,255,1)' },
]
```

Paste it into the matching translation block inside `src/data/comics.ts`:

```ts
{
  id: "my-comic",
  image: "/comics/my-comic.jpg",
  author: "Author Name",
  source: "Source",
  sourceLanguage: "ru",          // language already printed in the image — overlays are hidden for this locale
  translations: {
    zh: {
      title: "漫画标题",
      fontFamily: "Yozai-Medium", // optional: per-language default font
      bubbles: [
        // ← paste here
      ],
    },
    en: {
      title: "Comic Title",
      bubbles: [
        // ← paste here
      ],
    },
  },
}
```

### 5. `sourceLanguage`

Set `sourceLanguage` to the locale whose text is **already printed in the image**. Bubble overlays are automatically hidden when that locale is active so the original text shows through cleanly.

---

## Custom Fonts

Custom `.ttf` fonts live in `public/font/<locale>/`.

| Font family name | File | Language |
|-----------------|------|----------|
| `Muyao-Softbrush` | `public/font/zh/Muyao-Softbrush.ttf` | Chinese (brush style) |
| `Yozai-Medium` | `public/font/zh/Yozai-Medium.ttf` | Chinese (rounded) |

### Adding a new font

1. Copy your `.ttf` file into `public/font/<locale>/YourFont.ttf`.
2. Declare it in `src/app/globals.css`:

```css
@font-face {
  font-family: 'YourFont';
  src: url('/font/<locale>/YourFont.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

3. Add it to the `FONTS` array in `src/app/[locale]/editor/page.tsx`:

```ts
const FONTS = [
  { label: 'Your Font Display Name', value: 'YourFont' },
  // ... existing entries
]
```

4. Use the font name in `fontFamily` fields inside `comics.ts` or select it in the editor.

---

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static export → out/
```

Pushing to `main` automatically deploys to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.

