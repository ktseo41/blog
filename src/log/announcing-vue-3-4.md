---
feArticle: true
---

# Vue 3.4 발표

> 원문: [https://blog.vuejs.org/posts/vue-3-4](https://blog.vuejs.org/posts/vue-3-4)

오늘 Vue 3.4 "🏀 슬램덩크"의 출시를 발표하게 되어 기쁩니다!

이번 릴리스에는 상당한 내부 개선이 이루어졌습니다. 특히 템플릿 구문 분석기는 다시 작성되어 2배 빨라졌으며, 이펙트 트리거를 더 정확하고 효율적으로 만드는 리팩터링 된 반응형 시스템을 재구성 했습니다. 또한 `defineModel`의 안정화, 프로퍼티 바인딩 시 동일한 이름의 새로운 축약어 같은 여러 가지 편의 기능 API 개선 사항도 포함되어 있습니다.

이 글에서는 3.4의 주요 기능에 대한 개요를 소개합니다. 변경 사항의 전체 목록은 [Github상의 전체 변경 로그](https://github.com/vuejs/core/blob/main/CHANGELOG.md#340-2023-12-28)를 참조하세요.

---

- [필요한 조치](#potential-actions-needed)
- [핵심 변경 사항](#feature-highlights)
  - [2배 빨라진 구문 분석기 및 향상된 SFC 빌드 성능](#2x-faster-parser-and-improved-sfc-build-performance)
  - [더 효율적인 반응형 시스템](#more-efficient-reactivity-system)
  - [`defineModel` 안정화](#definemodel-is-now-stable)
  - [`v-bind` 동일 명칭 축약어](#v-bind-same-name-shorthand)
  - [하이드레이션 불일치 오류 개선](#improved-hydration-mismatch-errors)
  - [오류 코드 및 컴파일 시간 플래그 참조](#error-code-and-compile-time-flag-reference)
- [사용되지 않는 기능 제거](#removed-deprecated-features)
  - [전역 JSX 네임스페이스](#global-jsx-namespace)
  - [기타 제거된 기능](#other-removed-features)

## 필요한 조치

1. 3.4의 새로운 기능을 최대한 활용하려면 3.4로 업그레이드할 때 다음 종속성도 함께 업데이트하는 것이 좋습니다.

   - Volar / vue-tsc@^1.8.27 (**필수**)
   - @vitejs/plugin-vue@^5.0.0 (Vite를 사용하는 경우)
   - nuxt@^3.9.0 (Nuxt를 사용하는 경우)
   - vue-loader@^17.4.0 (웹팩 또는 vue-cli를 사용하는 경우)

2. Vue와 함께 TSX를 사용하는 경우, [제거됨: 글로벌 JSX 네임스페이스](#removed-global-jsx-namespace)에서 필요한 조치를 확인하세요.

3. 더 이상 사용되지 않는 기능을 사용하고 있지 않은지 확인하세요(사용하고 있었다면 콘솔에서 이를 알리는 경고를 받았을 것입니다). 이런 기능들은 [3.4에서 제거](#other-removed-features)되었을 수 있습니다.

## 핵심 변경 사항

### 2배 빨라진 구문 분석기 및 향상된 SFC 빌드 성능

**내용: [PR#9674](https://github.com/vuejs/core/pull/9674)**

3.4에서는 템플릿 구문 분석기를 완전히 재작성했습니다. 이전에는 많은 정규식과 선행 검색에 의존하는 재귀적 하강 구문 분석기를 사용했습니다. 새로운 구문 분석기는 전체 템플릿 문자열을 한 번만 반복하는 [htmlparser2](https://github.com/fb55/htmlparser2)의 토크나이저를 기반으로 하는 상태 머신 토크나이저를 사용합니다. 그 결과 모든 크기의 템플릿에서 일관되게 두 배 빠른 구문 분석기가 탄생했습니다. 광범위한 테스트 사례와 [ecosystem-ci](https://github.com/vuejs/ecosystem-ci) 덕분에 Vue 최종 사용자를 위한 100% 이전 버전과 호환됩니다.

새로운 구문 분석기를 시스템의 다른 부분과 통합하는 동안 전반적인 SFC 컴파일 성능을 더욱 향상할 수 있는 몇 가지 기회도 발견했습니다. 벤치마크에 따르면 소스 맵을 생성하는 동안 Vue SFC의 스크립트 및 템플릿 부분을 컴파일할 때 약 44% 개선된 것으로 나타났으므로 3.4를 사용하면 Vue SFC를 사용하는 대부분의 프로젝트에서 빌드 속도가 빨라질 것입니다. 하지만 실제 프로젝트에서 Vue SFC 컴파일은 전체 빌드 프로세스의 한 부분일 뿐이라는 점에 유의하세요. 종단 간 빌드 시간의 최종 개선 효과는 분리된 벤치마크에 비해 훨씬 작을 수 있습니다.

Vue 코어 외에도 새로운 구문 분석기는 Volar/Vue-tsc 및 Vue SFC 또는 템플릿을 구문 분석해야 하는 커뮤니티 플러그인(예: Vue 매크로)의 성능에도 도움이 될 것입니다.

### 더 효율적인 반응형 시스템

**내용: [PR#5912](https://github.com/vuejs/core/pull/5912)**

3.4에서는 computed 프로퍼티의 재계산 효율성을 개선하기 위해 반응형 시스템을 대폭 리팩터링 했습니다.

개선된 내용을 설명하기 위해 다음 시나리오를 예로 들어보겠습니다.

```js
const count = ref(0)
const isEven = computed(() => count.value % 2 === 0)

watchEffect(() => console.log(isEven.value)) // true라고 로그에 기록됩니다.

count.value = 2 // 다시 true라고 로그에 기록됩니다.
```

3.4 이전에는 계산된 결과가 동일하게 유지되더라도 `count.value`가 변경될 때마다 `watchEffect`의 콜백이 실행되었습니다. 3.4 이후 최적화를 통해 이제 계산된 결과가 실제로 변경된 경우에만 콜백이 실행됩니다.

또한 3.4에서는

- 여러 개의 computed 의존성 변경이 동기 효과를 단 한 번만 트리거합니다.
- 배열의 `shift`, `unshift`, `splice` 메서드도 동기 효과를 단 한 번만 트리거합니다.

이러한 변경사항은 [벤치마크](https://github.com/vuejs/core/pull/5912#issuecomment-1748985641)에서 보이는 성능 향상 외에도, 이전 버전과 호환을 완벽하게 유지하면서도 많은 시나리오에서 불필요한 컴포넌트 재렌더링을 줄일 것입니다.

### `defineModel`이 안정화되었습니다.

**내용: [RFC#503](https://github.com/vuejs/rfcs/discussions/503)**

`defineModel`은 `v-model`을 지원하는 컴포넌트의 구현을 간소화하기 위한 새로운 `<script setup>` 매크로입니다. 3.3에서 실험적 기능으로 제공되었고 3.4에서 안정적인 상태로 업그레이드되었습니다. 이제 `v-model` 수정자와 함께 사용할 수 있도록 더 나은 지원을 제공합니다.

관련 문서:
- [개정된 컴포넌트 v-model 섹션](https://vuejs.org/guide/components/v-model.html)
- [defineModel API 참조](https://vuejs.org/api/sfc-script-setup.html#definemodel)

### `v-bind` 동일 명칭 축약어

**내용: [PR#9451](https://github.com/vuejs/core/pull/9451)**

이제 아래와 같은 코드를 더 간결하게 단축할 수 있습니다.

```html
<img :id="id" :src="src" :alt="alt">
```

단축하면 아래와 같이 표현됩니다.

```html
<img :id :src :alt>
```

이 기능은 과거에 자주 요청되었던 기능입니다. 원래는 부울 속성과 혼동될 수 있다는 우려가 있었습니다. 그러나 이 기능을 다시 검토한 결과, `v-bind`의 동적 특성을 고려할 때 기본 속성보다 자바스크립트처럼 동작하는 것이 더 합리적이라고 판단했습니다.

### 하이드레이션 불일치 오류 개선

**내용: [PR#5953](https://github.com/vuejs/core/pull/5953)**

3.4 버전에서는 하이드레이션 불일치 오류 메시지가 여러 면에서 개선되었습니다.

1. 표현의 명확성이 개선되었습니다(서버에서 렌더링 되는 것과 클라이언트에서 예상되는 것).
2. 이제 메시지에 해당 DOM 노드가 포함되어 페이지 또는 요소 패널에서 해당 노드를 빠르게 찾을 수 있습니다.
3. 이제 클래스, 스타일 및 기타 동적으로 바인딩된 속성에 대해서도 하이드레이션 불일치 검사가 적용됩니다.

또한 3.4에는 새로운 컴파일 타임 플래그인 [`__VUE_PROD_HYDRATION_MISMATCH_DETAILS__`](https://vuejs.org/api/compile-time-flags.html#VUE_PROD_HYDRATATION_MISMATCH_DETAILS)가 추가되어 운영 환경에서도 하이드레이션 불일치 오류에 전체 세부 정보를 포함하도록 강제할 수 있습니다.

### 오류 코드 및 컴파일 시간 플래그 참조

번들 크기를 줄이기 위해 Vue는 운영 환경 빌드 시 긴 오류 메시지 문자열을 삭제합니다. 이것은 Vue의 소스 코드를 자세히 살펴보지 않고는 해독하기 어려운 짧은 오류 코드가 운영 환경에서 오류 핸들러에 의해 포착된다는 것을 의미합니다.

이를 개선하기 위해 문서에 [운영 오류 참조 페이지](https://vuejs.org/error-reference/)를 추가했습니다. 오류 코드는 최신 버전의 Vue 안정 릴리스에서 자동으로 생성됩니다.

또한 다양한 빌드 도구에 대해 이러한 플래그를 구성하는 방법에 대한 지침이 포함된 [컴파일 시간 플래그 참조](https://vuejs.org/api/compile-time-flags.html)를 추가했습니다.

## 사용되지 않는 기능 제거

### 전역 JSX 네임스페이스

3.4부터 Vue는 더 이상 글로벌 `JSX` 네임스페이스를 기본적으로 등록하지 않습니다. 이는 리액트와의 글로벌 네임스페이스 충돌을 방지하여 두 라이브러리의 JSX가 동일한 프로젝트에 공존할 수 있도록 하기 위해 필요합니다. 이는 최신 버전의 Volar를 사용하는 SFC 전용 사용자에게는 영향을 미치지 않습니다.

TSX를 사용하는 경우에는 두 가지 옵션이 있습니다.

1. 3.4로 업그레이드하기 전에 `tsconfig.json`에서 [jsxImportSource](https://www.typescriptlang.org/tsconfig#jsxImportSource)를 `'vue'`로 명시적으로 설정합니다. 또는 파일 상단에 `/* @jsxImportSource vue */` 주석을 추가하여 파일별로 옵트인(opt-in)할 수도 있습니다.

2. 전역 `JSX` 네임스페이스의 존재 여부에 따라 달라지는 코드(예: `JSX.Element` 등의 유형 사용)가 있는 경우 전역 `JSX` 네임스페이스를 등록하는 `vue/jsx`를 명시적으로 참조하여 3.4 이전의 전역 동작을 유지할 수 있습니다.

이 변경사항은 마이너 릴리스에서의 타입스크립트에만 호환성이 손상되는 변경사항(breaking changes)으로, 우리의 [릴리스 정책](https://vuejs.org/about/releases.html#semantic-versioning-edge-cases)을 준수합니다.

### 기타 제거된 기능

- [반응형 변환(Reactivity Transform)](https://vuejs.org/guide/extras/reactivity-transform.html)은 3.3에서 더 이상 사용되지 않는 것으로 표시되었고, 3.4에서 제거되었습니다. 이 기능은 실험적인 기능이기 때문에 메이저 변경이 필요하지 않습니다. 이 기능을 계속 사용하려는 사용자는 [Vue 매크로 플러그인](https://vue-macros.dev/features/reactivity-transform.html)을 통해 사용할 수 있습니다.
- `app.config.unwrapInjectedRef`가 제거되었습니다. 이 기능은 3.3에서 더 이상 사용되지 않으며 기본적으로 활성화되었습니다. 3.4에서는 더 이상 이 동작을 비활성화할 수 없습니다.
- 템플릿의 `@vnodeXXX` 이벤트 리스너는 이제 더 이상 사용되지 않음을 경고하는 것이 아니라 컴파일러 오류가 발생합니다. 대신 `@vue:XXX` 리스너를 사용하세요.
- `v-is` 지시어가 제거되었습니다. 3.3에서 더 이상 사용되지 않습니다. 대신 [`vue:` 접두사가 있는 `is` 속성](https://vuejs.org/api/built-in-special-attributes.html#is)을 사용하세요.