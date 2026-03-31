import type { Comic } from "./types";

export const sourcePhoto: Comic = {
  id: "square-cat",
  image: "/comics/telegram-cloud-photo-size-2-5339359817925071866-y.jpg",
  author: "Mark Parisi",
  source: "onpenn",
  date: "2026-03-31",
  sourceLanguage: "ru",
  translations: {
    zh: {
      title: "纸箱综合征",
      fontFamily: "Yozai-Medium",
      bubbles: [
        {
          id: "b1",
          text: "不，我不觉得我在盒子里待的时间太长了。(纸箱综合征)",
          position: "left",
          x: 51,
          y: 15.8,
          w: 92.2,
          h: 15,
          fontSize: 1.9,
          bg: "rgba(255,255,255,1)",
          fontFamily: "Yozai-Medium",
        },
      ],
    },
    en: {
      title: "Box Syndrome",
      bubbles: [
        {
          id: "b1",
          text: "No, I don't think I spend too much time in boxes.(Box Syndrome)",
          position: "left",
          x: 49.9,
          y: 16,
          w: 92.4,
          h: 15,
          fontSize: 1.9,
          bg: "rgba(255,255,255,1)",
          fontFamily: '"Comic Sans MS", cursive',
        },
      ],
    },
  },
};
