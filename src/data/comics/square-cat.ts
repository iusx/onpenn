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
      explanation: "猫咪因为在纸箱里待了太长时间，整个身体都已经变成了方形。“纸箱综合征”是网络上调侃猫咪过度依赖纸箱的幽默说法，暗指猫咪因为长时间待在纸箱里而产生的各种“症状”。漫画中的猫咪已经完全变成了一个方形，夸张地表现了这个梗。",
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
      explanation: "Box Syndrome is a humorous internet term referring to cats who spend so much time in boxes that they start to exhibit 'symptoms' of it. The joke is that the cat has been in the box for so long that it has become completely square-shaped, exaggerating the idea of 'Box Syndrome'.",
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
