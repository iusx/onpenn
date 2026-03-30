export type Locale = 'zh' | 'en' | 'ru'

export const locales: Locale[] = ['zh', 'en', 'ru']

export const defaultLocale: Locale = 'zh'

export const localeNames: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
  ru: 'Русский',
}

export interface Messages {
  siteTitle: string
  siteSubtitle: string
  by: string
  source: string
  prevDay: string
  nextDay: string
  today: string
  loading: string
  translatorNote: string
  comicNotFound: string
  openEditor: string
  allComics: string
  // editor page
  editorTitle: string
  editorComic: string
  editorHint: string
  editorBubbles: string
  editorNoBubbles: string
  editorFontSize: string
  editorFontFamily: string
  editorShape: string
  editorShapeRect: string
  editorShapeEllipse: string
  editorBg: string
  editorOpacity: string
  editorPosition: string
  editorBubbleText: string
  editorOutput: string
  editorCopy: string
  editorBackHome: string
}

const messages: Record<Locale, Messages> = {
  zh: {
    siteTitle: '每日漫画',
    siteSubtitle: '每天一张，笑口常开',
    by: '作者',
    source: '来源',
    prevDay: '换一张',
    nextDay: '换一张',
    today: '换一张',
    loading: '加载中…',
    translatorNote: '译者注',
    comicNotFound: '今天找不到漫画',
    openEditor: '贡献翻译',
    allComics: '全部漫画',
    editorTitle: '气泡编辑器',
    editorComic: '漫画',
    editorHint: '点击图片添加，拖动移动，拖右/下边调整宽高',
    editorBubbles: '气泡',
    editorNoBubbles: '点击图片添加气泡',
    editorFontSize: '字号',
    editorFontFamily: '字体',
    editorShape: '形状',
    editorShapeRect: '方框',
    editorShapeEllipse: '椭圆',
    editorBg: '背景色',
    editorOpacity: '透明度',
    editorPosition: '位置',
    editorBubbleText: '气泡文字…',
    editorOutput: '输出（粘贴到 comics.ts）',
    editorCopy: '复制',
    editorBackHome: '返回首页',
  },
  en: {
    siteTitle: 'Daily Comics',
    siteSubtitle: 'A new laugh every day',
    by: 'By',
    source: 'Source',
    prevDay: 'Shuffle',
    nextDay: 'Shuffle',
    today: 'Shuffle',
    loading: 'Loading…',
    translatorNote: "Translator's note",
    comicNotFound: 'No comic found',
    openEditor: 'Contribute Translation',
    allComics: 'All Comics',
    editorTitle: 'Bubble Editor',
    editorComic: 'Comic',
    editorHint: 'Click to add, drag to move, drag right/bottom edge to resize',
    editorBubbles: 'Bubbles',
    editorNoBubbles: 'Click the image to add a bubble',
    editorFontSize: 'Font size',
    editorFontFamily: 'Font',
    editorShape: 'Shape',
    editorShapeRect: 'Rect',
    editorShapeEllipse: 'Ellipse',
    editorBg: 'Background',
    editorOpacity: 'Opacity',
    editorPosition: 'Position',
    editorBubbleText: 'Bubble text…',
    editorOutput: 'Output (paste into comics.ts)',
    editorCopy: 'Copy',
    editorBackHome: 'Back to Home',
  },
  ru: {
    siteTitle: 'Комикс дня',
    siteSubtitle: 'Новая улыбка каждый день',
    by: 'Автор',
    source: 'Источник',
    prevDay: 'Случайный',
    nextDay: 'Случайный',
    today: 'Случайный',
    loading: 'Загрузка…',
    translatorNote: 'Примечание переводчика',
    comicNotFound: 'Комикс не найден',
    openEditor: 'Внести перевод',
    allComics: 'Все комиксы',
    editorTitle: 'Редактор пузырей',
    editorComic: 'Комикс',
    editorHint: 'Клик — добавить, тяни для перемещения, тяни правый/нижний край для изменения размера',
    editorBubbles: 'Пузыри',
    editorNoBubbles: 'Кликни на изображение, чтобы добавить пузырь',
    editorFontSize: 'Размер шрифта',
    editorFontFamily: 'Шрифт',
    editorShape: 'Форма',
    editorShapeRect: 'Прямоугольник',
    editorShapeEllipse: 'Эллипс',
    editorBg: 'Фон',
    editorOpacity: 'Прозрачность',
    editorPosition: 'Позиция',
    editorBubbleText: 'Текст пузыря…',
    editorOutput: 'Вывод (вставить в comics.ts)',
    editorCopy: 'Копировать',
    editorBackHome: 'На главную',
  },
}

export function getMessages(locale: Locale): Messages {
  return messages[locale] ?? messages[defaultLocale]
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}
