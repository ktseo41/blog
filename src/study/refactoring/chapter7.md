---
outline: [2, 3]
---

# Chapter 07 - 캡슐화

## 인상깊은 문장, 코드들

### 7.1 레코드 캡슐화하기

- 대부분의 프로그래밍 언어는 데이터 레코드를 표현하는 구조를 제공한다. ... 하지만 단순한 레코드에는 단점이 있다. 특히, 계산해서 얻을 수 있는 값과 그렇지 않을 값을 명확히 구분해 저장해야 하는 점이 번거롭다.
- 가령 값의 범위를 표현하려면 `{start: 1, end: 5}`나 `{start: 1, length: 5}` (또는 내 스타일을 고집한다면 `{end: 5, length: 5}`) 등의 방식으로 저장할 수 있다. 어떤 식으로 저장하든 '시작'과 '끝'과 '길이'를 알 수 있어야 한다.
- 바로 이 때문에 나는 가변 데이터를 저장하는 용도로는 레코드보다 객체를 선호하는 편이다. 객체를 사용하면 어떻게 저장했는지를 숨긴 채 세 가지 값을 각각의 메서드로 제공할 수 있다.
- 필드 이름을 바꿔도 기존 이름과 새 이름 모두를 각각의 메서드로 제공할 수 있어서 사용자 모두가 새로운 메서드로 옮겨갈 때까지 점진적으로 수정할 수 있다.

#### 예시: 간단한 레코드 캡슐화하기

- 레코드를 캡슐화하는 목적은 변수 자체는 물론 그 내용을 조작하는 방식도 통제하기 위해서다.

```js
const organization = { name: "애크미 구스베리", country: "GB" };
```

->

```js
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name() { return this._name; }
  set name(aString) { this._name = aString; }
  get country() { return this._country; }
  set country(aCountryCode) { this._country = aCountryCode; }
}
```

- 이렇게 하면 입력 데이터 레코드와의 연결을 끊어준다는 이점이 생긴다. 특히 이 레코드를 참조하여 캡슐화를 깰 우려가 있는 코드가 많을 때 좋다.

#### 예시: 중첩된 레코드 캡슐화하기

```js
const customerData = {
    "1920": {
        name: "마틴 파울러",
        id: "1920",
        usages: {
            "2016": {
                "1": 50,
                "2": 55,
                // 생략
            },
            "2015": {
                "1": 70,
                "2": 63,
                // 생략
            }
        }
    },
    "38673": {
        name: "닐 포드",
        id: "38673",
        // 생략
    },
    // 생략
}

// ---- 쓰기 예
customerData[customerID].usages[year][month] = amount;

// ---- 읽기 예
function compareUsage(customerID, laterYear, month) {
    const later = customerData[customerID].usages[laterYear][month];
    const earlier = customerData[customerID].usages[laterYear - 1][month];
    return { laterAmount: later, change: later - earlier };
}
```
->
```js
class CustomerData {
    constructor(data) {
        this._data = data;
    }

    get rawData() { return _.cloneDeep(this._data); }

    setUsage(customerID, year, month, amount) {
        this._data[customerID].usages[year][month] = amount;
    }

    usage(customerID, year, month) {
        return this._data[customerID].usages[year][month];
    }
}

function getCustomerData() { return customerData; }
function getRawDataOfCustomers() { return customerData._data; }
function setRawDataOfCustomers(arg) { customerData = new CustomerData(arg); }

// ---- 쓰기 예
getCustomerData().setUsage(customerID, year, month, amount);

// ---- 읽기 예
function compareUsage(customerID, laterYear, month) {
    const later = getCustomerData().usage(customerID, laterYear, month);
    const earlier = getCustomerData().usage(customerID, laterYear - 1, month);
    return { laterAmount: later, change: later - earlier };
}
```

