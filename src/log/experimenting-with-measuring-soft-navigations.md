---
feArticle: true
outline: [2, 3]
---
# 소프트 내비게이션 측정 실험하기

> 원문: https://developer.chrome.com/blog/soft-navigations-experiment/

<small>2023년 2월 1일에 게시됨, 2023년 9월 20일에 업데이트됨</small>

<Callout>
<strong>업데이트</strong>
<div>
소프트 내비게이션 오리진 평가판은 1차 평가판의 피드백을 반영하여 <a href="https://developer.chrome.com/origintrials/#/view_trial/21392098230009857" target="_blank">크롬 117에서 두 번째 오리진 평가판</a>을 시작했습니다.
</div>
</Callout>

[코어 웹 바이탈(Core Web Vitals) 이니셔티브](https://web.dev/articles/vitals)는 출시 이후 웹사이트가 생성되거나 로드되는 방식에 대한 기술적 세부 사항보다는 웹사이트의 실제 사용자 경험을 측정하기 위해 노력해 왔습니다. 코어 웹 바이탈의 세 가지 지표는 사용자가 페이지의 성능을 인지하는 방식과 무관한 시간을 측정하는 [`DOMContentLoaded`](https://developer.mozilla.org/docs/Web/API/Document/DOMContentLoaded_event)나 [`load`](https://developer.mozilla.org/docs/Web/API/Window/load_event)와 같은 기존 기술 지표에서 발전한 [사용자 중심 지표](https://web.dev/articles/user-centric-performance-metrics)로 만들어졌습니다. 따라서 사이트가 잘 작동한다면 사이트 구축에 사용된 기술이 점수에 영향을 미치지 않아야 합니다.

현실은 이상보다 항상 조금 더 까다롭고, 인기 있는 단일 페이지 애플리케이션(Single Page Application) 아키텍처는 [코어 웹 바이탈 지표에 의해 완전히 지원된 적이 없습니다](https://web.dev/articles/vitals-spa-faq). 이러한 웹 애플리케이션은 사용자가 사이트를 탐색할 때 개별 웹 페이지를 로드하는 대신 자바스크립트를 통해 페이지 콘텐츠를 변경하는 이른바 "소프트 내비게이션"을 사용합니다. 이러한 애플리케이션에서는 URL을 변경하고 브라우저의 기록에서 이전 URL을 푸시하여 사용자가 기대하는 대로 뒤로 가기 및 앞으로 가기 버튼이 작동하도록 함으로써 기존 웹 페이지 아키텍처의 환상을 유지합니다.

많은 자바스크립트 프레임워크가 이 모델을 사용하지만 각기 다른 방식으로 사용합니다. 이는 브라우저가 전통적으로 "페이지"로 이해하는 범위를 벗어나기 때문에 이를 측정하는 것은 항상 어려웠습니다. *현재* 페이지의 상호작용과 *새로운* 페이지로 간주하는 것 사이의 경계선을 어디로 설정해야 할까요?

크롬 팀은 이 문제를 오랫동안 고민해 왔으며, "소프트 내비게이션"이 무엇인지에 대한 정의를 표준화하고, 전통적인 다중 페이지 아키텍처(MPA)로 구현된 웹사이트를 측정하는 것과 유사한 방식으로 코어 웹 바이탈 측정 방법을 표준화하기 위해 노력하고 있습니다. 아직 초기 단계에 머물러 있지만, 팀은 이제 이미 구현된 기능을 사이트에서 실험할 수 있도록 더 광범위하게 제공할 준비가 되었습니다. 이를 통해 사이트들은 지금까지의 접근 방식에 대한 피드백을 제공할 수 있을 것입니다.

## 소프트 내비게이션이란 무엇인가요?

저희는 *소프트 내비게이션*에 대해 다음과 같은 정의를 내렸습니다.

- 내비게이션은 사용자의 행동에 의해 시작됩니다.
- 내비게이션은 사용자에게 URL 변경과 방문 기록(history) 변경을 가져옵니다.
- 내비게이션은 DOM 변화를 가져옵니다.

일부 사이트의 경우 이러한 휴리스틱이 거짓 긍정(사용자가 실제로 "내비게이션"이 발생한 것으로 간주하지 않는 경우) 또는 거짓 부정(사용자가 위의 기준을 충족하지 않음에도 불구하고 "내비게이션"이 발생한 것으로 간주하는 경우)을 초래할 수 있습니다. [소프트 내비게이션 사양 저장소](https://github.com/WICG/soft-navigations/issues)에서 휴리스틱에 대한 피드백을 환영합니다.

### 크롬에서는 소프트 내비게이션을 어떻게 구현하나요?

소프트 내비게이션 휴리스틱이 활성화되면(다음 섹션에서 자세히 설명) 크롬에서는 일부 성능 지표를 보고하는 방식이 변경됩니다.

- 소프트 내비게이션이 감지될 때마다 `soft-navigation` [`PerformanceTiming`](https://developer.mozilla.org/docs/Web/API/PerformanceTiming) 이벤트가 전송됩니다.
- 성능 API는 위의 `PerformanceTiming` 이벤트에서 발생하는 `soft-navigation` 타이밍 항목에 대한 액세스를 제공합니다.
- [First Paint (FP)](https://developer.mozilla.org/docs/Glossary/First_paint), [First Contentful Paint (FCP)](https://web.dev/articles/fcp), [Largest Contentful Paint (LCP)](https://web.dev/articles/lcp) 지표는 초기화되며, 다음 적절한 경우에 다시 발생합니다. (참고: FP 및 FCP는 아직 구현되지 않았습니다.)
- [First Input Delay (FID)](https://web.dev/articles/fcp)가 재설정되고 첫 번째 입력 시 다시 전송됩니다(참고: 아직 구현되지 않았습니다).
- 이벤트와 관련된 내비게이션 항목에 해당하는 각 성능 타이밍(`first-paint`, `first-contentful-paint`, `largest-contentful-paint`, `first-input-delay`, `event` 및 `layout-shift`)에 `navigationId` 속성이 추가되어 [Cumulative Layout Shift (CLS)](https://web.dev/articles/cls) 및 [Interaction to Next Paint (INP)](https://web.dev/articles/inp)이 계산될 수 있게 됩니다.

이러한 변경 사항을 통해 코어 웹 바이탈 및 일부 관련 진단 지표를 페이지 내비게이션별로 측정할 수 있지만, 고려해야 할 몇 가지 미묘한 차이가 있습니다.

### 크롬에서 소프트 내비게이션을 활성화하면 어떤 영향이 있나요?

다음은 이 기능을 사용 설정한 후 사이트 소유자가 고려해야 할 몇 가지 변경사항입니다.

- 소프트 내비게이션을 통해 추가 FP, FCP, LCP 및 FID 이벤트가 다시 전송될 수 있습니다. [크롬 사용자 경험 보고서(CrUX)](https://developer.chrome.com/docs/crux/)는 이러한 추가 값을 무시하지만, 사이트의 실제 사용자 측정(RUM) 모니터링에 영향을 줄 수 있습니다. [소프트 내비게이션을 위한 코어 웹 바이탈 측정에 관한 아래 섹션](https://developer.chrome.com/blog/soft-navigations-experiment/#how-can-i-measure-core-web-vitals-per-soft-navigation)을 참조하세요.
- 성능 항목의 새로운(그리고 선택 사항인) `navigationID` 속성은 이러한 항목을 사용하는 애플리케이션 코드에서 고려해야 할 수 있습니다.
- 이 새로운 모드는 Chromium 기반 브라우저만 지원합니다. 많은 최신 지표는 Chromium 기반 브라우저에서만 사용할 수 있지만, 일부 지표(FCP, FID)는 다른 브라우저에서도 사용할 수 있으며 모든 사용자가 최신 버전의 Chromium 기반 브라우저로 업그레이드한 것은 아닐 수 있습니다. 따라서 일부 사용자는 소프트 내비게이션 지표를 보고하지 않을 수 있다는 점에 유의하세요.
- 이 기능은 기본적으로 활성화되지 않는 실험적인 새 기능으로, 사이트에서는 의도하지 않은 다른 부작용이 없는지 이 기능을 테스트해야 합니다.

소프트 내비게이션 지표를 측정하는 방법에 대한 자세한 내용은 [아래](#소프트-내비게이션을-측정하려면-어떻게-해야-하나요)를 참조하세요.

### 크롬에서 소프트 내비게이션을 사용 설정하려면 어떻게 해야 하나요?

소프트 내비게이션은 크롬에서 기본적으로 활성화되어 있지 않지만, 크롬 110에서 이 기능을 명시적으로 활성화하여 실험용으로 사용할 수 있습니다.

개발자의 경우 `chrome://flags/#enable-experimental-web-platform-features`에서 *실험용 웹 플랫폼 기능* 플래그를 사용 설정하거나 크롬을 실행할 때 `--enable-experimental-web-platform-features` 커맨드 인수를 사용하여 이 기능을 활성화할 수 있습니다.

모든 방문자가 이 기능을 사용하도록 설정하여 영향을 확인하려는 웹사이트의 경우 크롬 117에서 실행되는 오리진 평가판을 신청하고 HTML 또는 HTTP 헤더에 오리진 평가판 토큰이 포함된 메타 요소를 포함시켜 사용하도록 설정할 수 있습니다. 자세한 내용은 [오리진 평가판 시작하기](https://developer.chrome.com/docs/web-platform/origin-trials/) 게시물을 참조하세요.

사이트 소유자는 모든 사용자 또는 일부 사용자에 대해서만 페이지에 오리진 평가판을 포함하도록 선택할 수 있습니다. 특히 많은 사용자에 대해 오리진 평가판을 사용하도록 설정하는 경우, 지표 보고 방식이 어떻게 변경되는지 위의 [영향도 섹션](#what-are-the-implications-of-enabling-soft-navigations-in-chrome)을 참고하시기 바랍니다. CrUX는 이 소프트 내비게이션 설정과 관계없이 기존 방식으로 계속해서 지표를 보고하므로 이러한 변경의 영향을 받지 않습니다. 또한 오리진 평가판은 14일 동안의 중앙값을 기준으로 전체 크롬 페이지 로드의 최대 0.5%에서만 실험적 기능을 사용하도록 제한되지만, 이는 매우 큰 규모의 사이트에서만 문제가 될 수 있다는 점에 유의해야 합니다.

## 소프트 내비게이션을 측정하려면 어떻게 해야 하나요?

소프트 내비게이션 실험이 활성화되면 평소와 같이 [`PerformanceObserver`](https://developer.mozilla.org/docs/Web/API/PerformanceObserver) API를 통해 지표가 보고됩니다. 그러나 이러한 지표에 대해 고려해야 할 몇 가지 추가 고려 사항이 있습니다.

> 참고: [소프트 내비게이션에 대해 현재 FP와 FCP가 보고되지 않으며](https://bugs.chromium.org/p/chromium/issues/detail?id=1479350), [FID도 보고되지 않습니다](https://bugs.chromium.org/p/chromium/issues/detail?id=1407656).

### 소프트 내비게이션 보고하기

`PerformanceObserver`를 사용하여 소프트 내비게이션을 관찰할 수 있습니다. 다음은 `buffered` 옵션을 통해 이 페이지의 이전 소프트 내비게이션을 포함하여 소프트 내비게이션 항목을 콘솔에 기록하는 코드 스니펫의 예시입니다.

```jsx
const observer = new PerformanceObserver(console.log);
observer.observe({ type: "soft-navigation", buffered: true });
```

이를 사용하여 이전 내비게이션에 대한 전체 페이지 수명 주기 지표를 마무리지을 수 있습니다.

### 적절한 URL에 대해 지표 보고하기

소프트 내비게이션은 발생한 후에만 볼 수 있고, 현재 URL은 새 페이지의 업데이트된 URL을 반영하므로, 일부 지표는 이벤트가 마무리 된 다음 이전 URL을 기반으로 보고해야 합니다.

적절한 `PerformanceEntry`의 `navigationId` 속성을 사용하여 이벤트를 올바른 URL에 연결할 수 있습니다. [`PerformanceEntry` API](https://developer.mozilla.org/docs/Web/API/PerformanceEntry)를 통해 조회할 수 있습니다.

```jsx
const softNavEntry =
  performance.getEntriesByType('soft-navigation').filter(
    (entry) => entry.navigationId === navigationId
  )[0];
const hardNavEntry = performance.getEntriesByType('navigation')[0];
const navEntry = softNavEntry || hardNavEntry;
const pageUrl = navEntry?.name;
```

이 `pageUrl`은 올바른 URL에 대한 지표를 보고하는 데 사용해야 합니다. 현재 URL은 과거에 사용했을 가능성이 있습니다.

### 소프트 내비게이션의 `startTime` 구하기

내비게이션 시작 시간도 비슷한 방법으로 구할 수 있습니다.

```jsx
const softNavEntry =
  performance.getEntriesByType('soft-navigation').filter(
    (entry) => entry.navigationId === navigationId
  )[0];
const hardNavEntry = performance.getEntriesByType('navigation')[0];
const navEntry = softNavEntry || hardNavEntry;
const startTime = navEntry?.startTime;
```

`startTime`은 소프트 내비게이션을 시작하게 한 최초 상호 작용(예: 버튼 클릭)의 시간입니다.

소프트 내비게이션을 포함한 모든 성능 타이밍은 초기 "하드" 페이지 내비게이션 시간으로부터 경과한 시간으로 보고됩니다. 따라서 소프트 내비게이션 시작 시간은 소프트 내비게이션 로딩 지표 시간(예: LCP)의 기준을 설정하는 데 필요합니다.

### 소프트 내비게이션시 코어 웹 바이탈 측정하기

소프트 내비게이션 지표 항목을 포함하려면 성능 옵저버의 `observe` 호출에 `includeSoftNavigationObservations: true`를 포함시켜야 합니다.

```jsx
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log('Layout Shift time:', entry);
  }
}).observe({type: 'layout-shift', buffered: true, includeSoftNavigationObservations: true});
```

[크롬에서 소프트 내비게이션 기능을 활성화하는 것](https://developer.chrome.com/blog/soft-navigations-experiment/#how-do-i-enable-soft-navigations-in-chrome) 외에도 추가로 `observe` 메서드의 `includeSoftNavigationObservations` 플래그가 필요합니다. 성능 옵저버 수준에서 명시적으로 옵트인(opt-in)하는 이유는, 소프트 내비게이션에 대한 코어 웹 바이탈 측정을 시도할 때는 몇 가지 고려 사항이 추가적으로 생기므로 [기존 성능 옵저버가 이러한 추가 항목으로 인해 놀라지 않도록 하기 위한 것](https://github.com/WICG/soft-navigations/issues/11)입니다. 

타이밍은 여전히 원래의 "하드" 내비게이션 시작 시간을 기준으로 반환됩니다. 따라서 예를 들어 소프트 내비게이션에 대한 LCP를 계산하려면 LCP 타이밍에서 위에 설명된 대로 적절한 소프트 내비게이션 시작 시간을 빼서 소프트 내비게이션에 대한 상대적인 타이밍을 얻어야 합니다. LCP의 경우 다음과 같습니다.

```jsx
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    const softNavEntry =
      performance.getEntriesByType('soft-navigation').filter(
        (navEntry) => navEntry.navigationId === entry.navigationId
      )[0];
    const hardNavEntry = performance.getEntriesByType('navigation')[0];
    const navEntry = softNavEntry || hardNavEntry;
    const startTime = navEntry?.startTime;
    console.log('LCP time:', entry.startTime - startTime);
  }
}).observe({type: 'largest-contentful-paint', buffered: true, includeSoftNavigationObservations: true});
```

일부 지표는 전통적으로 페이지의 수명 내내 측정됩니다. 예를 들어 LCP는 상호작용이 발생할 때까지 변경될 수 있습니다. CLS, FID 및 INP는 페이지가 사라질 때까지 업데이트될 수 있습니다. 따라서 새로운 소프트 내비게이션이 발생할 때마다 각 "내비게이션"(원래 내비게이션 포함)은 이전 페이지의 지표를 마무리해야 할 수 있습니다. 즉, 초기 "하드" 내비게이션 지표가 평소보다 일찍 확정될 수 있다는 뜻입니다.

마찬가지로, 새로운 소프트 내비게이션에 대한 이러한 오래 지속되는 지표의 측정을 시작할 때는 이전 "페이지"를 기반으로 설정된 값을 기억하지 않고 지표를 "재설정" 또는 "초기화"하여 새로운 지표로 처리해야 합니다.

### 내비게이션 간에 동일하게 유지되는 콘텐츠는 어떻게 처리해야 하나요?

소프트 내비게이션에 대한 FP, FCP 및 LCP는 새 페인트만 측정합니다. 예를 들어 소프트 내비게이션의 콜드 로드와 소프트 로드로 인해 LCP가 달라질 수 있습니다.

LCP 요소인 큰 배너 이미지가 포함되어 있지만 그 아래의 텍스트는 소프트 내비게이션을 할 때마다 변경되는 페이지를 예로 들어 보겠습니다. 초기 페이지 로드 시 배너 이미지가 LCP 요소로 플래그가 지정되고 이를 기준으로 LCP 타이밍이 결정됩니다. 이후 소프트 내비게이션의 경우, 그 아래의 텍스트는 소프트 내비게이션 이후에 그려지는 가장 큰 요소가 되며 새로운 LCP 요소가 됩니다. 그러나 새 페이지가 소프트 내비게이션 URL에 대한 딥링크로 로드되는 경우, 배너 이미지는 새 페인트가 되므로 LCP 요소로 간주될 수 있습니다.

이 예시에서 볼 수 있듯이 페이지가 로드되는 방식에 따라 소프트 내비게이션의 LCP 요소는 다르게 보고될 수 있습니다. 페이지 하단에 앵커 링크가 걸린 페이지를 로드하면 다른 LCP 요소가 측정될 수 있는 것과 같은 원리입니다.

### TTFB는 어떻게 측정하나요?

전통적인 페이지 로딩의 경우 [첫 바이트에 도달하는 시간(TTFB)](https://web.dev/articles/ttfb)은 원래 요청의 첫 바이트가 반환되는 시간을 나타냅니다.

소프트 내비게이션의 경우 이는 좀 더 까다로운 질문입니다. 새 페이지에 대한 첫 번째 요청을 측정해야 할까요? 모든 콘텐츠가 이미 앱에 존재하고 추가 요청이 없는 경우 어떻게 해야 할까요? 프리페치를 통해 미리 요청이 이루어진 경우에는 어떻게 해야 할까요? 사용자 관점에서 소프트 내비게이션과 관련이 없는 요청(예: 애널리틱스 요청)이라면 어떻게 해야 할까요?

더 간단한 방법은 [뒤로 가기/앞으로 가기 캐시](https://web.dev/articles/bfcache) 복원에 권장하는 것과 유사한 방식으로 소프트 내비게이션에 대해 TTFB를 0으로 보고하는 것입니다. 이 방법은 현재 [`web-vitals` 라이브러리](https://developer.chrome.com/blog/soft-navigations-experiment/#using-the-web-vitals-library-to-measure-core-web-vitals-for-soft-navigations)가 소프트 내비게이션에 사용하는 방법입니다.

향후에는 어떤 요청이 소프트 내비게이션의 "내비게이션 요청"인지 더 정확하게 파악할 수 있는 방법을 지원하여 더 정확한 TTFB 측정을 할 수 있게 될 것입니다. 하지만 현재 실험 대상엔 포함되지 않습니다.

### 이전 버전과 새 버전을 모두 측정하는 방법은 무엇인가요?

실험 기간 동안에는 현재 방식대로 코어 웹 바이탈을 계속 측정하는 것이 좋습니다. 즉, "하드" 내비게이션을 기반으로 하여 코어 웹 바이탈 이니셔티브의 공식 데이터셋으로서 CrUX가 측정하고 보고하는 방식을 따르는 것입니다.

소프트 내비게이션도 추가로 측정하여 향후 측정 방식을 확인하고 이 구현이 실제로 어떻게 작동하는지에 대해 크롬팀에 피드백을 제공할 수 있는 기회를 제공해야 합니다. 이는 사용자와 크롬팀이 앞으로 API를 개선하는 데 도움이 됩니다.

두 가지를 모두 측정하려면 소프트 내비게이션 모드에서 발생할 수 있는 새로운 이벤트(예: 여러 FCP 및 추가 LCP 이벤트)를 인지하고 적절한 시점에 이러한 지표를 확정하여 적절하게 처리하는 동시에 소프트 내비게이션에만 적용되는 향후 이벤트는 무시해야 합니다.

### `web-vitals` 라이브러리를 사용하여 소프트 내비게이션을 위한 코어 웹 바이탈 측정하기

앞서 언급된 모든 미묘한 차이점들을 고려하는 가장 쉬운 방법은, [`web-vitals`](https://github.com/GoogleChrome/web-vitals) 자바스크립트 라이브러리를 사용하는 것입니다. 이 라이브러리는 별도의 [`soft-navs 브랜치`](https://github.com/GoogleChrome/web-vitals/tree/soft-navs)에서 [소프트 내비게이션에 대한 실험적 지원](https://github.com/GoogleChrome/web-vitals/tree/soft-navs#report-metrics-for-soft-navigations-experimental)을 제공하고 있으며, [npm](https://www.npmjs.com/package/web-vitals/v/soft-navs)과 [unpkg](https://unpkg.com/web-vitals@soft-navs/dist/web-vitals.js?module)에서 사용할 수 있습니다. 아래와 같은 방식으로 측정할 수 있습니다(`doTraditionalProcessing`과 `doSoftNavigation`을 적절히 대체하세요).

```jsx
import {
  onTTFB,
  onFCP,
  onLCP,
  onCLS,
  onFID,
  onINP,
} from 'https://unpkg.com/web-vitals@soft-navs/dist/web-vitals.js?module';

onTTFB(doTraditionalProcessing);
onFCP(doTraditionalProcessing);
onLCP(doTraditionalProcessing);
onCLS(doTraditionalProcessing);
onFID(doTraditionalProcessing);
onINP(doTraditionalProcessing);

onTTFB(doSoftNavProcessing, {reportSoftNavs: true});
onFCP(doSoftNavProcessing, {reportSoftNavs: true});
onLCP(doSoftNavProcessing, {reportSoftNavs: true});
onCLS(doSoftNavProcessing, {reportSoftNavs: true});
onFID(doSoftNavProcessing, {reportSoftNavs: true});
onINP(doSoftNavProcessing, {reportSoftNavs: true});
```

지표가 [위에서 언급한 대로](https://developer.chrome.com/blog/soft-navigations-experiment/#reporting-the-metrics-against-the-appropriate-url) 올바른 URL에 대해 보고되는지 확인하세요.

`web-vitals` 라이브러리는 현재 소프트 내비게이션에 대해 다음과 같은 지표를 보고합니다.

| Metric | Details |
| --- | --- |
| TTFB | 0으로 보고됩니다. |
| FCP | 현재 `web-vitals` 라이브러리에서는 페이지의 첫 번째 FCP만 보고합니다. |
| LCP | 소프트 내비게이션 시작 시간을 기준으로 다음으로 큰 콘텐츠의 페인트 시간입니다. 이전 내비게이션에서 존재하는 기존 페인트는 고려되지 않습니다. 따라서 LCP는 >= 0이 됩니다. 평소와 같이 상호작용이 발생하거나 페이지가 백그라운드 처리될 때 보고되며, 그래야만 LCP가 최종 확정될 수 있기 때문입니다. |
| CLS | 내비게이션 시간 사이의 가장 큰 이동 창입니다. 평소와 같이, 페이지가 백그라운드 처리된 경우에 이 값이 보고됩니다. 0이 보고됩니다. |
| FID | 현재 `web-vitals` 라이브러리에서는 페이지의 첫 번째 FID만 보고합니다. |
| INP | 내비게이션 시간 사이의 INP입니다. 평소와 같이 상호 작용 시 또는 페이지가 백그라운드 처리될 때 보고되며, 그래야만 INP가 최종 확정될 수 있습니다. 0은 보고되지 않습니다. |

<Callout>
<strong>경고</strong>
<div>
<code>web-vitals</code> 구현은 현재 개발 중이며 해당 브랜치에 새로운 변경 사항이 게시되면 변경될 수 있습니다. 현재로서는 소프트 내비게이션에서 FCP 및 FID를 지원하지 않는데, 이는 크롬에서 <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=1479350" target="_blank">FCP</a> 및 <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=1407656" target="_blank">FID</a>를 측정하기 위해 더 많은 작업이 필요하기 때문입니다.
</div>
<div>
운영 사이트에서 <code>web-vitals</code> 자바스크립트 라이브러리를 사용하려는 경우 이 점을 인지하고 로컬 복사본을 가져와 해당 버전을 테스트하고 해당 브랜치에 변경 사항이 있는지 모니터링해야 합니다.
</div>
</Callout>

## 이러한 변화가 코어 웹 바이탈 측정의 일부가 되나요?

현재로서는 이 소프트 내비게이션 실험은 실험일 뿐입니다. 이 실험을 코어 웹 바이탈 이니셔티브에 통합할지 여부를 결정하기 전에 휴리스틱을 평가하고 사용자 경험을 더 정확하게 반영하는지 확인하고자 합니다. 이 실험의 가능성에 대해 매우 기대가 크지만, 이 실험이 현재의 측정치를 대체할지 여부와 시기에 대해서는 보장할 수 없습니다.

저희는 이 실험에 대한 웹 개발자의 피드백, 사용된 휴리스틱, 그리고 이 실험이 사용자 경험을 더 정확하게 반영한다고 생각하는지 여부에 대해 소중하게 생각합니다. [소프트 내비게이션 깃허브 리포지토리](https://github.com/WICG/soft-navigations/issues)가 이러한 피드백을 제공하기에 가장 좋은 곳이지만, 크롬의 구현과 관련된 개별 버그는 [크롬 이슈 트래커](https://bugs.chromium.org/p/chromium/issues/list)에서 제기해야 합니다.

### CrUX에서 소프트 내비게이션은 어떻게 보고되나요?

이 실험이 성공할 경우 CrUX에서 소프트 내비게이션이 정확히 어떻게 보고될지 여부도 아직 결정되지 않았습니다. 현재의 "하드" 내비게이션과 동일하게 처리될 것이 반드시 보장되는 것은 아닙니다.

일부 웹 페이지에서는 소프트 내비게이션이 사용자에게 있어 전체 페이지 로딩과 거의 동일하며 단일 페이지 애플리케이션 기술의 사용은 구현 세부 사항일 뿐입니다. 다른 경우에는 추가 콘텐츠의 부분 로딩과 더 유사할 수 있습니다.

따라서 이러한 소프트 내비게이션을 CrUX에서 별도로 보고하거나 특정 페이지 또는 페이지 그룹에 대한 코어 웹 바이탈을 계산할 때 가중치를 부여할 수 있습니다. 또한 휴리스틱이 발전함에 따라 부분 로드 소프트 내비게이션을 완전히 제외할 수도 있습니다.

현재는 이 실험의 성공 여부를 판단할 수 있는 휴리스틱과 기술적 구현에 집중하고 있으므로 이러한 측면에 대한 결정은 아직 내려지지 않았습니다.

## 피드백

다음과 같은 곳에서 이 실험에 대한 피드백을 적극적으로 받고 있습니다.

- [소프트 내비게이션 휴리스틱 및 표준화](https://github.com/WICG/soft-navigations/issues)
- 해당 휴리스틱의 [크롬 구현 문제](https://bugs.chromium.org/p/chromium/issues/entry?template=Defect&components=Blink%3EPerformanceAPIs)
- 일반 웹 바이탈 피드백은 [web-vitals-feedback@googlegrouops.com](mailto:web-vitals-feedback@googlegrouops.com)으로 연락주세요.

## 결론

소프트 내비게이션 실험은 현재 지표에서 누락된 최신 웹의 일반적인 패턴을 측정하기 위해 코어 웹 바이탈 이니셔티브가 어떻게 발전할 수 있는지에 대한 흥미로운 접근 방식입니다. 이 실험은 아직 초기 단계이며 아직 해야 할 일이 많지만, 지금까지의 진행 상황을 광범위한 웹 커뮤니티에 공개하여 실험할 수 있도록 하는 것은 중요한 단계입니다. 이 실험에서 피드백을 수집하는 것도 이 실험의 중요한 부분이므로, 이 개발에 관심이 있는 분들께서는 이 기회를 통해 저희가 측정하고자 하는 바를 대표할 수 있는 API를 만드는 데 도움을 주실 것을 적극 권장합니다.
