---
feArticle: true
---

# 웹어셈블리에서 자바스크립트를 빠르게 실행하는 방법

> 원문 : https://bytecodealliance.org/articles/making-javascript-run-fast-on-webassembly

![js-on-wasm](https://bytecodealliance.org/articles/img/2021-06-02-js-on-wasm/featured_image.png)

20년 전과 비교하면 브라우저에서 자바스크립트는 훨씬 더 빠르게 실행됩니다. 브라우저 벤더사가 집중적으로 성능 최적화 작업에 시간을 할애했기 때문입니다.

오늘 우리는 다른 규칙이 적용되는, 완전히 다른 환경에서 자바스크립트 성능을 최적화하는 작업을 시작합니다. 그리고 이것은 웹어셈블리 덕에 가능합니다.

먼저 확실히 해야 할 것이 있습니다. 브라우저에서 자바스크립트를 실행할 때는 간단히 자바스크립트를 배포하는 것이 가장 합리적인 선택입니다. 브라우저 내의 자바스크립트 엔진(JS 엔진)은 탑재된 자바스크립트를 실행하기 위해 고도로 조정되어 있기 때문입니다.

하지만 만약 서버리스 함수에서 자바스크립트를 실행하고 있다면 어떨까요? 또는 iOS나 게임 콘솔과 같이 일반적인 JIT(Just-In-Time) 컴파일을 허용하지 않는 환경에서 자바스크립트를 실행하고 싶다면요?

이와 같은 사례들의 경우, 오늘 알아볼 새로운 자바스크립트 최적화 물결에 주의를 기울여야 합니다. 이 작업은 또 비슷한 환경들에서 빠르게 실행되기를 원하는 Python, Ruby, Lua과 같은 다른 런타임들의 모델 역할을 할 수도 있습니다.

그러나 본격적으로 알아보기 전에, 기본적인 작동 방식을 살펴봐야 합니다.

## 어떻게 작동하나요?

자바스크립트를 실행하려면, 자바스크립트 소스 코드는 어떤 방법으로든 기계어로 번역돼 실행되어야 합니다. 번역된 기계어는 인터프리터나 JIT 컴파일러와 같은, 다양한 기술을 사용하는 JS 엔진에서 수행됩니다. (자세한 사항은 [JIT(Just-In-Time) 컴파일러 집중 과정](https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers/)를 참조하세요.)

![Personified JS engine looking at JS source code and speaking the equivalent bytes of machine code out loud](https://bytecodealliance.org/articles/img/2021-06-02-js-on-wasm/02-02-interp02.png)

그러나 만약 실행하려는 플랫폼에 JS 엔진이 없다면 어떻게 해야할까요? 코드와 함께 JS 엔진을 배포해야 합니다.

이를 위해 JS 엔진을 웹어셈블리 모듈로 배포해 다양한 종류의 머신 아키텍처에서 이식될 수 있도록 했습니다. 그리고 WASI(웹어셈블리 시스템 인터페이스)를 사용하면 다른 운영 체제에도 이식될 수 있습니다.

이는 전체 자바스크립트 환경이 이 웹어셈블리 인스턴스에 묶인다는 것을 의미합니다. 그래서 일단 배포하고 나면, 자바스크립트 코드를 전달하기만 하면 해당 코드가 실행됩니다.

![A box representing the Wasm engine wrapping a box representing the JS engine, with a JS file being passed through the Wasm engine to the JS engine.](https://bytecodealliance.org/articles/img/2021-06-02-js-on-wasm/01-02-how-it-works.png)

그럼 기계의 메모리에서 직접 작업이 이뤄지는 대신, JS 엔진은 바이트코드부터 바이트코드가 조작하는 GCed(Garbage Collected) 객체까지 모든 것을 Wasm 모듈의 선형 메모리에 넣습니다.

![The personified JS engine putting translated machine code bytes into the linear memory inside its box](https://bytecodealliance.org/articles/img/2021-06-02-js-on-wasm/01-03-how-it-works.png)

JS 엔진으로는 Firefox에서 사용되는 SpiderMonkey를 사용했습니다. SpiderMonkey는 브라우저에서 숱한 테스트를 거친, 업계에서 가장 강력한 자바스크립트 VM 중 하나입니다. 신뢰할 수 없는 코드 또는 신뢰할 수 없는 입력을 처리하는 코드를 실행할 때 이런 종류의 보안 테스트 및 투자는 중요합니다.

SpiderMonkey는 또한 정밀 스택 스캔(precise stack scanning)이라는 기술을 사용합니다. 뒤에서 설명하겠지만, 이는 일부 최적화에 중요한 기술입니다. 또 이해하고 읽기 매우 쉬운 코드 베이스를 가지고 있는데, 이는 Fastly, Mozilla 및 Igalia 3개의 다른 조직의 구성원들이 협력하고 있는 상황이기 때문에 중요합니다.

지금까지 설명한 접근 방식에서 혁신적인 것은 없습니다. 사람들은 이미 몇 년 동안 이처럼 웹어셈블리로 자바스크립트를 실행해 왔습니다.

문제는 느리다는 것입니다. 웹어셈블리는 새로운 기계 코드를 동적으로 생성하고 순수한 웹어셈블리 코드 내에서 실행할 수 없습니다. 즉, JIT를 사용할 수 없습니다. 인터프리터만 사용할 수 있습니다.

이 제약 조건을 감안하면, 당신은 다음과 같이 질문할 수 있습니다...

## 그럼 대체 왜 하는 건가요?

JIT를 통해 브라우저가 자바스크립트를 빠르게 실행할 수 있기 때문에(그리고 웹어셈블리는 모듈 내부에서 JIT 컴파일을 할 수 없기 때문에) 웹어셈블리를 사용하는 것이 직관에 반하는 것처럼 보일 수 있습니다.

![A horrified developer screaming "But Why!?"](https://bytecodealliance.org/articles/img/2021-06-02-js-on-wasm/02-01-but-why.png)

하지만 만약 이런 상황에도 불구하고 자바스크립트를 빠르게 실행할 수 있다면 어떨까요?

이게 가능할 때, 유용할 수 있는 몇 가지 사례를 살펴보겠습니다.

### iOS(및 기타 JIT 제한 환경)에서 자바스크립트 실행

보안 문제로 인해 JIT를 사용할 수 없는 곳들이 있습니다 (예: 권한이 없는 iOS 앱, 일부 스마트 TV 및 게임 콘솔).

![An iPhone, a smart TV, and a gaming controller](https://bytecodealliance.org/articles/img/2021-06-02-js-on-wasm/02-02-non-jit-devices.png)

이런 플랫폼에서는 인터프리터를 사용해야 합니다. 하지만 이런 플랫폼에서 실행되는 애플리케이션은 오래 실행되며 많은 코드가 필요합니다… 역사적으로, 이런 환경은 실행 속도를 훨씬 더 늦추기 때문에 인터프리터를 _사용하고 싶지 않은_ 환경입니다.

만약 기존 접근 방식을 빠르게 만들 수 있다면, 개발자들은 지나친 성능 저하 없이도 JIT가 없는 플랫폼에서 자바스크립트를 사용할 수 있습니다.

### 서버리스를 위한 즉각적인 콜드 스타트

JIT가 문제가 아니지만 서버리스 함수와 같이 시작 시간이 문제인 것들도 있습니다. 여러분들도 한 번쯤은 들어봤을 콜드 스타트(cold-start) 지연 문제입니다.

![A picture of a cloud with lots of edge network nodes around it](https://bytecodealliance.org/articles/img/2021-06-02-js-on-wasm/02-03-cloud.png)

가장 잘 갖춰진 자바스크립트 환경(순수히 JS 엔진만 가동하는 격리 환경)을 사용하는 경우에도 시작 지연 시간이 최소 5밀리 초까지 걸릴 수 있습니다. 여기에는 응용 프로그램을 초기화하는 데 걸리는 시간은 포함되지도 않습니다.

시작 시간 지연을 숨기는 방법들이 있습니다. 그러나 QUIC과 같은 제안에서 네트워크 계층에서 연결 시간이 최적화되고 있으므로 이를 숨기기가 점점 더 어려워지고 있습니다. 또한 여러 서버리스 기능을 함께 연결하는 것과 같은 작업을 수행할 때 이를 숨기는 것은 더욱 어렵습니다.

지연 시간을 숨기기 위해 이러한 기술을 사용하는 플랫폼은 종종 다른 요청 간에 인스턴스를 재사용합니다. 이는 때에 따라 서로 다른 요청 간에 전역 상태를 관찰할 수 있음을 의미하며 보안상 위험합니다.

콜드 스타트 문제로 인해 개발자들은 종종 모범 사례를 따르지 않습니다. 하나의 서버리스 배포에 많은 기능을 포함합니다. 이에 따라 장애 범위가 더 커질 수 있는 또 다른 보안 문제가 발생합니다. 해당 서버리스 배포의 한 부분이 악용되면 공격자는 해당 배포의 모든 항목에 접근할 수 있습니다.

![On the left, a cartoon captioned "Risk between requests". It shows burgalers in a room filled with papers saying "Oooh payday... check out what they left behind!" On the right, a cartoon captioned "Risk between modules". It shows a tree of modules with a module at the bottom being exploded and other modules in the tree getting hit by shrapnel.](https://bytecodealliance.org/articles/img/2021-06-02-js-on-wasm/02-04-serverless-at-risk.png)

그러나 이런 상황에서 자바스크립트 시작 시간을 충분히 빠르게 할 수 있다면, 갖가지 방법으로 시작 시간을 숨길 필요가 없습니다. 그저 마이크로초 안에 인스턴스를 시작하면 됩니다.

결과적으로 각 요청마다 새 인스턴스를 사용할 수 있습니다. 즉, 여러 요청 사이에 공유되는 상태가 존재하지 않습니다.

이 인스턴스들은 매우 가볍기 때문에 개발자는 자유롭게 코드를 세분화할 수 있고, 단일 코드 조각에 대한 장애 반경이 최소화됩니다.

![On the left, a cartoon captioed "isolation between requests". It shows the same bugalers, but in a totally clean room saying "Nuthin'... they didn't leave nuthin' behind." On the right, a cartoon captioned "isolation between modules". It shows a module graph with each module having its own box around it, and the explosion from the exploding module being contained to its own box](https://bytecodealliance.org/articles/img/2021-06-02-js-on-wasm/02-05-serverless-protected.png)

이 접근 방식에는 또 다른 보안 이점이 있습니다. 단순히 경량화되고 세분화된 격리를 가능하게 하는 것 외에도, Wasm 엔진의 보안 경계는 더 신뢰할 수 있습니다.

격리를 생성하는 데 사용되는 기존 JS 엔진은 매우 복잡한 최적화를 수행하는 많은 저수준 코드를 포함하는 대규모 코드 베이스입니다. 때문에, 공격자가 VM을 탈출하고 VM이 실행 중인 시스템에 액세스 할 수 있도록 허용하는 버그가 발견되기도 쉽습니다. 이것이 바로 [Chrome](https://www.chromium.org/Home/chromium-security/site-isolation) 및 [Firefox](https://blog.mozilla.org/security/2021/05/18/introducing-site-isolation-in-firefox/)에서 각 사이트가 완전히 분리된 프로세스에서 실행되도록 최대한 노력하는 이유입니다.

이와 비교해서, Wasm 엔진은 훨씬 적은 코드가 필요하므로 검사하기가 더 쉽고, 많은 부분이 메모리 안전성이 보장된 언어인 Rust로 작성됩니다. 그리고 웹어셈블리 모듈에서 생성된 기본 바이너리의 메모리 격리는 [검증할 수 있습니다](http://cseweb.ucsd.edu/~dstefan/pubs/johnson:2021:veriwasm.pdf).

Wasm 엔진 내부에서 JS 엔진을 실행함으로써 우리는 외부에 더 안전한 샌드박스 경계를 또 다른 방어선으로 갖게 됩니다.

앞선 사례들을 살펴보니 Wasm에서 자바스크립트를 빠르게 만드는 것에는 큰 이점이 있었습니다. 그래서 어떻게 할 수 있을까요?

이 질문에 답하려면, JS 엔진이 시간을 할애하는 영역을 이해해야 합니다.

## JS 엔진이 시간을 보내는 두 영역

JS 엔진이 수행하는 작업은 대략 두 부분으로 나눌 수 있습니다: 초기화와 런타임.

저는 JS 엔진을 청부업자라고 생각합니다. 이 청부업자는 자바스크립트 코드를 실행하고 결과를 얻는 작업을 완료하기 위해 존재합니다.

![The JS engine shaking hands with a JS file and saying "I'm looking forward to helping you with this project!"](https://bytecodealliance.org/articles/img/2021-06-02-js-on-wasm/03-01-office-handshake.png)

### 초기화 단계

청부업자는 실제로 프로젝트 실행을 시작하기 전에 약간의 예비 작업을 수행해야 합니다. 초기화 단계에는 실행의 시작 단계에서 한 번만 실행되면 되는 모든 것들이 포함됩니다.

#### 애플리케이션 초기화

모든 프로젝트에서 청부업자는 고객이 원하는 작업을 살펴본 다음, 해당 작업을 완료하는 데 필요한 리소스들을 설정합니다.

예를 들어, 청부업자는 프로젝트 브리핑 및 기타 문서들을 읽고 작업하기 쉬운 형식으로 변환합니다. 예를 들어 모든 문서를 저장하고 정리하면서 프로젝트 관리 시스템을 세팅합니다.

![The JS engine sitting in its office with the JS file and saying "So tell me more about the work you want to get done"](https://bytecodealliance.org/articles/img/2021-06-02-js-on-wasm/03-03-office-kickoff.png)

JS 엔진의 경우 이 작업은 소스 코드의 최상위 레벨을 읽어가며 함수를 바이트 코드로 파싱 하고, 선언된 변수에 메모리를 할당하고, 이미 정의된 값들을 세팅하는 것과 비슷합니다.

#### 엔진 초기화

서버리스와 같은 특정 환경에서는, 각 애플리케이션 초기화 전에 발생하는 또 다른 초기화 부분이 있습니다.

바로 엔진 초기화입니다. 먼저 JS 엔진 자체를 시작해야 하고 내장 함수들을 환경에 추가해야 합니다.

이는 작업을 시작하기 전에 이케아 의자와 테이블을 조립하는 것처럼 사무실 자체를 세팅하는 것과 비슷하다고 생각합니다.

![The JS engine building the IKEA table for its office](https://bytecodealliance.org/articles/img/2021-06-02-js-on-wasm/03-02-office-ikea.png)

이 작업은 상당한 시간이 걸릴 수 있으며 서버리스 사용 사례에서 콜드 스타트 문제를 만드는 원인이기도 합니다.

### 런타임 단계

초기화 단계가 완료되면 JS 엔진이 코드 실행 작업을 시작할 수 있습니다.

![The JS engine moving cards across a Kanban board, all the way to the done position](https://bytecodealliance.org/articles/img/2021-06-02-js-on-wasm/03-04-office-kanban.png)

이 영역의 속도를 스루풋(throughput)이라고 하며 이 스루풋은 다양한 변수의 영향을 받습니다. 예를 들어보면,

- 사용하는 언어의 기능
- JS 엔진의 관점에서 코드가 예측할 수 있게 동작하는지 여부
- 어떤 종류의 데이터 구조가 사용되는지
- 코드가 JS 엔진의 최적화 컴파일러를 활용할 수 있을 만큼 충분히 오래 실행되는지 여부

이것이 JS 엔진이 시간을 보내는 두 단계입니다.

![A sequence of the three previous images, showing the office building and requirements gathering as initialization, and moving work across the Kanban board as runtime.](https://bytecodealliance.org/articles/img/2021-06-02-js-on-wasm/03-05-office-sequence.png)

그럼 이 두 단계의 작업을 어떻게 더 빠르게 진행할 수 있을까요?

## 초기화 시간을 대폭 단축시키기

우리는 [Wizer](https://github.com/bytecodealliance/wizer)라는 도구로 초기화를 빠르게 만들기 시작했습니다. 천천히 설명하겠지만 성급하신 분들을 위해 먼저 보여드리겠습니다, 간단한 자바스크립트 애플리케이션을 실행할 때 아래와 같은 속도 향상이 있었습니다.

![A graph showing startup latency times. JS isolate takes 5ms and JS on Wasm takes 0.36ms.](https://bytecodealliance.org/articles/img/2021-06-02-js-on-wasm/04-01-startup-latency-vs-isolate.png)

간단한 애플리케이션을 Wizer로 실행하면 0.36 밀리초(또는 360 마이크로초)밖에 걸리지 않았습니다. 이는 일반적인 자바스크립트 접근 방식에서보다 13배 이상 빠릅니다.

우리는 스냅샷이라는 것을 사용해 시작 시간을 향상시켰습니다. Nick Fitzgerald가 [WebAssembly Summit talk about Wizer](https://youtu.be/C6pcWRpHWG0?t=1338)에서 자세히 설명했습니다.

그래서 어떻게 작동하냐구요? 코드가 배포되기 전 빌드 단계의 일환으로, 초기화가 끝날 때까지 JS 엔진을 사용하여 자바스크립트 코드를 실행합니다.

이 시점에 JS 엔진은 모든 자바스크립트를 파싱해 바이트코드로 전환하고, 이 바이트코드는 JS 엔진 모듈에 의해 선형 메모리에 저장됩니다. 또한 이 단계에서 엔진은 많은 메모리 할당 및 초기화를 수행합니다.

이 선형 메모리는 매우 독립적이기 때문에, 모든 값이 채워지면 그저 메모리를 가져와 데이터 섹션으로써 Wasm 모듈에 연결할 수 있습니다.

JS 엔진 모듈이 인스턴스화 되면, 데이터 섹션의 모든 데이터에 접근할 수 있습니다. 엔진이 어떤 데이터가 필요하다면 필요한 데이터 섹션(또는 그저 메모리 페이지를)을 자체 선형 메모리에 복사할 수 있습니다. 따라서 JS 엔진은 시작할 때 어떤 설정도 할 필요가 없습니다. 사전에 초기화된 모든 값이 준비되어 대기 중입니다.

![A wasm file split between code and data sections, with the data section being poured into linear memory.](https://bytecodealliance.org/articles/img/2021-06-02-js-on-wasm/04-02-wasm-file-copy-mem.png)

현재는 이 데이터 섹션을 JS 엔진과 동일한 모듈에 연결합니다. 하지만 앞으로 [모듈 연결](https://github.com/WebAssembly/module-linking/blob/master/proposals/module-linking/Explainer.md)이 준비되면 데이터 섹션을 별도의 모듈로 이용할 수 있습니다. 그럼 JS 엔진 모듈을 다양한 자바스크립트 애플리케이션에서 재사용할 수 있습니다.

이렇게 되면 정말 깔끔한 분리가 가능합니다.

JS 엔진 모듈은 엔진용 코드만 포함하게 됩니다. 즉, 일단 컴파일되면 해당 코드를 효과적으로 캐시 하고 많은 다른 인스턴스 간에 재사용할 수 있습니다.

반면 애플리케이션 모듈에는 Wasm 코드가 포함되지 않습니다. 초기화된 나머지 JS 엔진 상태와 함께 자바스크립트 바이트코드를 포함하는 선형 메모리만 포함합니다. 이렇게 하면 이 메모리를 쉽게 필요한 곳으로 보낼 수 있습니다.

![Two wasm files next to each other. The one for the JS engine module only has a code section, the other for the JS application module only has a data section](https://bytecodealliance.org/articles/img/2021-06-02-js-on-wasm/04-03-wasm-file-data-vs-code.png)

이건 마치 JS 엔진 청부업자에게 사무실이 전혀 필요하지 않은 것과 같습니다. 대신 여행용 케이스만 가지고 다닙니다. 여행용 케이스에는 전체 사무실이 있고, JS 엔진이 작동할 수 있도록 모든 설정과 준비도 되어 있습니다.

![A personified Wasm engine placing a snapshot of the JS engine's office down inside of the Wasm engine and saying "I'll just set this down for you so you can get right to work"](https://bytecodealliance.org/articles/img/2021-06-02-js-on-wasm/04-04-preinitiatlized-engine.png)

그리고 이 방식의 가장 멋진 점은 자바스크립트에 의존적이지 않다는 것입니다. 웹어셈블리의 기존 속성을 사용하는 것뿐입니다. 따라서 Python, Ruby, Lua 또는 기타 런타임에서도 이와 동일한 기술을 사용할 수 있습니다.

## 다음 단계: 스루풋 개선

따라서 이 접근 방식을 사용해 매우 빠른 초기화 시간을 얻을 수 있습니다. 그럼 스루풋은요?

일부 사용 사례의 경우 스루풋이 그렇게 나쁘지 않습니다. 매우 짧게 실행되는 자바스크립트 조각인 경우, 어쨌든 JIT를 거치지 않고 전체가 인터프리터를 통해 실행됩니다. 따라서 이 경우 스루풋은 브라우저에서와 거의 동일하며, 기존의 JS 엔진이 초기화를 완료하기 전에 완료됩니다.

그러나 더 오래 실행되는 자바스크립트라면 JIT가 금방 작동하기 시작합니다. 일단 작동하기 시작하면 스루풋 차이가 분명해지기 시작합니다.

위에서 말했듯이 현재 순수한 웹어셈블리 내에서 코드를 JIT 컴파일하는 것은 불가능합니다. 다만 JIT에 적용되는 개념 중 일부를 Ahead-Of-Time 컴파일 모델에 적용할 수 있음이 밝혀졌습니다.

### (프로파일링 없이) AOT 컴파일된 빠른 JS 

JIT가 사용하는 한 가지 최적화 기술은 인라인 캐싱(Inline Caching, 이하 IC)입니다. 인라인 캐싱을 통해, JIT는 자바스크립트 바이트코드가 과거에 실행된 모든 방식에 대한 빠른 기계어 경로를 포함하는 스텁의 연결 리스트를 생성합니다. (자세한 사항은 [JIT(Just-In-Time) 컴파일러 집중 과정](https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers/) 참고하세요)

![The personified JS engine standing in front of a matrix of JS bytecode entries and creating machine code stubs for them based on frequency feedback from a monitor](https://bytecodealliance.org/articles/img/2021-06-02-js-on-wasm/02-06-jit09.png)

이 리스트가 필요한 이유는 자바스크립트의 동적 타입 때문입니다. 코드 라인이 다른 타입을 사용할 때마다 새 스텁을 생성하고 목록에 추가해야 합니다. 그러나 이전에 같은 타입을 사용해 실행한 적이 있다면 이미 생성된 스텁을 사용할 수 있습니다.

인라인 캐싱은 일반적으로 JIT에서 사용되기 때문에, 인라인 캐싱이 매우 동적이고 프로그램마다 고유하다고 생각되는 경우가 많습니다. 그러나 AOT 환경에서도 적용될 수 있음이 밝혀졌습니다.

그리고 자바스크립트 코드를 살펴보지 않아도, 생성해야 할 많은 IC 스텁들을 알 수 있습니다. JS에는 많이 사용되는 패턴이 있기 때문입니다.

좋은 예는 객체의 속성에 접근하는 것입니다. 이는 많은 자바스크립트 코드에서 일어나며 IC 스텁을 사용해 속도를 높일 수 있습니다. 특정 "모양(shape)" 또는 "숨겨진 클래스"(즉, 동일한 방식으로 배치된 속성들)가 있는 객체의 경우 특정 속성에 접근할 때 해당 속성은 항상 동일한 오프셋에 있습니다.

전통적으로 JIT의 이러한 종류의 IC 스텁은 모양에 대한 포인터와 속성의 오프셋이라는 두 가지 값을 하드 코딩합니다. 이를 위해서는 사전에(Ahead-Of-Time)는 알 수 없는 정보가 필요합니다. 그러나 우리는 IC 스텁을 매개변수화 할 수 있습니다. 모양과 속성 오프셋을 스텁에 전달되는 변수로 취급할 수 있습니다.

이렇게 하면 메모리에서 값을 로드하는 단일 스텁을 생성한 다음, 모든 곳에서 이 스텁 코드를 사용할 수 있습니다. 자바스크립트 코드가 실제로 수행하는 작업과 관계없이 이러한 공통 패턴들에 대한 모든 스텁을 AOT 컴파일된 모듈에 만들어들 수 있습니다. 심지어 브라우저에서도 이 IC를 공유하면 유용할 수 있습니다. JS 엔진이 더 적은 기계어를 생성하게 돼 시작 시간과 명령 캐시 지역성(instruction-cache locality)을 개선하기 때문입니다.

이번 사례에서는 이 개념이 특히 중요합니다. 자바스크립트 코드가 실제로 수행하는 작업과 관계없이, 이러한 공통 패턴에 대한 모든 스텁을 AOT 컴파일된 모듈에 마련해둘 수 있음을 의미하기 때문입니다.

우리는 몇 킬로바이트의 IC 스텁으로 모든 자바스크립트 코드의 대부분을 다룰 수 있다는 것을 발견했습니다. 예를 들어 2KB의 IC 스텁으로 Google Octane 벤치마크에서 자바스크립트의 95%를 커버할 수 있습니다. 예비 테스트에서 이 비율은 일반적인 웹 브라우징에서도 유지되는 것으로 보입니다.

![A small pile of stubs on the left and a large pile of JS files on the right](https://bytecodealliance.org/articles/img/2021-06-02-js-on-wasm/talk-stub-coverage.png)

이런 종류의 최적화를 적용하면 초기 JIT와 동등한 스루풋에 도달할 수 있을 것입니다. 해당 작업을 완료하고 나면 브라우저의 JS 엔진 팀이 초기 JIT에서 그랬듯이, 더 디테일한 최적화를 추가하고 성능을 연마할 것입니다.

### 다음, 다음 단계: 약간의 프로파일링을 추가할 수 있을지도요?

앞서 말한 것들이 프로그램이 뭘 하고 어떤 타입들이 프로그램에서 사용되는지 알지 못한 채로, 미리(Ahead-Of-Time) 할 수 있는 것들입니다.

그러나 JIT가 가지고 있는 것과 같은 종류의 프로파일링 정보에 접근할 수 있다면 어떨까요? 그럼 코드를 완전히 최적화할 수 있습니다.

다만 여기에는 문제가 있습니다. 개발자는 종종 자신의 코드를 프로파일링하는 데 어려움을 겪습니다. 대표적인 샘플 워크로드를 찾는 건 어렵습니다. 따라서 좋은 프로파일링 데이터를 얻을 수 있을지 확신할 수 없습니다.

프로파일링을 위해 좋은 도구를 사용할 수 있는 방법을 알아낼 수만 있다면, 자바스크립트를 오늘날의 JIT만큼 빠르게 실행할 수도 있습니다 (그리고 이 방식에는 예열 시간도 필요 없습니다!).

## 당장 시작하는 방법

우리는 이 새로운 접근 방식에 대해 매우 기대가 크고, 어디까지 추진할 수 있을지 기대하고 있습니다. 또 다른 동적 타입 언어들이 같은 방식으로 웹어셈블리에 제공되는 것을 보기를 기대하고 있습니다.

당장 시작할 수 있는 몇 가지 방법이 있습니다. 궁금한 점이 있는 경우 [Zulip](https://bytecodealliance.zulipchat.com/)에서 물어보세요.

### 자바스크립트를 지원하려는 다른 플랫폼의 경우

자체 플랫폼에서 자바스크립트를 실행하려면 WASI를 지원하는 웹어셈블리 엔진을 내장해야 합니다. 이를 위해 [Wasmtime](https://github.com/bytecodealliance/wasmtime)를 사용할 수 있습니다.

그런 다음 JS 엔진이 필요합니다. 이 작업의 일환으로 SpiderMonkey를 WASI로 컴파일하기 위해 Mozilla의 빌드 시스템에 대해 전폭적인 지원을 하고 있습니다. 그리고 Mozilla는 Firefox를 빌드하고 테스트하는 데 사용되는 것과 동일한 CI 설정에 SpiderMonkey용 WASI 빌드를 추가하려고 합니다. 이는 WASI가 SpiderMonkey의 프로덕션 목표 중 하나가 되게 하고, WASI 빌드가 시간이 지나도 계속 작동함을 보장합니다. 즉, 앞서 설명한 방식 그대로 [SpiderMonkey를 사용](https://spidermonkey.dev/)할 수 있습니다.

마지막으로, 사용자가 사전 초기화된 JS를 가져와야 합니다. 이를 돕기 위해 [Wizer](https://github.com/bytecodealliance/wizer)를 오픈 소스화 했고, 이를 [빌드 도구에 통합](https://github.com/bytecodealliance/wizer#using-wizer-as-a-library)해 JS 엔진 모듈의 사전 초기화된 메모리를 채우는, 애플리케이션별 웹어셈블리 모듈을 생성할 수 있습니다.

### 이 접근 방식을 사용하려는 다른 언어의 경우

Python, Ruby, Lua 등과 같은 언어 커뮤니티의 일원이라면 해당 언어에 대한 버전도 빌드할 수 있습니다.

먼저, 앞서 SpiderMonkey를 이용했던 것처럼, 시스템 호출에는 WASI를 사용하여 런타임을 웹어셈블리로 컴파일해야 합니다. 그런 다음 스냅샷으로 빠른 시작 시간을 얻으려면 역시 앞서 설명한 것처럼 [Wizer를 빌드 도구에 통합](https://github.com/bytecodealliance/wizer#using-wizer-as-a-library)해 메모리 스냅샷을 생성할 수 있습니다.

<br>
<br>
