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
  /** Rotation angle in degrees */
  rotation?: number;
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
  /** Joke explanation / punchline analysis shown on demand */
  explanation?: string;
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
