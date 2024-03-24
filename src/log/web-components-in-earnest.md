---
feArticle: true
---

# 웹 컴포넌트 본격적으로 사용하기

> 원문: [https://naildrivin5.com/blog/2024/01/24/web-components-in-earnest.html](https://naildrivin5.com/blog/2024/01/24/web-components-in-earnest.html)

**2024년 1월 24일 [📬 주간 뉴스레터 받기 ☞](https://naildrivin5.com/mailing_list/index.html)**

저는 이전에 [웹 컴포넌트에 대한 기본 경험에 대해](https://naildrivin5.com/blog/2023/11/20/web-components-templates-slots-and-shadowdom-aren-t-great.html)을 썼고 그 당시에는 웹 컴포넌트에 대해 잘 이해가 가지 않았지만 이제 이해가 되는 것 같습니다. 이 (꽤 긴) 글에서는 개발자를 위한 팔레트 생성기인 [Ghola](https://ghola.dev)를 어떻게 만들었는지 살펴보려고 합니다. 전적으로 사용자 정의 요소(Custom Element)로 구축되었습니다. 의존성이 거의 없고, 빠르게 실행되며, 작업하는 재미도 쏠쏠했습니다.

## 요약

이번 작업에는 [사용자 정의 요소 API](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)를 사용했습니다. 템플릿, 슬롯, 섀도 DOM은 목표를 달성하는 데 필요하지 않았기 때문에 사용하지 않았습니다(그리고 왜, 어떻게 사용해야 하는지 잘 모르겠습니다). 제가 선택한 방식은 사용자 정의 요소가 포함된 일반 요소와 관련된 기능을 제공하는 소위 [HTML 웹 컴포넌트](https://www.zachleat.com/web/a-taxonomy-of-web-component-types/#html-web-components)였습니다. 제 사용자 정의 요소는 자체 내용을 렌더링 하지 않습니다.

이 API를 사용하면서 느낀 효과는 다음과 같습니다.

* 요소를 내부적으로 강화한다고 생각하는 것이 자체적으로 렌더링 하는 완전한 '컴포넌트'를 생각하는 것보다 훨씬 간단합니다. 더 유연하고 더 간단한 코드를 작성할 수 있습니다.
* 방어적으로 코딩하세요. `connectedCallback` 및 `attributeChangedCallback`과 같은 수명 주기 메서드는 언제든지 어떤 순서로든 호출할 수 있습니다.
* 장애와 실수를 조용히 처리하되... 디버깅을 옵션으로 제공하세요. 브라우저는 `<dl>` 안에 `<li>`를 넣어도 경고하지 않으므로 요소도 그렇게 해서는 안 됩니다. 하지만 잘못 사용하고 있다는 메시지를 표시하는 스위치를 켜두면 좋습니다.
* 요소의 API는 MDN에 문서화되어 있는 것처럼, 주로 속성과 이벤트가 중심이 되고 프로그래밍 방식의 API는 필요한 경우에만 보완한다고 생각하세요.
* 요소의 동작을 현재 속성과 상태에 따라 필요한 작업을 수행하는 하나의 독립적인 메서드로 중앙 집중화하세요. 그러면 라이프사이클 콜백이 상태를 업데이트하고 이 중앙 집중식 메서드를 트리거합니다(프로그래밍 방식으로도 트리거할 수 있음).

몇 가지 놀라운 사실을 발견했습니다.

* 동적 동작이 필요할 때 유틸리티 CSS는 한계에 부딪힙니다. 이벤트 핸들러를 기반으로 CSS를 동적으로 할당하는 것보다 *속성*이 동적으로 할당되는 대상 요소에 CSS를 작성하는 것이 훨씬 더 쉬울 때가 있습니다.
* 브라우저 기반 테스트 워크플로는 헤드리스나 노드를 통해 가짜 브라우저 DOM을 사용하는 워크플로보다 훨씬 쉬웠습니다.
* 표준 API를 고수하거나 모방할수록 더 쉽게 이해할 수 있었습니다. 까다로운 문제는 HTML 요소와 표준 동작의 관점에서 다시 생각하면 해결되는 경우가 많았습니다.

몇 가지 멋진 점도 있었습니다.

* 브라우저의 API는 실제로 무언가가 비동기적일 때만 비동기를 사용하기 때문에 `await`, `async` 또는 기타 인위적으로 도입된 비동기 동작을 사용할 필요가 없었습니다. 저는 전체 화면을 미리 볼 때만 프로미스를 사용했는데, 그 이유는 해당 API가 프로미스를 사용하기 때문입니다.
* 프로덕션 종속성은 최소화했으므로 매우 적습니다.
* 제 개발 환경은 단순하고 일반적인 UNIX 도구를 기반으로 합니다. 제가 사용하는 주요 도구 중 UNIX의 일부가 아닌 것은 `esbuild`가 유일합니다.
* JS 테스트의 악몽에서 빠져나와 저에게 맞는 작업에 300줄을 투자했습니다. 세련되거나 프로덕션 준비가 완료된 것은 아니지만 문제를 해결했고 실제로 작동하는 코드에 대해 Cypress 테스트를 디버깅하는 악몽을 피할 수 있었습니다.
* 브라우저 API에 충실하고 프로젝트 설계에 이를 모방함으로써, 새로운 속성과 동작이 생겨났습니다. 이것들은 계획하지도 않았지만, 시간을 많이 쏟아야 했을 기능들을 쉽게 만들 수 있도록 했습니다.

이 모든 내용은 몇 가지 데모와 예제를 포함하여 아래에서 다룹니다.

## 심층 분석

Ghola의 설계와 구축에 대해 자세히 살펴보겠습니다. 원하는 경우 [소스 보기](https://github.com/davetron5000/ghola)를 통해 로컬에서 실행해 볼 수 있습니다. 다음과 같은 항목으로 나눠서 설명하겠습니다.

1.  [컴포넌트 개요](#components-of-ghola) - 제가 만든 모든 컴포넌트를 보여드리고 그 기능과 작동 방식에 대한 일반적인 개요를 제공합니다.
2.  [코드 실습](#code-walkthrough) - 컴포넌트의 실제 코드를 자세히 살펴보고 트레이드오프, 디자인 문제 등에 대해 이야기합니다.
3.  [테스트](#test) - 테스트에 대한 제 생각과 이를 달성한 방법에 대해 설명합니다. 저는 지금(또는 앞으로도) Capybara, Cypress, Playwright를 사용할 정신적, 정서적 에너지가 충분하지 않기 때문에 저만의 (300줄짜리) 라이브러리를 만들었습니다.
4.  [개발 환경](#dev-environment) - HTML 및 JavaScript 앱이므로 HTML 생성 방식이 중요하며, 앱을 빌드할 때 사용한 전반적인 워크플로우를 설명합니다. 미리 스포일러하자면 대부분 `make`와 EJS입니다.
5.  [첫 번째 시도의 문제점](#my-first-attempt) - `ghola.dev`에서 볼 수 있는 Ghola 버전은 웹 컴포넌트를 사용한 두 번째 시도입니다. 첫 번째는 콘텐츠를 렌더링 하는 React 스타일의 컴포넌트를 만드는 데 더 집중했는데 잘 되지 않았습니다.

## Ghola의 컴포넌트 살펴보기

Ghola는 컬러 팔레트를 만드는 방법 중 하나입니다. 이 섹션에서는 제가 생각해 낸 기본 용어에 대해 설명하고 사용자 정의 요소에 대해 설명하고 시연해 보겠습니다. 이러한 요소의 *코드*는 [다음 섹션](#code-walkthrough)에서 설명합니다.

*   [도메인](#domain) - Ghola의 용어
*   [메인 화면 요소](#main-screen-custom-elements)
    *   [`<g-color-swatch>` 요소](#g-color-swatch-element)
    *   [`<g-color-name>` 요소](#g-color-name-element)
    *   [`<g-palette-color-scale>` 요소](#g-palette-color-scale-element)
    *   [`<g-palette>` 요소](#g-palette-element)
    *   [`<g-add-color-scale-button>` 요소](#g-add-color-scale-button-element)
    *   [`<g-download-palette>` 요소](#g-download-palette-element)
    *   [`<g-attribute-checkbox>` 요소](#g-attribute-checkbox-element)
*   [미리보기 화면 요소](#custom-elements-for-previewing)
    *   [`<g-preview>` 요소](#g-preview-element)
    *   [`<g-preview-color-selection>` 요소](#g-preview-color-selection-element)
    *   [`<g-preview-text>` 요소](#g-preview-text-element)
    *   [`<g-preview-colors-contrast>` 요소](#g-preview-colors-contrast-element)
*   [저장 상태](#saving-state)

### 도메인

* *팔레트*는 하나 이상의 *기본 색상*으로 구성된 집합으로, 각각 다양한 *음영*이 있습니다.
* 기본 색상의 *음영*은 해당 *기본 색상*의 더 밝거나 어두운 버전이며, 이를 *색상 스케일*이라고 합니다.
* *색상 스케일*에는 *기본 색상*에 대한 이름이 있습니다(예: "빨간색").
* *팔레트*에는 다른 색을 결정하는 *기본색*이 있습니다.
* 하나의 눈금의 *기본색*은 *보색*과 같이 *기본색*에서 *파생*될 수 있습니다.

예를 들어 [이 팔레트](https://ghola.dev/?primaryColor=%23b51a00&otherColors=analogous-lower%2Ccomplement%2C%234d22b3%3APurple%2Ctriad-upper&compact=false)를 생각해 보세요.

* *기본 색상*은 `#B51A00`이며 이름은 "빨간색"입니다.
* 주황색은 그 유사 색상 중 하나입니다.
* 파란색은 보색입니다.
* 보라색은 독립적으로 선택됩니다.
* 녹색은 삼원색 중 하나입니다.

기본 색상을 변경하면 주황색, 파란색, 초록색이 그에 따라 변경됩니다.

도메인이 설정되었으므로 다음은 사용자 정의 요소입니다.

### 메인 화면 사용자 정의 요소

Ghola의 동작 대부분은 제작을 시도할 때부터 미리 알고 있었지만, 같은 요소를 그대로 재현하지 않으려고 노력했습니다. (저자의 2번째 시도, 역자 주)

시작하기 전에 다음과 같은 것들을 알고 있었습니다.

* 기본 색상을 선택하기 위해 색상 입력(`<input type=color>`) 을 사용합니다.
* 더 어둡거나 밝은 색의 눈금을 표시하기 위해 색상 견본이 존재할 것입니다.
* '보색' 또는 '삼원색'과 같은 알고리즘을 통해 하나의 견본이 다른 견본에서 파생될 수 있습니다.
* 이 파생은 전이적이어야 합니다. 한 견본이 원색의 보색이 되고 그 보색에서 파생된 색이 다른 음영을 나타내도록 하고 싶었습니다.
* 이 모든 것이 가능한 한 실시간으로 변경되기를 원했습니다. 즉, 새로운 원색을 선택하면 모든 것이 업데이트되어야 합니다.

또한 색을 추가/제거하고, 파생된 색의 링크를 해제(예: 보색 간의 파생 링크를 제거하여 기본 색이 변경되어도 이전 보색이 유지되도록 함)할 수 있는 일종의 UI가 필요하다는 것도 알고 있었습니다. 또한 기본적인 방법으로 색상을 미리 볼 수 있고, 팔레트에 대한 영구 링크가 있었으면 좋겠다는 생각도 들었습니다.

다음은 사용자 정의 요소를 강조 표시한 Ghola의 축소판 사진입니다.

[![사용자 정의 요소의 시각적 위치를 보여주는 Ghola의 주석이 달린 스크린샷](https://naildrivin5.com/images/Ghola.png)](https://naildrivin5.com/images/Ghola.png)

Ghola의 기본 UI 및 사용자 정의 요소 ([클릭해서 크게 보기](https://naildrivin5.com/images/Ghola.png)).

다음과 같습니다.

* 색상 견본(Color Swatch) - 다른 견본에서 파생된 편집 가능한 색상을 표시합니다.
* 색상 이름(Color Name) - 색상 이름을 표시하고 변경할 수 있습니다.
* 팔레트 색상 스케일(Palette Color Scale) - 기본 색상의 음영을 표시합니다.
* 팔레트(Palette) - 하나 이상의 팔레트 색상표를 보유합니다.
* 속성 확인란(Attribute Checkbox) - 선택하면 다른 요소의 속성을 설정하거나 제거합니다.
* 색상 스케일 추가 버튼(Add Color Scale Button) - 팔레트에 색상 스케일을 추가합니다.
* 팔레트 다운로드(Download Palette) - 현재 팔레트의 프로그래밍/구조화된 표출물을 생성합니다.

Ghola의 대부분은 단일 `.html` 파일로 서버 렌더링된다는 점에 유의하세요. 색상을 추가하면 페이지의 마크업이 복제되며, 일반적으로 이것이 동적 마크업 생성이 일어나는 유일한 방법입니다.

#### `<g-color-swatch>` 요소

사용자 정의 요소는 문자로 시작하고 대시(-) 하나가 있어야 하므로 모든 요소의 접두사에 `g-`를 붙였습니다. 앱이 복잡해지면 네이밍 문제가 발생할 수 있으므로 이는 논리적으로 보입니다. 일종의 네이밍 체계를 갖추는 것이 현명해 보입니다.

색상 견본은 모든 것을 작동시키는 핵심입니다. 이 요소는 0개 이상의 다른 요소를 감싸며, 사용자 정의 요소는 내부에 있는 내용에 따라 동작을 추가합니다.

가장 기본적으로는 색상을 선택하고 해당 색상을 요소 내부의 레이블에 다시 반영할 수 있습니다.

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/ktseo41/embed/BaEWpQM?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ktseo41/pen/BaEWpQM">
  1</a> by BOHYEON SEO (<a href="https://codepen.io/ktseo41">@ktseo41</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

`hex-code` 속성은 내부의 `input`이 이를 `value`로 받도록 합니다. 또한 `label` 내부에 `<code>` 요소가 추가되며 이 요소의 `textContent`는 16진수 코드 자체입니다. input이 사용되면 새 값이 사용자 정의 요소의 `hex-code` 값을 대체합니다. 이 경우 `hex-code-change` 이벤트가 발행됩니다.

그러나 요소에 폼 컨트롤이 포함될 필요는 없습니다. `data-color` 속성이 있는 모든 요소의 `backgroundColor`는 `hex-code` 값으로 설정됩니다. hex 코드 자체는 `data-hexcode` 속성이 있는 모든 요소에 삽입됩니다.

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/ktseo41/embed/mdgWREK?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ktseo41/pen/mdgWREK">
  2</a> by BOHYEON SEO (<a href="https://codepen.io/ktseo41">@ktseo41</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

이 두 번째 사용 사례는 `derived-from` 으로 `hex-code`를 생략할 수 있다는 사실을 알기 전까지는 그다지 매력적이지 않습니다. `derived-from`이 설정된 경우, 이것은 이 요소의 `hex-code`가 `hex-code`로 사용되는 다른 `g-color-swatch`의 ID입니다.

<iframe height="300" style="width: 100%;" scrolling="no" title="3" src="https://codepen.io/ktseo41/embed/MWRpJbw?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ktseo41/pen/MWRpJbw">
  3</a> by BOHYEON SEO (<a href="https://codepen.io/ktseo41">@ktseo41</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

이제 첫 번째 `<g-color-swatch>`의 `hex-code`가 변경되면 두 번째 요소가 자동으로 업데이트됩니다. 즉, 첫 번째 `<div>`의 배경색은 항상 첫 번째 견본의 색상을 반영합니다.

이 작업은 거의 전적으로 브라우저 API를 사용하여 수행됩니다.

[![브라우저가 기본 견본과 파생된 견본을 API로 호출하는 시퀀스 다이어그램. 파생된 견본은 브라우저 API를 사용하여 기본 견본을 찾고 `hex-code-change` 이벤트를 구독한 다음 기본 견본에서 디스패치되는 것을 표시합니다.](https://naildrivin5.com/images/GholaSwatchSequence.png)](https://naildrivin5.com/images/GholaSwatchSequence.png)

두 견본을 연결하기 위한 브라우저 API([클릭해서 더 크게 보기](https://naildrivin5.com/images/GholaSwatchSequence.png))

CodePen에서 사용해 보세요.

<iframe height="300" style="width: 100%;" scrolling="no" title="Editable Swatch and Mirroring" src="https://codepen.io/davetron5000/embed/ExMXExL?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/davetron5000/pen/ExMXExL">
  Editable Swatch and Mirroring</a> by Dave Copeland (<a href="https://codepen.io/davetron5000">@davetron5000</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

하지만 파생 견본이 *파생 알고리즘*에 의해 수정된 `derived-from` 견본의 색상을 보여줄 수 있다는 사실을 알기 전까지는 그다지 흥미롭지 않습니다. 알고리즘은 몇 가지가 있습니다.

* 밝기: 다양한 음영을 만드는 데 사용됩니다.
* 보색: 보색을 표시하는 데 사용됩니다.
* 분할-보색-상단 및 분할-보색-하단: 분할된 보색을 표시하는 데 사용됩니다.
* 유사-상단 및 유사-하단: 유사한 색을 표시합니다.
* 삼원색-상단 및 삼원색-하단: 삼원색의 다른 색을 표시합니다.

이러한 속성은 `파생 알고리즘`을 통해 지정됩니다. `밝기`를 사용하는 경우 `밝게 하기` 또는 `어두워지기` 속성을 사용하여 얼마나 변경할지 지정해야 합니다.

<iframe height="300" style="width: 100%;" scrolling="no" title="Derived Swatches" src="https://codepen.io/davetron5000/embed/GReExJK?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/davetron5000/pen/GReExJK">
  Derived Swatches</a> by Dave Copeland (<a href="https://codepen.io/davetron5000">@davetron5000</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

알고리즘을 선택한 다음 색상을 변경합니다. 파생 견본에 업데이트된 파생이 표시됩니다. 여기서 자바스크립트 코드에 주목하세요. `setAttribute`와 같은 브라우저 API를 사용하고 있을 뿐입니다.

이 빌딩 블록에서 Ghola의 다른 대부분의 동작은 마크업만으로 만들 수 있습니다.

하지만 Ghola는 특별한 방식으로 작동해야 합니다. 그중 하나는 색의 이름을 지정할 수 있어야 한다는 것입니다.

#### `<g-color-name>` 요소

색상표는 궁극적으로 코드에서 사용되기 때문에 색상 눈금에는 '빨간색', '회색' 또는 '보라색'과 같은 이름이 필요합니다. 색상 이름 컴포넌트는 이를 처리하는 방식입니다. 기본적으로 관련 색상 견본의 색조를 기반으로 색상 이름을 표시합니다.

`<g-color-name>`은 `input`을 찾아 `value`를 `color-swatch` 속성에 지정된 ID를 가진 견본의 시스템 정의 색상으로 설정합니다.

```html
<g-color-swatch hex-code="#334411" id="primary">
  <input type="color">
</g-color-swatch>
<g-color-name color-swatch="primary">
  <input type=text>
</g-color-name>
```

견본을 변경하면 `input`의 값이 올바른 시스템 정의 이름으로 반영됩니다. 하지만 `input`을 편집하면 이 동작이 중지되고 사용자가 제공한 이름이 유지됩니다. 그리고 이 경우 `input`에 `data-user-override`가 설정되어 스타일을 변경할 수 있습니다.

다음은 예시입니다.

<iframe height="300" style="width: 100%;" scrolling="no" title="Color Name" src="https://codepen.io/davetron5000/embed/BabZrKj?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/davetron5000/pen/BabZrKj">
  Color Name</a> by Dave Copeland (<a href="https://codepen.io/davetron5000">@davetron5000</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

값을 수정하면 이탤릭체로 표시된 '(overridden)' 레이블이 표시됩니다. 자바스크립트가 필요하지 않습니다!

참고로 이 지점이 유틸리티 CSS가 제대로 작동하지 않는 첫 번째 지점입니다. 유틸리티 CSS의 장점 중 하나는 코드에 _적용할_ 때 `.css` 파일로 이동하지 않고도 확인할 수 있다는 점입니다.


```js
element.classList.add("flex","flex-column")
```

물론 코드를 작성할 필요가 없는 것이 실제로는 더 좋습니다. `label:has(input[data-user-override]) span`과 같은 선택자는 다소 거추장스럽긴 하지만 클래스를 적용하거나 제거할 시점을 감지하기 위해 자바스크립트를 작성하는 것보다는 낫습니다.

이제 견본과 이름만 있으면 기본 색상의 다양한 음영 스케일을 만들 수 있습니다.

#### `<g-palette-color-scale>` 요소

팔레트의 색상 스케일에는 기본 색상과 하나 이상의 더 어둡고 밝은 음영이 있습니다. 기본 HTML과 `<g-color-swatch>` 사용자 정의 요소를 사용하면 이 작업을 수행할 수 있지만 더 간단한 방법을 원했습니다. 사용자 정의 요소가 그 자체로 다른 사용자 정의 요소를 향상하기를 원했습니다.

예를 들어, `<g-palette-color-scale linked-to-primary="complement">`라고 작성하고 싶었습니다. 이렇게 하면,

* 내부의 기본 견본이, 팔레트의 기본 색상이 무엇이든 `파생` 되도록 하고 싶었습니다.
* 다른 견본에는 기본 색상의 더 밝고 어두운 색조가 표시되도록 하고 싶었습니다.

그리고 매번 ID를 설정하거나 밝기 비율을 수동으로 조정하기 위해 자바스크립트를 작성하고 싶지 않았습니다.

저는 이 컴포넌트의 세 가지 형태를 결정했습니다.

* `<g-palette-color-scale primary>` - 팔레트의 기본 색상을 포함하는 스케일을 표시하기 위해 정확히 한 번만 사용됩니다.
* `<g-palette-color-scale linked-to-primary="«link algorithm»">` - 지정된 알고리즘(예: "삼원색" 또는 "분할 보색")에 따라 기본 견본이 기본색에 연결되도록 설정합니다.
* `<g palette-color-scale>` - 다른 색상과 독립적으로 변경할 수 있는 _연결되지 않은_ 색상입니다.

형태에 관계없이 내부의 각 견본 세트는 어두운 색부터 밝은 색까지 스케일을 표시하도록 수정됩니다. 중간을 기준으로 선택할 수 있도록 홀수여야 했습니다. 밝기와 어두움은 `선형` 또는 `지수`일 수 있는 `스케일 알고리즘` 속성에 의해 제어되었습니다. 저는 항상 `지수`형을 사용하여 원하는 음영 세트를 만들었지만, 개념 테스트용으로 선형을 만드는 것이 더 쉬웠기 때문에 그대로 두었습니다.

<iframe height="424" style="width: 100%;" scrolling="no" title="Color Scales" src="https://codepen.io/davetron5000/embed/wvOemgW?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/davetron5000/pen/wvOemgW">
  Color Scales</a> by Dave Copeland (<a href="https://codepen.io/davetron5000">@davetron5000</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

이 컴포넌트에는 "미리 보기", "제거", "연결 해제" 버튼도 지원했습니다.

* "미리 보기"를 클릭하면 스케일의 hex 값을 수신할 수 있는 이벤트가 발행됩니다.
* "제거"를 클릭하면 DOM에서 사용자 정의 요소를 제거하고 이벤트를 발행합니다.
* "링크 해제"를 클릭하면 더 이상 기본 요소에서 파생되지 않도록 자체에서 속성을 제거합니다. 이 요소의 기본 색상이 input인 경우 해당 input이 활성화됩니다. 이 경우에도 이벤트를 발행합니다.

다른 요소와 마찬가지로 이 버튼들이 존재하지 않을 수 있으며 이 경우 아무런 동작이 발생하지 않습니다.

여기에서 모든 것을 팔레트 컴포넌트로 감쌀 수 있습니다.

#### `<g-palette>` 요소

팔레트 컴포넌트는 세 가지 주요 역할을 합니다. 첫째, 새로운 `<g-palette-color-scale>`을 추가하는 프로그래밍 방식을 제공합니다. 둘째, 팔레트의 현재 상태, 즉 모든 hex 코드, 스케일 및 이름에 대한 프로그래밍 방식의 액세스를 제공합니다. 마지막으로 미리 보기 대화상자 실행을 처리합니다.

가장 까다로운 동작은 새 스케일을 추가할 때이며, 이는 중요한 마크업을 동적으로 생성하는 유일한 컴포넌트입니다. 새 스케일을 추가하라는 메시지가 표시되면 기본 스케일에 대한 마크업을 복사합니다. 그런 다음 내부의 ID를 수정하여 독립적이면서도 내부적으로 일관성을 유지하도록 합니다. 이에 대한 자세한 내용은 코드 실습에서 설명합니다.

다만 스케일은 `<g-add-color-scale-button>`을 통해 추가됩니다.

#### `<g-add-color-scale-button>` 요

이 사용자 정의 요소는 버튼을 감싸고 해당 버튼 동작을 이어받습니다. 이 요소는 버튼 클릭을 수신하고, 클릭이 발생하면 `palette` 속성의 ID를 가진 팔레트를 찾은 다음 `link-algorithm`에 지정된 알고리즘을 사용하여 하나 이상의 새 스케일을 추가하도록 프로그래밍적으로 요청합니다.

<iframe height="470" style="width: 100%;" scrolling="no" title="Adding Color Scales" src="https://codepen.io/davetron5000/embed/WNmOzZj?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/davetron5000/pen/WNmOzZj">
  Adding Color Scales</a> by Dave Copeland (<a href="https://codepen.io/davetron5000">@davetron5000</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

버튼의 마크업에 베이스에서 파생된 두 개의 `<g-color-swatch>` 요소가 포함되어 있는 것을 확인할 수 있습니다. 두 개의 삼원색을 표시하고 있으며 기본 견본을 변경하면 버튼도 변경됩니다. 저는 Ghola의 UI에서 이 기능을 사용하여 버튼에서 추가될 내용을 미리 보여주었습니다.

이 기능은 제가 계획한 기능은 아니었지만 사용자 정의 요소의 설계로부터 자연스럽게 나온 것입니다. 이 요소는 `data-color` 요소로 무엇이든 감쌀 수 있기 때문에 UI에 약간의 재미를 더하는 것은 간단했습니다. 깔끔하네요!

Ghola는 팔레트 다운로드도 지원합니다.

#### `<g-download-palette>` 요소

이 요소는 링크를 래핑하고 클릭 이벤트를 가로챕니다. 링크를 클릭하면 `palette` 속성으로 지정된 팔레트를 찾은 다음 `generator` 속성에 기반한 클래스를 사용합니다. 이 클래스는 `blob()`을 구현하여 `URL.createObjectURL()`에서 사용하기에 적합한 블롭을 반환합니다.

이것은 팔레트의 모든 색상 스케일을 요청하고 이름과 음영을 사용하여 올바른 값을 생성하는 방식으로 작동합니다.

메인 화면에서 마지막으로 볼 수 있는 컴포넌트는 콤팩트 모드를 트리거하는 체크박스입니다.

#### `<g-attribute-checkbox>` 요소

일반적으로 재사용 가능한 일반 컴포넌트를 만들려면 필요 이상으로 복잡해지기 때문에 재사용 가능한 일반 컴포넌트를 만들지 않으려고 매우 노력했습니다. 하지만 이 경우에는 좀 더 일반적인 컴포넌트를 만드는 것이 더 쉬워 보였습니다. 이 컴포넌트는 체크박스 요소를 감싸고 그 상태를 가로챕니다. 다른 요소의 ID로 예상되는 `element` 속성과 `attribute-name` 속성을 받습니다.

내부 확인란이 선택되어 있으면 `elements`는 `attribute-name`이 true로 설정됩니다. 확인란을 선택 취소하면 속성이 제거됩니다.

저는 이를 사용하여 `<g-palette>`에 `compact` 속성을 추가하거나 제거한 다음 CSS에서 콤팩트 모드의 시각적 효과를 완전히 구현했습니다. 각 컴포넌트의 동작이나 모양을 프로그래밍 방식으로 수정하는 것보다 훨씬 더 간단하게 달성할 수 있었습니다.

_흥미로운 여담으로, 이는 Tailwind, Tachyons 또는 제가 만든 MelangeCSS와 같이 유틸리티 기반 CSS만 사용하는 것의 결함을 보여줍니다. CSS를 작성하지 않고 이를 달성할 수 있는 유일한 합리적인 방법은 자바스크립트를 작성하여 프로그래밍 방식으로 클래스를 추가하거나 제거하는 것입니다. 실제로 Ghola에서 처음 시도한 것은 이 작업이었지만 매우 복잡했습니다._

미리 보기에 사용되는 몇 가지 요소가 있습니다.

### 미리 보기용 사용자 정의 요소

텍스트가 어떻게 보일지 미리 보고 기본적인 색상 대비 계산을 확인할 수 있도록 색상 스케일을 미리 볼 수 있기를 원했습니다.

[![사용자 정의 요소의 시각적 위치를 보여주는 Ghola 미리 보기 대화 상자의 주석이 달린 스크린샷](https://naildrivin5.com/images/GholaPreview.png)](https://naildrivin5.com/images/GholaPreview.png)

Ghola의 미리 보기 UI 및 사용자 정의 요소 ([클릭해서 크게 보기](https://naildrivin5.com/images/GholaPreview.png)).

이것은 아래와 같은 구성으로 만들어졌습니다.

* 미리 보기 - 전체 미리 보기 환경을 래핑 합니다.
* 미리 보기 색상 선택 - 텍스트 및 배경 색상을 선택하는 라디오 버튼입니다.
* 텍스트 미리 보기 - 선택한 색상으로 미리 보기 중인 텍스트를 표시합니다.
* 색상 대비 미리 보기 - 선택한 색상에 따라 충분하지 않음, 최소로 충분함 또는 "향상됨" 지표와 함께 WCAG 대비 비율을 표시합니다.

#### `<g-preview>` 요소

매우 간단합니다. 프로그래밍으로 지정된 색상 스케일을 그 안에 있는 컴포넌트에 전달합니다.

#### `<g-preview-color-selection>` 요소

약간 이상하기는 하지만 `<g-color-swatch>`의 작동 방식을 활용했습니다. 마크업은 텍스트용과 배경용 두 세트의 라디오 버튼으로 구성됩니다. 각 세트에는 스케일의 각 hex 코드에 대응하는 버튼과, 검정색과 흰색에 대응하는 버튼이 있습니다. 따라서 Ghola에서는 각 세트에 총 9개의 버튼이 있습니다.

`hex-code`의 값은 `<g-color-swatch>` 내의 모든 `input`에 반영되므로 `<g-preview-color-selection>`은 색상 견본에 대해 반복적으로 색상 스케일의 값으로 hex 코드를 설정할 수 있습니다. 라디오 버튼을 감싸는 `<g-color-swatch>` 요소는 값이 hex 코드인 라디오 버튼을 생성합니다.

[![제어의 흐름을 보여주는 주석이 달린 소스 코드. g-color-swatch의 setAttribute는 내부의 input 요소에서 input.value= 호출을 유발합니다](https://naildrivin5.com/images/GholaCode.png)](https://naildrivin5.com/images/GholaCode.png)

색상 견본 내부의 제어 흐름 ([클릭해서 크게 보기](https://naildrivin5.com/images/GholaCode.png)).

즉, 라디오 버튼의 `change` 이벤트를 수신했다면 `event.target.value`가 hex 코드가 될 것입니다. `<g-color-swatch>`가 이를 설정했을 것이기 때문입니다. 즉, 이 라디오 버튼은 `<g-color-swatch>`에 의해 강화되었다는 사실에 대해 걱정할 필요 없이 일반적으로 라디오 버튼을 사용하는 것과 똑같이 사용할 수 있습니다.

그럼 미리보기 텍스트 및 색상 대비 컴포넌트는 폼 요소에서 표준 이벤트를 수신할 수 있습니다.

#### `<g-preview-text>` 요소

미리보기 텍스트는 하드코딩된 HTML(소설 '해저 2만리'에서 발췌)이지만 `color` 및 `backgroundColor` 스타일을 적절히 설정하는 `text-color` 및 `background-color` 속성을 허용합니다. 또한 요소에서 `text-color` 및 `background-color`를 변경할 수 있는 양식의 이름인 `form` 속성을 허용합니다.

그런 다음 사용자 정의 요소는 양식 내부의 모든 요소에서 `change` 이벤트를 수신 대기합니다. 이벤트가 `name`이 `text-color` 또는 `background-color`인 요소에서 발생하면 자체 속성을 일치하도록 업데이트합니다. 그러면 텍스트 및 배경색이 폼에 따라 변경됩니다.

이 과정은 웹 컴포넌트나 사용자 정의 요소와는 아무런 관련이 없습니다. 다시 말하지만, 이는 기본적인 브라우저 API에 불과합니다.

대비 컴포넌트도 비슷하게 작동합니다.

#### `<g-preview-colors-contrast>` Element

이 컴포넌트는 `<g-preview-text>`와 비슷하게 작동하지만 두 값 사이의 WCAG 대비 비율을 계산합니다. 이 컴포넌트는 `data-ratio` 요소를 찾아서 그 `textContent`를 비율로 설정합니다. 그런 다음 `data-enhanced`, `data-minimal`, `data-insufficient` 속성을 가진 요소를 찾아서 비율에 따라 표시하거나 숨깁니다.

다음은 자바스크립트가 필요 없는 데모입니다. 이 요소는 `text-color` 및 `background-color`가 있는 모든 이름이 지정된 폼에서 값을 가져오기 때문에 `<g-color-swatch>` 요소와 쌍을 이루어 작동할 수 있습니다.

<iframe height="300" style="width: 100%;" scrolling="no" title="Color Contrast" src="https://codepen.io/davetron5000/embed/XWGaqmo?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/davetron5000/pen/XWGaqmo">
  Color Contrast</a> by Dave Copeland (<a href="https://codepen.io/davetron5000">@davetron5000</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

이제 앱이 완성되었습니다. 설명한 모든 컴포넌트가 앱을 만들지만 이것이 코드의 전부는 아닙니다.

### 저장 상태

특정 팔레트에 대한 영구 링크를 허용하는 데 필요한 모든 정보로 쿼리 문자열을 업데이트하고 싶었습니다. 즉, 기본 색상의 hex 코드와 함께 링크되지 않은 색상의 hex 코드도 포함해야 했습니다. 또한 사용자가 재정의한 경우 사용된 링크 알고리즘과 사용된 이름도 포함해야 했습니다.

이것은 한편으로는 히스토리 API와 `pushState`로 충분히 쉽게 할 수 있는 일입니다. 하지만 푸시가 무엇이고 `popState`를 어떻게 처리할지 아는 것이 더 어려웠습니다.

먼저, 팔레트의 모든 변경에 대한 이벤트가 있어야 해당 이벤트가 `pushState` 이벤트를 트리거할 수 있었습니다. 저는 `<g-palette>`가 `palette-change` 이벤트를 발행하도록 하고, 래핑 된 컴포넌트에서 어떤 동작이 `palette-change`를 구성하는지 분류하는 방식으로 이 문제를 처리했습니다. 이벤트 수신자는 사용자 정의 요소의 메서드를 호출하여 팔레트 값에 액세스 할 수 있습니다.

사용자가 뒤로 버튼을 눌렀을 때와 같은 팝업 상태에서는 어떻게 해야 할지가 더 까다로웠습니다. [웹 앱에서 뒤로가기 버튼이 제대로 작동하지 않는 것은 지양하고 싶습니다](https://brutalist-web.design/#back-button). 하지만 페이지 새로 고침 없이 처리하려면 기본적으로 페이지 전체를 파괴하고 다시 빌드해야 했습니다. 이 작업은 까다로워서 결국 쿼리 문자열을 상태로 사용하고 페이지를 뒤로 새로 고치는 방식으로 처리했습니다. 완벽하지는 않지만 GitHub 페이지가 충분히 빠르다면 괜찮을 것입니다.

이쯤에서 몇 가지 코드를 살펴보겠습니다!

## 코드 실습

가장 간단하게 이해할 수 있는 컴포넌트는 `<g-attribute-checkbox>`입니다. 이 컴포넌트를 통해 제가 추출한 재사용 가능한 부분과 다른 컴포넌트들의 전체적인 구조를 살펴볼 수 있습니다.

기본 API가 (최소한의) 재사용 가능한 코드로 진화하는 과정을 보려면 전체 내용을 읽어야 하므로 이 섹션에 대한 TOC는 넣지 않겠습니다.

### `<g-attribute-checkbox>`

사용자 정의 속성을 가진 사용자 정의 요소로서 다음 코드는 어떤 형태로든 존재해야 합니다.

```js
class AttributeCheckboxComponent extends HTMLElement {

  static observedAttributes = [
    "element",
    "attribute-name",
    "show-warnings",
  ]

  connectedCallback() {
    // DOM에 추가될 때 호출됩니다.
  }

  attributeChangedCallback(name,newValue,oldValue) {
    // 속성이 변경될 때 호출되며,
    // 연결 상태와 관계없이 호출됩니다.
  }

}
customElements.define("g-attribute-checkbox",
                      AttributeCheckboxComponent)
```

저는 결국 몇 가지 패턴을 베이스 클래스로 추출했지만, 이 컴포넌트가 어떻게 추상화되지 않고 작동하는지 살펴보겠습니다. 이를 통해 제가 추상화했던 것과 추상화하지 않았던 것까지 구축할 수 있습니다.

사용자 정의 요소의 까다로운 점은 특히 `attributeChangedCallback`이 호출될 때 DOM의 상태에 대해 많은 가정을 할 수 없다는 것입니다. 매우 방어적인 태도를 취하고 합당한 경우에만 DOM 요소에 대해 쿼리해야 합니다.

저는 제 코드가 `DOMContentLoaded`가 발행된 후에 실행될 것이라고 가정했습니다. 그러나 속성은 페이지가 처음 렌더링된 후에 변경될 수 있으므로 속성이 이미 설정되었을 것이라고 가정할 수는 없습니다.

즉, 많은 튜토리얼에서 보았던 이와 같은 코드가 반드시 작동하는 것은 아닙니다.

```js
class AttributeCheckboxComponent extends HTMLElement {

  constructor() {
    super()
    this.element = document.getElementById(
      this.getAttribute("element")
    )
  }

}
```

대신 다음과 같은 작업을 수행해야 합니다.

```js
class AttributeCheckboxComponent extends HTMLElement {

  attributeChangedCallback(name,newValue,oldValue) {
    if (name == "element") {
      if (newValue) {
        this.element = document.getElementById(newValue)
      }
      else {
        this.element = null
      }
    }
  }
}
```

체크박스가 실제로 어떤 작업을 수행하려면 `attribute-name`에 대한 값이 _또한_ 필요합니다. 따라서 다음과 같이 다소 복잡한 방법이 사용됩니다.

```js
attributeChangedCallback(name,newValue,oldValue) {
  if (name == "element") {
    this.elementId = newValue
  }
  else if (name == "attribute-name") {
    this.attributeName = newValue
  }
  if (this.attributeName && this.newValue) {
    const checkbox = this.querySelector("input[type=checkbox]")
    const element = document.getElementById(this.elementId)
    if (checkbox && element) {
      const update = () => {
        if (checkbox.checked) {
          element.setAttribute(this.attributeName,true)
        }
        else {
          element.removeAttribute(this.attributeName)
        }
      }
      checkbox.addEventListener("change", () => {
        update()
      })
    }
  }
}
```

이 코드는 여전히 너무 안이합니다. `attribute-name`이 변경되면 내부 체크박스에 두 번째 이벤트 리스너가 생기고 새로운 `attribute-name`과 이전 이벤트 리스너를 모두 설정하게 됩니다. 그리고 체크박스를 프로그래밍 방식으로 변경하면 `change` 이벤트가 트리거 되지 않으므로 체크박스와 관련 요소가 동기화되지 않게 됩니다.

다중 리스너 문제를 해결하기 위해 코드를 인스턴스 변수로 가져왔습니다. 이렇게 하면 이후 `addEventListener`를 호출해도 리스너가 두 개 이상 추가되지 않습니다. 리스너는 설정된 요소와 리스너가 호출될 때 구성된 속성이 무엇이든 간에 리스너를 사용합니다.

```js
constructor() {
  super()
  this.checkboxChangeListener = (event) => {
    const element = document.getElementById(this.elementId)
    if (element && event.target.checked) {
      element.setAttribute(this.attributeName,true)
    }
    else {
      element.removeAttribute(this.attributeName)
    }
  }
}

attributeChangedCallback(name,newValue,oldValue) {
  if (name == "element") {
    this.elementId = newValue
  }
  else if (name == "attribute-name") {
    this.attributeName = newValue
  }
  const checkbox = this.querySelector("input[type=checkbox]")
  checkbox.addEventListener("change", this.checkboxChangeListener)
  this.checkboxChangeListener({ target: checkbox })
}
```

보시다시피 `attributeChangedCallback`은 리스너의 로직을 호출해야 하는데, 가짜 이벤트를 생성하여 리스너를 호출하는 것은 다소 어색합니다. 그래서 로직의 대부분을 `_updateElement()`로 추출했습니다.

```js
constructor() {
  super()
  this.checkboxChangeListener = (event) => {
    this._updateElement()
  }
}

attributeChangedCallback(name,newValue,oldValue) {
  if (name == "element") {
    this.elementId = newValue
  }
  else if (name == "attribute-name") {
    this.attributeName = newValue
  }
  const checkbox = this.querySelector("input[type=checkbox]")
  checkbox.addEventListener("change", this.checkboxChangeListener)
  this._updateElement()
}

_updateElement() {
  const element = document.getElementById(this.elementId)
  if (element && event.target.checked) {
    element.setAttribute(this.attributeName,true)
  }
  else {
    element.removeAttribute(this.attributeName)
  }
}
```

프로그래밍 방식의 접근 문제를 처리하기 위해 저는 호출자가 `element.check()` 또는 `element.uncheck()`를 수행하여 체크박스를 체크/체크 해제하고 요소의 로직을 트리거할 수 있기를 원했습니다.

제가 생각한 것은 요소에 필요한 로직을 실행하는 중앙 메서드가 있으면 이 작업을 더 쉽게 할 수 있다는 것이었습니다. 요소가 전체 내부를 렌더링 하지는 않지만, 저는 `render()` 메서드를 호출했습니다.

```js
constructor() {
  super()
  this.checkboxChangeListener = (event) => {
    this._updateElement(event.target)
  }
}

connectedCallback() {
  this.render()
}

attributeChangedCallback(name,newValue,oldValue) {
  if (name == "element") {
    this.elementId = newValue
  }
  else if (name == "attribute-name") {
    this.attributeName = newValue
  }
  this.render()
}

render() {
  const checkbox = this.querySelector("input[type=checkbox]")
  checkbox.addEventListener("change", this.checkboxChangeListener)
  this._updateElement(checkbox)
}

_updateElement(checkbox) {
  const element = document.getElementById(this.elementId)
  if (element && checkbox.checked) {
    element.setAttribute(this.attributeName,true)
  }
  else {
    element.removeAttribute(this.attributeName)
  }
}
```

그러면 `check()`와 `uncheck()`가 `render()`를 호출할 수 있습니다.

```js
check() {
  const checkbox = this.querySelector("input[type=checkbox]")
  if (checkbox) {
    checkbox.checked = true
    this.render()
  }
}
uncheck() {
  const checkbox = this.querySelector("input[type=checkbox]")
  if (checkbox) {
    checkbox.checked = false
    this.render()
  }
}
```

이를 통해 모든 사용자 정의 요소의 기본 설계가 이루어졌습니다.

* `connectedCallback()`과 `attributeChangedCallback()`은 내부 상태를 설정하고 `render()`를 호출합니다.
* `render()`는 컴포넌트를 작동시키는 데 필요한 로직, DOM 업데이트 또는 기타 작업을 멱등하게 수행합니다. 언제든 호출해도 안전해야 하며 요소의 상태에 따라 항상 올바르게 동작해야 합니다.

이것은 변경이나 생명주기 활동이 트리거 될 때 어떤 작업이 필요한지 파악하기 위해 각 메서드에 복잡한 로직을 구현하려고 노력하는 것보다 훨씬 쉬웠습니다.

다음으로는 컴포넌트 전반에서 다른 패턴을 발견할 수 있었습니다.

### 연결이 끊긴 컴포넌트가 여전히 존재하는 경우

컴포넌트 연결이 끊어진 후에도 `attributeChangedCallback`이 여전히 트리거 될 수 있다는 것을 발견했습니다. 물론 컴포넌트에 대한 액세스 권한이 있는 모든 코드는 연결이 끊긴 컴포넌트의 메서드를 프로그래밍 방식으로 호출할 수 있습니다. 따라서 `render`가 `disconnectedCallback`이 호출된 이후에는 실행되지 않는다면 편리할 것입니다.

그래서 이런 패턴을 만들었습니다.

```js
disconnectedCallback() {
  this.disconnected = true
}

render() {
  if (this.disconnected) {
    return
  }
}
```

다음은 요소를 정의하는 다소 복잡한 호출입니다.

### 요소 정의 및 태그 이름 액세스하기

`customElements.define("g-color-name",ColorNameComponent)`가 _그렇게_ 나쁘지는 않지만, 결국 `this.querySelector("g-color-name")`와 같은 코드를 작성하게 되었죠. 이렇게 하면 사용자 정의 요소 이름이 중복되기 때문에 요소 이름을 변경하면 모든 쿼리 선택자를 찾아야한다는 문제가 있었습니다.

결국 정적 `tagName` 속성으로 표준화하기로 결정했고, 그 결과 `this.querySelector(ColorNameComponent.tagName)`를 사용할 수 있게 되었습니다. 이렇게 하면 컴포넌트 간에 자바스크립트 코드에 대한 자연스러운 종속성이 생겨, `null`이 반환되는 대신 `tagName`이 정의되지 않았다는 오류가 발생했습니다.

이 `tagName` 프로퍼티를 사용하여 정적 `define()` 메서드를 만들었습니다.

```js
static define() {
  customElements.define(this.tagName, this)
}
```

제가 마지막으로 보았던 패턴은 지저분한 `attributeChangedCallback` 메서드였습니다. 기본적으로 `if` 문으로 가득 차 있었습니다. 프로퍼티 이름을 직접 설정하기 위해 기본 클래스에서 `attributeChangedCallback`을 구현하는 것을 고려했지만, 그렇게 하면 프로퍼티에 대한 퍼블릭 API가 생성되어 별로 좋지 않았습니다. 기본 요소에서 `setAttribute("value",value)`와 `element.value = value`의 동작이 다르다는 것을 알고 있지만 관찰된 모든 요소에 대해 퍼블릭 API를 만들고 싶지는 않았습니다.

대신 기본 클래스에서, 특정 규칙을 준수하는 하위 클래스 메서드를 지연시키는 `attributeChangedCallback`을 구현했습니다.

### 모든 것을 지배하는 하나의 베이스 클래스

저는 베이스 클래스가 무엇인지 최대한 명확하게 하기 위해 `BaseCustomElement`라고 불렀습니다. `attributeChangedCallback`의 모습은 다음과 같습니다.

```js
attributeChangedCallback(name,oldValue,newValue) {
  const callbackName = 
    `${new RichString(name).camelize()}ChangedCallback`
  if (this[callbackName]) {
    this[callbackName]({oldValue,newValue})
  }
  else if (
    this.constructor.observedAttributes.indexOf(name) != -1
  ) {
    console.warn(
      "%s를 관찰 중이지만 이를 처리할 %s 메서드를 찾지 못했습니다",
      name,callbackName)
  }
  this.__render()
}
```

[`RichString`](https://github.com/davetron5000/ghola/blob/main/src/js/brutaldom/RichString.js](https://github.com/davetron5000/ghola/blob/main/src/js/brutaldom/RichString.js))은 제가 가지고 있는 잡동사니 서랍 같은 클래스로, 무엇보다도 `hex-code`를 `hexCode`로 바꿔줍니다. 따라서 `attributeChangedCallback(name,oldValue,newValue)`은 `«attributeNameInCamelCase»ChangedCallback({oldValue,newValue})`을 호출한다는 것을 알 수 있습니다. 사용자 정의 요소 수명 주기 메서드와 관련이 있다는 것을 명확히 하기 위해 메서드 이름에 `ChangedCallback`을 유지했습니다. 콜백 메서드에서 거의 필요하지 않은 `oldValue`를 선택 해제할 수 있도록 명명된 매개변수를 사용했습니다.

즉, 이 두 가지 메서드를 통해 `AttributeCheckboxComponent`의 `attributeChangedCallback`을 제거할 수 있었습니다.

```js
attributeNameChangedCallback({newValue}) {
  this.attributeName = newValue
}

elementChangedCallback({newValue}) {
  if (newValue) {
    this.element = document.getElementById(newValue)
    if (this.isConnected && !this.element) {
      this.logger.warn(
        "문서에 ID가 '%s' 인 요소가 없습니다.",newValue
      )
    }
  }
  else {
    this.element = null
    this.checkbox.removeEventListener("change",
                                      this.checkboxChangeListener)
  }
}
```

(아래에서 `this.logger.warn`에 대해 설명하겠습니다).

`BaseCustomElement`에는 `define()` 메서드와 `connectedCallback()` 및 `disconnectedCallback()`에 대한 구현도 있었습니다.

```js
disconnectedCallback() {
  this.__disconnected = true
  this.__connected = false
  if (this.onDisconnected) {
    this.onDisconnected()
  }
}

connectedCallback() {
  this.__connected = true
  this.__disconnected = false
  if (this.onConnected) {
    this.onConnected()
  }
  this.__render()
}

get isConnected() { return !!this.__connected }
```

서브클래스가 표준 `connectedCallback` 및 `disconnectedCallback` 메서드를 구현하지 못하도록 막는 것이 마음에 들지는 않았지만 `__render`를 구현하는 데 필요한 플래그를 설정하는 가장 쉬운 방법은 다음과 같이 설정하는 것으로 보였습니다.

```js
__render() {
  if (this.__disconnected) {
    return
  }
  if (this.render) {
    this.render()
  }
}
```

밑줄 2개로 시작하는 네이밍은 `BaseCustomElement`에서 비공개임을 상기시키기 위한 것입니다. 더 나은 패턴이 있는지 잘 모르겠습니다.

중앙 집중식 베이스 클래스를 사용하면 경고를 관리하는 방법도 제공할 수 있습니다.

### 경고, 조용한 실패 및 디버깅

앞서 언급했듯이 사용자 정의 요소는 경고나 오류를 발생시키지 않아야 하며 방어적이어야 합니다. 예를 들어, `AttributeCheckboxComponent`가 내부에서 체크박스를 찾지 못하면 아무 작업도 하지 않아야 합니다(예외를 던지는 대신).

즉, 디버깅을 할 때에는 요소를 잘못 사용하고 있다는 것을 알려주는 것이 좋습니다.

저는 `show-warnings` 속성을 찾아서 이런 문제를 관리하기로 결정했습니다. 속성을 설정하면 컴포넌트가 이를 확인하고 뭔가 잘못되었거나 오용된 경우 콘솔 메시지를 출력할 수 있습니다.

모든 곳에 수많은 `if (this.showWarnings)` 문이 있는 것을 피하기 위해, `BaseCustomElement`는 `console.log`를 감싸는 `this.logger`를 제공합니다. `BaseCustomElement`는 요소에 `show-warnings`가 설정될 때 호출되는 `attributeChangedCallback`의 구현으로 인해 `showWarningsChangedCallback`을 구현합니다(요소의 하위 클래스에서 이를 `observedAttributes`에 넣었다고 가정할 경우).

[`로거`](https://github.com/davetron5000/ghola/blob/main/src/js/brutaldom/Logger.js)는 모든 메시지에 앞에 붙는 접두사 개념을 가지므로 어떤 인스턴스 메시지에서 오는지 알 수 있습니다. `null` 접두사는 "아무것도 기록하지 않음"을 의미하며 기본 동작이 됩니다.

```js
constructor() {
  super()
  this.logger = Logger.forPrefix(null)
}
```
    
`show-warnings`가 요소에 있는 경우 해당 값 또는 요소의 id가 접두사로 사용되어 실제로 경고를 출력하는 `Logger`의 다른 구현이 트리거 됩니다.

```js
showWarningsChangedCallback({oldValue,newValue}) {
  let oldLogger
  if (!oldValue && newValue) {
    oldLogger = this.logger
  }
  const prefix = newValue == "" ? this.id : newValue
  this.logger = Logger.forPrefix(prefix)
  if (oldLogger) {
    this.logger.dump(oldLogger)
  }
}
```

마지막 `this.logger.dump` 호출에 주목하세요. 컴포넌트가 생성된 후 로깅이 켜진 경우 "null" 로거는 메시지를 유지한 채 덤프 합니다. 이는 다른 속성이 설정된 후에 `attributeChangedCallback('show-warnings',...,...)`이 호출되고, 앞선 호출이 경고를 생성하는 경우에 발생합니다.

모든 요소는 이제 기본적으로 경고를 확인하여 콘솔을 가득 채우지 않으며, 필요한 경우 경고를 확인할 수 있습니다.

다음은 `<g-color-swatch>`에 `input` 또는 `data-color`가 없는 예시입니다. 자바스크립트 콘솔을 열어 경고를 확인하세요.

<iframe height="300" style="width: 100%;" scrolling="no" title="Warnings from Custom Elements" src="https://codepen.io/davetron5000/embed/GRevjKj?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/davetron5000/pen/GRevjKj">
  Warnings from Custom Elements</a> by Dave Copeland (<a href="https://codepen.io/davetron5000">@davetron5000</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

이 `AttributeCheckboxComponent`의 코드는 그 사용법을 보여줍니다.

```js
if (this.isConnected && !this.element) {
  this.logger.warn("문서에 '%s' ID를 가진 요소가 없습니다." ,newValue)
}
```

다음과 같은 마크업이 있는 경우

```html
<g-attribute-checkbox element="non-existent" show-warnings>
  <!- ... %>
</g-attribute-checkbox>
```
    

경고는 콘솔에 표시됩니다. `show-warnings`를 제거하면 사라집니다.

`BaseCustomElement`는 많은 것처럼 보이지만 주석을 제외하면 코드 길이가 67줄(https://github.com/davetron5000/ghola/blob/main/src/js/brutaldom/BaseCustomElement.js)에 불과합니다. 저는 "재료에 대한 진실"을 고수하는 건축 양식인 브루탈리즘을 오마주하여 폴더 이름을 `brutaldom`으로 지었습니다.

![엘리베이터의 위치가 디자인에서 극명하게 드러나는 브루탈리즘 건물인 런던의 트렐릭 타워 사진](https://naildrivin5.com/images/trellick.jpg)

저에게 웹 컴포넌트와 사용자 정의 요소의 장점은 누수가 있는 추상화를 거치지 않고 브라우저의 API를 직접 사용한다는 점입니다. 제 `BaseCustomElement`는 추상화의 한 형태이긴 하지만, 그것이 무엇을 하고 어떻게 작동하는지 매우 명확하게 하기 위해 많은 노력이 필요했습니다. 많은 브루탈리즘과 마찬가지로요.

이 베이스 클래스를 사용하면 [`AttributeCheckboxComponent`](https://github.com/davetron5000/ghola/blob/main/src/js/components/AttributeCheckboxComponent.js)는 매우 간단하게 만들 수 있습니다. 그리고 `BaseCustomElement`에 무엇이 있는지 모르지만 사용자 정의 요소 API를 이해한다면 `elementChangedCallback`과 `tagName`이 무엇을 하는지 꽤 잘 짐작할 수 있습니다.

이제 가장 복잡한 색상 견본 요소의 코드를 좀 더 자세히 살펴보겠습니다.

### `<g-color-swatch>`

위에서 설명한 것처럼 이 요소의 일반적인 API는 다음과 같습니다.

*   속성
    *   `hex-code` - 표시할 hex 값
    *   `derived-from` - `hex-code` 대신 색상으로 사용할 다른 색상 견본의 ID입니다.
    *   `derivation-algorithm` - 다른 색상에서 색상을 파생하는 알고리즘입니다.
    *   `darken-by` - `derivation-algorithm`이 `밝기`인 경우 몇퍼센트 더 어둡게 해야 할까요?
    *   `brighten-by` - `derivation-algorithm`이 `밝기`인 경우 몇퍼센트 더 밝게 해야 할까요?
    *   `show-warnings` - 경고를 표시해야 할까요(위 설명을 참고하세요)?
    *   `default-link-context` - 요소 내부 어딘가에 표시할 추가 컨텍스트가 있나요?
*   이벤트
    *   `hex-code-change` - hex-code 속성이 변경되었을 때 발행되며, 이는 내부의 input 값이 변경되었을 때, 새로운 값이 파생되었을 때, 또는 누군가가 `setAttribute('hex-code',…)`나 `removeAttribute('hex-code')`를 호출했을 때 발생할 수 있습니다.
*   프로퍼티
    *   `hexCode` - 현재 hex 코드를 반환하는 게터입니다. 이 견본이 다른 견본에서 값을 파생하는 경우 `hexCode`는 그 값을 반환합니다.

render부터 시작해 보겠습니다. 기억하시겠지만, 이는 요소의 속성과 내용을 바탕으로 필요한 모든 작업을 수행하는 역할을 합니다.

먼저, 내부에서 찾은 모든 `input` 요소들에 그 값을 연결해야 합니다. 그리고 `show-warnings`가 설정되어 있을 때 올바른 경고를 제공하기 위해, 값이 다른 값에서 파생되었지만 편집 가능한 input이 발견되면 혼란스러운 동작이 발생할 수 있으므로 경고를 표시할 것입니다.

```js
render() {
  const numInputs = this._eachInput( (element) => {
    element.value = this.hexCode
    element.addEventListener("change",
                              this.onInputChangeCallback)
    const disabled = element.getAttributeNames().
                              indexOf("disabled") != -1
    if (!disabled) {
      if (this.derivedFromId) {
        this.logger.warn(
          "derived-from-id가 설정되었지만 활성화된 input이 감지되었습니다: %o",
          element)
      }
    }
  })
```

`_eachInput`은 발견된 입력의 수를 반환하여 경고를 표시하기 위해 존재합니다.

```js
_eachInput(f) {
  const elements = this.querySelectorAll("input")
  elements.forEach(f)
  return elements.length
}
```

다음으로 `render`는 모든 `data-color` 요소의 배경색을 설정해야 합니다. 그 후 입력이나 `data-color` 요소를 찾지 못하면 경고가 표시됩니다.

```js
const numDataColors = this._eachDataColor( (element) => {
  element.style.backgroundColor = this.hexCode
})

if ( (numDataColors == 0) && (numInputs == 0) ) {
  this.logger.warn(
    "<input type=color> 또는 [data-color] 요소가 발견되지 않았습니다."
  )
}
```

`_eachDataColor`은 `_eachInput`과 비슷합니다.

```js
_eachDataColor(f) {
  const elements = this.querySelectorAll("[data-color]")
  elements.forEach(f)
  return elements.length
}
```

다음으로 "link context"를 설정합니다. 이 컨텍스트는 Ghola가 UI에서 "Primary" 또는 "Complement"을 표시하는 곳입니다. `<g-color-swatch>`는 링크 알고리즘이 설정되지 않은 경우 보여줄 "기본" 링크 컨텍스트의 개념을 가지고 있습니다. 이것은 거의 전적으로 "Primary" 라벨을 표시하는 데 사용됩니다.

[![Ghola UI의 어느 부분이 링크 컨텍스트인지 보여주는 GholaLinkContext.png 이미지](https://naildrivin5.com/images/GholaLinkContext.png)](https://naildrivin5.com/images/GholaLinkContext.png)

link context ([클릭해서 크게 보기](https://naildrivin5.com/images/GholaLinkContext.png)).

```js
this._eachLinkContext( (element) => {
  if (this.defaultLinkContext) {
    element.textContent = this.defaultLinkContext
  }
  else {
    element.innerHTML = "&nbsp;" 
  }
})
```    

`_eachLinkContext`는 단 한 줄만 존재하지만, `_eachDataColor` 및 `_eachInput`과 동등하게 만들기 위해 존재합니다.

```js
_eachLinkContext(f) {
  this.querySelectorAll("[data-link-context]").forEach(f)
}
```

다음으로, 값이 다른 값에서 파생되는 상황을 처리합니다. 이것은 특히 무한 루프를 피하기 위해 올바르게 처리하기가 까다로웠습니다.

```js
if (this.derivedFromId) {
  this._updateDerivationifNeeded({ whenHexCodeExists: false })
}
```

`_updateDerivationifNeeded`는 약간 까다롭습니다. 기본적으로 다른 견본에서 파생하고 있고 그 요소가 `<g-color-swatch>`이고 hex 코드가 있는 경우 파생물을 업데이트합니다. `whenHexCodeExists` 플래그에는 복잡한 문제가 있습니다.

일부 컨텍스트에서는 이미 `hexCode` 값이 있는 경우 이 코드를 실행하고 싶지 않을 수 있습니다. `render()`가 바로 그런 경우입니다. 왜냐하면 파생이 궁극적으로 `this.setAttribute("Hex-code",...)`를 호출하여 `render()`를 트리거하고 따라서 무한 루프가 발생하기 때문입니다.

그렇다고 해서 `darken-by`, `brighten-by` 또는 `derivation-algorithm`이 변경되면 이미 hex 코드가 있더라도 다시 계산해야 합니다. 휴! 코드는 다음과 같습니다.

```js
_updateDerivationifNeeded({whenHexCodeExists}) {
  const derivedFromElement = this.derivedFromElement
  const hexCodeExists = !!this.hexCode

  if (derivedFromElement) {

    if (derivedFromElement.tagName.toLowerCase() == 
        this.constructor.tagName) {

      derivedFromElement.addEventListener(
        this.hexCodeChangedEventName,
        this.onDerivedElementChangeCallback
      )

      if ( (derivedFromElement.hexCode) && 
            (whenHexCodeExists == hexCodeExists) ) {

        this._deriveHexCodeFrom(derivedFromElement.hexCode)

      }
      this._eachLinkContext( (element) => {
        element.textContent = this.derivationAlgorithm.humanName 
      })
    }
    else {
      this.logger.warn(
        "파생 요소의 ID가 '%s'이지만 이것은 '%s'가 아니라 '%s'입니다.",
        this.derivedFromId,
        derivedFromElement.tagName,
        this.constructor.tagName)
    }
  }
}
```

파생된 ID가 색상 견본이 아닌 경우 경고가 표시됩니다. 이 경우 요소는 아무 작업도 수행하지 않아야 하지만 디버깅이 어려웠기 때문에 ID를 잘못 지정했을 때 이 경고가 매우 도움이 되었습니다.

또한 "기본 link context"를 파생 알고리즘의 이름으로 덮어씁니다. 이를 통해 이 정보를 저장할 위치를 확보하고, 정보가 없는 경우 합리적인 값을 설정할 수 있습니다.

`_deriveHexCodeFrom`는 다음과 같습니다.

```js
_deriveHexCodeFrom(hexCode) {

  const darken   = this.darkenBy ?
                      parseInt(this.darkenBy) : null
  const brighten = this.brightenBy ?
                      parseInt(this.brightenBy) : null

  if (this.derivationAlgorithm) {
    hexCode = this.derivationAlgorithm.derive(
      hexCode,{darken: darken, brighten: brighten}
    )
  }
  this.setAttribute("hex-code",hexCode)
}
```

`this.derivationAlgorithm`의 출처는 어디일까요? 분명히 문자열이 아닙니다. 이것은 `BaseCustomElement`의 `attributeChangedCallback`에 의해 설정되며, 이는 `derivationAlgorithmChangedCallback`을 호출합니다. 다음과 같이 생겼습니다.

```js
derivationAlgorithmChangedCallback({newValue}) {
  this.derivationAlgorithm = DerivationAlgorithm.fromString(
    newValue
  )

  if (this.derivationAlgorithm) {
    this._updateDerivationifNeeded({ whenHexCodeExists: true })
  }
  else if (!!newValue) {
    this.logger.warn("파생 알고리즘 '%s'가 올바르지 않습니다.",
                      newValue)
  }
}
```

`파생 알고리즘`은 문자열(`derivation-algorithm` 속성의 값)을 가져와서 클래스를 찾습니다. 이러한 클래스를 찾게 되면, 파생 알고리즘이 변경되면 `_updateDerivationifNeeded`를 호출하며 hex 코드가 있더라도 이를 수행하도록 지시합니다. 왜냐하면 파생 알고리즘 변경은 hex 코드가 변경될 가능성을 의미하기 때문입니다.

다음은 보색을 도출하는 파생 알고리즘의 예시입니다.

```js
class ComplementaryDerivation extends BaseDerivation {
  derive(hexCode,options={}) {
    const [h,s,l] = this.hsl(hexCode)
    const newH = (h + 180) % 360
    return this.hexCode(newH,s,l)
  }
  get humanName() { return "Complement" }
}
```

HSL의 "H"는 색조이며, 360도 원을 따라 표시되는 값입니다. 보색은 해당 원에서 그 반대쪽 값입니다.

자, 자세히 살펴봤지만 `render()`는 아직 끝나지 않았습니다! 레이블이나 `data-hexcode` 요소에 hex 코드를 넣어야 합니다.

hex 코드가 없는 경우 값을 지우도록 주의해야 합니다. 이렇게 하면 `hex-code` 속성이 제거되었을 때 이전 값이 남아있지 않도록 합니다.

```js
if (this.hexCode) {
  this._eachCodeElementInsideRelevantLabel( (codeElement) => {
    codeElement.textContent = this.hexCode
  })
}
else {
  this._eachCodeElementInsideRelevantLabel( (codeElement) => {
    codeElement.textContent = ""
  })
}
```

`_eachCodeElementInsideRelevantLabel` 함수는 관련된 모든 label을 찾아야 하지만, 다른 것들을 라벨링 하는 label은 찾지 않아야 하기 때문에 상당히 길어집니다. 또한 `data-hexcode` 경우도 처리합니다. 두 경우 모두에서 `code` 요소를 찾습니다. 하나를 찾으면, 그 요소의 `textContent`는 hex 코드로 설정됩니다. 이를 통해 hex 코드를 정확하게 스타일링하고 배치할 수 있습니다.

`code` 요소가 없으면 `code` 요소가 새로 생성됩니다.

```js
_eachCodeElementInsideRelevantLabel(f) {
  this.querySelectorAll("label").forEach( (label) => {
    let input
    if (label.htmlFor) {
      input = this.querySelector(
        `[id=${label.htmlFor}][type=color]`
      )
    }
    else {
      input = label.querySelector("input[type=color]")
    }
    if (input) {
      let code = label.querySelector("code")
      if (!code) {
        code = document.createElement("code")
        label.appendChild(code)
      }
      f(code)
    }
    else {
      this.logger.warn(`요소 내부의 고립된 레이블이 요소 내부의 색상 입력을 래핑 하거나 참조하지 않습니다: %o.`,label)
    }
  })
  this.querySelectorAll("[data-hexcode]").forEach( (hexCode) => {
    let code = hexCode.querySelector("code")
    if (!code) {
      code = document.createElement("code")
      hexCode.appendChild(code)
    }
    f(code)
  })
}
```

_여기까지가_ 바로 `render` 함수입니다. 실제로 이 클래스의 대부분을 다뤘습니다. 필요한 작업을 수행하는 멱등 방법을 만드는 것은 항상 쉬운 일이 아닙니다. 하나의 주목할 점은 `derived-from`의 값이 요소의 ID에서 다른 요소*로부터* 변경될 때입니다. 그 다른 요소는 DOM에서 제거되지 않으므로, 계속해서 그 요소의 `hex-code-change` 이벤트를 듣는다면 혼란스러워질 것입니다. 따라서 `removeEventListener`를 호출해야 합니다.

```js
derivedFromChangedCallback({newValue}) {
  if (this.derivedFromElement) {
    this.derivedFromElement.removeEventListener(
      this.hexCodeChangedEventName,
      this.onDerivedElementChangeCallback)
  }
  this.derivedFromId = newValue
}
```

이것은 `BaseCustomElement`의 `attributeChangedCallback` 구현에 의해 호출됩니다. 또한 `removeEventListener`는 제공한 리스너가 정확히 있을 때만 작동한다는 것을 기억하세요. 즉 이를 호출하려면 리스너를 보유해야 하며 다른 메서드 내부에 선언된 익명 함수일 수 없습니다.

이것은 생성자에서 설정되며, `onDerivedElementChangeCallback`은 다음과 같습니다.

```js
this.onDerivedElementChangeCallback = (event) => {
  if (event.target != this.derivedFromElement) {
    this.logger.warn("파생된 곳이 아닌 곳에서 이벤트를 받았습니다.")
  }
  this._deriveHexCodeFromSwatch(event.target)
}
```

처음에 `removeEventListener`를 잊어버려서 무슨 일이 벌어지고 있는지 꽤 혼란스러웠다는 것을 알 수 있습니다. 이벤트가 트리거 되는 위치를 디버깅하기 위해 처음에 `if` 문을 넣었습니다.

요소가 연결 해제될 때 이 작업을 할 필요가 *없다*는 점에 주목해 주세요. 그 경우에는 요소가 사라지므로 전송되는 이벤트가 중요하지 않기 때문입니다. 하지만, 모든 이벤트 리스너를 제거하는 로직을 `BaseCustomElement`에 넣을 수도 있었습니다.

휴! 해결해야 할 부분이 많았지만, 여기에는 다른 모든 요소에 나타나는 몇 가지 테마가 있습니다.

*  값의 존재와 부재를 명시적으로 처리하세요.
*  자체 속성을 설정할 때는 _매우_ 주의해야 하며 순환을 생성하지 않도록 합니다. 제 `render` 추상화 없이도, `attributeChangedCallback`이 `this.setAttribute`를 호출하는 코드를 트리거하면 `attributeChangedCallback`이 호출되도록 하는 일은 매우 쉽게 일어날 수 있습니다.
*  찾은 요소들을 처리할 때는 매우 자유로워야 합니다. 요소 자체를 렌더링 하지 않고 다른 요소들을 포함하도록 요구할 수는 없습니다. 할 수 있는 것이 없다면 그냥 아무것도 하지 마세요. 대신에 경고/디버그 할 수 있는 방법을 제공하세요.
*  다른 요소의 이벤트 수신에 유의하세요. DOM과의 연결이 끊어졌다고 해서 여전히 이벤트를 발행하지 않는다는 의미는 아닙니다.

또한 이 코드에서 아주 좋은 점을 하나 지적하고 싶습니다. 프로미스가 보이시나요? `async` 또는 `await` 키워드가 보이시나요? 저는 안 보이네요. 아주 좋은 점입니다.

다음으로 `PaletteComponent`를 살펴봅시다. 이 컴포넌트가 유일하게 DOM 조작을 많이 했고 컴포넌트 연결 방식이 까다로웠기 때문입니다.

### `<g-palette>`

전체 컴포넌트를 자세히 설명하지는 않겠지만, 대략적인 작동 방식은 다음과 같습니다.

*   속성
    *   `show-warnings` - 경고를 표시할까요(위 설명을 참고하세요)?
    *   `save-state` - 설정된 경우 쿼리 문자열에 상태를 저장합니다. 테스트에서 이 컴포넌트를 사용해야 하는 경우 이 옵션을 해제해야 합니다.
*   이벤트
    *   `palette-change` - 팔레트의 어떤 부분이든 어떤 이유로든 변경될 때 이벤트가 발생합니다.
*   프로퍼티
    *   `primaryColor` - 기본 색의 hex 코드, 이름, 사용자가 이름을 재정의했는지 여부를 나타내는 부울 플래그를 반환합니다.
    *   `otherColors` - `primaryColor`와 같은 객체 배열이지만, 색상이 기본색에 연결되어 있을 때는 hex 코드 대신 알고리즘 이름이 사용됩니다.
*   메서드
    *   `addScale({linkAlgorithm,hexCode})` - 팔레트에 새 스케일을 추가합니다. 여기서 살펴볼 메서드는 바로 이 메서드입니다.

`addScale`을 자세히 살펴보겠습니다. 이 메서드는 `<g-add-color-scale-button>`에 의해 호출되어 팔레트에 링크되거나 링크되지 않은 색상을 추가합니다. 이 메서드는 기본적으로 다음 작업을 수행해야 합니다.

1.  동일한 알고리즘으로 연결된 두 가지 색이 없는지 확인합니다(예: 보색은 최대 하나만 존재할 수 있습니다).
2.  기본 노드를 복제합니다.
3.  새 노드가 내부적으로 일관성이 있고 기본 노드의 어떤 것도 참조하지 않도록 ID를 변경합니다.
4.  요소가 추가된 후 동작을 트리거합니다.
5.  새 스케일의 이벤트에 리스너를 설정하여 언제 `palette-change` 이벤트를 발행할지 알 수 있도록 합니다.

첫 번째 단계인 기본 요소 복제까지 살펴봅시다.

```js
addScale({linkAlgorithm=null,hexCode=null}={}) {
  const primary = this.primaryColorScale
  if (!primary) {
    this.logger.warn("팔레트에 기본 색상 스케일이 없어, 새 스케일을 추가할 때 복제할 기준이 없습니다")
    return
  }

  if (linkAlgorithm && 
      this.querySelector(
        PaletteColorScaleComponent.tagName + 
        `[linked-to-primary='${linkAlgorithm}']`
      )
  ) {
    return
  }
  const newScale = primary.cloneNode(true)
```

Ghola에는 항상 기본 `<g-palette-color-scale>`이 있지만, 이 코드가 그 가정을 굳이 반영할 이유가 없으므로 찾을 수 없으면 조기에 종료합니다. 다음으로, 연결된 스케일을 생성하는 경우 해당 스케일이 이미 설정되어 있지 않은지 확인합니다. 그런 다음 기본 노드를 복제합니다.

기본 노드는 `<g-palette-color-scale>`이 될 것이고, 그 `태그 이름`을 물어보면 그 값이 표시됩니다. 하지만 결정적으로, `constructor.name`을 물어보면 `HTMLElement`가 표시되고, 정작 있어야 할 클래스인 `PaletteColorScaleComponent`가 표시되지 않는 경우도 있습니다.

이것은 제 머리로 이해하기 매우 이상했습니다. 이 시점에서 속성을 설정하면 `attributeChangedCallback`이 트리거 됩니다. CodePen으로 이 부분을 재현하는 데 어려움을 겪었는데, 아마 코드가 실행될 때 요소가 아직 정의되지 않은 상황인 것 같습니다.

하지만 다음 부분이 이상해집니다. `<g-palette-color-scale>`의 기능은 더 밝거나 어두운 견본을 연결하기 위해 기본 `<g-color-swatch>`에 대한 `ID`를 생성합니다. 새 노드에서 이 작업을 강제로 수행하려면 기존 `id`를 지워야 합니다. 또한 기본값이 `Primary`인 `default-link-context`도 지웁니다.

새 스케일이 링크 알고리즘을 사용하는 경우, 복제된 스케일의 색상 입력을 비활성화해야 합니다. 그렇게 하면 사용자가 편집할 수 없게 되지만, 나중에 스케일이 연결 해제되는 경우 편집을 활성화할 수 있습니다.

마지막으로 모든 새 견본에서 `derived-from` 요소를 제거합니다. 왜냐하면 `<g-palette-color-scale>`이 기본 색 견본에 대해 생성되는 `id`를 사용할 것이기 때문입니다.

```js
const newScale = primary.cloneNode(true)
newScale.removeAttribute("primary")
newScale.baseColorSwatch.removeAttribute("id")
newScale.baseColorSwatch.removeAttribute("default-link-context")
if (linkAlgorithm) {
  newScale.baseColorSwatch.
    querySelectorAll("input[type=color]").
    forEach( (input) => {

      input.setAttribute("disabled",true)

  })
}
newScale.swatches.forEach( (swatch) => {
  swatch.removeAttribute("derived-from") 
})

this.appendChild(newScale)
```

다음 코드에서는 링크 알고리즘이 있는 경우 기본 스케일과 새 스케일 사이의 링크를 설정합니다. 없는 경우 `hex-code`를 직접 설정하여 링크되지 않은 스케일을 생성합니다. hex 코드가 제공되지 않으면 임의의 값이 사용됩니다.

```js
if (linkAlgorithm) {
  newScale.baseColorSwatch.removeAttribute("hex-code")
  newScale.setAttribute("linked-to-primary",linkAlgorithm)
}
else {
  if (hexCode) {
    newScale.baseColorSwatch.setAttribute(
      "hex-code",
      hexCode
    )
  }
  else {
    newScale.baseColorSwatch.setAttribute(
      "hex-code",
      Color.random().hexCode()
    )
  }
}
```

이는 DOM에 추가한 *후*에 실행된다는 점에 유의하세요. 꼭 필요한 것인지 확실하지 않지만, `appendChild`를 호출하기 전에 이러한 속성을 설정하려고 하면 이상한 동작이 발생했습니다. 제 작업 때문인 것은 확실하지만 사용자 정의 요소에 대한 문서가 그다지 훌륭하지 않기 때문에 구체적으로 뭘 어떻게 해야 할지 알기는 어렵습니다.

계속 진행해서, 복제된 스케일 내부의 `<g-color-name>` 컴포넌트를 재설정해야 합니다. 복제 후에도 여전히 기본 스케일의 기본 색상 견본을 가리키고 있으므로 새 스케일의 기본 색상 견본을 가리키도록 해야 합니다.

```js
newScale.querySelectorAll(ColorNameComponent.tagName).
  forEach( (colorName) => {
    if (colorName.getAttribute("color-swatch") == 
        primary.baseColorSwatch.id
    ) {
      colorName.setAttribute(
        "color-swatch",
        newScale.baseColorSwatch.id
      )
      colorName.restoreDefaultColorName()
    }
  })
```

기본의 베이스 색상 견본을 참조하는 `<g-color-name>`만 변경하는 방어적인 접근에 주목하세요.

마지막으로 `palette-change` 이벤트를 발행하고 새로 생성된 스케일의 이벤트에 연결합니다.

```js
  this.dispatchEvent(new CustomEvent("palette-change",{ cancelable: false, bubbles: true }))
  this._addScaleEventListeners(newScale)
  return newScale
} // render()의 끝

_addScaleEventListeners(scale) {
  scale.addEventListener("base-color-changed", this.colorChangeEventListener)
  scale.addEventListener("unlink-from-primary", this.colorChangeEventListener)
  scale.addEventListener("remove-scale", this.colorChangeEventListener)
  scale.addEventListener("name-change", this.colorChangeEventListener)
  scale.addEventListener("name-cleared", this.colorChangeEventListener)
  scale.addEventListener("preview-scale", this.previewScaleEventListener)
}
```

이 과정을 통해 다른 요소를 참조하는 사용자 정의 요소를 동적으로 생성할 때 발생할 수 있는 복잡성을 지적했습니다. 한 요소가 다른 요소에 연결되도록 하는 것은 매우 강력하지만, 요소를 중복 생성하거나 복제할 때는 _모든_ 속성과 내부를 비워두거나 업데이트된 값으로 설정하는 데 세심한 주의를 기울여야 합니다.

또 다른 옵션은 `template`을 사용하고 거기에서 복제하는 것입니다. 이 작업은 모든 ID와 속성에 대한 매개변수를 허용하는 메서드로 래핑 할 수 있으므로 값을 재설정, 변경 또는 덮어쓸 염려가 없습니다. 이 작업을 하지 않기로 한 이유는 정적 `index.html` 파일의 기존 마크업을 복제*하거나* 첫 번째 색상을 동적으로 렌더링해야 하는데 그렇게 하고 싶지 않았기 때문입니다.

한 번 더 휴! 이 글의 길이는 길지만, 다시 돌아가서 코드를 살펴보면 실제로는 그렇게 복잡하지 않습니다. 브라우저의 API와 사용자 관점에서 Ghola가 작동하는 방식에 익숙해지면 따라가는 것이 어렵지 않습니다. 이상한 메타프로그래밍, 이상한 콜백, 비동기 시작 등 혼란스러운 부분은 많지 않습니다.

그렇긴 하지만 테스트할 방법이 필요했습니다.

## 테스트

코드를 작성하는 제 방식은 복사해서 붙여 넣기나 다른 끔찍한 방법을 사용하더라도 일단 작동하게 만든 다음 정리하는 것입니다. "어떻게 하면 이걸 작동시킬 수 있을까?"와 "이걸 사용하는 올바른 방법은 무엇일까?"를 분리해서 생각하죠. 그동안은 요소들이 제대로 작동하는지 확인하기 위해 데모 페이지를 만들어서 클릭하는 것만으로도 충분했지만 번거로웠습니다. 테스트가 필요했습니다.

저는 흔히 후보로 거론되는 Playwright, Cypress, Capybara를 살펴봤습니다. 이 도구들을 설정할 생각에 마음이 무거워졌습니다. 사용하기가 너무 고통스러웠거든요. 수년간 사용해 본 제 경험에 따르면, 개발 시간 중 적지 않은 부분이 수작업으로 확인할 수 있는 코드에서 테스트가 실패하는 이유를 파악하는 데 할애되었습니다.

이러한 도구의 가장 큰 문제는 테스트할 브라우저 API를 노출하지 않는다는 것입니다. 또한 복잡한 빌드 단계, 깨지기 쉬운 도구 체인, 선택자 및 단언 라이브러리가 뒤섞여 있으며, 모두 저에게는 이해가 되지 않는 일종의 난해한 영어로 작성되어 있습니다.

테스팅 프레임워크와 같은 유닛 테스팅 도구들이 있는데, 이는 거의 같은 불안정한 도구 더미와 깨진 추상화의 집합체이고, 제 코드가 실행될 브라우저에서 실행조차 않습니다.

여기에 해결책은 없지만, 저는 브라우저에서 실행되는 자체 테스트 프레임워크를 만들었습니다. 이는 [300줄의 코드](https://github.com/davetron5000/ghola/tree/main/src/js/brutaldom/testing)로 이루어져 있고, 거의 API가 없으며 매우 빠르게 실행됩니다. 문제가 없는 것은 아니지만, 작동 방식은 다음과 같습니다.

1.  테스트 케이스가 포함될 HTML 페이지를 만듭니다. 각 테스트 케이스는 `<g-test-case>`라는 사용자 정의 요소로 둘러싸여 있습니다. 여기에는 `ID`가 있어야 합니다.
2.  사용자 정의 요소는 테스트에 사용할 수 있는 모든 마크업을 포함하는 `<g-test-subject>`를 포함해야 합니다.
3.  `testCase` 함수를 가져오는 자바스크립트 파일을 만듭니다.
4.  `<g-test-case>`의 `id`와 함수를 사용하여 `testCase`를 호출합니다.
5.  함수는 테스트를 생성하는 데 사용할 수 있는 인수로 함수가 제공됩니다. 그중 하나가 `test`입니다.

다음은 `<g-preview-text-component>`에 대한 테스트입니다.

먼저 HTML입니다.

```html
<g-test-case id="preview-text-colors">
  <g-test-case-subject>
    <g-preview-text
      class="db"
      background-color="#000000"
      text-color="#ffffff">
        <h1>제 2장</h1>
        <h2>네모 선장의 새로운 제안</h2>
        <p class="p">
        2월 28일에…
        </p>
        <p class="p">
        네모 선장은…
        </p>
        <p class="p">
        "Ceylon 섬…
        </p>
        <p class="p">
        "물론이죠, 선장님."
        </p>
    </g-preview-text>
  </g-test-case-subject>
</g-test-case>
```

테스트 코드는 `testCase`를 가져오는 것으로 시작합니다.

```js
import {
  testCase,
} from "../brutaldom/testing"
```

제가 작성한 것의 기본 설계는 `testCase`에 함수를 전달하는 것입니다. 이 함수의 인수는 테스트 프레임워크에 의해 채워질 객체입니다. 테스트에 필요한 객체의 키(즉, 주입된 함수)를 나타내기 위해 명명된 매개변수를 사용합니다.

`testCase`에 전달한 함수가 호출되면 단일 객체 인수의 키로 다음 매개변수가 전달됩니다:

*   `setup` - 테스트 전 설정을 선언하는 데 사용합니다.
*   `teardown` - 테스트 후 정리를 선언할 때 사용합니다.
*   `confidenceCheck` - 테스트 사전 조건을 확인하려면 이 키를 사용합니다.
*   `test` - 테스트를 작성할 때 사용합니다.
*   `assert` - 예상되는 작업을 수행합니다.
*   `assertEqual` - 예상되는 작업을 수행합니다.
*   `assertNotEqual` - 예상되는 작업을 수행합니다.

여기 테스트 케이스에는 `confidenceCheck` 또는 `assertNotEqual`이 필요하지 않으므로 매개 변수로 나열되지 않습니다.

```js
testCase("preview-text-colors",
          ({setup,teardown,test,assert,assertEqual}) => {
```    

`setup`은 `testCase`와 동일한 스타일로 인자를 전달할 수 있는 함수입니다. 다음이 전달될 수 있습니다.

*   `subject` - `<g-test-subject>`의 `HTMLElement`(`subject.tagName`은 `G-TEST-SUBJECT`가 될 것입니다).
*   `require` - 인수를 반환하거나 인수가 null인 경우 오류를 발생시키는 함수입니다. 예상한 마크업을 찾지 못했을 때 오류를 발생시키는데 유용합니다.
*   `clone` - 인자에 대해 `require`를 호출한 다음 `cloneNode(true)`를 수행합니다. 이것이 왜 필요한지 잠시 후에 설명하겠습니다.

다음은 `setup`입니다.

```js
setup( ({subject,require,clone}) => {
  const $previewText = clone(subject.children[0],"child")
  document.body.appendChild($previewText)
  return ({$previewText})
})
```

대부분의 `setup` 호출은 다음과 같습니다. 테스트는 HTML 파일의 마크업에서 직접 작동할 수도 있지만, 복사본을 만들어 테스트하는 것이 편리할 때가 많으므로 깔끔하게 시작할 수 있습니다. 이 방법을 일반화할 수도 있겠지만 그렇게 하지 않았습니다. 대신 `setup`은 `clone`을 사용하여 대상이 되는 첫 번째 자식(이 경우 테스트할 `g-preview-text` 요소)을 복사합니다.

그런 다음 본문에 추가합니다. `setup` 함수의 반환값이 중요합니다. 반환되는 값은 무엇이든 `test`에 주어진 함수에 전달됩니다(`confidenceCheck` 및 `teardown`에도 전달됩니다). 다음은 `teardown`입니다:

```js
teardown( ({$previewText}) => {
  document.body.removeChild($previewText)
})
```

`setup`에 주어진 함수가 `{$previewText}`를 반환했기 때문에 `teardown`에 주어진 함수(문서에서 노드를 제거)에서 이 함수를 사용할 수 있습니다.

이제 테스트를 살펴봅시다.

이 경우 아무 작업도 수행하지 않습니다. 왜냐하면 테스트는 HTML에 설정된 속성이 그대로 있다고 가정하고 있으므로, 해당 속성이 스타일로 올바르게 반영되었는지를 확인하고 있습니다.

```js
test("속성이 스타일로 전달되는지 테스트",
  ({$previewText}) => {
    assertEqual("rgb(0, 0, 0)",$previewText.style.backgroundColor)
    assertEqual("rgb(255, 255, 255)",$previewText.style.color)
  }
)
```

`assertEqual`을 제외하고는 브라우저의 API를 사용하고 있습니다. 찾아야 할 선택자 프레임워크도 없고, 윤리적으로 순수한 방식으로 요소를 찾는 방법에 대한 강의도 없으며, 문서화되고 업데이트되기를 바라는 DSL도 없습니다. 단지 a) 이미 사용 중인 브라우저의 API와 b) 실제 환경에서 이러한 컴포넌트가 사용되는 방식이 있을 뿐입니다.

다음으로, 속성이 제거되면 컴포넌트가 적절한 기본값을 사용하는지 테스트합니다.

```js
test("속성을 제거하면 적절한 기본값이 설정됩니다.",
  ({$previewText}) => {
    $previewText.removeAttribute("background-color")
    $previewText.removeAttribute("text-color")
    assertEqual("transparent",$previewText.style.backgroundColor)
    assertEqual("currentcolor",$previewText.style.color)
  }
)
```

또한 브라우저 내부에서 브라우저의 API를 사용하기 때문에 모든 곳에 `async`를 넣을 필요가 없다는 점에 유의하세요. 인위적으로 만든 대기 promise이나 다른 말도 안 되는 promise가 없습니다.

테스트 작동 방식은 `test`가 함수를 전역 데이터 구조에 저장한 다음, 테스트 러너가 저장된 모든 함수를 실행하는 것입니다. `assert`와 친구들은 테스트 실패를 나타내는 특별한 오류를 발생시킵니다. 이 모든 것이 콘솔에서 집계되어 보고됩니다. 이것을 구축하면서 이미 콘솔에서 많은 시간을 보내고 있었기 때문에, 출력을 표시하기에 좋은 장소였습니다.

[컴포넌트 페이지](https://ghola.dev/components/index.html)로 이동하여 테스트를 직접 실행할 수 있습니다. "테스트 실행" 링크를 클릭하고 콘솔을 엽니다.

또 다른 좋은 점은 마크업이 바로 옆에 있다는 것입니다. 정확한 테스트 케이스와 상호 작용하여 작동하지 않는 이유를 확인할 수 있습니다(또는 `removeChild`를 주석 처리하여 테스트 마크업을 그대로 둘 수도 있습니다). 이것은 헤드리스 크롬이 스크린샷을 찍거나 동영상을 녹화하기를 바라는 것보다 _훨씬_ 더 좋은 방법입니다.

또한 문제가 발생했을 때 테스트의 HTML을 볼 수 있다는 의미이기도 합니다. 브라우저 기반 테스트 프레임워크 중 _어느 것도_ 기본적으로 이 기능을 제공하지 않는다는 사실(그리고 대부분 이 기능을 쉽게 제공하지 않는다는 사실)이 저를 당황스럽게 합니다. HTML은 이러한 테스트에 대한 입력이며 실패 시 보기가 너무 어렵습니다.

삶의 질을 개선하는 두 가지 기능을 추가했습니다.

*  `<g-test-case>`의 자식이 `<details>`인 경우, 실패 시 요소를 열지만 통과 시에는 닫힌 상태로 유지합니다. 이렇게 하면 어떤 테스트가 실패했는지 즉시 확인하고 테스트해 볼 수 있습니다.
*  또한 요소의 소스 코드를 볼 수 있는 사용자 정의 요소를 만들어 테스트 케이스 HTML에 사용했습니다. 테스트 케이스 요약 중 하나를 열면 테스트에 입력된 소스 코드를 볼 수 있습니다. 덕분에 개발 도구의 엘리먼트 탭으로 이동하는 횟수를 몇 번 줄일 수 있었습니다.

또한 매우 빠릅니다. 파일을 변경한 다음 페이지를 다시 로드하면 새 테스트가 실행되거나 업데이트된 테스트가 실행되는 것을 확인할 수 있었습니다. 나중에 개발 환경에 대해 이야기하겠지만 사이클이 매우 짧았습니다. 이 시스템을 사용하여 TDD를 통해 몇 가지 기능을 꽤 잘 구동할 수 있었습니다.

모든 것이 훌륭하지는 않았지만 더 다듬고 싶은 충동을 참았습니다. 몇 가지 아쉬운 점이 있습니다.

*   `cloneNode`는 요소를 연결하는 데 사용된 `ids`의 주의 깊은 재작성/변경이 필요합니다. 이는 쉽게 할 수 있는 것은 아닙니다.
*   웹 페이지에서 결과를 볼 수 있으면 좋을 것 같습니다.
*   테스트를 실행하는 유일한 방법은 웹 페이지로 이동하는 것인데, 이는 지속적인 배포에 적합하지 않습니다.
*   HTML 페이지와 자바스크립트가 밀접하게 연결되어 있지만 같은 위치에 있지 않아 잠재적으로 취약합니다.
*   새 테스트를 만들려면 많은 복사/붙여 넣기가 필요합니다.
*   상위 수준의 워크플로를 테스트하는 데는 적합하지 않을 수 있습니다. Ghola의 기본 UI는 테스트되지 않았습니다.

이 프로젝트는 오늘날 인기 있는 자바스크립트 브라우저 테스팅 프레임워크를 설정할 필요가 없어서 매우 행복했습니다. 매우 행복했지만, `brutaldom/testing`은 다듬어질 필요가 있습니다. 그럼에도 불구하고, 목표를 달성했고 제게 도움이 되었습니다.

더 많은 테스트 프레임워크가 강의나 DSL 또는 새는 추상화 없이 브라우저를 직접 사용할 수 있게 해 주었으면 좋겠습니다. `querySelectorAll`은 훌륭하게 작동하며, 솔직히 말해서 `expect(element).toHaveText("foo")`보다는 `assert(element.textContent.match(/foo/))`를 보고 싶습니다.

제가 만든 것이 결과를 웹페이지에 구조화된 마크업으로 출력하여 보조 프로세스가 분석할 수 있게 한다면 CD 워크플로에 적용될 수 있다고 생각합니다. 헤드리스 브라우저가 테스트 페이지를 시작하고, 테스트 완료를 나타내는 요소를 기다린 다음, 결과를 검사할 수 있습니다.

개발 환경은 어떨까요?

## 개발 환경

개발 환경은 안정적이고 신뢰할 수 있어야 했습니다. 이 앱은 Docker에 의존하는 것 외에는 종속성이 거의 없으며 지난 20~30년 동안 카보나이트(영화 스타워즈에서 등장한 보존을 위한 물질로 한 솔로가 냉동된 적이 있음. 역자 주)에 담겨 있던 핵심 UNIX 도구와 동작을 활용합니다. 신뢰할 수 있습니다.

Docker는 생각만큼 반복성이 뛰어나지는 않지만 나중에 Docker 기반 개발 환경으로 돌아가는 것이 훨씬 쉽습니다. 저는 지난 몇 년 동안 사용해 온 모든 개발 환경의 기반이 되는 [DevBox](https://github.com/davetron5000/devbox)라는 리포지토리를 가지고 있습니다. 이것은 자신을 여러분의 프로젝트에 복사하므로, `dx`를 보면 모든 것을 관리하는 데 사용되는 스크립트를 볼 수 있습니다.

*   `dx/build`는 개발이 진행될 도커 이미지를 빌드합니다.
*   `dx/start`는 개발 환경을 시작합니다.
*   `dx/exec`은 개발 환경 내에서 명령을 실행합니다. 물론 `dx/exec bash`를 사용하여 "로그인"할 수도 있지만, 이 방법으로도 모든 명령을 실행할 수 있습니다.

개발 워크플로우는 `Makefile`과 `bin`의 스크립트로 관리합니다.

## 개발 워크플로

[`package.json`](https://github.com/davetron5000/ghola/blob/main/package.json)을 살펴보면, 매우 미니멀합니다. 앱 자체에는 두 개의 종속성만 있습니다.

*   hex를 HSL 등으로 변환하는 데 사용하는 작은 라이브러리인 `colorConvert`.
*   [`melange-css`](https://melangecss.com), 제가 만든 유틸리티 우선 CSS 프레임워크로 Tachyons처럼 작동하며 Tailwind와 달리 번거로운 빌드 단계가 없습니다.

끝입니다! 내장 API 사용의 장점입니다. 이러한 종속성은 안정적이며 최악의 경우 앱에 인라인 할 수 있습니다(모듈이 유지 관리되지 않는 것처럼 보였기 때문에 `html-prettify`라는 라이브러리를 사용하여 필요한 기능을 인라인 했습니다).

개발 종속성도 최소화했습니다.

*   로컬에서 앱을 실행하려면 `http-server`가 필요합니다.
*   CSS와 자바스크립트를 패키징 하는 `esbuild`. 임포트맵이 중요하다는 것은 알지만, 코드를 가져오기 위해 네트워크 호출을 많이 하는 앱에서 어떻게 작동하는지 잘 이해가 되지 않습니다. `esbuild`는 설정이 필요 없고, 빠르게 실행되며, 안정적으로 보입니다.
*   HTML을 생성하려면 `ejs`를 사용합니다. 네, 바로 좋은 EJS입니다. 예제는 [`src/html/templates/head.html`](https://github.com/davetron5000/ghola/blob/main/src/html/templates/head.html)을 확인하세요. 이 파일은 다른 파일의 맨 위에 `<%- include` 되어 이런 것들을 공유합니다. 아주 기본적이죠. 복잡한 마크업을 다시 사용해야 할 때마다 이렇게 하면 됩니다. 앱의 빌드 단계에서는 `npx ejs`를 사용하여 완전한 형식의 HTML 파일을 생성합니다.
*   파일이 변경될 때 빌드 단계를 자동으로 실행하기 위해 `chokidar-cli`가 사용됩니다.

이 개발 환경의 목표는 명령을 실행하여 변경된 파일을 감지한 다음 필요한 부분을 다시 빌드할 수 있도록 하는 것이었습니다. 그런 다음 작업을 저장하고 브라우저를 다시 로드할 수 있었습니다.

많은 자바스크립트 툴체인은 이 기능을 지원하지 못합니다. 모든 것을 다시 빌드하기만 합니다. 그렇게 할 만큼 빠르길 바랍니다. 저는 수십 년 전에 이 작업을 위해 만들어진 도구를 사용하기로 결정했습니다. 바로 `make`입니다.

### 오, `make`

`make`를 사용해 본 적이 없다면, `make`는 소스 파일과 대상 파일 간의 의존성을 지정할 수 있게 해 주고, 소스로부터 목적 파일을 만드는 명령을 제공하는 도구입니다. 다음은 두 가지 예제입니다.

먼저, `esbuild`를 사용하여 자바스크립트를 빌드하는 방법이 있습니다. 파일 앞부분의 `JS_DEST_FILE`은 `site/dev/js/main.js`로 정의되고 `JS_SRC_FILES`는 `src/js`에 있는 모든 `*.js` 파일로 정의됩니다. `JS_SRC_FILE`(복수형 없음)은 `src/js/index.js`이며, 이는 `esbuild`에 전달하는 파일입니다(`esbuild`가 어떤 특정 파일이 변경되었는지 알 필요가 없으므로 이 파일에서 `import`를 사용하여 다른 파일을 가져옵니다). 개발 빌드에서는 `MINIFY_JS_FLAG`가 비어 있지만 프로덕션 빌드에서는 `--minify --keep-names`로 정의됩니다.

```sh
$(JS_DEST_FILE) : $(JS_SRC_FILES)
  npx esbuild $(MINIFY_JS_FLAG) --sourcemap \
                    --bundle $(JS_SRC_FILE) \
                    --outfile=$@
```

`make`는 확실히 특이한 점이 있습니다. `npx` 앞의 공간은 탭이어야 합니다. `$@`는 콜론의 왼쪽에 있는 것을 나타냅니다. 하지만 다른 시스템과 마찬가지로 충분히 쉽게 배울 수 있습니다(또는 더 현실적으로 말하면 방대한 문서를 빠르게 탐색하는 방법을 배울 수 있습니다).

이 코드가 하는 일은 `make site/dev/js/main.js`를 실행하는 것입니다. `JS_SRC_FILES`에 있는 파일 중 `site/dev/js/main.js`보다 최신 파일이 있으면 `npx esbuild` 명령이 실행됩니다. 그러나 `site/dev/js/main.js`가 실제로 더 최신 파일이면 아무것도 실행되지 않습니다. 즉, 필요한 경우에만 무언가를 할 수 있고, 루프에서 실행됩니다.

다음은 HTML에 대한 또 다른 예시입니다. 이 예제에서 `HTML_DEST_DIR`은 `site/dev/`, `HTML_SRC_DIR`은 `src/html`, `EJS_DATA_FILE`은 `ejs_data_file.dev.json`입니다.

```sh
$(HTML_DEST_DIR)/%.html: $(HTML_SRC_DIR)/%.html
  @mkdir -p `dirname $@`
  npx ejs --data-file $(EJS_DATA_FILE) \
        --output-file $@ $<
```

네, 더 이상한 기호가 있습니다. `mkdir` 앞의 `@`는 `make`가 실행될 때 명령을 출력하지 못하도록 합니다. `$<`는 콜론 오른쪽에 있는 파일을 나타냅니다. 이렇게 간접적으로 지시하는 이유는 이 규칙(콜론이 들어 있는 첫 번째 줄)이 그 자체로 템플릿 규칙이기 때문입니다.

즉, `site/dev`에 파일을 빌드하고 싶은데 `src/html`에 같은 이름의 최신 파일이 있는 경우 이 명령을 실행하라는 것입니다. 기본적으로 이것은 EJS를 사용하여 소스 파일에서 대상 파일을 빌드하기 위한 스크립트입니다.

이를 한데 모으기 위해 다음과 같이 할 수 있습니다.

```sh
default: $(JS_DEST_FILE) $(HTML_DEST_FILES)
  @echo Done with $(ENV)
```

`make default`를 실행하면 `make`는 `src/html` 폴더에 있는 파일 중 이름이 `site/dev/main.js`인 `JS_DEST_FILE`과 `HTML_DEST_FILES`에 대한 규칙을 실행합니다(`site/dev` 폴더에 있도록 이름이 변경된 것을 제외한 모든 파일입니다). 그러면 `make`는 오래된 파일_만_ 빌드합니다.

즉, 제 빌드 단계는 기본적으로 `make default`(또는 `default`가 파일의 최종 규칙이므로 간단히 `make`)이며, `make`는 변경된 파일만 빌드할 것입니다. 즉, 증분 빌드를 수행할 것입니다.

개발용과 프로덕션용에서 모두 작동해야 하므로 몇 가지 세부 사항을 [`bin/build`](https://github.com/davetron5000/ghola/blob/main/bin/build)에 래핑 했습니다. 따라서 `dx/exec bin/build`를 실행하여 개발용으로 필요한 것을 빌드하거나, `dx/exec bin/build production`을 실행하여 프로덕션용으로 빌드할 수 있습니다.

### 개발 워크플로우의 결과물 그리기

`Makefile`은 개발 워크플로우의 핵심 로직이지만, 웹 서버를 실행하고 파일이 변경되면 모든 것을 자동으로 다시 빌드하는 것이 이상적입니다. [`bin/run`](https://github.com/davetron5000/ghola/blob/main/bin/run)은 웹 서버 실행을 처리하며, 개발용 또는 프로덕션용으로 실행할 수 있습니다(이는 GitHub 페이지에서 호스팅 되므로 `docs/`가 없습니다).

[`bin/dev`](https://github.com/davetron5000/ghola/blob/main/bin/dev)는 `bin/run`과 `bin/build`를 모두 가져옵니다. 이 명령은 `src`의 파일이 변경된 경우 Chokidar를 사용하여 `bin/build`를 실행합니다.

```sh
SHELL=/bin/bash npx chokidar -p "src/**/*" -c "bin/build"
```

이 명령은 백그라운드에서 실행된 다음 `bin/run`도 백그라운드에서 실행하고, `wait`을 호출하여 두 명령이 실행되는 동안 대기합니다. control-C `bin/dev`를 누르면 `trap killgroup SIGINT`가 `killgroup` 함수를 호출하고 `bin/run`과 Chokidar를 모두 죽입니다.

즉, `dx/exec bin/dev`를 할 수 있고 파일을 저장할 때 앱이 다시 빌드됩니다.

`Makefile`과 스크립트를 보세요. 거기에는 실제로 그다지 많은 것이 없습니다. 대부분 수십 년 동안 존재해 온 기본 UNIX 도구를 사용하고 있습니다. EJS, `esbuild`, Chokidar는 오래전부터 사용되어 왔고 안정적입니다. 한 번 설정하면 잊어버릴 수 있는 설정입니다.

따라서 개발 환경에서 이 앱을 실행하기 위한 단계는 다음과 같습니다.

1.  Docker 설치
2.  `dx/build`
3.  `dx/start`
4.  `dx/exec bin/setup`
5.  `dx/exec bin/dev`

[`tleilax`](https://github.com/davetron5000/tleilax)를 템플릿 저장소로 사용하여 직접 시도해 볼 수 있습니다.

웹 컴포넌트로 Ghola를 빌드하는 것은 이번이 두 번째라는 점도 말씀드리고 싶습니다. 첫 번째 시도는 잘 되지 않았습니다.

## 제 첫 시도

이전에 사용자 정의 요소로 Ghola를 시도한 적이 있습니다. 제 접근 방식은 스스로 렌더링 되는 React 스타일의 컴포넌트를 구축하는 것이었습니다. 각 컴포넌트에는 실행할 `<template>`과 풍부한 프로그래밍 인터페이스가 있었습니다. 복잡했습니다. 다음은 [색상 견본](https://github.com/davetron5000/ghola/blob/take-1/src/js/components/EditableColorSwatchComponent.js) 컴포넌트입니다. 여러 모듈을 혼합하여 결국 공통된 기능을 재사용하는 것을 볼 수 있습니다.

[HasAttributes](https://github.com/davetron5000/ghola/blob/take-1/src/js/brutaldom/HasAttributes.js)는 클래스에서 특별한 객체를 정의한 다음 `observedAttributes`를 선언하고 `attributeChangedCallback`을 재정의하여 객체의 값을 설정해야 합니다. 이를 혼합하면 세터를 재정의하여 속성 할당을 가로챌 수 있습니다(예: `set hexCode(hexCode)`). 믹스인은 문자열을 타입으로 감싸는 것도 지원합니다.

[HasEvents](https://github.com/davetron5000/ghola/blob/take-1/src/js/brutaldom/HasEvents.js)는 `addEventListener`보다 더 풍부한 API를 제공하기 위한 저의 시도였습니다. 브라우저 API로 문자열 기반 작업을 하는 것은 성가신 일이지만, 제가 한 일이 이를 해결하는 가장 좋은 방법인지는 잘 모르겠습니다. 이 특정 믹스인 중 상당수가 [`MethodMeasurement`](https://github.com/davetron5000/ghola/blob/take-1/src/js/brutaldom/MethodMeasurement.js)를 사용한다는 것을 알 수 있습니다.

저는 Ghola v1이 왜 그렇게 느린지 알아내기 위해 `MethodMeasurement`를 만들었습니다. [이 버전을 사용할 수 있습니다.](https://ghola.dev/take-1/) 특히 견본을 더 추가하면 속도가 느려지는 것을 알 수 있습니다. 사파리를 사용하는 경우 색상환에서 색상 입력을 변경하면 색상 입력이 실시간으로 `change` 이벤트를 보냅니다. 이 원래 버전의 Ghola에서는 브라우저가 잠시 멈췄다가 따라잡습니다. 수정된 버전은 그렇지 않습니다.

이 느린 속도를 보면서 Performance API를 파헤쳐서 무슨 일이 일어나고 있는지 알아낼 수 있는 좋은 기회라고 생각했습니다. 많은 인사이트를 얻었지만 왜 그렇게 느린지는 알 수 없었습니다. 이벤트 리스너의 복잡한 구조로 인해 추적하기가 어려웠고, 제가 추가한 추상화는 이를 더욱 어렵게 만들었습니다. 그래서 이번 개정판에서는 `addEventListener` 상에 API를 만들지 않기로 했습니다.

마지막으로 요소를 숨기고 표시하기 위한 프로그래밍 인터페이스를 제공하기 위해 제가 만든 것을 보실 수 있습니다. [`Hideable`](https://github.com/davetron5000/ghola/blob/take-1/src/js/components/Hideable.js)은 괴물입니다. 이를 위해 CSS를 사용하는 대신 요소가 콤팩트 체크박스의 `change` 이벤트를 수신한 다음 `element.show()` 또는 `element.hide()`를 호출하도록 했습니다.

문제는 `_displayValueWhenShown` 메서드에서 볼 수 있듯이 요소가 기본적으로 숨겨져 있는 경우 디자인에서 작동하려면 자바스크립트 코드가 `display`에 어떤 값을 부여해야 하는지 알아야 한다는 것입니다. `Hideable`을 사용하려면 요소에 해당 값을 갖도록 `data-brutaldom-display`를 선언해야 합니다. 이런.

이 버전의 Ghola는 작동하고, 개정판과 마찬가지로 음영을 생성하고 색상을 연결합니다. 제가 다시 시작한 이유는 성능 때문이었습니다. 앱이 작동하더라도 속도가 빨라야 한다고 생각했습니다. 프로토타입을 만들 때는 속도가 빨랐기 때문에 제가 한 것 중 무엇인가가 속도를 느리게 만들고 있었습니다. 하지만 무엇인지 알아내지 못했습니다.

그래서 더 단순한 디자인이 더 이해하기 쉽기를 바라며 처음부터 다시 시작했습니다. 개정된 Ghola는 구형 컴퓨터나 저렴한 컴퓨터에서는 느릴지 모르지만 원래보다 훨씬 빠릅니다. 그래서 성능에 대해서는 자세히 알아보지 않았습니다. 만약 해야 한다면 간단하길 바랄 뿐입니다.

이는 React나 Angular와 같은 프레임워크 사용에 대한 인사이트입니다. 이러한 프레임워크는 브라우저 위에 복잡한 추상화를 만들기 때문에 프런트엔드가 왜 그렇게 느린지 이해해야 할 때 정말 어려워집니다. 자바스크립트의 특성상 소스 맵, 콜백, 런타임에 대한  내성 부족으로 인해 일반적으로 어려운 문제입니다. 개발 도구의 성능 기능은 좋아 보이지만 사용하기가 매우 어렵고 유용한 문서도 부족합니다. 여기에 복잡한 종속성까지 더해지면 대부분의 SPA가 엄청나게 느려지는 것은 당연한 일입니다.

## 전망

사용자 정의 요소 API는 일반 브라우저 API보다 업그레이드된 느낌입니다. 직접 개발하지 않고 생명 주기 훅을 사용할 수 있다는 점이 좋았습니다. 동적 콘텐츠를 추가해야 할 때 부트스트랩할 필요가 없어서 정말 좋았습니다: 제 요소를 추가하기만 하면 바로 작동했습니다.

마치 브라우저의 일부인 것처럼 동작하는 나만의 요소를 만든다는 관점에서 생각한 것이 요소를 디자인하는 데 유용한 관점이었습니다. 덕분에 요소의 퍼블릭 동작과 API를 단순하게 유지하거나 최소한 충분히 단순하게 만들 수 있었습니다.

앱을 작업하는 동안 필요한 모든 것을 브라우저의 API를 참조할 수 있어서 좋았습니다. 스택 오버플로에 여러 번 직면한 적이 없다는 말은 아니지만, 사용 중인 일부 버전의 문제를 추적하거나 몇 년 전에는 올바른 접근 방식이었지만 지금은 잘못된 접근 방식을 사용하고 있는 것은 아닌지 걱정할 필요가 한 번도 없었습니다.

물론 Ghola는 작고 단순한 앱입니다. 더 크고 복잡한 환경에서는 어떻게 작동할지 누가 알겠습니까. 저는 Angular와 React 모두 크고 복잡한 환경에서 사용하기에 좋지 않다는 것을 알고 있습니다. 적어도 제가 사용하거나 작업한 앱에 따르면 상당히 고통스럽고 불쾌한 사용자 경험을 만들어 냅니다.

핫와이어와 같은 접근 방식에 대해서는 말할 수 없지만, 핫와이어의 작성자가 특별히 빠르거나 성능이 좋다고 말할 수 없는 매우 동적인 자바스크립트 앱을 만든다는 것 외에는 말할 수 없습니다. 전혀 나쁘지 않습니다. 괜찮습니다. 어쩌면 그래야만 할지도 모르죠. 아니면 브라우저에서 제공하는 API를 더 잘 활용할 수 있는 미래가 올 수도 있습니다.

### 이런 건 어떠세요?

*   [📬 제 주간 뉴스레터 ☞](https://naildrivin5.com/mailing_list/index.html) 기술에 대한 짧고 빠르게 읽히는 글
*   [웹 컴포넌트가 우리를 사로잡는 이유는 무엇인가요?](https://naildrivin5.com/blog/2023/11/17/what-is-lightdom-webcomponents-buying-us.html) 2023년 11월 17일
*   [웹 컴포넌트 사용자 정의 요소 수명주기가 유용한 이유](https://naildrivin5.com/blog/2023/11/19/web-components-custom-elements-lifecycle-is-what-makes-them-useful.html) 2023년 11월 19일
*   [웹 컴포넌트: 템플릿, 슬롯 및 섀도 DOM은 좋지 않습니다](https://naildrivin5.com/blog/2023/11/20/web-components-templates-slots-and-shadowdom-aren-t-great.html) 2023년 11월 20일
