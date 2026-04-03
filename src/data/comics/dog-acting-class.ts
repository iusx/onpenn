import type { Comic } from "./types";

export const dogPhoto: Comic = {
  id: "dog-acting-class",
  image: "/comics/telegram-cloud-photo-size-2-5355120574079899791-y.jpg",
  author: "Mark Parisi",
  source: "onpenn",
  date: "2026-04-03",
  sourceLanguage: "ru",
  translations: {
    zh: {
      title: "狗狗表演课",
      explanation: "漫画幽默地调侃了狗狗们为了讨食总是戏精上身、装出一副“饿死鬼”模样的天性，把这种日常的夸张行径设定成了表演课上“假装没被喂过饭”的专业戏剧练习，看着它们浮夸的倒地和哀嚎，养狗的人绝对会心一笑。",
      bubbles: [
        {
          id: "b1",
          text: "作业：假装你没吃过饭",
          position: "left",
          x: 70.9,
          y: 14.9,
          w: 34,
          h: 17.2,
          rotation: 6,
          fontSize: 1.5,
          bg: "rgba(250,250,250,1)",
          fontFamily: "Yozai-Medium",
        },
        {
          id: "b2",
          text: "表演课",
          position: "left",
          x: 21.2,
          y: 8.9,
          w: 28,
          h: 8.8,
          fontSize: 1.5,
          bg: "rgba(255,255,255,1)",
          fontFamily: "Yozai-Medium",
        },
      ],
    },
    en: {
      title: "Dog Acting Class",
      explanation: "",
      bubbles: [],
    },
  },
};