- 클라이언트가 데이터 구조를 요청할 때 실제 데이터를 제공해도 된다. 하지만 클라이언트가 데이터를 직접 수정하지 못하게 막을 방법이 없어서 '모든 쓰기를 함수 안에서 처리한다'는 캡슐화의 핵심 원칙이 깨지는 게 문제다. 따라서 가장 간단한 방법은 앞에서 작성한 `rawData()` 메서드를 사용하여 내부 데이터를 복제해서 제공하는 것이다.

### 7.2 컬렉션 캡슐화하기

- 예컨대 컬렉션 변수로의 접근을 캡슐화하면서 게터가 컬렉션 자체를 반환하도록 한다면, 그 컬렉션을 감산 클래스가 눈치채지 못하는 상태에서 컬렉션의 원소들이 바뀌어버릴 수 있다.
- 나는 이런 문제를 방지하기 위해 컬렉션을 감싼 클래스에 흔히 `add()`와 `remove()`라는 이름의 컬렉션 변경자 메서드를 만든다. 이렇게 항상 컬렉션을 소유한 클래스를 통해서만 원소를 변경하도록 하면 프로그램을 개선하면서 컬렉션 변경 방식도 원하는 대로 수정할 수 있다.
- 가장 흔히 사용하는 방식은 아마도 컬렉션 게터를 제공하되 내부 컬렉션의 복제본을 반환하는 것이다.

#### 예시

```js{22-23}
class Person {
    constructor(name) {
        this._name = name;
        this._courses = [];
    }
    get courses() { return this._courses; }
    set courses(aList) { this._courses = aList; }
}

class Course {
    constructor(name, isAdvanced) {
        this._name = name;
        this._isAdvanced = isAdvanced;
    }
    get name() { return this._name; }
    get isAdvanced() { return this._isAdvanced; }
}

const numAdvancedCourses = aPerson.courses.filter(c => c.isAdvanced).length;

const basicCourseNames = readBasicCourseNames(filename);
// 이런식으로 목록을 갱신하면 캡슐화가 깨진다.
aPerson.courses = basicCourseNames.map(name => new Course(name, false));
```
->
```js
class Person {
    // ...
    addCourse(aCourse) {
        this._courses.push(aCourse);
    }

    removeCourse(aCourse, fnIfAbsent = () => { throw new RangeError(); }) {
        const index = this._courses.indexOf(aCourse);
        if (index === -1) fnIfAbsent();
        else this._courses.splice(index, 1);
    }
}
```

- 내 경험상 컬렉션에 대해서는 어느 정도 강박증을 갖고 불필요한 복제본을 만드는 편이, 예상치 못한 수정이 촉발한 오류를 디버깅하는 것보다 낫다.

### 7.3 기본형을 객체로 바꾸기

```js
orders.filter(o => "high" === o.priority || "rush" === o.priority);
```
->
```js
orders.filter(o => o.priority.higherThan(new Priority("normal")));
```

#### 배경

- 나는 단순한 출력 이상의 기능이 필요해지는 순간 그 데이터를 표현하는 전용 클래스를 정의하는 편이다.
- 시작은 ... 효과가 미미하다. 하지만 나중에 특별한 동작이 필요해지면 이 클래스에 추가하면 되니 프로그램이 커질수록 점점 유용한 도구가 된다.
- 직관에 어긋나 보일 수 있다. 하지만 경험 많은 개발자들은 여러 가지 리팩터링 중에서도 가장 유용한 것으로 손꼽는다.


#### 예시

