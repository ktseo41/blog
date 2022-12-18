import { description } from '../../package.json';

const isOverFive = new Date().getHours() >= 17;

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
    isOverFive ? [
      "script",
      {
        async: true,
        src: "https://app.embed.im/snow.js"
      }
    ] : null,
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
          {
            text: "짧은 글들", items: [
              { text: "요약: 네 시대의 자바스크립트 프레임워크", link: "/log/short/four-eras-of-javascript-frameworks" },
              { text: "요약: State of Vue 2022 암스테르담", link: "/log/short/state-of-vue-2022-amsterdam-recap" },
              { text: "요약: NDC [키노트] 블록체인과 가상세계의 진화", link: "/log/short/ndc-keynotes-evolution-of-blockchain-and-virtual-reality" },
              { text: "요약: 토스 | Slash 22 - 미친 생산성을 위한 React Native", link: "/log/short/toss-slash22-react-native-for-super-high-productivity" },
              { text: "번역: Vercel Edge Functions - 사용 사례 - OG 이미지 생성", link: "/log/short/og-image-generation" },
            ]
          },
          { text: "Why Use Composition API", link: "/log/Why Use Composition API" },
          { text: "웹어셈블리에서 자바스크립트를 빠르게 실행하는 방법", link: "/log/making-javascript-run-fast-on-webassembly" },
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
