import { description } from '../../package.json';

export default {
  base: "/blog/",
  title: "bohyeon.dev",
  description,
  lastUpdated: true,
  head: [
    ["meta", { name: "theme-color", content: "#f28e1c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    [
      "script",
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-5N3ZZ9JCCH",
      },
    ],
    // [
    //   "script",
    //   {},
    //   [
    //     "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-5N3ZZ9JCCH');",
    //   ],
    // ],
  ],
  themeConfig: {
    contributors: false,
    nav: [
      { text: "GitHub", link: 'https://github.com/ktseo41/blog' }
    ],
    socialLinks: [
      {
        icon: "instagram",
        link: "https://instagram.com/ktseo41/",
      },
      {
        icon: "linkedin",
        link: "https://www.linkedin.com/in/bo-hyeon-seo/",
      }
    ],
    sidebar: [
      {
        text: "☀", items: [
          { text: "🧱 부채", link: "/debt" },
          { text: "🏛 보관소", link: "/archive" },
        ],
      },
      {
        text: "📝️ 글",
        items: [
          { text: "짧은글", link: "/log/짧은글" },
          { text: "Why Use Composition API", link: "/log/Why Use Composition API" },
          { text: "웹어셈블리에서 자바스크립트를 빠르게 실행하는 방법", link: "/log/웹어셈블리에서 자바스크립트를 빠르게 실행하는 방법" },
        ]
      },
      {
        text: "🔎 공부",
        items: [
          { text: '함께자라기', link: '/study/함께자라기' },
          { text: 'Brilliant', link: '/study/Brilliant' },
          { text: '클린 코드', link: '/study/클린 코드' },
        ]
      },
      { text: "📟 Vim", items: [{ text: 'vim', link: "/vim" }] },
      {
        text: "Etc", items: [{
          text: "📚 책",
          link: "/reading"
        },
        {
          text: "🎁 Advent Of Code",
          link: "/AoC/2022/",
        }]
      },
    ],
  },
};
