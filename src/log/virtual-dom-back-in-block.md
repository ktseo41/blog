# 가상 DOM: 블록으로 돌아가기

> 원문: https://million.dev/blog/virtual-dom

---

<Callout type="info">

**이 글은 심층적인 분석글입니다 — 초보자를 위한 글이 아닙니다.** Million.js를 배우고 싶으시다면 [빠른 시작](https://million.dev/docs/quickstart)을 참조하세요.

이 포스팅은 React와 Million.js 내부를 자세히 살펴보고자 하는 숙련된 프로그래머를 대상으로 합니다.

</Callout>

약 4년 전, 리치 해리스(Rich Harris)는 기존 가상 DOM 조작의 성능을 분석한 [가상 DOM은 순수한 오버헤드입니다](https://svelte.dev/blog/virtual-dom-is-pure-overhead)라는 글을 발표했습니다. <a href="#0"><sup>[0]</sup></a>

> <sup id="#0">[0]</sup> "'가상 DOM은 빠르다'는 문구를 들어 보셨을 겁니다. 이는 보통 가상 DOM이 실제 DOM보다 빠르다는 뜻으로 사용됩니다. 그리고 놀랍도록 지속적으로 언급되는 밈(meme)입니다" - 해리스, 2018

리치 해리스는 "가상 DOM은 순수한 오버헤드입니다"라는 글에서 리액트와 같은 프레임워크에서 널리 칭찬받는 기능인 가상 DOM이 많은 개발자가 생각하는 것만큼 효율적이지 않다고 주장합니다. 그는 이어서 이 기능의 작동 방식을 비판하며 대안적인 접근 방식을 제시합니다.

하지만 몇 년 후 가상 DOM은 **순수한 오버헤드**라는 새로운 밈이 등장했습니다. 이 밈 또한 매우 강력해서 "가상 DOM이 없는" 프레임워크 운동을 이데올로기적 소수 집단에서 전면적인 다수 진영으로 전환했습니다.

따라서 가상 DOM은 "아무도 좋아하지 않지만, 가족 모임에 초대해야 하는 성가신 사촌"의 지위로 강등되었습니다. 선언적 UI의 편의성을 위해 지불해야 하는 성능 세금, 즉 필요악이 된 것입니다.

지금까지는요.

## 탄생 이야기

가상 DOM은 실제 DOM의 잦은 조작으로 인한 성능 문제를 해결하기 위해 만들어졌습니다. 실제 DOM의 경량 인메모리 표현으로, 나중에 실제 웹 페이지를 업데이트할 때 참조로 사용할 수 있습니다.

컴포넌트가 렌더링 되면 가상 DOM은 새 상태와 이전 상태의 차이를 계산하고("비교(diffing)"라고 하는 프로세스) 업데이트된 가상 DOM과 동기화하기 위해 실제 DOM에 최소한의 변경을 수행합니다("재조정(reconciliation)"이라고 하는 프로세스).

### 시각적 예시

리액트 컴포넌트 `<Numbers />`가 있다고 가정해 봅시다.

```jsx
function Numbers() {
  return (
    <foo>
      <bar>
        <baz />
      </bar>
      <boo />
    </foo>
  );
}
```

리액트가 이 컴포넌트를 렌더링할 때, 비교(차이를 확인하는) 과정과 재조정(DOM을 업데이트하는) 과정을 거칩니다. 이 과정은 대략 다음과 같습니다

<figure>
  <img src="/images/vdom1.svg" width="100%" />
  <figcaption> 현재의 가상 DOM과 새로운 가상 DOM 두 가지가 주어집니다. 현재 가상 DOM은 우리의 UI가 어떻게 보이는지를 나타내고, 새로운 가상 DOM은 우리가 원하는 모습을 나타냅니다. </figcaption>
</figure>
<figure>
  <img src="/images/vdom2.svg" width="100%" />
  <figcaption>첫 번째 노드의 차이를 확인하고 차이점이 없으므로 다음으로 넘어갑니다. </figcaption>
</figure>

<figure>
  <img src="/images/vdom3.svg" width="100%" />
  <figcaption>두 번째 노드의 차이를 확인하고 차이점을 발견합니다. DOM에서 업데이트를 수행합니다. </figcaption>
</figure>

<figure>
  <img src="/images/vdom4.svg" width="100%" />
  <figcaption>세 번째 노드의 차이를 확인하고 새로운 가상 DOM에서는 없어진 것을 발견하였으므로, DOM에서 이를 제거합니다. </figcaption>
</figure>

<figure>
  <img src="/images/vdom5.svg" width="100%" />
  <figcaption>네 번째 노드의 차이를 확인하고 새로운 가상 DOM에서는 없어진 것을 발견하였으므로, DOM에서 이를 제거합니다. </figcaption>
</figure>

<figure>
  <img src="/images/vdom6.svg" width="100%" />
  <figcaption>다섯 번째 노드의 차이를 확인하고 차이점을 발견합니다. DOM에서 업데이트를 수행하고 작업을 마칩니다. </figcaption>
</figure>

### 문제점

이전 예제에서 비교 과정이 트리의 크기에 의존하므로 결국 가상 DOM의 병목 현상을 발생시키는 것을 알 수 있습니다. 노드가 많을수록 차이를 계산하는데 더 많은 시간이 걸립니다.

스벨트와 같은 새로운 프레임워크에서는 성능 오버헤드 때문에 가상 DOM을 전혀 사용하지 않습니다. 대신, 스벨트는 "더티 체킹"이라는 기법을 사용하여 무엇이 변했는지 파악합니다. 미세한 반응성 프레임워크인 SolidJS는 한 단계 더 나아가, 정확하게 무엇이 변했는지를 찾아내어 DOM의 그 부분만 업데이트합니다.

## 블록 가상 DOM

2022년, [Blockdom](https://github.com/ged-odoo/blockdom)이 출시되었습니다. 근본적으로 다른 접근법을 취하는 Blockdom은 "블록 가상 DOM"이라는 개념을 도입했습니다.

블록 가상 DOM은 비교에 대해 다른 접근법을 취하며, 이는 크게 두 부분으로 나눌 수 있습니다.

1. **정적 분석**: 가상 DOM을 분석해 트리의 동적 부분을 "Edit Map"으로 추출하거나, 가상 DOM의 동적 부분을 "edits"(매핑) 목록으로 추출합니다.

2. **더티 체킹**: 상태(가상 DOM 트리가 **아님**)의 차이를 계산해 변경을 확인합니다. 상태가 변경된 경우 Edit Map을 통해 DOM을 직접 업데이트합니다.

<Callout type="info">

**요약: DOM이 아닌 데이터의 차이를 계산합니다.**

왜 그럴까요? 데이터의 크기는 일반적으로 DOM의 크기보다 훨씬 작습니다. 또한 전체 DOM 노드의 차이를 계산하는 것보다 데이터값의 차이를 계산하는 것이 훨씬 간단할 수 있습니다.

</Callout>

Million.js는 Blockdom과 비슷한 접근 방식을 취하므로 이 글의 나머지 부분에서는 Million.js 문법을 사용하겠습니다.

### 카운터 예제

간단한 카운터 예시와 Million.js로 어떻게 처리하는지 살펴보겠습니다.

```jsx {7-8,13-14}
import { useState } from "react";
import { block } from "million/react";

function Count() {
  const [count, setCount] = useState(0);

  const node1 = count + 1;
  const node2 = count + 2;

  return (
    <div>
      <ul>
        <li>{node1}</li>
        <li>{node2}</li>
      </ul>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment Count
      </button>
    </div>
  );
}
const CountBlock = block(Count);
```

<iframe src="https://codesandbox.io/embed/vigilant-snowflake-nf5v8h?fontsize=14&hidenavigation=1&theme=dark&view=preview"
  style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;"
  title="vigilant-snowflake-nf5v8h"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

### 정적 분석

정적 분석 단계는 Million.js의 실험용 컴파일러를 사용하는지 여부에 따라 컴파일 시 또는 런타임의 첫 시점에 발생할 수 있습니다.

이 단계는 가상 DOM의 동적 부분을 Edit Map으로 추출하는 역할을 담당합니다.

<figure>
<img src="/images/static-analysis1.svg" width="100%" />
<figcaption> 리액트로 JSX를 렌더링 하는 대신 Million.js를 사용하여 렌더링 합니다. 이 과정에서 가상 DOM에 "구멍"("?"으로 표현)을 전달합니다. 이 구멍은 동적 콘텐츠의 플레이스홀더 역할을 하며 정적 분석 과정에서 사용됩니다. </figcaption>
</figure>

<figure>
<img src="/images/static-analysis2.svg" width="100%" />
<figcaption> 이제 정적 분석을 시작합니다. 첫 번째 노드에서 플레이스홀더를 확인하지만 아무것도 찾지 못했습니다. 다음으로 이동합니다. </figcaption>
</figure>

<figure>
<img src="/images/static-analysis3.svg" width="100%" />
<figcaption>두 번째 노드에서 플레이스홀더를 확인하지만 아무것도 찾지 못했습니다. 다음으로 이동합니다. </figcaption>
</figure>

<figure>
<img src="/images/static-analysis4.svg" width="100%" />
<figcaption>세 번째 노드에서 플레이스홀더를 확인하여 "?"를 찾습니다. 플레이스홀더를 "Edit Mapping"으로 푸시해 <code>prop1</code>을 플레이스홀더 노드에 연결합니다. 그런 다음 블록에서 플레이스홀더를 제거합니다.</figcaption>
</figure>

<figure>
<img src="/images/static-analysis5.svg" width="100%" />
<figcaption>네 번째 노드에서 플레이스홀더를 확인하고 "?"를 찾습니다. 플레이스홀더를 "Edit Mapping"으로 푸시하여 <code>prop2</code>를 플레이스홀더 노드에 연결합니다. 그런 다음 블록에서 플레이스홀더를 제거합니다.</figcaption>
</figure>

<figure>
<img src="/images/static-analysis6.svg" width="100%" />
<figcaption>다섯 번째 노드에서 플레이스홀더를 확인하지만 아무것도 찾지 못했습니다. 이제 끝났습니다.</figcaption>
</figure>

### 더티 체킹

Edit Map이 생성되면 더티 체킹 단계를 시작할 수 있습니다. 이 단계에서는 상태의 변경 사항을 확인하고 그에 따라 DOM을 업데이트합니다.

<figure>
<img src="/images/dirty-checking1.svg" width="100%" />
<figcaption>모든 DOM 요소별로 차이점을 파악하는 대신 <code>prop1</code>과 <code>prop2</code>의 차이점만 파악할 수 있습니다. 둘 다 정적 분석 중에 생성한 "Edit Mapping"을 통해 각 노드에 연결되어 있으므로 차이점을 확인하면 DOM을 직접 업데이트할 수 있습니다.</figcaption>
</figure>

<figure>
<img src="/images/dirty-checking2.svg" width="100%" />
<figcaption>현재 <code>prop1</code>값과 새 <code>prop1</code>값이 다르기 때문에 DOM을 업데이트합니다.</figcaption>
</figure>

<figure>
<img src="/images/dirty-checking3.svg" width="100%" />
<figcaption>현재 <code>prop2</code>값과 새 <code>prop2</code>값이 다르기 때문에 DOM을 업데이트합니다.</figcaption>
</figure>

더티 체크 예제를 통해 이전의 비교 방식보다 훨씬 적은 계산이 필요하다는 것을 알 수 있습니다. 이는 더티 체크 단계가 가상 DOM이 아닌 상태에만 관심을 갖기 때문입니다. 각 가상 노드는 변경 여부를 파악하기 위해 많은 수준의 재귀가 필요할 수 있지만, 상태는 얕은 비교만 수행하면 됩니다.

## 이 기법은 효과적인가요?

**네, 하지만 만병통치약은 아닙니다.** [(최신 벤치마크 보기)](https://krausest.github.io/js-framework-benchmark/2023/table_chrome_112.0.5615.49.html)

<img src="/images/benchmark.png" width="100%" />

Million.js는 꽤 높은 성능을 자랑하며 자바스크립트 프레임워크 벤치마크에서 리액트를 능가합니다. 하지만 이 경우 Million.js가 어떻게 빠를 수 있는지 이해하는 것이 중요합니다.

자바스크립트 프레임워크 벤치마크는 행과 열로 구성된 큰 테이블을 렌더링하여 프레임워크의 성능을 테스트하는 벤치마크입니다. 이 벤치마크는 1,000개의 행을 추가/교체하는 등 매우 비현실적인 성능 테스트를 위해 설계되었으며, 실제 애플리케이션을 반드시 대표하지는 않습니다.

그렇다면 Million.js 또는 블록 가상 DOM은 어디에 사용할 수 있을까요?

## 정적 콘텐츠가 많고 동적 콘텐츠가 적은 경우

블록 가상 DOM은 동적 콘텐츠가 적고 정적 콘텐츠가 많은 경우에 가장 적합합니다. 블록 가상 DOM의 가장 큰 장점은 가상 DOM의 정적 부분을 고려할 필요가 없기 때문에 많은 정적 콘텐츠를 건너뛸 수 있다면 매우 빠를 수 있다는 것입니다.

예를 들어, 이 경우 블록 가상 DOM은 일반 가상 DOM보다 훨씬 빠릅니다.

```jsx {3}
// ✅ Good
<div>
  <div>{dynamic}</div>
  수많은 정적 콘텐츠...
</div>
```

동적 콘텐츠가 많은 경우 블록 가상 DOM과 일반 가상 DOM 사이에 큰 차이가 없을 수 있습니다.

```jsx {3-7}
// ❌ Bad
<div>
  <div>{dynamic}</div>
  <div>{dynamic}</div>
  <div>{dynamic}</div>
  <div>{dynamic}</div>
  <div>{dynamic}</div>
</div>
```

관리 대시보드나 정적 콘텐츠가 많은 컴포넌트로 구성된 웹사이트를 구축하는 경우 블록 가상 DOM이 적합할 수 있습니다. 그러나 데이터 차이를 확인하는데 소요되는 계산이 가상 DOM 차이를 확인하는 계산보다 훨씬 큰 웹사이트를 구축하는 경우에는 큰 차이를 느끼지 못할 수도 있습니다.

예를 들어, 이 컴포넌트는 가상 DOM 노드 수보다 차이점을 비교해야 하는 데이터 값이 더 많으므로 블록 가상 DOM에 적합하지 않은 후보가 될 수 있습니다.

```jsx
// 5개의 데이터 값 차이
function Component({ a, b, c, d, e }) {
  // 1개의 가상 DOM 차이
  return <div>{a + b + c + d + e}</div>;
}
```

### "안정된" UI 트리

블록 가상 DOM은 "안정된" UI 트리 또는 많이 변경되지 않는 UI 트리에도 적합합니다. Edit Map은 한 번만 생성되므로 렌더링할 때마다 다시 생성할 필요가 없기 때문입니다.

예를 들어 다음 컴포넌트는 블록 가상 DOM에 적합한 후보입니다.

```jsx
function Component() {
  // ✅ 좋음, 결정론적/안정적인 반환이므로
  return <div>{dynamic}</div>;
}
```

하지만 이 컴포넌트는 일반 가상 DOM보다 _느릴_ 수 있습니다.

```jsx
function Component() {
  // ❌ 나쁨, 비결정적/불안정적이므로
  return Math.random() > 0.5 ? <div>{dynamic}</div> : <p>sad</p>;
}
```

"목록과 같은" 형태를 따르는 비결정적/불안정적인 반환을 사용해야 하는 경우, [`<For />`](https://million.dev/docs/quickstart#for-) 컴포넌트를 사용하면 도움이 될 수 있습니다.

```jsx
function Component() {
  return <For each={items}>{(item) => <div>{item}</div>}</For>;
}
```

애플리케이션 UI를 구조화할 방법에 제한이 있다는 점에 유의하세요. "안정적" 반환은 목록과 같은 동적 모양이 아닌 컴포넌트(예: 동일한 컴포넌트 내의 조건부 반환)는 허용되지 않음을 의미합니다.

### 세밀하게 사용하기

초보자가 저지르는 큰 실수 중 하나는 블록 가상 DOM을 모든 곳에 사용하는 것입니다. 블록 가상 DOM은 만병통치약이 아니며 일반 가상 DOM보다 항상 빠른 것은 아니기 때문에 이는 좋지 않은 생각입니다.

대신 블록 가상 DOM이 더 빠른 특정 패턴을 인식해야 하고, 해당 경우에만 사용해야 합니다. 예를 들어 큰 테이블에는 블록 가상 DOM을 사용하지만, 정적 콘텐츠가 적은 작은 폼에는 일반 가상 DOM을 사용할 수 있습니다.

## 마무리 생각

블록 가상 DOM은 업데이트를 관리하고 오버헤드를 최소화하는 대안적인 접근 방식을 제공함으로써 가상 DOM 개념에 대한 새로운 관점을 제시합니다. 하지만 이런 잠재력에도 불구하고 이 접근 방식은 만능 솔루션이 아니므로 개발자는 이 접근 방식을 채택할지 여부를 결정하기 전에 애플리케이션의 특정 요구 사항과 성능 요구 사항을 평가해야 합니다.

많은 애플리케이션의 경우 기존 가상 DOM으로 충분할 수 있으며 블록 가상 DOM이나 기타 성능 중심 프레임워크로 전환할 필요가 없을 수도 있습니다. 애플리케이션이 대부분의 기기에서 성능 문제없이 원활하게 실행된다면 다른 프레임워크로 전환하는 데 시간과 노력을 들일 필요가 없을 수도 있습니다. 기술 스택을 크게 변경하기 전에 장단점을 면밀히 검토하고 애플리케이션의 고유한 요구 사항을 평가하는 것이 중요합니다.

그렇지만 저는 앞으로의 미래가 기대됩니다. 여러분도 기대되시나요? ([직접 구축해 보세요!](https://github.com/aidenybai/hundred#readme))

[트위터에서 토론하기](https://twitter.com/search?q=https%3A%2F%2Fmillion.dev%2Fblog%2Fvirtual-dom) | [깃허브에서 수정하기](https://github.com/aidenybai/million/blob/main/website/pages/blog/virtual-dom.mdx)

### 감사

- 아이디어를 제안해 준 [Seb Lorber](https://twitter.com/sebastienlorber)
- 이 글을 읽고 편집을 도와준 [Jesse Pense](https://twitter.com/JessePence5)
- [2023년 가장 빠른 투자](https://twitter.com/jutanium/status/1652907080330665984)를 한 [Dan Jutan](https://twitter.com/jutanium)
- [Rich Harris](https://twitter.com/Rich_Harris)의 ["가상 DOM은 순수한 오버헤드입니다"](https://svelte.dev/blog/virtual-dom-is-pure-overhead)
- [Dan Abramov](https://twitter.com/dan_abramov)의 ["UI 런타임으로서의 리액트"](https://overreacted.io/ko/react-as-a-ui-runtime/)
- [Ryan Carniato](https://twitter.com/RyanCarniato)의 ["컴포넌트는 순수한 오버헤드입니다"](https://dev.to/this-is-learning/components-are-pure-overhead-hpm)
- [Chung Wu](https://twitter.com/chungwu)의 ["리액트 서버 컴포넌트 작동 방식: 심층 가이드"](https://www.plasmic.app/blog/how-react-server-components-work)
<style scoped lang="scss">
figure {
  margin-bottom: 1rem;
}

figcaption {
  margin-top: 0.5rem;
  padding: 0 0.5rem;
  font-size: 14px;
}
</style>
