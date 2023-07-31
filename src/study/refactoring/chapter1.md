# Chapter 01 - 리팩터링: 첫 번째 예시 (작성중)

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

## 느낀 점

- 내가 생각하던 리팩터링과 다르게 실제 리팩터링은 아주 작은 단위의 변경이었다.
- 어떤 코드를 리팩터링 대상인지 포착하는 것이 중요할 것 같은데, 경험이 필요하지 않을까?
- 테스트 코드가 중요해보인다. 하지만 실제 우리 회사에 적용하는데 어려움이 있는 것도 사실이라 그 간극을 어떻게 메울지가 고민된다. (책에서는 `레거시 코드 활용 전략`이라는 책을 추천)