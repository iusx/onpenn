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
      explanation: "漫画巧妙地利用了“小丑鱼”的双关语，将原本可爱无害的海洋生物替换成了《小丑回魂》中举着红气球躲在暗处的恐怖小丑（Pennywise），通过鱼儿对致命危险浑然不觉却强作镇定的台词制造了极具荒诞感的惊悚笑点。",
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
      explanation: "This comic cleverly plays on the double meaning of 'clownfish,' replacing the originally cute and harmless marine creature with the terrifying clown (Pennywise) from 'It,' who hides in the shadows holding a red balloon. The humor arises from the absurdity of the fish being completely oblivious to the deadly danger it is in, while trying to act nonchalant with its line.",
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
