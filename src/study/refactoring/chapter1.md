# Chapter 01 - 리팩터링: 첫 번째 예시

## 인상깊은 문장, 코드들

### 1.2 예시 프로그램을 본 소감

- 프로그램이 잘 작동하는 상황에서 그저 코드가 '지저분하다'는 이유로 불평하는 것은 프로그램의 구조를 너무 미적인 기준으로만 판단하는 건 아닐까? 컴파일러는 코드가 깔끔하든 지저분하든 개의치 않으니 말이다. 하지만 그 코드를 수정하려면 사람이 개입되고, 사람은 코드의 미적 상태에 민감하다. 설계가 나쁜 시스템은 수정하기 어렵다. 원하는 동작을 수행하도록 하기위해 수정해야 할 부분을 찾고, 기존 코드와 잘 맞물려 작동하게 할 방법을 강구하기가 어렵기 떄문이다. 무엇을 수정할지 찾기 어렵다면 실수를 저질러서 버그가 생길 가능성도 높아진다.

- 그래서 나는 수백 줄짜리 코드를 수정할 때면 먼저 프로그램의 작동 방식을 더 쉽게 파악할 수 있도록 코드를 여러 함수와 프로그램 요소로 재구성한다. 프로그램의 구조가 빈약하다면 대체로 구조부터 바로잡은 뒤에 기능을 수정하는 편이 작업하기가 훨씬 수월하다.

- 프로그램이 새로운 기능을 추가하기에 편한 구조가 아니라면, 먼저 기능을 추가하기 쉬운 형태로 리팩터링하고 나서 원하는 기능을 추가한다.

### 1.3 리팩터링의 첫 단계

-  리팩터링의 첫 단계는 항상 똑같다. 리팩터링할 코드 영역을 꼼꼼하게 검사해줄 테스트 코드들부터 마련해야 한다. 리팩터링에서 테스트의 역할은 굉장히 중요하다. 리팩터링 기법들이 버그 발생 여지를 최소화하도록 구성됐다고는 하나 실제 작업은 사람이 수행하기 때문에 언제든 실수할 수 있다.

### 1.4 statement() 함수 쪼개기

```js{16-36}
export default function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];

    let thisAmount = 0;

    switch (play.type) {
      case 'tragedy': // 비극
        thisAmount = 40000;

        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case 'comedy': // 희극
        thisAmount = 30000;

        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;

        break;

      default:
        throw new Error(`알 수 없는 장르 : ${play.type}`);
    }

    // 포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);

    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ('comedy' === play.type) {
      volumeCredits += Math.floor(perf.audience / 5);
    }

    result += `${play.name} : ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }

  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;

  return result;
}
```

-  switch문을 살펴보면 한 번의 공연에 대한 요금을 계산하고 있다. 이러한 사실은 코드를 분석해서 얻은 정보다. 워드 커닝햄(Ward Cunningham)이 말하길, 이런 식으로 파악한 정보는 휘발성이 높기로 악명 높은 저장 장치인 내 머릿속에 기록되므로, 잊지 않으려면 재빨리 코드에 반영해야 한다.
-  여기서는 코드 조각을 별도 함수로 추출하는 방식으로 앞서 파악한 정보를 코드에 반영할 것이다.
-  추출한 함수에는 그 코드가 하는 일을 설명하는 이름을 지어준다. amountFor(aPerformance)정도면 적당해 보인다.
-  이 절차를 따로 기록해두고, **함수 추출하기**란 이름을 붙였다.
-  먼저 별도 함수로 빼냈을 때 유효범위를 벗어나는 변수, 즉 새 함수에서는 곧바로 사용할 수 없는 변수가 있는지 확인한다. 이번 예에서는 perf, play, thisAmount가 여기 속한다. perf와 play는 추출한 새 함수에서도 필요하지만 값을 변경하지 않기 때문에 매개변수로 전달하면 된다. 한편, thisAmount는 함수 안에서 값이 바뀌는데, 이런 변수는 조심해서 다뤄야 한다. 이번 예에서는 이런 변수가 하나뿐이므로 이 값을 반화하도록 작성했다. 결과는 다음과 같다.

```js
function amountFor(perf, play) { // 값이 바뀌지 않는 변수는 매개변수로 전달
    let thisAmount = 0; // 변수를 초기화하는 코드

    switch(play.type) {
        case "tragedy":
            thisAmount = 40000;
            if (perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
            }
        break;
            case "comedy":
                thisAmount = 30000;
            if (perf.audience > 20) {
                thisAmount += 10000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 += 300 * perf.audience;
            break;
        default:
            throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    return thisAmount;
}
```

> -> 코드의 어떤 영역을 함수로 추출할지는 어떻게 결정할까? `switch문이 적당해보인다.`는 판단은 이 코드에서는 그나마 쉬워보이지만 실제 코드에서는 적절해보이는 것을 어떻게 찾을 것인가?

#### play 변수 제거하기

- play는 개별 공연(perf)에서 얻기 때문에 애초에 매개변수로 전달할 필요가 없다. 그냥 amountFor() 안에서 다시 계산하면 된다. 나는 긴 함수를 쪼갤 때마다 play 같은 변수를 최대한 제거한다. 이런 **임시 변수**들 때문에 로컬 범위에 존재하는 이름이 늘어나서 추출 작업이 복잡해지기 때문이다.

> -> 실제로는 perf와 plays 두 변수에 의존하고 있는 것이므로, `amountFor(perf, plays)`가 되어야하는 것 아닐까? play 임시 변수를 제거하기 위해서 사용한 playFor 함수는 plays를 클로져로 참조하는 지역함수이다. 지역함수를 선언하고 사용하는 것은 낯기도 하고, 의존하고 있는 데이터를 암시적으로 포함하는 것은 괜찮을까?

#### format 변수 제거하기

- "format"은 이 함수가 하는 일을 충분히 설명해주지 못한다. 템플릿 문자열 안에서 사용될 이름이라서 "formatAsUSD"라고 하기에는 또 너무 장황하다. 이 함수의 핵심은 화폐 단위 맞추기다. 그 느낌을 살리는 이름을 골라서 **함수 선언 바꾸기**를 적용했다.

> -> 함수 선언 바꾸기를 하나의 리팩터링 방법으로 정했다는 것을 주의깊게 이해해야할 것 같다.

- 처음에는 당장 떠오르는 최선의 이름을 사용하다가, 나중에 더 좋은 이름이 떠오를 때 바꾸는 식이 좋다. 흔히 코드를 두 번 이상 읽고 나서야 가장 적합한 이름이 떠오르곤 한다.

#### volumeCredits 변수 제거하기

- **반복문 쪼개기**로 volumeCredits 값이 누적되는 부분을 따로 빼낸다.

```js
// ...
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);

    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} . (${perf.audience}석)\n`;
    totalAmount += amountFor(perf);
  }
// ...
```

