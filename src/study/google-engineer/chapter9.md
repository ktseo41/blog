---
outline: [2, 3]
---

# Chapter 09 - 코드 리뷰

- 소프트웨어 업계에서 실행되는 모습은 매우 다채롭습니다.
- 코드 리뷰는 '버그가 코드베이스로 침투하기 전에 잡아낸다'처럼 확실하고 쉽게 납득되는 이점을 제공합니다. 하지만 미묘한 이점들도 따라옵니다. 한 예로 심리적인 이점들은 시간이 흐르고 조직 규모가 커지면 조직 전반에 커다란 혜택으로 돌아옵니다.

## 9.1 코드 리뷰 흐름

- 코드 리뷰는 소프트웨어 개발 단계 곳곳에서 이루어질 수 있습니다. 구글에서는 변경을 코드베이스에 커밋하게 전에 수행합니다. 코드 리뷰의 최종 목표는 다른 엔지니어로부터 해당 변경을 적용해도 된다는 합의를 이끌어내는 것입니다.

<div class="comment">현재 우리 회사에서 이정도의 코드 리뷰 프로세스는 도입하기 힘들어보인다.</div>

- 보통은 모든 리뷰어가 LGTM을 달아주는 게 관례지만 원칙적으로는 한 개만 얻어도 됩니다.

  *코드는 부채다.

    우리는 코드가 그 자체로 부채임을 인정하고 잊지 말아야 합니다. 없어서는 안 될 부채이긴 하겠으나 존재만으로 어느 순간 누군가가 유지보수해야 할 대상이 되어버립니다. 마치 비행기의 연료처럼 비행기를 띄우려면 반드시 필요하지만, 그 자체가 하중을 늘려 부담으로 작용하죠.

    새로운 프로젝트를 진행하고 새로운 기술을 도입하고 새로운 컴포넌트가 필요할 때가 있습니다. 그럼에도 코드 리뷰는 전에 내린 설계를 번복하거나 재논의하는 자리여서는 안됩니다. 설계를 결정하는 데는 보통 시간이 걸립니다. 새로운 설계 후보를 수차례 제안하고 API 리뷰 회의에서 토론하고 프로토타입을 만들어보기도 하죠. 전혀 새로운 코드를 리뷰하는 일이 뜬금없이 생겨서는 안 되듯이, 코드 리뷰 과정 자체를 기존 결정을 다시 논의할 기회로 보아서는 안 됩니다.

    <div class="comment">프론트엔드만의 관점에서 봤을 때 현재 우리 회사는 컴포넌트나 데이터 흐름상의 설계를 거의 개인적으로, 즉각적으로 결정하고 있다. 그렇기 때문에 구조적으로 아쉬운 상태라고해도, 그에 관해 변경은 어려워져버린 상태로 PR이 생성되게 된다.</div>

## 9.2 코드 리뷰 @ 구글

- 구글에서는 어떤 변경이든 '승인'을 얻으려면 세 가지 측면에서의 리뷰를 통과해야 합니다.
  - 첫째, 다른 엔지니어로부터 정확성과 이해 용이성을 평가받습니다. 즉, 작성자가 의도한 작업을 코드가 적절하게 수행하는지를 봅니다.
  - 둘째, 변경되는 코드 영역을 관리하는 코드 소유자로부터 변경 코드가 적절하다는 승인을 받습니다.
  - 셋째, 누군가로부터 '가독성' 승인을 받습니다.

- 하지만 대부분의 리뷰는 세 역할을 모두 수행할 수 있는 사람 한 명이 처리하기 때문에 이 절차들이 빠르게 진행됩니다. 변경 작성자가 해당 코드의 소유자이자 가독성 인증자라면 LGTM을 달아줄 엔지니어만 추가로 찾으면 됩니다. 작성자가 이미 가독성 기준에 맞는 코드로 리뷰를 요청하니 LGTM 역시 빠르게 얻을 가능성이 높아집니다.
- 이 방식은 참여하는 두 역할의 사람들이 각기 다른 측면에 집중해 리뷰하도록 해주어 시간을 절약해줍니다. 첫 번째 리뷰어인 동료 엔지니어는 코드가 정확한지와 변경된 코드가 유효한지에 집중합니다. 이어서 코드 소유자는 한 줄 한 줄 상세히 살펴보는 대신 자신이 맡은 코드베이스에 적합한 변경인지에 집중합니다. 승인자는 동료 리뷰어와는 다른 관점에서 코드를 살펴보는 것입니다.
- 이유는 무엇일까요? 바로 확장성 때문입니다. 역할을 셋으로 나눔으로써 코드 리뷰 프로세스가 더 유연해지는 것입니다.

