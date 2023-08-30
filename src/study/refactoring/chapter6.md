---
outline: [2, 3]
---

# Chapter 06 - 기본적인 리팩터링

## 인상깊은 문장, 코드들

### 6.1 함수 추출하기

#### 배경

- 언제 독립된 함수로 묶어야 할지에 관한 의견은 수없이 많다.
- 내 눈에는 '목적과 구현을 분리'하는 방식이 가장 합리적인 기준으로 보인다.
- 코드를 보고 무슨 일을 하는지 파악하는 데 한참이 걸린다면 그 부분을 함수로 추출한 뒤 '무슨 일'에 걸맞는 이름을 짓는다.
- 이렇게 해두면 나중에 코드를 다시 읽을 때 함수의 목적이 눈에 확 들어오고, 본문 코드에 대해서는 더 이상 신경 쓸 일이 거의 없다.
- 단 한줄짜리 함수를 만드는 일도 적지 않았다.
  - 스몰토크의 그래픽스 클래스에는 텍스트나 그래픽을 강조하려고 색상을 반전시키는 목적으로 쓰이는 `highlight()`라는 메서드가 있었는데, 구현 코드를 보니 단순히 `reverse()`라는 메서드만 호출하고 있었다.
  - 메서드 이름이 구현 코드보다 길었지만, 그건 문제가 되지 않았다. 코드의 목적(강조)과 구현(반전) 사이의 차이가 그만큼 컸기 때문이다.

#### 값을 반환할 변수가 여러 개라면?

- 나는 주로 추출할 코드를 다르게 재구성하는 방향으로 처리한다. 개인적으로 함수가 값 하나만 반환하는 방식을 선호하기 때문이다.

### 6.2 함수 인라인하기

#### 배경

- 때로는 함수 본문이 이름만큼 명확한 경우도 있다.
- 잘못 추출된 함수들도 다시 인라인한다. 잘못 추출된 함수들을 원래 함수로 합친 다음, 필요하면 원하는 형태로 다시 추출하는 것이다.

#### 예시

```js
function rating(aDriver) {
    return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(dvr) {
    return dvr.numberOfLateDeliveries > 5;
}
```

- 복사한 코드가 새로운 위치에 잘 들어맞도록 손봐줘야 하는 경우도 있다.

> -> aDriver와 dvr이 다르다는 뜻인데, 이렇게까지 엄밀하게 본다는 것이 인상깊다. 코드를 작성하는 행위가 내가 생각하는 것보다 더 엄밀하게 이루어져야 하는 것 같다.

```js
function reportLines(aCustomer) {
    const lines = [];
    gatherCustomerData(lines, aCustomer);
    return lines;
}

function gatherCustomerData(out, aCustomer) {
    out.push(["name", aCustomer.name]);
    out.push(["location", aCustomer.location]);
}
```

- 한 번에 한 문장씩 옮기는 것이 좋다.

->

```js{3,9}
function reportLines(aCustomer) {
    const lines = [];
    lines.push(["name", aCustomer.name]);
    gatherCustomerData(lines, aCustomer);
    return lines;
}

function gatherCustomerData(out, aCustomer) {
    // out.push(["name", aCustomer.name]);
    out.push(["location", aCustomer.location]);
}
```

> -> 약간 토나올 것 같기도..?

### 6.3 변수 추출하기

```js
return order.quantity * order.itemPrice -
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
    Math.min(order.quantity * order.itemPrice * 0.1, 100);
```
->
```js
const basePrice = order.quantity * order.itemPrice;
const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
const shipping = Math.min(basePrice * 0.1, 100);
return basePrice - quantityDiscount + shipping;
```

#### 배경

- 표현식이 너무 복잡해서 이해하기 어려울 때가 있다. 이럴 때 지역 변수를 활용하면 표현식을 쪼개 관리하기 더 쉽게 만들 수 있다.
- 그러면 복잡한 로직을 구성하는 단계마다 이름을 붙일 수 있어서 코드의 목적을 훨씬 명확하게 드러낼 수 있다.
- **변수 추출을 고려한다고 함은 표현식에 이름을 붙이고 싶다는 뜻이다.**

### 6.4 변수 인라인하기

#### 배경

- 그 이름이 원래 표현식과 다를 바 없을 때도 있다. 또 변수가 주변 코드를 리팩터링하는 데 방해가 되기도 한다. 이럴 때는 그 변수를 인라인하는 것이 좋다.

