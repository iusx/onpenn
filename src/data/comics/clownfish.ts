import type { Comic } from "./types";

export const clownfish: Comic = {
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
};
