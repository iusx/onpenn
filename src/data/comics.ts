export interface ComicBubble {
  id: string;
  text: string;
  /** 'left' = first speaker, 'right' = second speaker */
  position: "left" | "right";
  speaker?: string;
  /** Overlay coordinates as % of image size */
  x?: number;
  y?: number;
  /** Width as % of image size (default 28) */
  w?: number;
  /** Height as % of image size; omit for auto */
  h?: number;
  /** Font size in vw (default 1.5) */
  fontSize?: number;
  /** Background color, e.g. 'rgba(255,240,80,0.75)' */
  bg?: string;
  /** Shape of the overlay box */
  shape?: "rect" | "ellipse";
  /** Font family */
  fontFamily?: string;
}

export interface ComicTranslation {
  title: string;
  bubbles: ComicBubble[];
  /** Default font for all bubbles in this translation; can be overridden per bubble */
  fontFamily?: string;
  translatorNote?: string;
}

export interface Comic {
  id: string;
  /** Path under /public, e.g. "/comics/my-comic.jpg" */
  image: string;
  author: string;
  source: string;
  /** Publication date, ISO format e.g. "2026-03-30" */
  date?: string;
  /** The language already present in the image — overlays are hidden for this locale */
  sourceLanguage?: "zh" | "en" | "ru";
  translations: Partial<Record<"zh" | "en" | "ru", ComicTranslation>>;
}

export const comics: Comic[] = [
  {
    id: "tuesday-photo",
    image: "/comics/telegram-cloud-photo-size-2-5339359817925071876-y.jpg",
    author: "Mark Parisi",
    source: "onpenn",
    date: "2026-03-30",
    sourceLanguage: "ru",
    translations: {
      zh: {
        title: "你看起来跟你的照片不像。",
        fontFamily: "Yozai-Medium",
        bubbles: [
          {
            id: "b1",
            text: "你看起来跟你的照片不像。",
            position: "left",
            x: 23.8,
            y: 18.4,
            w: 43.6,
            h: 16.8,
            fontSize: 1.5,
            bg: "rgba(255,255,255,1)",
          },
          {
            id: "b2",
            text: "那是星期二拍的。",
            position: "right",
            x: 78.8,
            y: 19.4,
            w: 33,
            h: 14.4,
            fontSize: 1.5,
            bg: "rgba(255,255,255,1)",
          },
        ],
      },
      en: {
        title: "You Don't Look Like Your Photo.",
        fontFamily: "'Comic Sans MS', cursive",
        bubbles: [
          {
            id: "b1",
            text: "You don't look like your photo.",
            position: "left",
            x: 23.8,
            y: 18.4,
            w: 43.6,
            h: 16.8,
            fontSize: 1.5,
            bg: "rgba(255,255,255,1)",
          },
          {
            id: "b2",
            text: "That was on Tuesday.",
            position: "right",
            x: 78.8,
            y: 19.4,
            w: 33,
            h: 14.4,
            fontSize: 1.5,
            bg: "rgba(255,255,255,1)",
          },
        ],
      },
    },
  },
  {
    id: "clownfish",
    image: "/comics/telegram-cloud-photo-size-2-5339359817925071877-y.jpg",
    author: "Dave Whamond",
    source: "onpenn",
    date: "2026-03-30",
    sourceLanguage: "ru",
    translations: {
      zh: {
        title: "那里没什么可怕的。只不过是一条小丑鱼而已！",
        bubbles: [
          {
            id: "b1",
            text: "那里没什么可怕的。只不过是一条小丑鱼而已！",
            position: "left",
            x: 69.3,
            y: 18.8,
            w: 45.4,
            h: 19,
            fontSize: 2.2,
            bg: "rgba(255,255,255,1)",
            fontFamily: "Yozai-Medium",
          },
        ],
      },
      en: {
        title: "There's nothing to be afraid of. It's just a clownfish!",
        bubbles: [
          {
            id: "b1",
            text: "There's nothing to be afraid of. It's just a clownfish!",
            position: "left",
            x: 69.6,
            y: 18.7,
            w: 45.4,
            h: 20.6,
            fontSize: 2.1,
            bg: "rgba(255,255,255,1)",
            fontFamily: '"Comic Sans MS", cursive',
          },
        ],
      },
    },
  },
];
