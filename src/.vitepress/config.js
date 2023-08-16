import { description } from "../../package.json";
import { fileURLToPath, URL } from "node:url";
import { SitemapStream } from "sitemap";
import { createWriteStream } from "node:fs";
import { resolve } from "node:path";

// const untilSpring = new Date().getMonth() < 2 || new Date().getMonth() >= 11;

const links = [];

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
    [
      "script",
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-5N3ZZ9JCCH');",
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/blog/favicon.ico",
      },
    ],
    // untilSpring ? [
    //   "script",
    //   {
    //     async: true,
    //     src: "https://app.embed.im/snow.js"
    //   }
    // ] : [],
  ],
  themeConfig: {
    contributors: false,
    nav: [{ text: "GitHub", link: "https://github.com/ktseo41/blog" }],
    socialLinks: [
      {
        icon: "linkedin",
        link: "https://www.linkedin.com/in/bo-hyeon-seo/",
      },
    ],
    sidebar: [
      {
        text: "☀",
        items: [
          { text: "🧱 부채", link: "/debt" },
          { text: "🏛 보관소", link: "/archive" },
        ],
      },
      {
        text: "📝️ 글",
        items: [
          {
            text: "VitePress 블로그에 utternaces 적용하기",
            link: "/posts/how-to-apply-utterances-on-vitepress",
          },
          {
            text: "Vitepress 블로그에 sitemap.xml 생성하는 방법",
            link: "/posts/how-to-generate-sitemap-xml-for-vitepress",
          },
          {
            text: "요약",
            items: [
              {
                text: "토스 | Slash 22 - 미친 생산성을 위한 React Native",
                link: "/log/short/toss-slash22-react-native-for-super-high-productivity",
              },
              {
                text: "NDC [키노트] 블록체인과 가상세계의 진화",
                link: "/log/short/ndc-keynotes-evolution-of-blockchain-and-virtual-reality",
              },
            ],
          },
        ],
      },
      {
        text: "📝 번역",
        collapsed: true,
        items: [
          {
            text: "Vercel Edge Functions - 사용 사례 - OG 이미지 생성",
            link: "/log/short/og-image-generation",
          },
          {
            text: "컴포지션 API를 만든 이유",
            link: "/log/why-we-create-the-composition-api",
          },
          {
            text: "OAuth 2.0 상태 매개변수로 공격 방지 및 사용자 리디렉션하기",
            link: "/log/short/prevent-attacks-and-redirect-users-with-oauth-2_0-state-parameters",
          },
          {
            text: "요약",
            items: [
              {
                text: "네 시대의 자바스크립트 프레임워크",
                link: "/log/short/four-eras-of-javascript-frameworks",
              },
              {
                text: "State of Vue 2022 암스테르담",
                link: "/log/short/state-of-vue-2022-amsterdam-recap",
              },
            ],
          },
        ],
      },
      {
        text: "FEArticle",
        imageUrl: "fearticle.png",
        collapsed: true,
        items: [
          {
            text: "웹어셈블리에서 자바스크립트를 빠르게 실행하는 방법",
            link: "/log/making-javascript-run-fast-on-webassembly",
          },
          {
            text: "리액트에서 useState를 사용하면서 저지를 수 있는 흔한 실수들",
            link: "/log/avoid-these-common-pitfalls-of-react-usestate",
          },
          {
            text: "뷰의 새로운 컴포지션 API를 사용해야 하는 이유",
            link: "/log/why-you-should-be-using-vue-new-composition-api",
          },
          {
            text: "완전한 타입 안정성을 가진 웹 애플리케이션",
            link: "/log/fully-typed-web-apps",
          },
          {
            text: "로컬 우선 소프트웨어가 있다면 어떨까요?",
            link: "/log/what-if-we-had-local-first-software",
          },
          {
            text: "iOS 및 iPadOS의 웹 앱용 웹 푸시",
            link: "/log/web-push-for-web-apps-on-ios-and-ipados",
          },
          {
            text: "2023년 Vue에게 기대할 수 있는 점과 React와의 차이점",
            link: "/log/what-to-expect-from-vue-in-2023-and-how-it-differs-from-react",
          },
          {
            text: "Cloudflare를 웹 애플리케이션을 위한 최고의 장소로 만들기",
            link: "/log/making-cloudflare-for-web",
          },
          {
            text: "가상 DOM: 블록으로 돌아가기",
            link: "/log/virtual-dom-back-in-block",
          },
          {
            text: "리액트로 인해 잊었거나 전혀 몰랐던 것들",
            link: "/log/things-you-forgot-or-never-knew-because-of-react",
          },
        ],
      },
      {
        text: "🕺🏻 프로젝트",
        collapsed: false,
        items: [
          {
            text: "Iron Branch",
            link: "https://github.com/ktseo41/iron-branch",
          },
          {
            text: "문장 공유기",
            link: "https://github.com/ktseo41/quotes-sharer",
          },
          {
            text: "일랜시아 루트 계산기",
            link: "https://github.com/ktseo41/route-calculator",
          },
        ],
      },
      {
        text: "🔎 공부",
        items: [
          { text: "함께자라기", link: "/study/함께자라기" },
          { text: "Brilliant", link: "/study/Brilliant" },
          { text: "클린 코드", link: "/study/클린 코드" },
          {
            text: "리팩터링",
            items: [
              {
                text: "들어가며",
                link: "/study/refactoring/intro",
              },
              {
                text: "챕터 1 - 리팩터링: 첫번째 예시",
                link: "/study/refactoring/chapter1",
              },
              {
                text: "챕터 2 - 리팩터링 원칙",
                link: "/study/refactoring/chapter2",
              },
              {
                text: "챕터 6 - 기본적인 리팩터링",
                link: "/study/refactoring/chapter6",
              }
            ],
          },
        ],
      },
      { text: "📟 Vim", items: [{ text: "vim", link: "/vim" }] },
    ],
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPSidebarItem\.vue$/,
          replacement: fileURLToPath(
            new URL("./components/CustomSideBarItem.vue", import.meta.url)
          ),
        },
      ],
    },
  },
  // sitemap 생성: https://github.com/vuejs/vitepress/issues/520
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        // you might need to change this if not using clean urls mode
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, "$2"),
        lastmod: pageData.lastUpdated,
      });
  },
  buildEnd: ({ outDir }) => {
    const sitemap = new SitemapStream({
      hostname: "https://ktseo41.github.io/blog/",
    });
    const writeStream = createWriteStream(resolve(outDir, "sitemap.xml"));
    sitemap.pipe(writeStream);
    links.forEach((link) => sitemap.write(link));
    sitemap.end();
  },
};