# onpenn

[English](README.md) · [中文](README.zh.md) · [Русский](README.ru.md)

每日一张漫画，用您看得懂的语言。每天展示一篇漫画，并以中文、英文、俄文分别显示翻译气泡覆盖层。

**在线演示：** 通过 GitHub Pages 部署 — 详见 `gh-pages` 分支。

---

## 贡献翻译

### 1. 打开可视化编辑器

在本地开发服务器运行时，用浏览器访问 `/zh/editor`（或 `/en/editor`、`/ru/editor`）。

```bash
pnpm dev
# 打开 http://localhost:3000/zh/editor
```

### 2. 在图片上放置气泡

- **单击**漫画图片任意位置，即可在该位置创建新气泡。
- **拖动气泡主体**以调整位置。
- **拖动右侧边缘**以调整宽度。
- **拖动底部边缘**以调整高度。

### 3. 在侧边栏配置每个气泡

| 字段 | 说明 |
|------|------|
| 字体大小 | 滑块 — 值以 `vw` 为单位（随图片宽度缩放） |
| 字体 | 从可用字体中选择（见下方[自定义字体](#自定义字体)） |
| 形状 | `rect`（圆角矩形）或 `ellipse`（椭圆） |
| 背景 | 颜色选择器 + 透明度滑块 |
| 位置 | `left` / `right` — 气泡所属的说话角色 |
| 文字 | 该气泡的翻译文本 |

### 4. 复制输出并粘贴到 `comics.ts`

点击侧边栏中的**复制**按钮。输出格式如下：

```ts
bubbles: [
  { id: 'b1', text: '你的翻译内容', position: 'left', x: 23.8, y: 18.4, w: 43.6, h: 16.8, fontSize: 1.5, bg: 'rgba(255,255,255,1)' },
]
```

将其粘贴到 `src/data/comics.ts` 中对应的翻译块内：

```ts
{
  id: "my-comic",
  image: "/comics/my-comic.jpg",
  author: "作者名",
  source: "来源",
  sourceLanguage: "ru",          // 图片中已印刷文字所用的语言 — 该语言激活时自动隐藏覆盖层
  translations: {
    zh: {
      title: "漫画标题",
      fontFamily: "Yozai-Medium", // 可选：该语言的默认字体
      bubbles: [
        // ← 粘贴到这里
      ],
    },
    en: {
      title: "Comic Title",
      bubbles: [
        // ← 粘贴到这里
      ],
    },
  },
}
```

### 5. `sourceLanguage`（原始语言）

将 `sourceLanguage` 设置为**已印刷在图片中**的语言区域标识。当该语言激活时，气泡覆盖层会自动隐藏，让原始文字清晰显示。

---

## 自定义字体

自定义 `.ttf` 字体文件存放在 `public/font/<locale>/` 目录下。

| 字体族名称 | 文件 | 适用语言 |
|-----------|------|---------|
| `Muyao-Softbrush` | `public/font/zh/Muyao-Softbrush.ttf` | 中文（毛笔风格） |
| `Yozai-Medium` | `public/font/zh/Yozai-Medium.ttf` | 中文（圆润风格） |

### 添加新字体

1. 将 `.ttf` 文件复制到 `public/font/<locale>/YourFont.ttf`。
2. 在 `src/app/globals.css` 中声明字体：

```css
@font-face {
  font-family: 'YourFont';
  src: url('/font/<locale>/YourFont.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

3. 将其添加到 `src/app/[locale]/editor/page.tsx` 的 `FONTS` 数组中：

```ts
const FONTS = [
  { label: '字体显示名称', value: 'YourFont' },
  // ... 已有条目
]
```

4. 在 `comics.ts` 的 `fontFamily` 字段中使用字体名称，或在编辑器中直接选择。

---

## 开发

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # 静态导出 → out/
```

推送到 `main` 分支后，将通过 `.github/workflows/deploy.yml` 中的工作流自动部署到 GitHub Pages。