### 6.5 함수 선언 바꾸기

#### 배경

- 건축과 마찬가지로 소프트웨어도 이러한 연결부에 상당히 의존한다.
- 연결부에서 가장 중요한 요소는 함수의 이름이다.

> 좋은 이름을 떠올리는 데 효과적인 방법이 하나 있다. 바로 주석을 이용해 함수의 목적을 설명해보는 것이다. 그러다 보면 주석이 멋진 이름으로 바뀌어 되돌아올 때가 있다.

- 함수의 매개변수도 마찬가지다. 매개변수는 함수가 외부 세계와 어우러지는 방식을 정의한다.

#### 절차

- **간단한 절차, 마이그레이션 절차**
  - 함수 본문을 새로운 함수로 추출한다는 차이점이 있다.
- 공개된 API를 리팩터링할 때는 새 함수를 추가한 다음 리팩터링을 잠시 멈출 수 있다. 이 상태에서 예전 함수를 폐기 대상으로 지정하고 모든 클라이언트가 새 함수로 이전할 때까지 기다린다. 클라이언트들이 모두 이전했다는 확신이 들면 예전 함수를 지운다.
- 같은 이름이 여러 개일떄도 문제다. 예컨대 `changeAddress()`란 메서드가 사람 클래스와 계약 클래스 모두에 정의되어 있을 때, 사람 클래스의 메서드만 이름을 바꾸고 싶은 경우 난감해질 수 있다. 그래서 이런 상황에 처하면 마이그레이션 절차를 따른다.

#### 예시: 매개변수 추가하기

```js
addReservation(customer) {
    this._reservations.push(customer);
}
```
->
```js
addReservation(customer) {
    this.zz_addReservation(customer, false);
}

zz_addReservation(customer, isPriority) {
    this._reservations.push(customer);
}
```
->
```js
addReservation(customer) {
    this.zz_addReservation(customer, false);
}

zz_addReservation(customer, isPriority) {
    this._reservations.push(customer);
}
```

### 6.6 변수 캡슐화하기

#### 배경

- 데이터는 함수보다 다루기가 까다로운데, 그 이유는 이런 식으로 처리할 수 없기 때문이다. 데이터는 참조하는 모든 부분을 한 번에 바꿔야 코드가 제대로 작동한다.
- 접근할 수 있는 범위가 넓은 데이터를 옮길 때는 먼저 그 데이터로의 접근을 독접하는 함수를 만드는 식으로 캡슐화하는 것이 가장 좋은 방법일 때가 많다. 데이터 재구성이라는 어려운 작업이 함수 재구성이라는 더 단순한 작업으로 변환되는 것이다.
- 나는 유효범위가 함수 하나보다 넓은 가변 데이터는 모두 이런 식으로 캡슐화해서 그 함수를 통해서만 접근하게 만드는 습관이 있다.
- 불변 데이터는 가변 데이터보다 캡슐화할 이유가 적다.
- **불변성은 강력한 방부제인 셈이다.**

#### 절차

```js
let defaultOwner = { firstName: "마틴", lastName: "파울러" };
spaceship.owner = defaultOwner;
defaultOwner = { firstName: "레베카", lastName: "파슨스" };
```
->
```js
function getDefaultOwner() { return defaultOwner; }
function setDefaultOwner(arg) { defaultOwner = arg; }

spaceship.owner = getDefaultOwner();
setDefaultOwner({ firstName: "레베카", lastName: "파슨스" });
```

##### 값 캡슐화하기

- 위와같은 방식은 필드 값을 변경하는 일은 제어할 수 없다.

```js
let defaultOwnerData = { firstName: "마틴", lastName: "파울러" };
export function defaultOwner() { return Object.assign({}, defaultOwnerData); }
export function setDefaultOwner(arg) { defaultOwnerData = arg; }
```

- 게터로 얻은 데이터를 변경할 수 있지만 원본에는 아무 영향을 주지 못한다.


## 느낀 점

- 함수로 추출할 때 '목적과 구현을 분리'라는 기준을 기억하자

    - `highlight` 메서드를 기억하자

- 객체, 배열 등 참조값을 전달한 후 함수에서 수정하도록 분리하는 것이 괜찮은가?

    - p.165 printOwing - recordDueDate 함수에서 invoice 객체를 전달하고, 함수 내부에서 수정하는 부분이 있다.