->

```js{6-13}
// ...
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} . (${perf.audience}석)\n`;
    totalAmount += amountFor(perf);
  }

  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);
  }
// ...
```

> -> 이 반복문 쪼개기도 인상깊었다. 실제 우리 코드에는 하나의 반복문에서 다양한 행위를 수행하는 경우가 많이 존재하는 것 같은데, 반복문의 숫자가 많아진다고 하더라도 

- **문장 슬라이드하기**를 적용해서 volumeCredits 변수를 선언하는 문장을 반복문 바로 앞으로 옮긴다.

```js{10}
// ...
  let totalAmount = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} . (${perf.audience}석)\n`;
    totalAmount += amountFor(perf);
  }

  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);
  }
// ...
```
> -> 변수 선언 위치를 옮기는 것도 하나의 리팩터링 과정이라는 것이 역시 같은 이유로 인상깊다. 물론 여기서는 관심사를 한 군데에 모아서 별도로 분리하려는 목적이 눈에 보이지만, 변수 선언 위치도 신경써야할 중요한 부분이라는 것을 기억해야 할 것 같다.

- 여기서 잠시 멈추고 방금 한 일에 대해 생각해보자. 무엇보다도 반복문을 쪼개서 성능이 느려지지 않을까 걱정할 수 있다. 하지만, 이정도 중복은 성능에 미치는 영향이 미미할 때가 많다.

- 때로는 리팩터링이 성능에 상당한 영향을 주기도 한다. 그런 경우라도 나는 개의치 않고 리팩터링한다. 잘 다듬어진 코드라야 성능 개선 작업도 훨씬 수월하기 때문이다.

### 1.6 계산 단계와 포맷팅 단계 분리하기

- **단계 쪼개기**

- 첫 단계에서는 statement()에 필요한 데이터를 처리하고, 다음 단계에서는 앞서 처리한 결과를 텍스트나 HTML로 표현하도록 하자. 다시 말해 첫 번째 단계에서는 두 번째 단계로 전달할 중간 데이터 구조를 생성하는 것이다.

```js
function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}
```

> -> 실제 팀 내에서 누군가가 위와같은 코드를 작성했다면 코드 리뷰에서 LGTM를 했을까? 내 판단력을 어떻게 믿고 객관성을 어떻게 지닐 수 있을까?

### 1.10 마치며

- 좋은 코드를 가늠하는 확실한 방법은 '얼마나 수정하기 쉬운가'다.

- 이번 예시를 통해 배울 수 있는 가장 중요한 것은 바로 리팩터링하는 리듬이다.

## 느낀 점

- 내가 생각하던 리팩터링과 다르게 실제 리팩터링은 아주 작은 단위의 변경이었다. 2챕터에 나오지만 내가 리팩터링(refactoring)이라고 자주 말했던 행위는 재구성(restructuring)에 가까웠던 것 같다.
- 어떤 코드를 리팩터링 대상인지 포착하는 것이 중요할 것 같은데, 경험이 필요하지 않을까?
- 테스트 코드가 중요해보인다. 하지만 실제 우리 회사에 적용하는데 어려움이 있는 것도 사실이라 그 간극을 어떻게 메울지가 고민된다. (책에서는 `레거시 코드 활용 전략`이라는 책을 추천)
- 리팩터링이 성능에 영향을 줄지라도, 개의치않고 리팩터링해야한다는 점도 기억해야할 것 같다. 프런트엔드에서 반복문 등을 최적화하는 것에 신경쓰기보다는 가독성에 신경을 쓰는 것이 더 중요할 수도 있을 것 같다.