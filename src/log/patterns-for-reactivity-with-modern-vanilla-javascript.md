---
feArticle: true
---

# 모던 바닐라 자바스크립트로 본 반응성을 구현하는 패턴

![Chemical reaction rendering meant to convey the concept of reactivity](https://static.frontendmasters.com/assets/fm/med/blog/2023/reactivity/chemical-reaction.jpg)

> 원문: https://frontendmasters.com/blog/vanilla-javascript-reactivity/

"반응성(Reactivity)"은 시스템이 데이터의 변화에 반응하는 방식입니다. 반응성에는 여러 가지 유형이 있지만, 이 글에서 말하는 반응성은 **데이터가 변하면 어떤 일을 하는 것**입니다.

## 웹 개발의 핵심인 반응형 패턴

브라우저는 완전히 비동기적인 환경이기 때문에 웹사이트와 웹 앱에서는 자바스크립트로 많은 것을 처리합니다. 사용자 입력에 응답하고, 서버와 통신하고, 로깅하고, 실행하는 등의 작업을 수행해야 합니다. 이러한 모든 작업에는 UI 업데이트, Ajax 요청, 브라우저 URL 및 네비게이션 변경이 포함되므로 연쇄적인 데이터 변경은 웹 개발의 핵심 요소입니다.

이 분야에서는 반응성을 프레임워크와 연관시키지만 순수한 자바스크립트로 반응성을 구현해보면 많은 것을 배울 수 있습니다. 아래에서 소개할 패턴들을 조합하여 데이터 변화에 따라 동작을 연결할 수 있습니다.

> 🔥 순수 자바스크립트로 핵심 패턴을 학습하면 어떤 도구나 프레임워크를 사용하든 웹 앱에서 사용되는 코드가 줄어들고 성능이 향상될 것 입니다.

패턴은 모든 언어와 시스템에 적용할 수 있기 때문에 저는 패턴을 배우는 것을 좋아합니다. 패턴을 결합하여 앱의 정확한 요구 사항을 해결할 수 있으며, 종종 더 성능이 좋고 유지 관리가 쉬운 코드로 이어질 수 있습니다.

어떤 프레임워크와 라이브러리를 사용하든 새로운 패턴을 배워 활용할 수 있기를 바랍니다!

## PubSub 패턴

PubSub은 가장 기초적인 반응형 패턴 중 하나입니다. `publish()`로 이벤트를 발행하면 누구나 해당 이벤트를 `subscribe()`해 이벤트를 발행한 것과 분리된 상태에서 원하는 모든 작업을 수행할 수 있습니다.

```js
const pubSub = {
  events: {},
  subscribe(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  },
  publish(event, data) {
    if (this.events[event]) this.events[event].forEach(callback => callback(data));
  }
};

pubSub.subscribe('update', data => console.log(data));
pubSub.publish('update', 'Some update'); // 업데이트 
```

주목할 점은 발행자는 누가 이벤트를 수신 중인지 _모르기_ 때문에 이 간단한 구현으로는 구독을 취소하거나 스스로 정리할 방법이 없습니다.

### 사용자 정의 이벤트: PubSub을 위한 네이티브 브라우저 API

브라우저에는 사용자 정의 이벤트를 실행하고 구독하기 위한 자바스크립트 API가 있습니다. 그리고 `dispatchEvent`를 사용하여 사용자 정의 이벤트와 함께 데이터를 전송할 수 있습니다.

```js
const pizzaEvent = new CustomEvent("pizzaDelivery", {
  detail: {
    name: "supreme",
  },
});

window.addEventListener("pizzaDelivery", (e) => console.log(e.detail.name));
window.dispatchEvent(pizzaEvent);
```

사용자 정의 이벤트는 어떤 DOM 노드에도 지정할 수 있습니다. 코드 예제에서는 글로벌 이벤트 버스라고도 하는 글로벌 `window` 객체를 사용하므로 앱의 모든 객체가 이벤트 데이터를 수신하고 이벤트 데이터로부터 무언가를 할 수 있습니다.

```js
<div id="pizza-store"></div>
```
```js
const pizzaEvent = new CustomEvent("pizzaDelivery", {
  detail: {
    name: "supreme",
  },
});

const pizzaStore = document.querySelector('#pizza-store');
pizzaStore.addEventListener("pizzaDelivery", (e) => console.log(e.detail.name));
pizzaStore.dispatchEvent(pizzaEvent);
```

### 클래스 인스턴스 사용자 정의 이벤트: EventTarget을 상속받기

EventTarget을 상속받아 앱이 바인딩할 수 있는 클래스 인스턴스에서 이벤트를 발생시킬 수 있습니다.

```js
class PizzaStore extends EventTarget {
  constructor() {
    super();
  }
  addPizza(flavor) {
    // 클래스에서 직접 이벤트를 발생시킵니다.
    this.dispatchEvent(new CustomEvent("pizzaAdded", {
      detail: {
        pizza: flavor,
      },
    }));
  }
}

const Pizzas = new PizzaStore();
Pizzas.addEventListener("pizzaAdded", (e) => console.log('Added Pizza:', e.detail.pizza));
Pizzas.addPizza("supreme");
```

여기서 멋진 점은 이벤트가 `window`에서 전역적으로 실행되지 않는다는 것입니다. 클래스에서 직접 이벤트를 실행할 수 있으므로 앱의 모든 요소에서 해당 클래스에 직접 이벤트 리스너를 연결할 수 있습니다.

## 옵저버 패턴

옵저버 패턴은 PubSub 패턴과 기본 개념이 같습니다. 이 패턴을 사용하면 특정 주체를 "구독"할 수 있게 해주며, 주체가 `notify` 메서드를 실행하면, 해당 주체를 구독한 모든 것에게 알립니다.

```js
class Subject {
  constructor() {
    this.observers = [];
  }
  addObserver(observer) {
    this.observers.push(observer);
  }
  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }
  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  update(data) {
    console.log(data);
  }
}

const subject = new Subject();
const observer = new Observer();

subject.addObserver(observer);
subject.notify('Everyone gets pizzas!');
```

PubSub과의 주요 차이점은 주체가 옵저버에 대해 알고 있으며 이를 제거할 수 있다는 것입니다. PubSub처럼 _완전히_ 분리되어 있지 않습니다.

## 프록시를 활용한 반응형 객체 프로퍼티

자바스크립트의 프록시는 객체에서 프로퍼티를 설정하거나 가져온 후 반응성을 수행하기 위한 기반이 될 수 있습니다.

```js
const handler = {
  get: function(target, property) {
    console.log(`Getting property ${property}`);
    return target[property];
  },
  set: function(target, property, value) {
    console.log(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true; // 설정이 성공적으로 이루어졌음을 나타냅니다.
  }
};

const pizza = { name: 'Margherita', toppings: ['tomato sauce', 'mozzarella'] };
const proxiedPizza = new Proxy(pizza, handler);

console.log(proxiedPizza.name); // "Getting property name"과 "Margherita"를 출력합니다.
proxiedPizza.name = 'Pepperoni'; // "Setting property name to Pepperoni"를 출력합니다.
```

`proxiedPizza`에서 프로퍼티에 접근하거나 수정하면 콘솔에 메시지를 기록합니다. 그리고 객체의 프로퍼티 접근에 어떤 기능이든 연결할 수 있을 것이라고 상상할 수 있습니다.

### 반응형 개별 프로퍼티: Object.defineProperty

`Object.defineProperty`를 사용하면 특정 프로퍼티에 대해 동일한 작업을 수행할 수 있습니다. 프로퍼티에 대한 getter와 setter를 정의하고 프로퍼티에 액세스하거나 수정할 때 코드를 실행할 수 있습니다.

```js
const pizza = {
  _name: 'Margherita', // 내부 프로퍼티
};

Object.defineProperty(pizza, 'name', {
  get: function() {
    console.log(`Getting property name`);
    return this._name;
  },
  set: function(value) {
    console.log(`Setting property name to ${value}`);
    this._name = value;
  }
});

// 예시
console.log(pizza.name); // "프로퍼티 name을 가져옵니다"와 "마르게리타"를 출력합니다.
pizza.name = 'Pepperoni'; // "프로퍼티 name을 Pepperoni로 설정합니다"를 출력합니다.
```

여기서는 `Object.defineProperty`를 사용하여 pizza 객체의 name 프로퍼티에 대한 getter와 setter를 정의하고 있습니다. 실제 값은 비공개 `_name` 프로퍼티에 저장되며, getter와 setter는 콘솔에 메시지를 로깅하는 동안 해당 값에 대한 액세스를 제공합니다.

많은 프로퍼티에 동일한 동작을 적용하려는 경우 `Object.defineProperty`는 `Proxy`를 사용하는 것보다 더 장황합니다. 하지만 개별 프로퍼티에 대한 사용자 정의 동작을 정의할 수 있는 강력하고 유연한 방법입니다.

### 프로미스가 있는 비동기 반응형 데이터

옵저버를 비동기적으로 사용해 봅시다! 이렇게 하면 데이터를 업데이트하고 여러 옵저버를 비동기적으로 실행할 수 있습니다.

```js
class AsyncData {
  constructor(initialData) {
    this.data = initialData;
    this.subscribers = [];
  }

  // 데이터 변경에 대한 구독
  subscribe(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    this.subscribers.push(callback);
  }

  // 데이터를 업데이트하고 모든 업데이트가 완료될 때까지 기다립니다.
  async set(key, value) {
    this.data[key] = value;

    // 구독된 함수를 호출하고 해결될 때까지 기다립니다.
    const updates = this.subscribers.map(async (callback) => {
      await callback(key, value);
    });

    await Promise.allSettled(updates);
  }
}
```

데이터 객체를 감싸고 데이터가 변경될 때 업데이트를 트리거하는 클래스입니다.

#### 비동기 옵저버 기다리기 

비동기 반응형 데이터에 대한 모든 구독이 처리될 때까지 기다린다고 가정해 봅시다.

```js
const data = new AsyncData({ pizza: 'Pepperoni' });

data.subscribe(async (key, value) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`Updated UI for ${key}: ${value}`);
});

data.subscribe(async (key, value) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`Logged change for ${key}: ${value}`);
});

// 데이터를 업데이트하고 모든 업데이트가 완료될 때까지 기다리는 함수입니다.
async function updateData() {
  await data.set('pizza', 'Supreme'); // 구독된 함수들을 호출하고 그들의 프로미스가 해결될 때까지 기다립니다.
  console.log('All updates complete.');
}

updateData();
```

`updateData` 함수가 비동기이므로 프로그램을 계속하기 전에 구독된 모든 함수가 resolve될 때까지 기다릴 수 있습니다. 이 패턴을 사용하면 비동기 반응성을 좀 더 간단하게 다룰 수 있습니다.

## 반응형 시스템

리액트의 훅, 솔리드의 시그널, Rx.js의 옵저버블 등 더 복잡한 반응형 시스템은 널리 사용되는 라이브러리와 프레임워크의 기반에 있습니다. 이들은 일반적으로 데이터가 변경되면 컴포넌트 또는 관련 DOM 조각을 다시 렌더링한다는 동일한 기본 전제를 가지고 있습니다.

### 옵저버블 (Rx.js의 패턴)

옵저버블과 옵저버 패턴은 단어는 거의 비슷하지만, 동일하지 않습니다.

옵저버블은 시간에 따라 일련의 값을 생성하는 방법을 정의할 수 있게 해줍니다. 다음은 일련의 값을 구독자에게 발행하고, 그 값이 생성됨에 따라 반응할 수 있게 하는 간단한 옵저버블 원시형입니다.

```js
class Observable {
  constructor(producer) {
    this.producer = producer;
  }

  // 구독자가 옵저버블을 구독할 수 있도록 하는 메서드
  subscribe(observer) {
    // 옵저버가 필요한 기능을 가지고 있는지 확인합니다.
    if (typeof observer !== 'object' || observer === null) {
      throw new Error('Observer must be an object with next, error, and complete methods');
    }

    if (typeof observer.next !== 'function') {
      throw new Error('Observer must have a next method');
    }

    if (typeof observer.error !== 'function') {
      throw new Error('Observer must have an error method');
    }

    if (typeof observer.complete !== 'function') {
      throw new Error('Observer must have a complete method');
    }

    const unsubscribe = this.producer(observer);

    // 구독 취소 메서드가 있는 객체를 반환합니다.
    return {
      unsubscribe: () => {
        if (unsubscribe && typeof unsubscribe === 'function') {
          unsubscribe();
        }
      },
    };
  }
}
```

사용 방법은 다음과 같습니다.

```js
// 세 개의 값을 반환하는 새 관찰자를 생성한 다음 완료합니다.
const observable = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();

  // 선택 사항입니다, 옵저버가 구독을 취소할 경우 정리를 처리하는 함수를 반환합니다.
  return () => {
    console.log('Observer unsubscribed');
  };
});

// next, error, complete 메서드로 옵저버를 정의합니다.
const observer = {
  next: value => console.log('Received value:', value),
  error: err => console.log('Error:', err),
  complete: () => console.log('Completed'),
};

// 옵저버블 구독
const subscription = observable.subscribe(observer);

// 선택적으로, 나중에 구독을 취소하여 값 수신을 중지할 수 있습니다.
subscription.unsubscribe();
```

옵저버의 핵심 구성 요소는 옵저버에 데이터를 전송하는 `next()` 메서드, 관찰 가능한 스트림이 닫힐 때를 위한 `complete()` 메서드, 문제가 발생했을 때 사용하는 `error()` 메서드가 있습니다. 또한, 변경 사항을 수신하기 위한 `subscribe()` 메서드와 스트림에서 데이터 수신을 중단하기 위한 `unsubscribe()` 메서드가 있어야 합니다.

이 패턴을 사용하는 가장 대표적인 라이브러리는 [Rx.js](https://rxjs.dev/)와 [MobX](https://mobx.js.org/)입니다.

### "Signals" (SolidJS의 패턴)

Ryan Carniato의 [SolidJS를 통한 반응성 강좌](https://frontendmasters.com/courses/reactivity-solidjs/?utm_source=blog&utm_medium=website&utm_campaign=reactivity)에 대한 간략한 소개입니다.

```js
const context = [];

export function createSignal(value) {
    const subscriptions = new Set();

    const read = () => {
        const observer = context[context.length - 1]
        if (observer) subscriptions.add(observer);
        return value;
    }
    const write = (newValue) => {
        value = newValue;
        for (const observer of subscriptions) {
            observer.execute()
        }
    }

    return [read, write];
}

export function createEffect(fn) {
    const effect = {
        execute() {
            context.push(effect);
            fn();
            context.pop();
        }
    }

    effect.execute();
}
```

사용하는 방법은 다음과 같습니다.

```js
import { createSignal, createEffect } from "./reactive";

const [count, setCount] = createSignal(0);

createEffect(() => {
  console.log(count());
}); // 0

setCount(10); // 10
```

여기 Ryan이 강의에서 작성한 코드 샘플이 포함된 [바닐라 반응형 시스템](https://gist.github.com/1Marc/09e739caa6a82cc176ab4c2abd691814)의 전체 코드가 있습니다.

### "Observable-ish" 값 (프런트엔드 마스터)

저희 프런트엔드 마스터 비디오 플레이어에는 비디오 재생을 수정하기 위해 언제든지 변경할 수 있는 많은 설정이 있습니다. 우리 팀의 Kai는 바닐라 자바스크립트로 반응형 시스템을 구현한 또 다른 예시인 ["Observable-ish" Values](https://github.com/FrontendMasters/observablish-values)를 만들었습니다(이미 수년 전에 만들었지만, 이 글을 위해 방금 게시했습니다).

100줄도 안 되는 코드이지만 오랜 세월을 견뎌냈습니다! 7년 이상 동안 이 작은 코드가 수백만 시간의 동영상 전송을 뒷받침해 왔습니다. 여러 퍼블리셔의 결과를 합산하여 계산된 값을 얻을 수 있는 기능이 있는 PubSub를 혼합한 것입니다.

"Observable-ish" 값을 사용하는 방법은 다음과 같습니다. 값이 변경되면 구독자 함수에 변경 사항을 게시합니다.

```js
const fn = function(current, previous) {}

const obsValue = ov('initial');
obsValue.subscribe(fn);      // 변경 사항 구독
obsValue();                  // 'initial'이 할당
obsValue('initial');         // 동일한 값이므로 변경 없음
obsValue('new');             // fn('new', 'initial')
obsValue.value = 'silent';   // 조용한 업데이트
```

배열과 객체를 수정하면 게시되지 않지만 교체하면 게시됩니다.

```js
const obsArray = ov([1, 2, 3]);
obsArray.subscribe(fn);
obsArray().push(4);          // 조용한 업데이트
obsArray.publish();          // fn([1, 2, 3, 4]);
obsArray([4, 5]);            // fn([4, 5], [1, 2, 3]);
```

함수를 전달하면 결과가 값으로 캐시됩니다. 추가 인수는 함수에 전달됩니다. 함수 내에서 호출된 모든 옵저버블은 구독되며, 해당 옵저버블을 업데이트하면 값이 다시 계산됩니다.

자식 옵저버블은 반드시 호출되어야 하며, 단순한 참조는 무시됩니다. 함수가 프로미스를 반환하는 경우, 값은 확인 후 비동기적으로 할당됩니다.

```js
const a = ov(1);
const b = ov(2);
const computed = ov(arg => { a() + b() + arg }, 3);
computed.subscribe(fn);
computed();                  // fn(6)
a(2);                        // fn(7, 6)
```

## UI의 반응형 렌더링

DOM과 CSS에서 사용할 수 있는 몇 가지 패턴들이 있습니다.

### 데이터를 HTML 문자열 리터럴로 렌더링하기

다음은 데이터를 기반으로 피자 UI를 렌더링하는 간단한 예제입니다.

```js
function PizzaRecipe(pizza) {
  return `<div class="pizza-recipe">
    <h1>${pizza.name}</h1>
    <h3>Toppings: ${pizza.toppings.join(', ')}</h3>
    <p>${pizza.description}</p>
  </div>`;
}

function PizzaRecipeList(pizzas) {
  return `<div class="pizza-recipe-list">
    ${pizzas.map(PizzaRecipe).join('')}
  </div>`;
}

var allPizzas = [
  {
    name: 'Margherita',
    toppings: ['tomato sauce', 'mozzarella'],
    description: 'A classic pizza with fresh ingredients.'
  },
  {
    name: 'Pepperoni',
    toppings: ['tomato sauce', 'mozzarella', 'pepperoni'],
    description: 'A favorite among many, topped with delicious pepperoni.'
  },
  {
    name: 'Veggie Supreme',
    toppings: ['tomato sauce', 'mozzarella', 'bell peppers', 'onions', 'mushrooms'],
    description: 'A delightful vegetable-packed pizza.'
  }
];

// 피자 목록 렌더링
function renderPizzas() {
  document.querySelector('body').innerHTML = PizzaRecipeList(allPizzas);
}

renderPizzas(); // 초기 렌더링

// 데이터 변경 및 재렌더링 예시
function addPizza() {
  allPizzas.push({
    name: 'Hawaiian',
    toppings: ['tomato sauce', 'mozzarella', 'ham', 'pineapple'],
    description: 'A tropical twist with ham and pineapple.'
  });

  renderPizzas(); // 업데이트된 목록을 다시 렌더링합니다.
}

// 새 피자를 추가하고 목록을 다시 렌더링하려면 이 함수를 호출하세요.
addPizza();
```

`addPizza`는 목록에 새 피자 레시피를 추가한 다음 변경 사항을 반영하도록 목록을 다시 렌더링하여 데이터를 변경하는 방법을 보여줍니다.

이 접근 방식의 가장 큰 단점은 렌더링할 때마다 전체 DOM을 날려버린다는 것입니다. [lit-html](https://www.npmjs.com/package/lit-html) ([lit-html 사용 가이드](https://lit.dev/docs/libraries/standalone-templates/))와 같은 라이브러리를 사용하면 변경되는 DOM의 일부만 지능적으로 업데이트할 수 있습니다. 데이터 그리드 컴포넌트와 같이 프런트엔드 마스터에서 매우 동적인 여러 컴포넌트에서 이 작업을 수행합니다.

다른 접근 방식의 예는 [Vanilla TodoMVC 리포지토리](https://github.com/1Marc/modern-todomvc-vanillajs) 및 관련 [Vanilla TodoMVC 문서](https://frontendmasters.com/blog/vanilla-javascript-todomvc/)를 참조하세요.

### 반응형 DOM 속성: MutationObserver

DOM을 반응형으로 만드는 한 가지 방법은 속성을 추가하고 제거하는 것입니다. `MutationObserver` API를 사용하여 속성 변경을 수신할 수 있습니다.

```js
const mutationCallback = (mutationsList) => {
  for (const mutation of mutationsList) {
    if (
      mutation.type !== "attributes" ||
      mutation.attributeName !== "pizza-type"
    ) return;

    console.log('old:', mutation.oldValue)
    console.log('new:', mutation.target.getAttribute("pizza-type"))
  }
}
const observer = new MutationObserver(mutationCallback);
observer.observe(document.getElementById('pizza-store'), { attributes: true });
```

이제 프로그램 어디에서나 pizza-type 속성을 업데이트할 수 있고, 요소 자체에 해당 속성 업데이트에 대한 동작을 추가할 수 있습니다!

### 웹 컴포넌트의 반응형 속성

웹 컴포넌트에는 속성 업데이트를 수신하고 반응할 수 있는 내장된 방법이 있습니다.

```js
class PizzaStoreComponent extends HTMLElement {
  static get observedAttributes() {
    return ['pizza-type'];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `<p>${this.getAttribute('pizza-type') || 'Default Content'}</p>`;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'my-attribute') {
      this.shadowRoot.querySelector('div').textContent = newValue;
      console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
    }
  }
}

customElements.define('pizza-store', PizzaStoreComponent);
```

```html
<pizza-store pizza-type="Supreme"></pizza-store>
```

```js
document.querySelector('pizza-store').setAttribute('pizza-type', 'BBQ Chicken!');
```

조금 더 간단하지만 이 API를 사용하려면 웹 컴포넌트를 사용해야 합니다.

### 반응형 스크롤: IntersectionObserver

DOM 요소가 스크롤되는 것을 반응성에 연결할 수 있습니다. 저는 마케팅 페이지의 매끄러운 애니메이션에 이 방법을 사용했습니다.


```js
var pizzaStoreElement = document.getElementById('pizza-store');

var observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    } else {
      entry.target.classList.remove('animate-in');
    }
  });
});

observer.observe(pizzaStoreElement);
```

`IntersectionObserver`를 사용하여 코드 몇 줄로 [스크롤 애니메이션](https://codepen.io/1Marc/pen/wvEKOEr)을 구현하는 예제입니다.

### 애니메이션 및 게임 루프: requestAnimationFrame

게임 개발, 캔버스, WebGL 또는 화려한 마케팅 사이트에서, 애니메이션을 버퍼에 쓴 다음 렌더링 스레드를 사용할 수 있게 되면 지정된 루프에 결과를 써야 하는 경우가 많습니다. 이 작업은 `requestAnimationFrame`으로 수행합니다.

```js
function drawStuff() {
  // 여기서 게임이나 애니메이션 렌더링 로직을 수행합니다.
}

// 애니메이션을 처리하는 함수
function animate() {
  drawStuff();
  requestAnimationFrame(animate); // 다음 렌더링 프레임을 사용할 수 있을 때 계속 animate를 호출합니다.
}

// 애니메이션을 시작합니다.
animate();
```

이 방법은 프레임이 사용 가능해졌을 때 장면을 렌더링하는, 게임이나 다른 모든 실시간 렌더링 작업에서 사용됩니다.

### 반응형 애니메이션: Web Animations API

Web Animation API로 반응형 애니메이션을 만들 수도 있습니다. 여기서는 Animation API를 사용하여 요소의 크기, 위치 및 색상에 애니메이션을 적용하겠습니다.

```js
const el = document.getElementById('animatedElement');

// 애니메이션 프로퍼티 정의
const animation = el.animate([
  // 키프레임
  { transform: 'scale(1)', backgroundColor: 'blue', left: '50px', top: '50px' },
  { transform: 'scale(1.5)', backgroundColor: 'red', left: '200px', top: '200px' }
], {
  // 타이밍 옵션
  duration: 1000,
  fill: 'forwards'
});

// 애니메이션을 일시 정지하려면 재생 속도를 0으로 설정합니다.
animation.playbackRate = 0;

// 엘리먼트에 클릭 이벤트 리스너를 추가합니다.
el.addEventListener('click', () => {
  // 애니메이션이 일시정지된 경우 재생합니다.
  if (animation.playbackRate === 0) {
    animation.playbackRate = 1;
  } else {
    // 애니메이션이 재생 중이면 반전시킵니다.
    animation.reverse();
  }
});
```

반응형 애니메이션의 장점은 인터랙션이 발생했을 때 애니메이션이 인터렉션이 발생한 위치를 기준으로 재생될 수 있다는 것입니다(위의 경우 방향을 반전시켰습니다). 표준 CSS 애니메이션과 트랜지션은 현재 위치에 상대적이지 않습니다.

### 반응형 CSS: 사용자 정의 프로퍼티와 `calc`

마지막으로, 사용자 정의 프로퍼티와 `calc`를 결합하여 반응형 CSS를 작성할 수 있습니다.

```js
barElement.style.setProperty('--percentage', newPercentage);
```

자바스크립트에서는 사용자 정의 프로퍼티 값을 설정할 수 있습니다.

```css
.bar {
  width: calc(100% / 4 - 10px);
  height: calc(var(--percentage) * 1%);
  background-color: blue;
  margin-right: 10px;
  position: relative;
}
```

이제 CSS에서 해당 백분율을 기반으로 계산을 수행할 수 있습니다. 렌더링 로직을 모두 자바스크립트에 보관할 필요 없이 CSS에 바로 계산을 추가하고 CSS가 스타일링 작업을 수행하도록 할 수 있다는 것은 매우 멋진 일입니다.

참고: 현재 값을 기준으로 변경 사항을 생성하려는 경우 프로퍼티를 아래와 같이 받아올 수도 있습니다.

```js
getComputedStyle(barElement).getPropertyValue('--percentage');
```

## 다양한 방법으로 반응성을 달성하는 법

현재의 바닐라 자바스크립트에는 굉장히 적은 코드만으로 반응성을 달성할 수 있는 방법이 굉장히 많습니다. 앱에서 반응형 렌더링, 로깅, 애니메이션, 사용자 이벤트 처리 등 브라우저에서 일어날 수 있는 모든 일을 처리하는 데, 적합한 방식으로 이러한 패턴을 조합할 수 있습니다.