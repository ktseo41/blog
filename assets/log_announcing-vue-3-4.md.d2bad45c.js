import{_ as e,o as a,c as s,O as o}from"./chunks/framework.acd5de9c.js";const g=JSON.parse('{"title":"Vue 3.4 발표","description":"","frontmatter":{"feArticle":true},"headers":[],"relativePath":"log/announcing-vue-3-4.md","filePath":"log/announcing-vue-3-4.md","lastUpdated":1704611321000}'),l={name:"log/announcing-vue-3-4.md"},r=o(`<h1 id="vue-3-4-발표" tabindex="-1">Vue 3.4 발표 <a class="header-anchor" href="#vue-3-4-발표" aria-label="Permalink to &quot;Vue 3.4 발표&quot;">​</a></h1><blockquote><p>원문: <a href="https://blog.vuejs.org/posts/vue-3-4" target="_blank" rel="noreferrer">https://blog.vuejs.org/posts/vue-3-4</a></p></blockquote><p>오늘 Vue 3.4 &quot;🏀 슬램덩크&quot;의 출시를 발표하게 되어 기쁩니다!</p><p>이번 릴리스에는 상당한 내부 개선이 이루어졌습니다. 특히 템플릿 구문 분석기는 다시 작성되어 2배 빨라졌으며, 이펙트 트리거를 더 정확하고 효율적으로 만드는 리팩터링 된 반응형 시스템을 재구성 했습니다. 또한 <code>defineModel</code>의 안정화, 프로퍼티 바인딩 시 동일한 이름의 새로운 축약어 같은 여러 가지 편의 기능 API 개선 사항도 포함되어 있습니다.</p><p>이 글에서는 3.4의 주요 기능에 대한 개요를 소개합니다. 변경 사항의 전체 목록은 <a href="https://github.com/vuejs/core/blob/main/CHANGELOG.md#340-2023-12-28" target="_blank" rel="noreferrer">Github상의 전체 변경 로그</a>를 참조하세요.</p><hr><ul><li><a href="#potential-actions-needed">필요한 조치</a></li><li><a href="#feature-highlights">핵심 변경 사항</a><ul><li><a href="#2x-faster-parser-and-improved-sfc-build-performance">2배 빨라진 구문 분석기 및 향상된 SFC 빌드 성능</a></li><li><a href="#more-efficient-reactivity-system">더 효율적인 반응형 시스템</a></li><li><a href="#definemodel-is-now-stable"><code>defineModel</code> 안정화</a></li><li><a href="#v-bind-same-name-shorthand"><code>v-bind</code> 동일 명칭 축약어</a></li><li><a href="#improved-hydration-mismatch-errors">하이드레이션 불일치 오류 개선</a></li><li><a href="#error-code-and-compile-time-flag-reference">오류 코드 및 컴파일 시간 플래그 참조</a></li></ul></li><li><a href="#removed-deprecated-features">사용되지 않는 기능 제거</a><ul><li><a href="#global-jsx-namespace">전역 JSX 네임스페이스</a></li><li><a href="#other-removed-features">기타 제거된 기능</a></li></ul></li></ul><h2 id="필요한-조치" tabindex="-1">필요한 조치 <a class="header-anchor" href="#필요한-조치" aria-label="Permalink to &quot;필요한 조치&quot;">​</a></h2><ol><li><p>3.4의 새로운 기능을 최대한 활용하려면 3.4로 업그레이드할 때 다음 종속성도 함께 업데이트하는 것이 좋습니다.</p><ul><li>Volar / vue-tsc@^1.8.27 (<strong>필수</strong>)</li><li>@vitejs/plugin-vue@^5.0.0 (Vite를 사용하는 경우)</li><li>nuxt@^3.9.0 (Nuxt를 사용하는 경우)</li><li>vue-loader@^17.4.0 (웹팩 또는 vue-cli를 사용하는 경우)</li></ul></li><li><p>Vue와 함께 TSX를 사용하는 경우, <a href="#removed-global-jsx-namespace">제거됨: 글로벌 JSX 네임스페이스</a>에서 필요한 조치를 확인하세요.</p></li><li><p>더 이상 사용되지 않는 기능을 사용하고 있지 않은지 확인하세요(사용하고 있었다면 콘솔에서 이를 알리는 경고를 받았을 것입니다). 이런 기능들은 <a href="#other-removed-features">3.4에서 제거</a>되었을 수 있습니다.</p></li></ol><h2 id="핵심-변경-사항" tabindex="-1">핵심 변경 사항 <a class="header-anchor" href="#핵심-변경-사항" aria-label="Permalink to &quot;핵심 변경 사항&quot;">​</a></h2><h3 id="_2배-빨라진-구문-분석기-및-향상된-sfc-빌드-성능" tabindex="-1">2배 빨라진 구문 분석기 및 향상된 SFC 빌드 성능 <a class="header-anchor" href="#_2배-빨라진-구문-분석기-및-향상된-sfc-빌드-성능" aria-label="Permalink to &quot;2배 빨라진 구문 분석기 및 향상된 SFC 빌드 성능&quot;">​</a></h3><p><strong>내용: <a href="https://github.com/vuejs/core/pull/9674" target="_blank" rel="noreferrer">PR#9674</a></strong></p><p>3.4에서는 템플릿 구문 분석기를 완전히 재작성했습니다. 이전에는 많은 정규식과 선행 검색에 의존하는 재귀적 하강 구문 분석기를 사용했습니다. 새로운 구문 분석기는 전체 템플릿 문자열을 한 번만 반복하는 <a href="https://github.com/fb55/htmlparser2" target="_blank" rel="noreferrer">htmlparser2</a>의 토크나이저를 기반으로 하는 상태 머신 토크나이저를 사용합니다. 그 결과 모든 크기의 템플릿에서 일관되게 두 배 빠른 구문 분석기가 탄생했습니다. 광범위한 테스트 사례와 <a href="https://github.com/vuejs/ecosystem-ci" target="_blank" rel="noreferrer">ecosystem-ci</a> 덕분에 Vue 최종 사용자를 위한 100% 이전 버전과 호환됩니다.</p><p>새로운 구문 분석기를 시스템의 다른 부분과 통합하는 동안 전반적인 SFC 컴파일 성능을 더욱 향상할 수 있는 몇 가지 기회도 발견했습니다. 벤치마크에 따르면 소스 맵을 생성하는 동안 Vue SFC의 스크립트 및 템플릿 부분을 컴파일할 때 약 44% 개선된 것으로 나타났으므로 3.4를 사용하면 Vue SFC를 사용하는 대부분의 프로젝트에서 빌드 속도가 빨라질 것입니다. 하지만 실제 프로젝트에서 Vue SFC 컴파일은 전체 빌드 프로세스의 한 부분일 뿐이라는 점에 유의하세요. 종단 간 빌드 시간의 최종 개선 효과는 분리된 벤치마크에 비해 훨씬 작을 수 있습니다.</p><p>Vue 코어 외에도 새로운 구문 분석기는 Volar/Vue-tsc 및 Vue SFC 또는 템플릿을 구문 분석해야 하는 커뮤니티 플러그인(예: Vue 매크로)의 성능에도 도움이 될 것입니다.</p><h3 id="더-효율적인-반응형-시스템" tabindex="-1">더 효율적인 반응형 시스템 <a class="header-anchor" href="#더-효율적인-반응형-시스템" aria-label="Permalink to &quot;더 효율적인 반응형 시스템&quot;">​</a></h3><p><strong>내용: <a href="https://github.com/vuejs/core/pull/5912" target="_blank" rel="noreferrer">PR#5912</a></strong></p><p>3.4에서는 computed 프로퍼티의 재계산 효율성을 개선하기 위해 반응형 시스템을 대폭 리팩터링 했습니다.</p><p>개선된 내용을 설명하기 위해 다음 시나리오를 예로 들어보겠습니다.</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> count </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> isEven </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">computed</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> count</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value </span><span style="color:#89DDFF;">%</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">watchEffect</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(isEven</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value)) </span><span style="color:#676E95;font-style:italic;">// true라고 로그에 기록됩니다.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 다시 true라고 로그에 기록됩니다.</span></span></code></pre></div><p>3.4 이전에는 계산된 결과가 동일하게 유지되더라도 <code>count.value</code>가 변경될 때마다 <code>watchEffect</code>의 콜백이 실행되었습니다. 3.4 이후 최적화를 통해 이제 계산된 결과가 실제로 변경된 경우에만 콜백이 실행됩니다.</p><p>또한 3.4에서는</p><ul><li>여러 개의 computed 의존성 변경이 동기 효과를 단 한 번만 트리거합니다.</li><li>배열의 <code>shift</code>, <code>unshift</code>, <code>splice</code> 메서드도 동기 효과를 단 한 번만 트리거합니다.</li></ul><p>이러한 변경사항은 <a href="https://github.com/vuejs/core/pull/5912#issuecomment-1748985641" target="_blank" rel="noreferrer">벤치마크</a>에서 보이는 성능 향상 외에도, 이전 버전과 호환을 완벽하게 유지하면서도 많은 시나리오에서 불필요한 컴포넌트 재렌더링을 줄일 것입니다.</p><h3 id="definemodel이-안정화되었습니다" tabindex="-1"><code>defineModel</code>이 안정화되었습니다. <a class="header-anchor" href="#definemodel이-안정화되었습니다" aria-label="Permalink to &quot;\`defineModel\`이 안정화되었습니다.&quot;">​</a></h3><p><strong>내용: <a href="https://github.com/vuejs/rfcs/discussions/503" target="_blank" rel="noreferrer">RFC#503</a></strong></p><p><code>defineModel</code>은 <code>v-model</code>을 지원하는 컴포넌트의 구현을 간소화하기 위한 새로운 <code>&lt;script setup&gt;</code> 매크로입니다. 3.3에서 실험적 기능으로 제공되었고 3.4에서 안정적인 상태로 업그레이드되었습니다. 이제 <code>v-model</code> 수정자와 함께 사용할 수 있도록 더 나은 지원을 제공합니다.</p><p>관련 문서:</p><ul><li><a href="https://vuejs.org/guide/components/v-model.html" target="_blank" rel="noreferrer">개정된 컴포넌트 v-model 섹션</a></li><li><a href="https://vuejs.org/api/sfc-script-setup.html#definemodel" target="_blank" rel="noreferrer">defineModel API 참조</a></li></ul><h3 id="v-bind-동일-명칭-축약어" tabindex="-1"><code>v-bind</code> 동일 명칭 축약어 <a class="header-anchor" href="#v-bind-동일-명칭-축약어" aria-label="Permalink to &quot;\`v-bind\` 동일 명칭 축약어&quot;">​</a></h3><p><strong>내용: <a href="https://github.com/vuejs/core/pull/9451" target="_blank" rel="noreferrer">PR#9451</a></strong></p><p>이제 아래와 같은 코드를 더 간결하게 단축할 수 있습니다.</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">img</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">id</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">src</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:alt</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">alt</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>단축하면 아래와 같이 표현됩니다.</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">img</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:id</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:src</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:alt</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>이 기능은 과거에 자주 요청되었던 기능입니다. 원래는 부울 속성과 혼동될 수 있다는 우려가 있었습니다. 그러나 이 기능을 다시 검토한 결과, <code>v-bind</code>의 동적 특성을 고려할 때 기본 속성보다 자바스크립트처럼 동작하는 것이 더 합리적이라고 판단했습니다.</p><h3 id="하이드레이션-불일치-오류-개선" tabindex="-1">하이드레이션 불일치 오류 개선 <a class="header-anchor" href="#하이드레이션-불일치-오류-개선" aria-label="Permalink to &quot;하이드레이션 불일치 오류 개선&quot;">​</a></h3><p><strong>내용: <a href="https://github.com/vuejs/core/pull/5953" target="_blank" rel="noreferrer">PR#5953</a></strong></p><p>3.4 버전에서는 하이드레이션 불일치 오류 메시지가 여러 면에서 개선되었습니다.</p><ol><li>표현의 명확성이 개선되었습니다(서버에서 렌더링 되는 것과 클라이언트에서 예상되는 것).</li><li>이제 메시지에 해당 DOM 노드가 포함되어 페이지 또는 요소 패널에서 해당 노드를 빠르게 찾을 수 있습니다.</li><li>이제 클래스, 스타일 및 기타 동적으로 바인딩된 속성에 대해서도 하이드레이션 불일치 검사가 적용됩니다.</li></ol><p>또한 3.4에는 새로운 컴파일 타임 플래그인 <a href="https://vuejs.org/api/compile-time-flags.html#VUE_PROD_HYDRATATION_MISMATCH_DETAILS" target="_blank" rel="noreferrer"><code>__VUE_PROD_HYDRATION_MISMATCH_DETAILS__</code></a>가 추가되어 운영 환경에서도 하이드레이션 불일치 오류에 전체 세부 정보를 포함하도록 강제할 수 있습니다.</p><h3 id="오류-코드-및-컴파일-시간-플래그-참조" tabindex="-1">오류 코드 및 컴파일 시간 플래그 참조 <a class="header-anchor" href="#오류-코드-및-컴파일-시간-플래그-참조" aria-label="Permalink to &quot;오류 코드 및 컴파일 시간 플래그 참조&quot;">​</a></h3><p>번들 크기를 줄이기 위해 Vue는 운영 환경 빌드 시 긴 오류 메시지 문자열을 삭제합니다. 이것은 Vue의 소스 코드를 자세히 살펴보지 않고는 해독하기 어려운 짧은 오류 코드가 운영 환경에서 오류 핸들러에 의해 포착된다는 것을 의미합니다.</p><p>이를 개선하기 위해 문서에 <a href="https://vuejs.org/error-reference/" target="_blank" rel="noreferrer">운영 오류 참조 페이지</a>를 추가했습니다. 오류 코드는 최신 버전의 Vue 안정 릴리스에서 자동으로 생성됩니다.</p><p>또한 다양한 빌드 도구에 대해 이러한 플래그를 구성하는 방법에 대한 지침이 포함된 <a href="https://vuejs.org/api/compile-time-flags.html" target="_blank" rel="noreferrer">컴파일 시간 플래그 참조</a>를 추가했습니다.</p><h2 id="사용되지-않는-기능-제거" tabindex="-1">사용되지 않는 기능 제거 <a class="header-anchor" href="#사용되지-않는-기능-제거" aria-label="Permalink to &quot;사용되지 않는 기능 제거&quot;">​</a></h2><h3 id="전역-jsx-네임스페이스" tabindex="-1">전역 JSX 네임스페이스 <a class="header-anchor" href="#전역-jsx-네임스페이스" aria-label="Permalink to &quot;전역 JSX 네임스페이스&quot;">​</a></h3><p>3.4부터 Vue는 더 이상 글로벌 <code>JSX</code> 네임스페이스를 기본적으로 등록하지 않습니다. 이는 리액트와의 글로벌 네임스페이스 충돌을 방지하여 두 라이브러리의 JSX가 동일한 프로젝트에 공존할 수 있도록 하기 위해 필요합니다. 이는 최신 버전의 Volar를 사용하는 SFC 전용 사용자에게는 영향을 미치지 않습니다.</p><p>TSX를 사용하는 경우에는 두 가지 옵션이 있습니다.</p><ol><li><p>3.4로 업그레이드하기 전에 <code>tsconfig.json</code>에서 <a href="https://www.typescriptlang.org/tsconfig#jsxImportSource" target="_blank" rel="noreferrer">jsxImportSource</a>를 <code>&#39;vue&#39;</code>로 명시적으로 설정합니다. 또는 파일 상단에 <code>/* @jsxImportSource vue */</code> 주석을 추가하여 파일별로 옵트인(opt-in)할 수도 있습니다.</p></li><li><p>전역 <code>JSX</code> 네임스페이스의 존재 여부에 따라 달라지는 코드(예: <code>JSX.Element</code> 등의 유형 사용)가 있는 경우 전역 <code>JSX</code> 네임스페이스를 등록하는 <code>vue/jsx</code>를 명시적으로 참조하여 3.4 이전의 전역 동작을 유지할 수 있습니다.</p></li></ol><p>이 변경사항은 마이너 릴리스에서의 타입스크립트에만 호환성이 손상되는 변경사항(breaking changes)으로, 우리의 <a href="https://vuejs.org/about/releases.html#semantic-versioning-edge-cases" target="_blank" rel="noreferrer">릴리스 정책</a>을 준수합니다.</p><h3 id="기타-제거된-기능" tabindex="-1">기타 제거된 기능 <a class="header-anchor" href="#기타-제거된-기능" aria-label="Permalink to &quot;기타 제거된 기능&quot;">​</a></h3><ul><li><a href="https://vuejs.org/guide/extras/reactivity-transform.html" target="_blank" rel="noreferrer">반응형 변환(Reactivity Transform)</a>은 3.3에서 더 이상 사용되지 않는 것으로 표시되었고, 3.4에서 제거되었습니다. 이 기능은 실험적인 기능이기 때문에 메이저 변경이 필요하지 않습니다. 이 기능을 계속 사용하려는 사용자는 <a href="https://vue-macros.dev/features/reactivity-transform.html" target="_blank" rel="noreferrer">Vue 매크로 플러그인</a>을 통해 사용할 수 있습니다.</li><li><code>app.config.unwrapInjectedRef</code>가 제거되었습니다. 이 기능은 3.3에서 더 이상 사용되지 않으며 기본적으로 활성화되었습니다. 3.4에서는 더 이상 이 동작을 비활성화할 수 없습니다.</li><li>템플릿의 <code>@vnodeXXX</code> 이벤트 리스너는 이제 더 이상 사용되지 않음을 경고하는 것이 아니라 컴파일러 오류가 발생합니다. 대신 <code>@vue:XXX</code> 리스너를 사용하세요.</li><li><code>v-is</code> 지시어가 제거되었습니다. 3.3에서 더 이상 사용되지 않습니다. 대신 <a href="https://vuejs.org/api/built-in-special-attributes.html#is" target="_blank" rel="noreferrer"><code>vue:</code> 접두사가 있는 <code>is</code> 속성</a>을 사용하세요.</li></ul>`,53),t=[r];function n(p,c,i,d,u,h){return a(),s("div",null,t)}const m=e(l,[["render",n]]);export{g as __pageData,m as default};