<div class="comment">코드 리뷰를 할 때 위와 같은 관점들에서 코드를 살펴보는 것도 좋을 것 같다.</div>

  *소유자

  단순히 해당 영역의 소스 코드가 소유자의 것이라는 뜻이 아니라 회사가 추구하는 가치가 지켜지도록 관리한다는 의미의 소유입니다.

## 9.3 코드 리뷰의 이점

- 소프트웨어 업계에서 코드 리뷰가 필요하다는 데는 논란의 여지가 없지만 구체적인 모습은 아주 제각각입니다.
- 구글은 거의 모든 변경에 코드 리뷰를 요구합니다. 이러한 강제적인 규제는 비용을 유발하고 엔지니어링 속도에도 영향을 줍니다. 까닭은 무엇일까요?
- 대표적인 이점은 다음과 같습니다.
  - 코드가 정확한지 확인해줍니다.
  - 변경된 코드를 다른 엔지니어도 잘 이해합니다.
  - 코드베이스가 일관되게 관리됩니다.
  - 팀이 소유권(주인의식)을 더 강하게 느낍니다.
  - 지식이 공유됩니다.
  - 코드 리뷰 자체의 기록이 남습니다.

<div class="comment">위와같은 이점이 희한하게 와닿지가 않는다. 아마 항상 너무 많은 변경점을 코드 리뷰하고 있었거나, 스파게티 코드에서 또다른 스파게티 코드를 얹는 식의 변경이 많았기 때문일지 모른다. 하지만 만약 어느정도 관리가 된 코드가 있고 그 코드베이스에서 작은 단위의 변경을 점검한다고 하면 코드와 코드 리뷰의 가치가 지속적으로 보존되고 점점 커질 것 같다. 물론 비즈니스가 유지되는 한</div>

### 9.3.1 코드 정확성

- 변경된 코드의 '정확성'을 확인해주며, 코드 리뷰가 주는 가장 확실한 이점입니다.

  *물론 코드 리뷰 프로세스 자체를 단순화하여 가볍게 유지해야만 합니다. 사실 이게 핵심입니다.

- 정확성 평가가 주관적으로 흘러가지 않도록 하기 위해 일반적으로 변경 작성자가 선택한 방식을 존중해줍니다. 리뷰어는 자신이 선호한다는 이유로 다른 안을 주장해서는 안 됩니다. 대안을 제시하는 건 가능하지만 이해하기 더 쉽거나(예컨대 덜 복잡하거나) 기능을 개선하는(예컨대 더 효율적인) 대안일 경우에만 그리 해야 합니다.
- 코드 리뷰는 여러 방어 수단 중 한 축입니다. 만능 치트키도 아니고 정확성을 검사하는 유일한 수단도 물론 아닙니다. 따라서 코드 리뷰가 '완벽'할 필요까지는 없습니다.
<div class="comment">위 사항들 코드 리뷰 프로세스에서 참고하자</div>

- 놀랍게도 코드 정확성 검사는 구글이 코드 리뷰 프로세스에 기대하는 최우선 이점이 아닙니다. 더 중요한 이점이 있습니다. 바로 새로운 코드가 이해하기 쉽고 세월이 흘러 코드베이스가 커져도 여전히 의미가 통할 것이라는 점입니다. 이러한 측면을 평가하려면 단순히 코드가 논리적으로 '정확하다'거나 이해되는지만 살피는 것으로는 부족합니다.


### 9.3.2 코드 이해 용이성

- 코드 리뷰는 주어진 변경이 수많은 다른 사람에게도 쉽게 이해되는지를 평가하는 첫 번째 시험대입니다. 코드는 작성되는 횟수보다 읽히는 횟수가 몇 배는 많으므로 이해하기 쉽게 작성하는 게 매우 중요합니다.
- 리뷰어는 작성자가 선택한 설계를 존중해야 합니다. 하지만 그와 별개로, 코드가 잘 이해되지 않으면 '고객은 항상 옳다'는 관점에서 질문을 던져보는 건 좋습니다. 의문 하나하나는 시간이 지날수록 가치가 몇 배는 커질 것이므로 질문을 하는 게 맞다고 생각합니다.
<div class="comment">위 사항들 코드 리뷰 프로세스에서 참고하자</div>

### 9.3.3 코드 일관성