```js
class Order {
    constructor(data) {
        this.priority = data.priority;
        // 나머지는 생략
---
// 클라이언트는 다음과 같이 사용
highPriorityCount = orders
    .filter(o => "high" === o.priority || "rush" === o.priority)
    .length;
```
->
```js
class Order {
    constructor (data) {
        this.priority = data.priority;
        // 나머지는 생략

    get priorityString() { return this._priority.toString(); }
    set priority(aString) { this._priority = new Priority(aString); }
}

class Priority {
    constructor(value) {
        this._value = value;
    }
    toString() { return this._value; }
}

// 클라이언트는 다음과 같이 사용
highPriorityCount = orders
    .filter(o => "high" === o.priorityString || "rush" === o.priorityString)
    .length;
```
-> 리팩터링은 여기까지이지만, 추가 작업을 다음과 같이 진행했다.
```js
class Order {
    constructor(data) {
        this.priority = data.priority;
        // 나머지는 생략

    get priority() { return this._priority; }
    get priorityString() { return this._priority.toString(); }
    set priority(aString) { this._priority = new Priority(aString); }
}

class Priority {
    constructor(value) {
        if (value instanceof Priority) return value;
        if (Priority.legalValues().includes(value))
            this._value = value;
        else
            throw new Error(`<${value}> is invalid for Priority`);
    }
    toString() { return this._value; }
    get _index() { return Priority.legalValues().findIndex(s => s === this._value); }
    static legalValues() { return ['low', 'normal', 'high', 'rush']; }

    equals(other) { return this._index === other._index; }
    higherThan(other) { return this._index > other._index; }
    lowerThan(other) { return this._index < other._index; }
}

// 클라이언트는 다음과 같이 사용
highPriorityCount = orders
    .filter(o => o.priority.higherThan(new Priority("normal")))
    .length;
```

### 7.4 임시 변수를 질의 함수로 바꾸기

```js
const basePrice = this._quantity * this._itemPrice;
if (basePrice > 1000) return basePrice * 0.95;
else return basePrice * 0.98;
```
->
```js
get basePrice() { return this._quantity * this._itemPrice; }
// ...
if (this.basePrice > 1000) return this.basePrice * 0.95;
else return this.basePrice * 0.98;
```

- 긴 함수의 한 부분을 별도 함수로 추출하고자 할 때 먼저 변수들을 각각의 함수로 만들면 일이 수월해진다. 추출한 함수에 변수를 따로 전달할 필요가 없어지기 때문이다. 또한 이 덕분에 추출한 함수와 원래 함수의 경계가 더 분명해지기도 하는데, 그러면 부자연스러운 의존 관계나 부수효과를 찾고 제거하는 데 도움이 된다.

#### 예시

```js
class Order {
    constructor(quantity, item) {
        this._quantity = quantity;
        this._item = item;
    }

    get price() {
        var basePrice = this._quantity * this._item.price;
        var discountFactor = 0.98;

        if (basePrice > 1000) discountFactor -= 0.03;

        return basePrice * discountFactor;
    }
}
```
-> 임시 변수인 `basePrice`와 `discountFactor`를 질의 함수로 바꾸기
```js{2}
get price() {
    const basePrice = this._quantity * this._item.price;
    var discountFactor = 0.98;
    if (basePrice > 1000) discountFactor -= 0.03;
    return basePrice * discountFactor;
}
```
-> 먼저 `basePrice`에 `const`를 붙여 읽기전용으로 만든다. 이렇게 하면 지나친 재대입 코드를 찾을 수 있다. (컴파일 에러)
   그 다음 대입문의 우변을 게터로 추출한다.
```js
get price() {
    const basePrice = this.basePrice;
    var discountFactor = 0.98;
    if (basePrice > 1000) discountFactor -= 0.03;
    return basePrice * discountFactor;
}

get basePrice() { return this._quantity * this._item.price; }
```
-> 인라인
```js
get price() {
    var discountFactor = 0.98;
    if (this.basePrice > 1000) discountFactor -= 0.03;
    return this.basePrice * discountFactor;
}
```

### 7.5 클래스 추출하기

```js
class Person {
    get officeAreaCode() { return this._officeAreaCode; }
    get officeNumber() { return this._officeNumber; }
}
```
->
```js
class Person {
    get officeAreaCode() { return this._telephoneNumber.areaCode; }
    get officeNumber() { return this._telephoneNumber.number; }
}

class TelephoneNumber {
    get areaCode() { return this._areaCode; }
    get number() { return this._number; }
}
```

