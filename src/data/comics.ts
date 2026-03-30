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
  translatorNote?: string;
}

export interface Comic {
  id: string;
  /** Path under /public, e.g. "/comics/my-comic.jpg" */
  image: string;
  author: string;
  source: string;
  translations: Partial<Record<"zh" | "en" | "ru", ComicTranslation>>;
}

export const comics: Comic[] = [
  {
    id: "coffee-morning",
    image: "/comics/telegram-cloud-photo-size-2-5339359817925071876-y.jpg",
    author: "Randall Munroe",
    source: "xkcd",
    translations: {
      en: {
        title: "Good Morning",
        bubbles: [
          { id: "b1", text: "Good morning!", position: "left" },
          {
            id: "b2",
            text: "It will be, once I finish this.",
            position: "right",
          },
        ],
      },
      zh: {
        title: "早上好",
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
            text: "那是星期二拍的",
            position: "left",
            x: 78.8,
            y: 19.4,
            w: 33,
            h: 14.4,
            fontSize: 1.5,
            bg: "rgba(255,255,255,1)",
          },
        ],
      },
      ru: {
        title: "Доброе утро",
        bubbles: [
          { id: "b1", text: "Доброе утро!", position: "left" },
          {
            id: "b2",
            text: "Будет добрым, как только допью это.",
            position: "right",
          },
        ],
      },
    },
  },
];
