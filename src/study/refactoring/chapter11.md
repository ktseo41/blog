---
outline: [2, 3]
---
# Chapter 11 - API 리팩터링

## 인상깊은 문장, 코드들

모듈과 함수는 소프트웨어를 구성하는 빌딩 블록이며, API는 이 블록들을 끼워 맞추는 연결부다. 이런 API를 이해하기 쉽고 사용하기 쉽게 만드는 일은 중요한 동시에 어렵기도 하다.

### 11.1 질의 함수와 변경 함수 분리하기

- 우리는 외부에서 관찰할 수 있는 겉보기 부수효과가 전혀 없이 값을 반환해주는 함수를 추구해야 한다. 이런 함수는 어느 때건 원하는 만큼 호출해도 아무 문제가 없다.
- 이를 위한 한 가지 방법은 '질의 함수(읽기 함수)는 모두 부수효과가 없어야 한다'는 규칙을 따르는 것이다.

### 11.2 함수 매개변수화하기

```js
function tenPercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.1);
}
function fivePercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.05);
}
```
->

```js
function raise(aPerson, factor) {
  aPerson.salary = aPerson.salary.multiply(1 + factor);
}
```

- 범위를 다루는 로직에서는 대개 중간에 해당하는 함수에서 시작하는 게 좋다.

### 11.3 플래그 인수 제거하기

- 불리언 플래그는 코드를 읽는 이에게 뜻을 온전히 전달하지 못하기 때문에 더욱 좋지 못하다.
- 함수 하나에서 플래그 인수를 두 개 이상 사용하면 플래그 인수를 써야 하는 합당한 근거가 될 수 있다. ... 그런데 다른 관점에서 보자면, 플래그 인수가 둘 이상이면 함수 하나가 너무 많은 일을 처리하고 있다는 신호이기도 하다. 그러니 같은 로직을 조합해내는 더 간단한 함수를 만들 방법을 고민해봐야 한다.
- 플래그 인수를 싫어하는 이유는 불리언 값을 사용해서가 아니라 불리언 값을 (변수와 같은) 데이터가 아닌 리터럴로 설정하기 때문이다. 가령 `deliveryDate()`를 호출하는 코드가 모두 다음처럼 생겼다면 어떨까?
  ```js
  const isRush = determineIfRush(anOrder);
  const deliveryTime = deliveryDate(anOrder, isRush);
  ```

### 11.4 객체 통째로 넘기기

- 레코드를 통째로 넘기면 변화에 대응하기 쉽다.
- 함수가 레코드 자체에 의존하기를 원치 않을 때는 이 리팩터링을 수행하지 않는데, 레코드와 함수가 서로 다른 모듈에 속한 상황이면 특히 더 그렇다.
- 한 객체가 제공하는 기능 중 항상 똑같은 일부만을 사용하는 코드가 많다면, 그 기능만 따로 묶어서 클래스로 추출하라는 신호일 수 있다.
- 조건문에서 기존 메서드를 호출하는 코드들을 해방시켜보자

### 11.7 세터 제거하기

- 객체 생성 후에는 수정되지 않길 원하는 필드라면 세터를 제공하지 않았을 것이다.

### 11.8 생성자를 팩터리 함수로 바꾸기

- 생성자에는 일반 함수에는 없는 이상한 제약이 따라붙기도 한다.
- 팩터리 함수에는 이런 제약이 없다.

### 11.9 함수를 명령으로 바꾸기

- 함수를 그 함수만을 위한 객체 안으로 캡슐화하면 더 유용해지는 상황이 있다. 이런 객체를 가리켜 '명령 객체' 혹은 단순히 '명령'이라고 부른다.
- 나라면 95%는 일급 함수의 손을 들어준다. 내가 명령을 선택할 때는 명령보다 더 간단한 방식으로는 얻을 수 없는 기능이 필요할 때뿐이다.

## 느낀 점

- 11.1 질의 함수와 변경 함수 분리하기
  - 장바구니에서 주문으로 넘어갈 때, 혹은 결제를 진행하기 전과 같이 단계를 진행할 때 검증 로직, 알림 로직을 다음처럼 짜놓은 경우가 있었다.
  ```js
  proceedToCheckout: async function () {
    // 주류, 소모품 쿠폰 등 별도의 선택구매 로직이 필요한 경우 검증 및 안내
    const isOkToProceed = await this.validateAndGuideBeforeProceedToCheckout()

    if (isOkToProceed) {
      const checkoutOrderId = await this.createCheckoutOrder()

      await this.$router.push({name: 'CheckoutOrder', params: { orderId: checkoutOrderId }})
    }
  }
  ```
  -> 다음과 같은 꼴이 되었어야 했다.
  ```js
  proceedToCheckout: async function () {
    const isOkToProceed = await this.validateCart()
    this.guideBeforeProceedToCheckout()

    if (isOkToProceed) {
      const checkoutOrderId = await this.createCheckoutOrder()

      await this.$router.push({name: 'CheckoutOrder', params: { orderId: checkoutOrderId }})
    }
  },
  ```
  - 결제전에는 이런 검증 로직이 있다.
  ```js
  if (!order.billing_address) {
    this.showModal('주소를 입력해주세요.')
    return
  }
  
  if (!order.payment_method) {
    this.showModal('결제수단을 선택해주세요.')
    return
  }
  // if ... 더 많은 검증 로직

  this.payment()
  ```
  -> 다음과 같이 만들어줘야 할까?

  ```js
  const isValid = this.validateOrder();
  this.showAlert();
  
  if (!isValid) {
    return
  }
  
  this.payment()
  ```

- 11.2 함수 매개변수화하기는 제목이 맞는지 모르겠다. 매개변수화 가능한 부분 찾기 느낌
- 11.4 객체 통째로 넘기기
  - 부정적인 입장이 있었다. 예를들어 아주 복잡한 컴포넌트에 Order라는 데이터가 아주 많은 객체가 넘겨진다면, 대체 안에서 무슨일이 일어나는지 파악하기가 어려웠던 경험이 많기 때문이다. 이건 컴포넌트가 문제였던 걸까? Order를 통째로 넘겼을 때, 주문서일지, 가격 정보 컴포넌트인지, 주문 완료 컴포넌트인지, 이름을 잘지어주면 됐을까? 이름도 모호하게 느껴졌던 것 같기도 하고.
  - 해방시킨다는 표현이 재밌었음
- 11.5 매개변수를 질의 함수로 바꾸기는 객체 통째로 넘기기처럼 보이기도 한다. 하지만 호출하는 쪽을 간소화해주기 위함으로 이해하면 될 것 같다.
- 11.6 질의 함수를 매개변수로 바꾸기와 11.5 매개변수를 질의 함수로 바꾸기는 리팩터링 과정에서 필요에 따라 적용하면 될 것 같다. `참조를 풀어내는 책임을 호출자로 옮기는 것`
- 11.9 함수를 명령으로 바꾸기에서 `scoreSmoking`이 항상 호출되면 모두를 흡연가로 판단하는 것처럼 읽히지 않나?
  ```js
  execute () {
    // ...
    this.scoreSmoking();
  }
  
  scoreSmoking() {
    if (this._medicalExam.isSmoker) {
      this._healthLevel += 10;
      this._highMedicalRiskFalg = true;
    }
  }
  ```