- 메서드와 데이터가 너무 많은 클래스는 이해하기가 쉽지 않으니 잘 살펴보고 적절히 분리하는 것이 좋다. 특히 일부 데이터와 메서드를 따로 묶을 수 있다면 어서 분리하라는 신호다. 함께 변경되는 일이 많거나 서로 의존하는 데이터들도 분리한다. 특정 데이터나 메서드 일부를 제거하면 어떤 일이 일어나는지 자문해보면 판단에 도움이 된다. 제거해도 다른 필드나 메서드들이 논리적으로 문제가 없다면 분리할 수 있다는 뜻이다.

### 7.6 클래스 인라인하기

- 역할을 옮기는 리팩터링을 하고나니 특정 클래스에 남은 역할이 거의 없을 때 이런 현상이 자주 생긴다.

## 느낀 점

- 레코드? 딕셔너리? 해시맵?

- 가변 데이터를 저장하는 용도로 레코드보다 객체를 선호하는 이유

    - "어떻게 저장했는지를 숨긴 채 세 가지 값을 각각의 메서드로 제공할 수 있다."는 부분과 비슷한 예제를 만들어봤다.
    - Vue의 `computed`와 비슷한 개념으로 느껴졌다. => 컴포넌트를 잘 나누기만해도 이미 가독성이 좋은 코드를 작성하는 한 걸음일 것 같다.

    ```js
    // ---- 레코드로 가변 데이터를 저장하는 경우
    const priceDetail = {
        priceTotal: 10000,
        shippingPrice: 3000,
        cashA: 3000,
        cashB: 2000
    }

    const paymentAmount = priceDetail.priceTotal + priceDetail.shippingPrice - priceDetail.cashA - priceDetail.cashB
    const cashTotal = priceDetail.cashA + priceDetail.cashB

    // ---- 객체로 가변 데이터를 저장하는 경우
    class Price {
        constructor(priceTotal, shippingPrice, cashA, cashB) {
            this._priceTotal = priceTotal
            this._shippingPrice = shippingPrice
            this._cashA = cashA
            this._cashB = cashB
        }

        get paymentAmount() {
            return this._priceTotal + this._shippingPrice - this._cashA - this._cashB
        }

        get cashTotal() {
            return this._cashA + this._cashB
        }
    }
    ```

- 중첩된 레코드를 다루는 일은 아주 많다. 처음부터 캡슐화를 잘했다면, 클래스나 객체 지향이 낯설었어도 더 깔끔한 코드를 만들 수 있었을까?

- 원본 데이터를 제공할 필요는 어떤 것때문에 있을까?

    - 우리 서비스에서 이용 중인 오픈소스 마켓 서비스는 서버와 클라이언트 패키지를 모두 제공한다. 서버를 커스터마이징할 일이 생겼는데 클라이언트 커스터마이징하기 어려운 상황이라 변경을 하지 않았다. 그래서 대신 직접 API를 호출해서 사용해야 했다. 비슷한 경우일까?

- 컬렉션 캡슐화하기는 프런트엔드에서 어떤 경우에 주로 발생할까?

    - 한 배열이 있고, 그 배열 데이터를 prop으로 자식, 손자, 그 아래까지 drilling해서 사용한다고 가정해보자. 그리고 시간에 쫓기는 개발자 혹은 스파게티 코드에서 해당 배열을 다른 개발자가 사용한다면? 원본 배열을 변경하려는 시도를 할 확률이 높아진다. 다만 Vue에서는 다행히 prop을 직접 변경한다면 warning을 띄워준다.

- 클래스 추출하기는 컴포넌트 분리하기에서도 적용할 개념이 느껴진다

    - 메서드와 데이터가 너무 많은 클래스는 이해하기가 쉽지 않으니 잘 살펴보고 적절히 분리하는 것이 좋다. 
    - `methods`, `computed`, lifeCycle 메서드 등등이 총 10개가 넘어가면 분리한다면?