- 코드가 단순해야 다른 이들이 히해하기 쉽고 유지보수하기도 쉽습니다. 리뷰어는 코드 리뷰 과정에서 주어진 코드가 코드베이스의 표준을 얼마나 잘 따르는가를 평가할 수 있습니다.
- 가독성 승인은 오직 해당 프로그래밍 언어의 코드 가독성 훈련 프로세스를 이수한 사람만이 할 수 있습니다.
- 임무는 주어진 코드가 다음 사항을 잘 만족하는지를 검토하는 것입니다.
  - 해당 프로그래밍 언어의 모범 사례들을 잘 따라야 합니다.
  - 구글 코드 리포지터리에서 같은 언어로 작성된 다른 코드들과 일관되어야 합니다.
  - 필요 이상으로 복잡하지 않아야 합니다.

<div class="comment">자바스크립트, Vue의 모범 사례와 idiom들을 익혀둘 필요가 있어보인다.</div>

### 9.3.4 심리적, 문화적 이점

- 소프트웨어 엔지니어에게 코드는 '자신의 것'이 아니라 협업을 통해 만들어지는 '조직의 공동 소유물'임을 인식시켜주는 효과. 미묘할지 모르지만 그래도 중요한 심리적인 이점이죠.
- 코드 리뷰가 선물하는 또 다른 심리적 이점은 검증입니다. 가장 뛰어난 엔지니어조차 가면 증후군을 겪거나 자기비판이 너무 심할 수 있습니다. 코드 리뷰는 그들의 작업 결과를 검증하고 인정해주는 효과가 있습니다.
- 코드 리뷰는 변경을 제출하기 전에 문제들을 스스로 해결하게끔 해줍니다. 리뷰 요청에 필요한 항목들을 점검하다보면 준비가 충분한지를 엔지니어 스스로 다시 살펴보게 하는 심리적인 효과가 있죠.

### 9.3.5 지식 공유

- 리뷰 프로세스는 제안, 신기술 소개, 조언을 통해 리뷰어가 변경 작성자에게 도메인 지식을 전파하도록 이끌어줍니다.

## 9.4 코드 리뷰 모범 사례

- 코드 리뷰는 조직에 마찰과 일정 지연을 초래할 수 있습니다. 이런 문제 대다수는 사실 코드 리뷰 자체보다는 리뷰를 구체적으로 어떻게 수행하느냐에 기인합니다.
- 공손하고 전문가답게: 절대 가볍게 보고 LGTM을 남발하지 않는다
- 작게 변경하기
- 변경 설명 잘쓰기
- 리뷰어는 최소한으로: 첫 번째 LGTM이 가장 중요하며, 두 번재부터는 크게 신경 쓸 만큼의 가치가 없다는 걸 발견했습니다.
- 가능한 한 자동화하기

<div class="comment">현재는 작은 변경만 하는 경우는 적은 것 같다. 덩어리 큰 변경이 빠르고 많이 올라온다. 왜 그럴까?</div>
<div class="comment">첫 LGTM이 중요하다는 사실이 놀랍고 큰 힌트가 된다.</div>

## 9.5 코드 리뷰 유형

- 그린필드 리뷰와 새로운 기능 개발: 대상 코드가 오랜 기간 존속될 수 있는지를 평가하기에 가장 중요한 기회입니다.
- 동작 변경, 개선, 최적화
- 버그 수정과 롤백
- 리팩터링과 대규모 변경

## 9.7 핵심 정리

- 코드베이스 전반의 정확성 이해 용이성, 일관성 보장 등 이점이 많습니다.
- 여러분의 가정에 대해 항시 다른 사람의 검토를 받도록 하고, 코드를 읽는 사람에게 최적화합니다.
- 전문가다움을 지키면서 중요한 피드백을 받을 기회를 제공하세요.
- 코드 리뷰는 지식을 조직 전체에 공유하는 데도 중요한 역할을 합니다.
- 코드 리뷰 프로세스를 확장하려면 자동화가 아주 중요합니다.
- 코드 리뷰 자체가 변경 이력이 되어줍니다.

## 느낀 점

- 좋았거나 안좋았던 코드 리뷰 경험?
  - 자기확신감이 떨어진 상태에서 approve를 받으면 자기효용성을 느낄 수 있었다.
  - 기획 변경을 제안하는 리뷰가 힘들었다.
- 컴포넌트나 데이터 흐름상의 설계를 거의 개인적으로, 즉각적으로 결정하고 있다. 그렇기 때문에 구조적으로 아쉬운 상태라고해도, 그에 관해 변경은 어려워져버린 상태로 PR이 생성되게 된다.
- 정확성과 이해 용이성, 코드 소유자로부터 변경 코드가 적절하다는 승인, 가독성 세 가지 관점들에서 코드를 살펴보는 것도 좋을 것 같다.