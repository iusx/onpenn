import type { Comic } from "./types";

export const tuesdayPhoto: Comic = {
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
};
