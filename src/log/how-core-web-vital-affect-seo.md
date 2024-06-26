---
feArticle: true
---

# **코어 웹 바이탈이 SEO에 미치는 영향**

> 원문: https://vercel.com/blog/how-core-web-vitals-affect-seo

애플리케이션의 구글 페이지 경험 순위와 라이트하우스 점수 이해하기

![](https://vercel.com/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5cCiqKDCm1f68zknjbzbHJ%2F4d7a379b518317fabe71af5822ae6d33%2FOG_Template-1.png&w=1200&q=75&dpl=dpl_9bXBYmsKCLdXwRJPXNw8kSb6rR5M)

코어 웹 바이탈은 구글에서 애플리케이션의 페이지 순위를 매기는 데 영향을 줍니다. 여기에서는 코어 웹 바이탈이 무엇인지, 어떻게 측정되는지, 그리고 이것이 사용자 및 검색 순위에 어떤 영향을 미치는지 자세히 살펴보겠습니다.

> Malte Ubl은 Vercel의 CTO이자 전 구글 검색 디렉터로, 코어 웹 바이탈을 많이 활용하는 '페이지 경험' 순위 발표를 담당했습니다. 즉, 여기에 작성된 모든 내용은 공개적으로 문서화되어 있으며 적절한 경우 링크가 제공됩니다.

## 페이지 속도에 따라 구글이 순위를 매기는 방법

구글 검색에서 여러분의 사이트 순위는 구글의 [코어 웹 바이탈](https://developers.google.com/search/docs/appearance/core-web-vitals) 지표를 기반으로 사이트의 성능을 평가하는 구글의 페이지 경험 순위 시스템에 의해 영향을 받습니다.

구글은 실제 사용자가 웹사이트와 상호 작용하는 방식을 관찰하고 이를 다시 서버에 보고하는 방식으로 코어 웹 바이탈을 수집합니다 (작동 방식에 대한 자세한 내용은 아래 참조).

이러한 유형의 데이터를 _현장 데이터_ 라고 하는데, 이는 사이트를 탐색하는 실제 사용자로부터 수집하기 때문입니다. 이는 사이트의 성능을 확인하기 위해 '실험실 환경'에서 실행한 테스트의 결과인 _실험실 데이터_ 와는 다릅니다. 구글의 라이트하우스는 실험실 테스트의 한 예입니다.

이 글에서 가장 중요한 점은 바로 이것입니다.

> 구글은 사이트 순위를 매길 때 코어 웹 바이탈 현장 데이터*만* 고려합니다. 구글은 검색 순위를 매길 때 라이트하우스 점수를 어떤 식으로든 고려하지 *않습니다*.

## 검색 순위 요소 맥락 파악하기

[페이지 경험](https://developers.google.com/search/docs/appearance/page-experience)은 코어 웹 바이탈을 활용하여 다른 사이트와 비교해 웹사이트의 성능을 확인하는 구글 검색의 순위 결정 요소입니다. 페이지 경험은 구글 검색의 여러 순위 결정 요소 중 하나로, 검색 결과 페이지에서 사이트의 순위를 결정하기 위해 모두 합산됩니다.

검색어와의 관련성 및 [콘텐츠의 품질](https://vercel.com/blog/nextjs-seo-playbook#content-strategies)은 페이지 경험보다 훨씬 더 중요한 요소입니다. 그러나 여러분과 경쟁업체의 관련성이 매우 유사한 경우에는 페이지 경험에 따라 순위가 결정될 수 있습니다.

페이지 경험과 코어 웹 바이탈의 특징은 다음과 같습니다.

* 사용자가 자신의 작업을 통해 이러한 지표를 개선할 수 있습니다.
* 구글은 여러분이 얼마나 잘하고 있는지 투명하게 공개합니다.

코어 웹 바이탈은 다른 순위 결정 요소들보다 비교적 명확한 편입니다. 이를 최적화하는 것은 관련성을 개선하는 것보다 '추측'이 훨씬 덜 필요하며 콘텐츠 품질보다 측정하기 쉽습니다.

또한 코어 웹 바이탈을 개선하면 사용자 경험이 개선되어 [전환을 유도](https://vercel.com/blog/the-user-experience-of-the-frontend-cloud?__vercel_draft=1#why-do-you-need-speed)할 수 있습니다.

## 애플리케이션의 코어 웹 바이탈을 확인하는 방법

페이지 경험 순위에 대한 전체 앱의 성능에 대한 권위 있는 데이터 소스는 [구글 검색 콘솔](https://search.google.com/search-console)입니다.

![The Core Web Vitals page of Google Search Console.](https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F6DSsIMSGVUi6xtL6hvIFx4%2Fe9f54eae5dcc0e7c3f5aaf6e734bea6d%2FScreenshot-2024-01-18-at-7.45.50-AM.png&w=1920&q=75&dpl=dpl_9bXBYmsKCLdXwRJPXNw8kSb6rR5M)

구글 검색 콘솔의 코어 웹 바이탈 페이지

페이지별 데이터에 액세스하는 간단한 방법은 두 가지 주요 섹션(코어 웹 바이탈과 라이트하우스)으로 그룹화되어 있는 구글의 [PageSpeed 인사이트](https://pagespeed.web.dev/)입니다.

## 현장 데이터: 코어 웹 바이탈

"실제 사용자의 경험 알아보기"라는 레이블이 붙은 PageSpeed 인사이트의 상단 섹션에서 구글은 지난 28일 동안 크롬 브라우저(데스크톱 및 안드로이드 모바일 기기)에서 애플리케이션에 접속한 실제 사용자의 75번째 백분위수에 대한 글로벌 현장 데이터를 수집합니다.

구글은 이 실제 데이터의 첫 세 가지 지표인 최대 콘텐츠 렌더링 시간(LCP), 첫 입력 지연(FID), 레이아웃 변경 횟수(CLS)를 사용하여 점수에 따라 애플리케이션의 순위를 변경합니다. 2024년 3월에는 [다음 페인트와의 상호작용(INP)이 FID를 대체합니다](https://developers.google.com/search/blog/2023/05/introducing-inp).

이 세 가지 코어 웹 바이탈은 웹 성능에 따라 앱의 순위에 영향을 미치는 데 구글이 사용하는 _유일한_ 데이터이며, 여기에 표시된 점수는 [애플리케이션의 비슷한 성능의 페이지](https://support.google.com/webmasters/answer/9205520)와 함께 그룹으로 평균을 낸 것이지만 구글이 사용하는 수치와 정확히 일치합니다.

또한 데스크톱과 모바일용 탭이 모두 있는 것을 볼 수 있습니다. 이는 구글이 사이트의 모바일 버전과 데스크톱 버전을 각각 기준으로 모바일 사용자와 데스크톱 사용자에 대해 [애플리케이션의 순위를 별도로 매기기 때문](https://developers.google.com/search/blog/2021/11/bringing-page-experience-to-desktop#:~:text=This%20means%20the,factor%20for%20desktop.) 입니다.

![The mobile Core Web Vitals for google.com.](https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F6DSsIMSGVUi6xtL6hvIFx4%2Fe9f54eae5dcc0e7c3f5aaf6e734bea6d%2FScreenshot-2024-01-18-at-7.45.50-AM.png&w=1920&q=75&dpl=dpl_9bXBYmsKCLdXwRJPXNw8kSb6rR5M)

google.com에 대한 모바일 코어 웹 바이탈입니다.

코어 웹 바이탈 아래에 있는 세 가지 지표는 사용자 경험에 대한 추가 인사이트를 제공할 수 있지만 검색에서 애플리케이션의 순위에는 영향을 미치지 않습니다.

## 코어 웹 바이탈 현장 데이터에는 어떤 사용자가 포함되나요?

크롬 사용자경험보고서(CrUX)는 구글의 코어 웹 바이탈 프로그램의 공식 데이터세트이며, 수집 방법은 공개적으로 문서화되어 있습니다. 특히 보고서에 포함될 내용은 다음과 같습니다.

- 페이지는 "충분한 인기"가 있어야 하고 "공개적으로 검색 가능"해야 합니다. 페이지가 인기 기준을 충족하는지 여부는 검색 콘솔의 CWV 보고서를 통해 확인할 수 있습니다.
- 사용자는 사용량 통계 보고 사용을 활성화하고 브라우저 기록을 동기화('크롬'에 로그인한 상태)해야 하며 동기화 비밀번호를 설정하지 않아야 합니다.
- 사용자는 데스크톱 또는 안드로이드에서 크롬을 사용해야 합니다.

**이 마지막 글머리 기호는 아이폰 사용자는 집계되지 않는다는 의미입니다.** 이는 일부 시장에서는 안드로이드폰이 아이폰보다 느리게 작동하므로 느리게 사이트를 방문하는 비율이 더 많이 계산될 수 있다는 점과 관련이 있을 수 있습니다.

애플리케이션에 실제 사용자 데이터가 충분하지 않은 경우 코어 웹 바이탈을 측정할 수 없으며 애플리케이션 순위를 매길 때 고려되지 않습니다.

## 사용자가 어디에서 오는지가 중요한가요?

또 다른 빈번한 질문은 '사용자가 어디에서 오는지가 중요한가요?' '인터넷 연결 속도가 느린 국가에 사용자가 많으면 불이익을 받나요?' 입니다.

사용자가 어디에서 오는지는 중요합니다. 현장 데이터의 핵심은 실제 사용자를 반영하며, 전 세계 모든 지역의 모든 사용자가 동등하게 집계된다는 점입니다.

좋은 소식은 인터넷 연결과 디바이스 성능이 전 세계적으로 향상되고 있으며, Vercel과 같은 에지 네트워크를 사용하면 [지구상의 모든 사용자에게 뛰어난 성능을 제공할 수 있다](https://vercel.com/blog/the-user-experience-of-the-frontend-cloud)는 것입니다.

## 주의: 28일간의 슬라이딩 윈도

구글은 28일 슬라이딩 윈도 방식으로 코어 웹 바이탈 데이터를 수집합니다. 점수는 기본적으로 지난 28일 동안의 평균 점수입니다. 개선 조치를 취했거나 상황을 악화시킨 경우 해당 조치의 전체 영향을 파악하려면 한 달이 지나야 합니다.

[아래](#a-quicker-way-to-iterate-on-core-web-vitals-vercel-speed-insights)에서 Vercel의 속도 인사이트를 통해 업데이트된 CWV 데이터에 더 빠르게 액세스하여 실시간으로 변화에 대응하고 순위 하락을 방지할 수 있는 방법을 확인할 수 있습니다.

## 실험실 데이터: 라이트하우스

PageSpeed 인사이트의 두 번째 섹션인 '성능 문제 진단'에서는 크롬 개발자 도구에 있는 것과 동일한 도구인 라이트하우스 내에서 애플리케이션의 성능을 시뮬레이션합니다.

이는 위의 현장 데이터 점수와 완전히 별개의 항목으로, 실제 사용자에 대한 구글의 기준을 아직 충족하지 못하는 경우 개선 제안을 위한 것입니다.

다시 한번 말씀드리자면, **라이트하우스의 어떤 항목도 사이트의 검색 순위에 반영되지 않으며**, 웹 앱 개발에서 흔히 발생하는 함정을 피하는 데 도움이 되는 선택적 지침을 제공합니다.

![The mobile Lighthouse scores for google.com.](https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F56HjW2PLkBuDplFL4bF51R%2F82d5b9a87f43f90fa2a5bf6334e5998d%2F1920xVariable-3.png&w=1080&q=75&dpl=dpl_9bXBYmsKCLdXwRJPXNw8kSb6rR5M)

google.com에 대한 모바일 라이트하우스 점수입니다.

페이지에서 가장 눈에 띄는 숫자 중 하나인 [라이트하우스 성능 점수](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)는 FCP(First Contentful Paint), [속도 지표](https://developer.chrome.com/en/docs/lighthouse/performance/speed-index/), LCP, TBT(총 차단 시간), CLS에 가중치를 부여한 점수입니다. 가중치를 적용한 후 실제 코어 웹 바이탈은 이 점수의 50%만 차지하며 FID/INP는 고려되지 않습니다.

이 결과는 쓰로틀링된 네트워크 연결로 모토 G 파워를 에뮬레이션 한 디바이스에서 얻은 결과이며, 실제 사용자의 디바이스와는 사양이 크게 다를 수 있습니다.

이 점과 기타 [실험실 데이터와 관련된 문제](https://web.dev/articles/lab-and-field-data-differences)(예: 사용자가 보고된 페이지로 이동하기 전에 어떤 페이지에서 왔는지 고려하지 않는 점)로 인해 라이트하우스 점수는 유일한 UX 지표로 적합하지 않습니다.

예를 들어, 지표로서의 총 차단 시간(TBT)은 실제 사용자 경험을 반영하지 못하는 경우가 많습니다. 이는 사용자 이벤트가 있는 경우 리액트와 같은 최신 프레임워크는 [인터럽트 실행](https://vercel.com/blog/how-react-18-improves-application-performance)을 통해 [좋은 FID와 INP](https://vercel.com/blog/improving-interaction-to-next-paint-with-react-18-and-suspense)를 제공하지만, 실험실 테스트에서는 실제 사용자 상호작용 없이 CPU 사용량을 관찰할 때 이를 알 수 없기 때문입니다.

## 라이트하우스 점수 해석하기

실험실 데이터에 대한 어려움에도 불구하고 라이트하우스는 여전히 유용한 정보를 제공하며, 특히 애플리케이션의 어느 부분이 사용자에게 문제를 일으킬 수 있는지 범위를 좁히는 데 유용합니다. 예를 들어

* **성능** - 코어 웹 바이탈이 허용 범위에 속하지 않는 경우, 메인 스레드를 너무 오래 차단할 수 있는 스크립트를 링크해주는 등 [문제가 있을법한 부분을 지적](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)합니다. 또한 LCP를 유발하는 것으로 간주되는 정확한 요소도 표시합니다.
* **접근성** - 이름 없는 링크나 레이블이 없는 폼 필드와 같은 [일반적인 오류](https://developer.chrome.com/docs/lighthouse/accessibility/scoring)를 발견합니다. 또한 명암비가 충분히 높지 않은 요소나 탭할 공간이 충분하지 않은 링크를 스크린샷으로 찍을 수도 있습니다.
* **모범 사례** - 이 라이트하우스 카테고리는 애플리케이션의 [보안 및 사용성 개선](https://developer.chrome.com/docs/lighthouse/best-practices/doctype)을 위한 제안을 포괄적으로 담고 있습니다. 여기의 정보는 브라우저가 코드를 더 쉽게 구문 분석하고 XSS와 같은 일부(전부는 아니지만) 일반적인 취약점을 방지하는 데 도움이 됩니다.
* **SEO** - 라이트하우스는 [SEO의 기술적 부분](https://developer.chrome.com/docs/lighthouse/seo/meta-description)에서 검색 엔진이 사이트를 크롤링하는 데 도움이 되는 기술적 방법에 대한 조언을 제공합니다. 이러한 점검은 사이트 순위가 예상대로 나오지 않는 이유를 디버깅하는 데 매우 유용할 수 있지만, 앱의 SEO에 영향을 미칠 수 있는 모든 요인을 완전히 해결하지는 못합니다.

## 코어 웹 바이탈을 더 빠르게 반복하는 방법: Vercel 속도 인사이트

구글의 데이터는 애플리케이션의 검색 순위와 실제 사용자의 성능을 확인할 수 있는 권위 있는 출처입니다. 하지만 위에서 언급했듯이 구글이 제공하는 데이터는 28일의 슬라이딩 윈도우를 사용합니다.

즉, 개선 또는 후퇴를 적용하면 전체 영향을 확인하려면 최대 한 달이 걸릴 수 있습니다. 또한 성능 저하에 대한 수정 사항을 제출해야 하는 경우 구글이 개선 사항을 반영하는 데 한 달이 더 걸릴 수 있습니다.

Vercel은 이터레이션 속도를 극대화하기 위해 [속도 인사이트](https://vercel.com/docs/speed-insights)를 만들었습니다. 크롬 브라우저는 사용자가 사이트에 접속할 때 코어 웹 바이탈 지표를 노출하므로, 사이트에 설치된 속도 인사이트 패키지는 이 지표에 액세스하여 실시간 데이터를 보고합니다. 그러면 문제가 나타나는 즉시 발견하고 수정하여 신속하게 대응할 수 있습니다.

![A snapshot of the Speed Insights tab from the project view.](https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4Ll4chYpMzSQcnFxZjMs7U%2F21a1b35566eae7b0de55a16204cee9bb%2Fres-chart-dark.png&w=1920&q=75&dpl=dpl_9bXBYmsKCLdXwRJPXNw8kSb6rR5M)

프로젝트 보기의 속도 인사이트 탭 스냅샷

Vercel의 모든 기능이 [무제한 불변 배포](https://vercel.com/blog/the-developer-experience-of-the-frontend-cloud?__vercel_draft=1)와 연계되어 있는 것처럼, 속도 인사이트도 배포 단위 또는 브랜치 단위로 볼 수 있어 각 `git push`가 애플리케이션 성능에 미치는 영향을 쉽게 확인할 수 있습니다.

구글의 PageSpeed 인사이트와 달리 지난 28일보다 더 작은 기간으로 데이터를 필터링할 수 있어 변경의 즉각적인 효과를 확인하거나 대규모 코드베이스 변경과 관련된 임의의 기간을 측정할 수 있습니다.

또한 애플리케이션의 개별 경로를 확인하고 사용자의 75번째 백분위수('구글 기준')와 90번째, 95번째, 99번째를 기준으로 데이터를 볼 수 있습니다.

또한 전 세계 지역별로 결과를 필터링할 수 있어 실제 사용자가 거주하는 지역에 리소스를 더 효과적으로 할당할 수 있습니다.

![Geographic map of the P75 score where the color intensity indicates the relative amount of data points per country.](https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4txoehjjKXtgVNdJAaBfcI%2F12c800f7d61b137d7f7efe855caa408f%2Fcountry-map-dark.png&w=1080&q=75&dpl=dpl_9bXBYmsKCLdXwRJPXNw8kSb6rR5M)

색상 강도가 국가별 데이터 포인트의 상대적 양을 나타내는 P75 점수의 지리적 지도.

전 세계의 다양한 규제 제한에 상관없이 속도 인사이트 기능을 사용할 수 있도록 개별 방문자나 IP 주소에 연결되거나 연관되지 않고 정보를 제공하도록 설계되었습니다.

## 더 읽어보기: 코어 웹 바이탈 최적화

이제 코어 웹 바이탈의 정의, 측정 방법, 애플리케이션에 미치는 영향에 대한 개요를 살펴보았으니 "각 지표를 최적화하려면 어떻게 해야 하나요?"라고 궁금해하실 수 있습니다.

조만간 이 주제에 대한 더 많은 콘텐츠를 게시할 예정이지만, 지금은 개별 지표 최적화에 대한 구글의 기술 가이드를 추천합니다: [최대 콘텐츠 렌더링 시간(LCP)](https://web.dev/articles/optimize-lcp), [레이아웃 변경 횟수(CLS)](https://web.dev/articles/optimize-cls), [첫 입력 지연(FID)](https://web.dev/articles/optimize-fid), [다음 페인트와의 상호작용(INP)](https://web.dev/articles/optimize-inp).

## 요점

* 코어 웹 바이탈을 개선하는 것은 구글이 사이트 순위를 매기는 데 사용하는 기본 데이터에 직접 액세스할 수 있기 때문에 구글 검색에서 가장 투명한 순위 결정 요소입니다.
* 구글 검색 순위에는 코어 웹 바이탈만 반영됩니다. 라이트하우스 점수는 무시됩니다.
* 구글의 데이터는 28일의 슬라이딩 윈도를 사용합니다. [더 빠른 이터레이션 속도](https://vercel.com/blog/iterating-from-design-to-deploy)로 사이트 속도를 개선하기 위해, Vercel의 속도 인사이트를 사용하면 코어 웹 바이탈에 실시간으로 쉽게 필터링할 수 있습니다.
