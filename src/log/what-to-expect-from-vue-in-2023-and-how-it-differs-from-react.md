---
feArticle: true
---

# 2023년 Vue에게 기대할 수 있는 점과 React와의 차이점

> 원문: https://thenewstack.io/vue-2023/

> Vue.js 제작자 Evan You가 Vue 3가 Vue 2와 무엇이 다른지, 특히 가상 DOM의 사용이 어떻게 발전했는지 설명합니다.

![Featued image for: What to Expect from Vue in 2023 and How it Differs from React](https://cdn.thenewstack.io/media/2023/02/4d8708c2-evanyou_feature-1024x614.jpg)

2년 전 자바스크립트 프레임워크인 Vue.js에 관한 [다큐멘터리](https://www.youtube.com/watch?v=OrxmtDw4pVI)에서 이 프레임워크는 자바스크립트 생태계 주요 프레임워크인 페이스북의 React와 구글의 Angular에 비해 일종의 인디 대안으로 묘사되었습니다. "덜 기업적이고 [...] 더 서민적인 느낌입니다."라고 한 강연자가 설명했습니다.

가장 트렌디한 자바스크립트 프레임워크인 React와 비교했을 때 가장 눈에 띄는 차이점은 웹 표준 옹호자들이 Vue를 지지한다는 점입니다. 그 이유에 대한 단서는 Vue의 [공식 문서](https://v2.vuejs.org/v2/guide/comparison.html)에서 찾을 수 있는데, 문서에서는 "React에서는 모든 것이 자바스크립트일 뿐입니다. HTML 구조는 JSX를 통해 표현될 뿐만 아니라 최근에는 CSS 관리도 자바스크립트 안에 넣는 추세입니다."라고 설명합니다. 반면에 Vue는 "고전적인 웹 기술을 수용하고 그 위에 구축한다"고 말합니다. (참고: 해당 인용문은 Vue 2 문서에서 발췌한 것으로, 최신 Vue 3 문서에서는 이 비교를 찾을 수 없었습니다.)

최근 몇 년 동안 React의 [자바스크립트 중심 접근 방식](https://thenewstack.io/2023-web-tech-check-in-react-performance-pwas-ios-browsers/)과 이를 사용하는 프레임워크(예: [Next.js](https://thenewstack.io/how-next-js-12-connects-to-low-code-and-visual-design-tools/))에 대한 반발이 많았고, Vue, Svelte, Lit와 같은 프레임워크가 제공하는 "고전적인 웹 기술" 위에 구축하려는 [움직임](https://thenewstack.io/case-against-web-frameworks/)이 있었습니다.

## Evan You의 State of the Vuenion

이러한 맥락에서 이번 달(2023년 2월 16일 기준) 암스테르담에서 열린 [JSworld 컨퍼런스](https://jsworldconference.com/)에서 오프라인 및 온라인으로 진행된 연례 "State of the Vuenion"(역자 주: Evan You가 매년 Vue 생태계에 대한 개요 및 새로운 업데이트, 개발 현황을 발표하는 컨퍼런스) 발표에서 Vue 제작자 Evan You가 어떤 말을 했는지 궁금했습니다.

Evan You는 팬데믹으로 인해 3년 전을 마지막으로 JSworld에 직접 참석하지 못했다는 점을 언급하며 기조연설을 시작했습니다. 그래서 그는 3년 전에는 Vue 생태계에 존재하지 않았거나 아직 안정적이지 않았던 것들을 나열했습니다: Vue 3는 "안정적이지 않았고", [Vite](https://vitejs.dev/)(빌드 도구), [Volar](https://volarjs.github.io/)("임베디드 프로그래밍 언어 도구 구축을 위한 프레임워크"), [Pinia](https://www.vuemastery.com/courses/from-vuex-to-pinia/what-is-pinia)("Vue 생태계를 위한 상태 관리 라이브러리")가 존재하지 않았습니다.

그는 "우리는 본질적으로 Vite를 중심으로 완전히 새로운 생태계를 만들었습니다."라고 말하며, "이와 함께 Vue 생태계 내에서뿐만 아니라 다른 모든 프레임워크와도 연결되는 새롭고 흥미로운 모든 것들을 그 위에 구축하였습니다."라고 덧붙였습니다.

![https://cdn.thenewstack.io/media/2023/02/76621bfd-vue3_ecosystem.jpg](https://cdn.thenewstack.io/media/2023/02/76621bfd-vue3_ecosystem.jpg)
*Vue 생태계*

Evan You는 Vue 애플리케이션을 구축하기 위한 기본 프레임워크인 [Nuxt](https://nuxtjs.org/)를 필두로 현재 Vue 도구 생태계에 찬사를 보냈습니다. 그러나 계속해서 Vue 3를 안정적으로 만드는 것이 2023년의 주된 관심사라고 말했습니다. 1년 전인 [지난 2월](https://blog.vuejs.org/posts/vue-3-as-the-new-default.html)에 Vue 3가 새로운 기본 버전이 되었지만, "레거시 프로젝트"라고 불리는 프로젝트에서는 여전히 Vue 2를 사용하고 있습니다. 그는 Vue 3 채택의 대부분이 "신규 프로젝트"에서 이루어졌다고 언급했습니다.

Evan You는 "우리는 아직 Vue 2에서 Vue 3로 전환하는 단계에 있습니다."라고 말하며 많은 대형 프로젝트가 여전히 Vue 2를 사용 중이거나 Vue 3로 전환할 계획을 세우고 있다고 지적했습니다.

## Vue 3와 가상 DOM에 대한 새로운 접근 방식

올해 Vue 3에서 계획된 다양한 관리상의 변경에 대해 논의한 후, Evan You는 Vue 2와 비교하여 Vue 3가 "렌더링"하는 방식의 차이점에 대해 설명하는 시간을 가졌습니다. "렌더링 전략은 시간이 지남에 따라 변화하고 있습니다."라고 말하며 특히 가상 DOM(VDOM)을 처리하는 방식에 대해 언급했습니다.

그 얘기를 하기 전에 Vue 3를 이해하는 데 도움이 될 만한 VDOM에 대한 간략한 소개를 하겠습니다. 이 날 JSworld의 다른 세션에서 [Marc Backes](https://twitter.com/themarcba)가 "가상 DOM을 만들어 봅시다."라는 제목의 세션을 진행했습니다. 다음 세 개의 슬라이드는 VDOM이 무엇이며 Vue와 같은 프레임워크 내에서 그 목적이 무엇인지 잘 요약해 줍니다. (VDOM은 [React](https://reactjs.org/docs/faq-internals.html)에 의해 대중화되었지만, Vue를 포함한 다른 많은 프레임워크에서도 이 개념을 채택하고 있습니다).

![https://cdn.thenewstack.io/media/2023/02/3eb464b9-vdom1.jpg](https://cdn.thenewstack.io/media/2023/02/3eb464b9-vdom1.jpg)
*가상 DOM이란 무엇인가*

![https://cdn.thenewstack.io/media/2023/02/8b42c599-vdom2.jpg](https://cdn.thenewstack.io/media/2023/02/8b42c599-vdom2.jpg)
*왜 가상 DOM을 사용하는가*

![https://cdn.thenewstack.io/media/2023/02/29695806-vdom4.jpg](https://cdn.thenewstack.io/media/2023/02/29695806-vdom4.jpg)
*가상 DOM을 만들어 보기*

Backes는 또한 Vue에서 사용하는 렌더링 파이프라인을 다음과 같이 시각적으로 표현했습니다([Vue 문서](https://vuejs.org/guide/extras/rendering-mechanism.html#render-pipeline)에 있는 동일한 다이어그램을 다양한 색깔로 표현한 버전입니다).

![https://cdn.thenewstack.io/media/2023/02/8e1beaff-vdom3.jpg](https://cdn.thenewstack.io/media/2023/02/8e1beaff-vdom3.jpg)
*Vue 렌더링 파이프라인*

다시 Evan You의 발표 내용으로 돌아가보겠습니다. 그는 "Vue 2에서는 순수 가상 DOM을 사용했는데, 이는 [...] React가 사용하는 것과 유사하며 컴파일 타임 최적화를 수행하지 않는다는 것을 의미합니다. 전혀 최적화하지 않는 건 아니지만 거의 하지 않습니다."라고 말했습니다.

![https://cdn.thenewstack.io/media/2023/02/b58f5f5f-vue2_diagram.jpg](https://cdn.thenewstack.io/media/2023/02/b58f5f5f-vue2_diagram.jpg)
*Vue 2 렌더링*

"따라서 컴포넌트 트리 또는 앱 수준에서는 각 컴포넌트가 자체 종속성을 추적하도록 하여 세분화된 업데이트를 수행할 수 있습니다."라고 그는 Vue 2에 관해 설명합니다.

단점은 가상 DOM 오버헤드인데, 그는 이를 "가상 DOM 노드를 다시 생성한 다음 해당 트리를 통해 차이를 확인하는 데 드는 비용"이라고 설명했습니다. 그는 "Vue 2는 이 오버헤드를 지속적으로 지불하고 있습니다."라고 덧붙였습니다.

이 문제를 해결하기 위해 Vue 3에서는 다른 접근 방식을 취했습니다. 그는 "컴파일러 정보에 기반한 가상 DOM"이라고 설명했는데, 이는 "컴파일 타임에 훨씬 더 많은 최적화를 수행"한다는 의미입니다.

![https://cdn.thenewstack.io/media/2023/02/ca2632f4-vue3_diagram.jpg](https://cdn.thenewstack.io/media/2023/02/ca2632f4-vue3_diagram.jpg)
*Vue 3 렌더링*

## 단일 파일 컴포넌트

VDOM의 복잡성은 차치하고서라도, Vue의 인기 상승에는 "단일 파일 컴포넌트(SFC)" 접근 방식이 큰 부분을 차지합니다. Vue는 SFC를 "Vue 컴포넌트의 템플릿, 로직, *및* 스타일링을 단일 파일에 캡슐화할 수 있는 특수 파일 형식"으로 [정의](https://vuejs.org/guide/scaling-up/sfc.html)합니다. [다른 곳](https://vuejs.org/guide/introduction.html#the-progressive-framework)에서 Vue는 SFC를 "HTML과 유사한 파일 형식"이라고 부릅니다.

Vue 핵심 팀원인 [Damian Dulisz](https://github.com/shentao)와의 [2017년 인터뷰](https://thenewstack.io/meet-vue-js-flexible-javascript-framework/)에서 그는 SFC 형식을 통해 "코드를 이해하고 추론하기가 훨씬 더 쉬워졌다"라고 말했습니다.

The New Stack의 엔지니어링 디렉터인 Aaron Ban은 SFC 접근 방식으로 인해 Vue의 팬이 되었습니다. 그는 SFC 접근 방식이 제공하는 "깔끔한 조직"을 좋아하며, 또한 SFC 접근 방식이 모듈화의 훌륭한 예라고 생각합니다. "사실 SFC를 올바르게 수행하는 데 필요한 엄격한 커트라인을 스스로에게 강요하기는 어려운 훈련입니다."라고 그는 말했습니다. 하지만 그는 이것이 지난 10여 년 동안 많은 개발자가 배워온 '빨리빨리'라는 사고방식에 대한 해독제라고 생각합니다. 그는 이러한 사고방식은 개발자들이 "적절한 경계선을 그리는 데 신경 쓰지 않고 '나중에 고치면 된다'는 생각으로 '일단 작동만 시키면 된다'는 식의 나쁜 습관을 조장해 왔다"라고 말합니다.

Ban은 단일 파일 컴포넌트를 제공하는 다른 두 가지 프레임워크인 Svelte와 Lit의 디자인도 마음에 들어 합니다.

SFC가 개발자들에게 보편적으로 사랑받는 것은 아닙니다. Vue 문서에서도 [이를 인정하고 있습니다.](https://vuejs.org/guide/scaling-up/sfc.html#what-about-separation-of-concerns) "전통적인 웹 개발 배경을 가진 일부 사용자는 SFC가 HTML/CSS/JS가 분리해야 할 서로 다른 관심사를 한 곳에 섞어 놓았다는 우려를 할 수 있습니다!"

이러한 반대 의견에 대해 Vue는 SFC 접근 방식이 "실제로 컴포넌트를 더 응집력 있고 유지 관리하기 쉽게 만든다"라고 주장합니다.

## 결론

Evan You의 JSworld 기조연설에 따르면 2023년에 Vue 개발자에게 큰 변화가 예상되지는 않을 것입니다. Vue 2에서 Vue 3로 업그레이드하도록 개발자를 계속 유도하는 것과 함께, 계속해서 확장되는 생태계에 대한 추가적인 개선이 이어질 것입니다.

Vue는 저희와 같은 기술 전문 매체에서는 그다지 주목 받지 못할 수도 있지만, 매년 이렇게 웹 표준을 준수하는 자바스크립트 프레임워크는 살펴 볼 가치가 있습니다. 우리는 확실히 Vue의 계속적인 발전을 즐기고 있습니다.