- 코드의 추가 수정 삭제 등이나 코드 자체를 더 엄밀하게 봐야하는 것일까?

    ```js
    function rating(aDriver) {
        return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
    }

    function moreThanFiveLateDeliveries(dvr) {
        return dvr.numberOfLateDeliveries > 5;
    }
    ```

    > 복사한 코드가 새로운 위치에 잘 들어맞도록 손봐줘야 하는 경우도 있다.

    - `aDriver`와 `dvr`이 다르다는 뜻인데, 이렇게까지 엄밀하게 본다는 것이 인상깊다. 코드를 작성하는 행위가 내가 생각하는 것보다 더 엄밀하게 이루어져야 하는 것 같다.

- 변수 추출하기, 변수 인라인하기가 모두 존재하는 것을 보면 결국 알잘딱깔센이 중요한 것일까?

    - 뭐든 극단보다는 중간을 찾아야 한다는 것을 다시 한 번 느낀다.

- 변수 추출을 고려한다고 함은 표현식에 이름을 붙이고 싶다는 뜻이다. 라는 문장을 기억하자

- node.js, web의 deprecated 표시의 의미가 조금 더 구체적으로 와닿는다.

    - 그렇지만 클라이언트는 영원히 모두 이전하지는 않을 것이다.

- "불변성은 강력한 방부제인 셈이다."는 문장을 기억하자

- 공유데이터를 변경하기를 원하는 클라이언트가 class를 사용해 객체를 생성하도록 하면 왜 만족할까?

    ```js
    let defaultOwnerData = { firstName: "마틴", lastName: "파울러" };
    export function defaultOwner() { return Object.assign({}, defaultOwnerData); }
    export function setDefaultOwner(arg) { defaultOwnerData = arg; }
    ```

    ```js
    let defaultOwnerData = { firstName: "마틴", lastName: "파울러" };
    export function defaultOwner() { return new Person(defaultOwnerData); }
    export function setDefaultOwner(arg) { defaultOwnerData = arg; }

    class Person {
        constructor(data) {
            this._lastName = data.lastName;
            this._firstName = data.firstName;
        }
        get lastName() { return this._lastName; }
        get firstName() { return this._firstName; }
    }
    ```

    - 첫번째 방법으로도 충분히 공유 데이터를 변경할 수 있을 것 같은데, 두번째 방법은 무엇이 다른 것일까?

- 메디 프론트 내의 기간 범위 참고를 하나의 객체나 클래스로 묶어보면 어떨까?

    - 범위 개념은 객체 하나로 묶어서 표현하는게 더 나은 대표적인 예이다. 그리고 우리 코드에도 이런 개념이 많이 있다. 이런 코드들에 적용해보면 어떨까?
    - 그리고 범위를 더 넓히면 회사 코드에서는 대부분 날짜 관련 비교나 포매팅시 moment를 직접 이용하고 있었어서 date-fns 등 더 나은 방안으로 마이그레이션하는데 어려움이 있는 상태이다. 날짜를 다루는 대표적인 객체를 만들어 사용하도록 한다면 이런 부분도 해결할 수 있을 것 같다.

- 여러 함수를 클래스로 묶기나, 변환 함수로 묶는 방식은 결제나 가격 정보 쪽에서 활용하기에 좋아보인다.

    - 데이터로부터 여러 정보를 도출하는 작업이 반복될 때, 클래스를 지원하지 않는 언어에서는 변환 함수로 묶는 것을 제안하고 있다. 그래서 이 둘은 같은 목적을 가지고 있는 것이라는 생각이 든다.
    - 그리고 현재 회사 코드는 가격 정보를 받아와서 사용 가능한 포인트나 캐시 같은 값을 계산을 해주는 부분들도 많은데 이런 부분이 적용해보기 좋은 것 같다.

- 단계 쪼개기는 단계를 쪼개기 위해 코드를 살피고 목적이 되는 대상을 찾는 과정 자체가 중요해보인다.

    - 자바 코드 예시에서는 명령줄 인수를 읽어 동작을 결정하는 과정과, 추출된 정보를 바탕으로 동작을 수행하는 부분이 있다. 이 차이와 대상을 포착하게 되면 오히려 이후 분리는 쉬워보인다.