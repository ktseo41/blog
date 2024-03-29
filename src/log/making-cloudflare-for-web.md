---
feArticle: true
---
# Cloudflare를 웹 애플리케이션을 위한 최고의 장소로 만들기

> 원문: https://blog.cloudflare.com/making-cloudflare-for-web/

![](https://blog.cloudflare.com/content/images/2023/05/image1-38.png)

웹 개발자 여러분 안녕하세요! 최근 Cloudflare에서는 약간의 변화를 준비하고 있는데요. 이 글에서 저희가 무엇을 하고 어디로 가고 있는지 간단하게 알려드리려 합니다. 여러분들은 이미 Cloudflare를 웹 애플리케이션을 보호하거나, 속도를 높이거나, 확장할 수 있는 최고의 장소로 알고 계시겠지만, Cloudflare는 점점 더 애플리케이션을 *배포하고 실행*하는데도 최고의 장소가 되고 있습니다!

**왜 애플리케이션을 Cloudflare에 배포해야 할까요?** 두 가지 간단한 이유가 있습니다. 첫째, 여러 개별 시스템을 관리하는 번거로움을 줄여줍니다. 개발, 배포, 모니터링, 튜닝을 한곳에서 할 수 있습니다. 둘째, Cloudflare에 직접 배포함으로써 애플리케이션을 최적화할 수 있는 수단이 훨씬 더 많아지며, 그로 인해 애플리케이션을 사용자에게 더 빠르고 부드럽게 전달할 수 있습니다.

**그래서 무엇이 바뀌는 건가요?** 사실 꽤 많은 것이 바뀝니다. 저는 모든 세부 사항을 다시 이야기하며 여러분들을 지루하게 하지 않을 것입니다. 대신 제 뛰어난 동료들이 모든 세부 사항을 포함한 별도의 글을 작성했으니, 여기서는 대략적으로 파악해 보세요.

## Cloudflare Workers + Pages = 멋진 개발 플랫폼

Cloudflare Pages와 Workers는 다음과 같은 서비스를 제공하는 통합된 개발 및 애플리케이션 호스팅 플랫폼으로 병합됩니다.

- 전 세계적으로 매우 낮은 지연시간: 정적 자산과 컴퓨팅이 [전 세계 인터넷 연결 인구의 95%에게 50ms 미만 거리](https://www.cloudflare.com/network/)에 있습니다.
- 무료 정적 자산 호스팅을 포함한 무료 이그레스(egress, 역자 주: 서비스 경계 내부의 API 클라이언트 또는 리소스와 서비스 경계 외부의 리소스가 관련된 액세스를 [의미](https://cloud.google.com/vpc-service-controls/docs/ingress-egress-rules?hl=ko#definition-ingress-egress)합니다.).
- 전 세계적으로 이미 초당 최대 1천만 건 이상의 요청을 처리하는 표준 기반 자바스크립트 및 WASM 런타임.
- [R2](https://www.cloudflare.com/products/r2/)(S3 호환 API를 가진 오브젝트 저장소), 지연시간이 낮고 전 세계적으로 복제된 [KV 저장소](https://www.cloudflare.com/products/workers-kv/), [큐](https://developers.cloudflare.com/queues/), [D1 데이터베이스](https://developers.cloudflare.com/d1/) 등의 강력한 기능에 대한 접근.
- 개발 속도를 향상하는 GitOps 및 CI/CD 워크플로우와 미리 보기 환경 지원
- ... 그리고 훨씬 더 많은 것들이 있습니다!

수학적으로는 틀렸다는 것이 증명되었지만, 저희는 1+1=3이라는 공식을 고집스럽게 믿고 있습니다. Cloudflare Pages + Workers가 각각의 합보다 훨씬 더 훌륭하다고 해석합니다. 실제로, 둘의 조합은 저희가 기대하며 개발하고 있는 독특한 개발 플랫폼의 훌륭한 기반입니다.

저희는 이 통합 여정을 몇 분기 전에 시작했으며, 초기부터 기존의 애플리케이션을 그대로 두지 않기로 합의했습니다. 대신, 이전의 애플리케이션을 새로운 세계로 옮겨갈 것입니다. 이제 점진적인 결과를 공유하기 시작하려고 합니다. 그리고 이번 분기 동안 훨씬 더 많은 것들이 출시될 예정입니다. 더 알고 싶으신가요? 제 동료 Nevi가 [그녀의 블로그 게시물](https://blog.cloudflare.com/pages-and-workers-are-converging-into-one-experience)에 흥미진진한 세부 사항들을 공유했습니다.

## Workers를 위한 스마트 배치는 우리를 더 멀리 나아가게 합니다!

간단히 말해서, 스마트 배치는 Cloudflare에 혁명을 가져왔습니다. 이 기능은 오늘날 다른 애플리케이션 호스팅 제공 업체도 따라올 수 없는 새로운 컴퓨팅 패러다임을 저희 플랫폼에서 가능하게 합니다. 인기 있는 여러 웹 프레임워크 중 하나로 만들어진 전형적인 풀스택 애플리케이션을 가지고 있나요? 그렇다면 이 기능은 바로 당신을 위한 것입니다! 그리고 이 기능은 Workers와 Pages 모두에서 작동합니다!

이전에는 항상 모든 애플리케이션을 저희 글로벌 네트워크의 "엣지", 즉 사용자에게 가능한 한 가까운 곳에서 실행했습니다. 스마트 배치를 사용하면 저희는 컴퓨팅(당신의 애플리케이션)이 실행되어야 하는 네트워크 내에서 최적의 위치를 지능적으로 결정합니다. 이는 애플리케이션의 동작과 애플리케이션이 상호작용하는 다른 네트워크 자원이나 엔드포인트를 관찰함으로써 이루어집니다. 그런 다음 일반적으로 데이터가 저장된 곳과 가까운 최적의 위치에 당신의 애플리케이션을 투명하게 생성하고, 저희의 네트워크를 통해 들어오는 요청을 해당 위치로 라우팅 합니다.

스마트 배치를 통해 애플리케이션을 작업을 수행하는데 필요한 데이터와 가까이에서 실행할 수 있습니다. 이는 데이터베이스, [오브젝트 저장소](https://www.cloudflare.com/learning/cloud/what-is-object-storage/), 또는 다른 백엔드 엔드포인트와 상호작용하는 애플리케이션에 유용하며, 중앙집중식이고 글로벌하게 분산되어 있지 않은 경우에 특히 강력합니다.

사용자나 클라이언트의 요청은 여전히 285개가 넘는 데이터 센터 중 그들의 현재 위치에 가까운 한 곳의 초고속 네트워크로 전송됩니다. 하지만 애플리케이션을 바로 그곳에서 생성하는 대신, 애플리케이션과 통신하는 데이터나 백엔드 시스템과 가까운 최적의 데이터 센터로 요청을 라우팅 합니다.

그렇다고 엣지에서의 컴퓨팅이 더 이상 멋지지 않다는 의미는 아닙니다! 멋져요! 여전히 애플리케이션을 엣지에서 실행하는 것이 합당한 많은 사용 사례가 있으며 스마트 배치는 그 시나리오를 결정하고, 있어야 할 장소가 엣지라면 애플리케이션을 엣지에 유지합니다. A/B 테스팅, 현지화, 에셋 제공 등은 거의 항상 엣지에서 일어나야 할 사용 사례입니다.

흥미로우신가요? 이 [시각적 데모](https://smart-placement-demo.pages.dev/)를 확인하고, 제 동료인 Tanushree의 블로그 게시물에서 [스마트 배치](https://blog.cloudflare.com/announcing-workers-smart-placement/)에 대해 자세히 알아보세요.

## 로컬 또는 브라우저에서 개발하세요!

초고속으로 전 세계에 분산된 애플리케이션 플랫폼에 직접 통합된, 최고의 개발 환경을 구축한다는 목표를 계속해서 실현하고 있습니다. 로컬 기본 개발 워크플로우를 완벽하게 지원하는 [Wrangler](https://developers.cloudflare.com/workers/get-started/guide/#1-start-a-new-project-with-wrangler-the-workers-cli) v3를 출시합니다. 오픈소스 Cloudflare Workers 자바스크립트 런타임인 [workerd](https://github.com/cloudflare/workerd#readme)를 기반으로 하는 이 변화는 개발 서버 시작 시각을 10배, 그리고 스크립트 재로드 시간을 60배 단축해 생산성을 높이고 흐름을 더 오래 유지할 수 있게 합니다.

대시보드에서는 업그레이드된, 훨씬 더 강력한 [VSCode](https://code.visualstudio.com/) 기반의 온라인 편집기를 도입하고 있습니다. 이제 브라우저에서 여러 자바스크립트 모듈을 편집하고, 엣지 미리 보기를 정확히 확인할 수 있으며, 친절한 에러 페이지와 타입 검사를 할 수 있습니다!

마지막으로 대시보드 에디터와 Wrangler 모두에서 workerd 맞춤형 [크롬 개발자 도구](https://developer.chrome.com/docs/devtools/)가 최신 버전으로 업데이트되어 어디서든 더욱 뛰어난 디버깅 및 프로파일링 기능을 제공합니다.

이는 저희의 개발 도구 영역 개선에 대한 첫 번째 물결에 불과하며, 앞으로 몇 분기 동안 이 공간에서는 저희가 계속해서 변화를 이루는 것을 볼 수 있을 것입니다. 그러나 그 사이에, Adam, Brendan, 그리고 Samuel로부터 [Wrangler v3의 모든 세부 정보](https://blog.cloudflare.com/wrangler3)와 [VSCode 및 대시보드 에디터 개선](https://blog.cloudflare.com/improved-quick-edit)에 대한 심층적인 게시물을 확인하세요.

## 메모리, CPU, 애플리케이션 크기 제한 증가 및 가격 책정 간소화!

AI, WASM, 그리고 강력한 풀스택 애플리케이션의 시대에서, 저희는 개발자들이 저희의 현재 자원 한계에 더 자주 직면하고 있다는 것을 알아차렸습니다. 저희는 이러한 애플리케이션이 번창하고 개발자들이 더 크고 복잡한 애플리케이션을 구축할 수 있도록 하고 싶습니다. 그래서, 다음 주(2023.05.17. 기준) 내로 애플리케이션 크기 제한(JavaScript/WASM 번들 크기)을 10MB(gzip 이후)로 늘리고, 시작 지연 시간제한(스크립트 컴파일 시간)을 200ms에서 400ms로 늘릴 예정입니다.

개발자들에게 더 많은 권한을 부여하기 위해, 메모리 제한 등을 늘리기 위해 등급을 도입하면서 요금 모델을 통합하고 간소화하는 방법에 대해 고민하고 있습니다. 이에 대한 자세한 정보는 조만간 공개될 예정입니다!

이러한 변경으로 개발자들은 더 멋진 애플리케이션을 구축하고 더 적은 비용으로 운영할 수 있게 됩니다! 멋지지 않나요?!?

## 최신 빌드 이미지가 적용된 Pages CI를 만나보세요!

드디어 기다림이 끝났습니다! 이제 Pages에서 최신 빌드 이미지를 사용하여 CI 및 통합 빌드 시스템을 구동합니다. 이번 개선으로 마침내 최신 버전의 Node.js, pnpm 및 오늘날 개발자가 사용하는 기타 여러 도구를 사용할 수 있게 되었습니다.

이번 개선 사항을 제공하면서 향후에도 최신 상태로 유지하기가 훨씬 쉽게 만들었을 뿐만 아니라 빌드 캐싱과 같은 새로운 기능도 추가했습니다!

업데이트는 모든 새 프로젝트에 기본적으로 제공되며, 기존 프로젝트는 새로운 기본값을 선택할 수 있습니다. 마음에 드시나요? 그렇다면 Greg의 [이 블로그 글](https://blog.cloudflare.com/moderizing-cloudflare-pages-builds-toolbox)에서 계속 읽어보세요.

## 이 정도면 충분하군요. 자, 이제 시작하겠습니다…! 당신이 원하는 프레임워크를 C3와 함께!

Cloudflare는 CDN이자 Worker 애플리케이션을 배포하는 장소일 뿐만 아니라 이제 풀스택 웹 애플리케이션을 실행하는 최고의 장소가 되고 있습니다. 여기에는 Angular, Astro, Next, Nuxt, Qwik, Remix, Solid, Svelte, Vue 등과 같은 모든 풀스택 웹 프레임워크가 포함됩니다.

저희의 큰 목표는 더 나은 인터넷을 구축하는 것이며, 이 사명에 대한 저희의 기여는 개발자뿐만 아니라 누구나 아이디어를 실시간으로 배포된 애플리케이션으로 전환할 수 있도록 지원하는 것입니다.

개발자들이 아이디어를 빠르게, 그리고 번거로움 없이 배포된 애플리케이션으로 전환할 수 있도록 두 가지를 구축했습니다.

첫째, 여러 웹 프레임워크 작성자들과 협력하여 모든 널리 사용되는 자바스크립트 웹 프레임워크에 대해 새로운 어댑터를 만들거나 기존 어댑터를 개선했습니다. 이 어댑터들은 애플리케이션이 저희 플랫폼에서 가장 효율적인 방식으로 실행되도록 보장하면서, 플랫폼의 모든 기능과 능력에 접근할 수 있게 합니다.

이러한 어댑터에는 [요청이 많았던 Next.js 어댑터](https://github.com/cloudflare/next-on-pages/)가 포함되어 있으며, 방금 프로덕션 준비를 완료하고 오늘 1.0.0을 출시합니다! 각 팀과 협력하여 [Angular](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare/src/frameworks/angular) 및 [Qwik](https://github.com/dario-piotrowicz/qwik/tree/main/starters/adaptors/cloudflare-pages)을 위한 새로운 어댑터를 구축했으며, Astro, Nuxt, Solid 및 몇 가지를 개선했습니다.

둘째, 저희는 C3라고 부르는 새롭고 멋진 CLI를 개발했습니다. 이는 create-cloudflare CLI를 의미하는 단축어로, 저희의 기존 Wrangler CLI의 형제입니다. 만약 당신이 터미널이나 VSCode와 같은 로컬 에디터에서 대부분의 시간을 보내는 개발자라면, 이 CLI는 Cloudflare 우주로 진입하게 해주는 단일 진입점입니다.

C3 명령을 실행하면 시작할 수 있습니다. 저희는 사용자와 열심히 작업하는 프레임워크 작성자 사이에 있는 것을 원하지 않기 때문에, 사용자가 원하는 프레임워크를 선택하면 C3는 제어권을 선택한 프레임워크의 CLI에게 넘깁니다. 잠시 후 npm 의존성이 모두 설치되고 나면 애플리케이션이 배포된 URL을 받게 됩니다. 이게 다입니다. 거의 즉시 아이디어로부터 공유할 수 있는 URL까지! 와우.

<div style="position: relative; padding-top: 56.25%;"><iframe src="https://customer-eq7kiuol0tk9chox.cloudflarestream.com/729d2f3c66c717696b784e01b30d6e64/iframe?preload=true&amp;poster=https%3A%2F%2Fcustomer-eq7kiuol0tk9chox.cloudflarestream.com%2F729d2f3c66c717696b784e01b30d6e64%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D4s%26height%3D600" style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe></div>

## 웹 애플리케이션을 위한 최적의 장소

정리하자면, 풀스택 웹 프레임워크에 대한 최고 수준의 지원과 플랫폼의 짧은 대기 시간 및 비용 효율성, 풀스택 웹 애플리케이션의 백엔드가 최적의 위치에서 자동으로 실행되도록 하는 스마트 배치, 그리고 개발자 도구의 나머지 모든 중요한 개선 사항이 결합되어 Cloudflare를 웹 애플리케이션을 구축하고 호스팅 하기 위한 최고의 장소로 만들어줍니다. 이것이 저희가 더 나은 인터넷을 만들기 위한 사명에 대한 기여이며, 웹을 전진시키는 방법입니다.

저희는 사람들이 비즈니스를 하고자 할 때, 또는 단지 창의력을 발휘하고 아이디어를 탐구하며 재미있게 보내고 싶을 때 찾는 장소가 되길 희망합니다. 이는 긴 여정이며, 앞으로 저희가 마주하게 될 흥미로운 도전들이 많습니다. [당신의 의견이 저희를 안내하는 데 결정적인 역할을 할 것입니다](https://forms.gle/X7P6BWs529eJRs6LA). 저희 모두는 이 일부가 될 기회를 얻게 되어 흥분하고 있으며, 최선을 다해보려고 합니다. 당신도 이 여행에 참여할 수 있으며, 바로 시작할 수 있습니다.

```bash
npm create cloudflare my-first-app
```