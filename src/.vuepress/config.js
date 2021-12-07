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

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: "",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    nav: [
      {
        text: "Dev",
        link: "/dev/",
      },
      {
        text: "Instagram",
        link: "https://instagram.com/ktseo41/",
      },
      {
        text: "GitHub",
        link: "https://github.com/ktseo41/blog",
      },
    ],
    sidebar: ['links', 'debt', 'vim', 'products']
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"],
};
