const { description } = require("../../package");

module.exports = {
  base: "/blog/",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "bohyeon.dev",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
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
    [
      "script",
      {},
      [
        "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-5N3ZZ9JCCH');",
      ],
    ],
  ],

  // use default theme
  theme: "@vuepress/theme-default",
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: "ktseo41/blog",
    editLink: false,
    docsDir: "",
    lastUpdated: true,
    contributors: false,
    navbar: [
      {
        text: "2022",
        link: "/2022/",
      },
      {
        text: "Instagram",
        link: "https://instagram.com/ktseo41/",
      },
    ],
    sidebar: [
      { text: "🧱 부채", link: "/debt/" },
      { text: "🏛 보관소", link: "/archive/" },
      {
        text: "🔎 공부",
        children: [
          "/study/함께자라기.md",
          "/study/자바스크립트 알고리즘 문제풀이.md",
          "/study/Brilliant.md",
          "/study/클린 코드.md",
        ],
      },
      { text: "📟 Vim", link: "/vim/" },
      { text: "📝️ 글", children: [
        "/log/짧은글.md",
        "/log/Why Use Composition API.md"
      ] },
      { text: "📚 책", link: "/reading/" },
      {
        text: "💰 주식",
        children: ["/stock/시나리오.md"],
      },
    ],
    sidebarDepth: 1,
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    "@vuepress/plugin-back-to-top",
    "@vuepress/plugin-medium-zoom",
    ["sitemap", { hostname: "https://ktseo41.github.io/blog/" }],
  ],
};
