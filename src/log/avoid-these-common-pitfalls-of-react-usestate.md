# 리액트에서 useState를 사용하면서 저지를 수 있는 흔한 실수들

> 원문: https://profy.dev/article/react-usestate-pitfalls

`useState`는 가장 자주 사용하는 리액트 훅입니다. 어디에나 있습니다. 그러나 그렇기 때문에 몇 가지 흔한 실수들도 있습니다.

당신은 아마도 그 중 일부를 경험했을 것입니다 (심지어 깨닫지 못했을지라도). 불필요하거나, 중복되거나, 모순되는 상태를요. 이 때문에 실제로는 쓸모없는 useEffect가 존재할 수도 있습니다. 그리고 이 모든 결합은 유지 관리가 불가능하고 읽기 어려운 코드로 만드는 큰 함정이 될 수 있습니다.

이런 함정들에 대해 알면 다음과 같은 도움이 됩니다.

- 코드를 더 쉽게 읽고 유지 관리할 수 있습니다.
- 버그가 덜 발생하는 코드 생성를 생성할 수 있습니다.
- 많은 코드 복잡성을 제거할 수 있습니다.

<!-- 번역 약간 어렵 -->
잊지 마세요. 채용 과정의 코딩 과제에서 난처한 함정에 쉽게 빠진다는 의미는 아닙니다. **문제는 `useState`와 관련된 잠재적인 문제들을 피하기 위해서는 먼저 그에 대해 인식하고 있어야 한다는 점입니다.**

따라서 이 페이지에서는 리액트에서 상태와 관련하여 가장 일반적인 함정을 살펴보겠습니다. 그들 각각에 대해 아래와 같이 내용을 구성했습니다.

- 코드 예제
- 자세한 문제 설명
- 해결책 및
- 대화식 리팩토링 연습

이 글을 읽고 연습을 거친 후에는 자신의 코드를 다른 방식으로 보게 될 것입니다.

## 불필요한 상태

필요하지 않은 상태 변수는 주니어 개발자가 작성한 코드에서 가장 흔한 문제 중 하나입니다. 일반적으로 하나의 상태가 다른 상태 변수에 종속될 때 주로 문제가 발생할 수 있습니다.

간단한 예시를 드는 것이 상황을 설명하는 가장 좋은 방법일 것입니다. 그럼 바로 들어가 보겠습니다.

### 코드 예제

다음은 사용자가 이름과 성을 편집할 수 있는 간단한 컴포넌트입니다. 입력 값에 따라 전체 이름이 렌더링됩니다.

![](https://ik.imagekit.io/87wct6jq4ql/tr:w-720/https://media.graphassets.com/OdtUSovSTm6pAp1PQGyb)

불필요한 상태를 발견하셨나요?
```jsx
import { useState } from "react";

function RedundantState() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");

  const onChangeFirstName = (event) => {
    setFirstName(event.target.value);
    setFullName(`${event.target.value} ${lastName}`);
  };

  const onChangeLastName = (event) => {
    setLastName(event.target.value);
    setFullName(`${firstName} ${event.target.value}`);
  };

  return (
    <>
      <form>
        <input
          value={firstName}
          onChange={onChangeFirstName}
          placeholder="First Name"
        />
        <input
          value={lastName}
          onChange={onChangeLastName}
          placeholder="Last Name"
        />
      </form>
      <div>Full name: {fullName}</div>
    </>
  );
}
```

### 문제점

첫 번째로 본능적으로 다음과 같이 말할 수 있습니다. `firstName` 및 `fullName` 상태 업데이트가 이어져 곧바로 일어나기 때문에 추가 렌더링 주기를 야기할 수 있습니다.

```jsx
const onChangeFirstName = (event) => {
  setFirstName(event.target.value);
  setFullName(`${event.target.value} ${lastName}`);
};
```

그러나 리액트 18버전부터 상태 업데이트는 일괄적으로 처리됩니다. 따라서 각 상태 업데이트에 따라 별도의 렌더링이 일어나지는 않습니다.

> 참고: 아래 스크린샷의 추가 렌더링은 개발 단계에서만 발생합니다.

![](https://ik.imagekit.io/87wct6jq4ql/tr:w-720/https://media.graphassets.com/aGGWImVZQq436UakjS4s)

따라서 대부분의 경우 성능 면에서 큰 차이가 없습니다. 진짜 문제는 유지 관리 가능성과 버그 도입의 위험입니다. 예를 들어 변경 핸들러를 다시 살펴보십시오.

```jsx
const onChangeFirstName = (event) => {
  setFirstName(event.target.value);
  setFullName(`${event.target.value} ${lastName}`);
};
const onChangeLastName = (event) => {
  setLastName(event.target.value);
  setFullName(`${firstName} ${event.target.value}`);
};
```

이름이나 성을 업데이트할 때마다 `fullName`도 업데이트해야 합니다. 더 복잡한 시나리오에서는 쉽게 놓칠 수 있습니다. 따라서 코드를 리팩토링하기가 더 어려우며 버그 도입 위험이 증가합니다.

언급했듯이 대부분의 경우 성능에 대해 걱정할 필요가 없습니다. 다만 큰 배열이나 무거운 계산이 포함된 상태로부터 변수를 만들어내야 하는 경우 [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo) 훅을 사용하면 됩니다.

### 해결책

 `fullName` 상태는 단순히 이름과 성을 결합한 것입니다. `firstName` 및 `lastName` 상태 변수에서 직접 만들 수 있습니다.

```jsx
export function RedundantState() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const fullName = `${firstName} ${lastName}`;
  
  ...

  return (
    <>
      <form>
        ...
      </form>
      <div>Full name: {fullName}</div>
    </>
  );
}
```

심지어는 여기에는 임시 변수가 필요하지 않고, `firstName` 및 `lastName`을 JSX로 직접 렌더링할 수 있습니다.

```jsx
export function RedundantState() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  ...

  return (
    <>
      <form>
        ...
      </form>
      <div>
        Full name: {firstName} {lastName}
      </div>
    </>
  );
}
```

좋습니다. 다른 상태에서 만들 수 있는 변수로 간단히 대체할 수 있는 불필요한 상태에 주의해야 합니다. 그러나 여기서 문제는 무엇입니까?

<!-- ok got it, what's the problem here 해석 -->

#### 연습해보기

<br >

<iframe src="https://codesandbox.io/embed/eager-black-bui7ol?view=split,preview&editorsize=50&codemirror=1&fontsize=14&hidenavigation=1&module=/Challenge-1.jsx,/Challenge-2.jsx,/Solution-1.jsx,/Solution-2.jsx&theme=dark"
     style="width:calc(100% + 100px); height:500px; margin: 0 -50px; border:0; border-radius: 4px; overflow:hidden;"
     title="eager-black-bui7ol"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## 중복 상태

여러 상태 변수에 중복된 데이터는 또 다른 문제입니다. 일반적으로 데이터를 변환, 정렬 또는 필터링(API)할 때 발생합니다. 또 다른 흔한 경우는 아래 예와 같이 항목을 선택할 때 입니다.

<!-- 항목? 아이템? -->

### 코드 예제

다음은 항목 목록을 렌더링하는 간단한 컴포넌트입니다. 사용자는 해당 버튼을 클릭하여 (가상의) 모달에서 항목을 열 수 있습니다.

![](https://ik.imagekit.io/87wct6jq4ql/tr:w-720/https://media.graphassets.com/W3W2iGhBTi6WuungHpWv)

아래 코드에는 자주 볼 수 있는 일반적인 실수가 포함되어 있습니다. 찾을 수 있나요?

```jsx
import { useState } from "react";

// const items = [
//   {
//     id: "item-1",
//     text: "Item 1",
//   },
//   ...
// ]

function DuplicateState({ items }) {
  const [selectedItem, setSelectedItem] = useState();

  const onClickItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      {selectedItem && <Modal item={selectedItem} />}
      <ul>
        {items.map((row) => (
          <li key={row.id}>
            {row.text}
            <button onClick={() => onClickItem(row)}>Open</button>
          </li>
        ))}
      </ul>
    </>
  );
}
```

문제는 한 항목이 완전히 상태로 복사된다는 것입니다.

### 문제점

이것 역시 큰 변화처럼 보이지 않습니다. 그럼 문제가 뭘까요?

원본 코드의 중복 데이터 문제는 [단 하나의 진실의 근원(Single Source Of Truth)](https://en.wikipedia.org/wiki/Single_source_of_truth) 원칙을 위반한다는 것입니다. 실제로 사용자가 항목 중 하나를 선택하면 `selectedItem` 상태와 `items` 배열의 해당 항목이라는 두 진실의 근원이 존재하게 됩니다.

이제 사용자가 모달 내에서 항목을 편집할 수 있다고 상상해 보십시오. 그럼 다음과 같은 일이 벌어질 수 있습니다.

1. 사용자가 모달에서 데이터를 변경해 제출합니다.
2. 요청이 서버로 전송되고 데이터베이스의 항목이 업데이트됩니다.
3. 프런트엔드는 항목 데이터를 업데이트합니다 (서버의 응답을 통해서든 또는 항목 배열을 다시 요청해서든).
4. 프런트엔드가 새로운 `items` 배열로 다시 렌더링됩니다.
5. 이제 질문은, `DuplicateState` 컴포넌트 내부에서 어떤 일이 발생할까요? 입니다.

여기서 문제가 시작됩니다. `selectedItem` 상태에는 여전히 이전 데이터가 포함됩니다. 그것은 동기화되지 않을 것입니다. 더 복잡한 상황에서 이것이 상당히 풀기 어려운 버그가 될 수 있을거라 예상할 수 있습니다.

물론 `selectedItem` 상태를 동기화 상태로 유지할 수 있습니다. 하지만 `useEffect`를 사용하여 `items` 배열의 변경사항을 지켜봐야 합니다. 그럼 다음 섹션으로 넘어가겠습니다.

### 해결책

더 간단한 해결책은 선택한 id만 추적하는 것입니다. 보시다시피 해결책은 '중복 상태' 섹션의 해결책과 매우 유사합니다. 단순히 id에서 `selectedItem` 변수를 만듭니다.

```jsx
// const items = [
//   {
//     id: "item-1",
//     text: "Item 1",
//   },
//   ...
// ]

function DuplicateState({ items }) {
  const [selectedItemId, setSelectedItemId] = useState();
  const selectedItem = items.find(({ id }) => id === selectedItemId);

  const onClickItem = (itemId) => {
    setSelectedItemId(itemId);
  };

  return (
    <>
      {selectedItem && <Modal item={selectedItem} />}
      <ul>
        {items.map((row) => (
          <li key={row.id}>
            {row.text}
            <button onClick={() => onClickItem(row.id)}>Open</button>
          </li>
        ))}
      </ul>
    </>
  );
}
```

#### 연습해보기

<br >

<iframe src="https://codesandbox.io/embed/proud-wave-xgnc8g?view=split,preview&fontsize=14&editorsize=50&codemirror=1&module=/Challenge.jsx,/Solution.jsx&hidenavigation=1&theme=dark"
     style="width:calc(100% + 100px); height:500px; margin: 0 -50px; border:0; border-radius: 4px; overflow:hidden;"
     title="proud-wave-xgnc8g"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## useEffect를 통한 상태 업데이트

리액트에서 상태와 관련된 또 다른 일반적인 문제는 `useEffect`로 변수의 변경 사항을 관찰하는 것입니다. 이는 너무 잊기 쉬워 [동료 개발자가 제가 이 실수를 저질렀다고 지적해야 했습니다](https://www.reddit.com/r/reactjs/comments/xak8x3/comment/invrwvr).

### 코드 예제

이전 섹션에서 (약간 조정된) 예제를 살펴보겠습니다.

![](https://ik.imagekit.io/87wct6jq4ql/tr:w-720/https://media.graphassets.com/cc5xbXPFSHymLobDMQ9n)

보시다시피 컴포넌트에서 이제 `items` 배열이 변경될 때 `selectedItem` 상태를 동기화하는 `useEffect`가 있습니다.

```jsx
import { useEffect, useState } from "react";

// const items = [
//   {
//     id: "item-1",
//     text: "Item 1",
//   },
//   ...
// ]

function DuplicateState({ items }) {
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    if (selectedItem) {
      setSelectedItem(items.find(({ id }) => id === selectedItem.id));
    }
  }, [items]);

  const onClickItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      {selectedItem && <Modal item={selectedItem} />}
      <ul>
        {items.map((row) => (
          <li key={row.id}>
            {row.text}
            <button onClick={() => onClickItem(row)}>Open</button>
          </li>
        ))}
      </ul>
    </>
  );
}
```
이 코드는 제대로 작동하고 `selectedItem` 상태를 동기화 상태로 유지합니다. 하지만 어딘가 부족한 느낌이 들지 않나요?

### 문제점

이 접근 방식에는 여러 가지 문제가 있습니다.

1. `useEffect`는 읽고 이해하기 쉽지 않습니다. 따라서 적을수록 더 좋습니다.
2. `useEffect` 내에서 상태를 업데이트하면 추가 렌더링이 발생합니다. 이는 일반적으로 성능 측면에서 큰 문제는 아니지만 고려해야 할 사항입니다.
3. 원래 코드에서는 `selectedItem` 상태와 `items` prop 사이에 다소 숨겨진 관계가 있었습니다. 이는 코드를 읽거나 변경할 때 놓치기 쉽습니다.
4. 적시에 `useEffect` 내부의 코드를 작동시키기 어려울 수 있습니다. 첫 번째 렌더링에서 코드를 실행하지 않도록 하는 다른 해결 방법을 종종 볼 수 있습니다. 다음은 그 예시입니다.

```jsx
function DuplicateState({ items }) {
  const [selectedItem, setSelectedItem] = useState();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setSelectedItem(items.find(({ id }) => id === selectedItem.id));
  }, [items]);

  ...
```

요점은 `useEffect`를 사용하고 싶거나 다른 개발자의 코드에서 보고 싶다면 이것이 정말로 필요한지 스스로에게 물어보세요. 이전 섹션에서 설명한대로 중복 제거 또는 다른 상태로부터 변수를 만들어 피할 수 있습니다.

### 해결책

짐작하셨겠지만 이전 섹션의 해결책은 `useEffect`를 제거하는 데도 도움이 됩니다. 전체 객체 대신 선택한 항목의 ID만 저장하면 동기화할 항목이 없습니다.

```jsx
import { useState } from "react";

// const items = [
//   {
//     id: "item-1",
//     text: "Item 1",
//   },
//   ...
// ]

function DuplicateState({ items }) {
  const [selectedItemId, setSelectedItemId] = useState();
  const selectedItem = items.find(({ id }) => id === selectedItemId);

  const onClickItem = (id) => {
    setSelectedItem(id);
  };

  return (
    <>
      {selectedItem && <Modal item={selectedItem} />}
      <ul>
        {items.map((row) => (
          <li key={row.id}>
            {row.text}
            <button onClick={() => onClickItem(row.id)}>Open</button>
          </li>
        ))}
      </ul>
    </>
  );
}
```

#### 연습해보기

<br >

<iframe src="https://codesandbox.io/embed/beautiful-meninsky-zql3zs?view=split,preview&fontsize=14&editorsize=50&codemirror=1&module=/Challenge.jsx,/Solution.jsx&hidenavigation=1&theme=dark"
     style="width:calc(100% + 100px); height:500px; margin: 0 -50px; border:0; border-radius: 4px; overflow:hidden;"
     title="beautiful-meninsky-zql3zs"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## useEffect를 통해 상태 변경 관찰

이전 섹션과 관련된 또 다른 흔한 문제는 `useEffect`를 사용해 상태 변수의 변경에 반응하는 것입니다. 하지만 해결책은 약간 다릅니다.

### 코드 예제

다음은 제품을 보여주는 컴포넌트입니다. 사용자는 버튼을 클릭해 제품 세부 정보를 보거나 숨길 수 있습니다. 세부 정보가 표시되거나 숨겨질 때마다 우리는 액션을 실행합니다(이 경우에서는 가상의 분석 도구에서 이벤트를 추적합니다).

```jsx
import { useEffect, useState } from "react";

function ProductView({ name, details }) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  useEffect(() => {
    trackEvent({ event: "Toggle Product Details", value: isDetailsVisible });
  }, [isDetailsVisible]);

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  return (
    <div>
      {name}
      <button onClick={toggleDetails}>Show details</button>
      {isDetailsVisible && <ProductDetails {...details} />}
    </div>
  );
}
```

이 경우 `useEffect`는 `isDetailsVisible` 변수의 변경사항을 관찰하고 그에 따라 추적 코드를 실행합니다.

> 그나저나 위 코드에는 버그가 있습니다. 정말 간과하기 쉽습니다. 아래의 "문제점" 섹션에서 설명을 찾을 수 있습니다.

### 문제점

이전 섹션과 마찬가지로 몇 가지 문제가 있습니다.

1. `useEffect`는 이해하기 쉽지 않은 경우가 많습니다.
2. 불필요한 렌더링 주기를 유발할 수 있습니다 (상태가 effect 내에서 업데이트되는 경우).
3. 렌더링 생명 주기와 관련된 버그를 도입하기 쉽습니다. 사실 원래 코드는 초기 렌더링 중에 `trackEvent`를 실행하기 때문에 버그가 있습니다.
4. 실제 원인에서 결과를 분리합니다. 원래 코드에서는 `isDetailsVisible`이 변경되기 때문에 `trackEvent`가 실행되는 것을 볼 수 있습니다. 하지만 진짜 원인은 사용자가 "세부정보 보기" 버튼을 눌렀기 때문입니다.
<!-- effect 내에서 => useEffect 내에서? 부수효과 -->

### 해결책

대부분의 경우 상태 변수의 변경사항을 관찰하는 `useEffect`는 제거할 수 있습니다. 종종 우리는 처음 상태를 업데이트하는 코드 바로 다음에 효과를 배치할 수 있습니다. 여기서는 `toggleDetails` 함수 내로 `trackEvent(...)`를 이동합니다.

```jsx
function ProductView({ name, details }) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
    trackEvent({ event: "Toggle Product Details", value: !isDetailsVisible });
  };

  return (
    <div>
      {name}
      <button onClick={toggleDetails}>Show details</button>
      {isDetailsVisible && <ProductDetails {...details} />}
    </div>
  );
}
```

#### 연습해보기

<br >

<iframe src="https://codesandbox.io/embed/dry-wildflower-8fm07i?view=split,preview&fontsize=14&editorsize=50&codemirror=1&module=/Challenge.jsx,/Solution.jsx&hidenavigation=1&theme=dark"
     style="width:calc(100% + 100px); height:500px; margin: 0 -50px; border:0; border-radius: 4px; overflow:hidden;"
     title="dry-wildflower-8fm07i"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## 모순되는 상태

서로 의존하는 여러 상태 변수로 작업할 때, 허용되어서는 안 되는 컴포넌트 상태를 쉽게 생성할 수 있습니다. 코드를 통해 살펴봅시다.

### 코드 예제

여기 기본적인 데이터 가져오기 예제가 있습니다. 컴포넌트는 데이터를 로드 중이거나, 오류가 발생했거나, 데이터를 성공적으로 가져온 등 다양한 상태에 있을 수 있습니다.

```jsx
export function ContradictingState() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchData()
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setData(null);
        setError(error);
      });
  }, []);

  ...
```

### 문제점

이 접근 방식의 문제는 주의하지 않으면 모순된 상태에 빠질 수 있다는 것입니다. 예를들어 위의 예에서 오류가 발생할 때 `isLoading`을 `false`로 설정하는 것을 잊을 수 있습니다.

또한 어떤 상태 변수의 조합이 허용되는지 이해하기 어렵습니다. 위의 예에서 이론적으로 8개의 서로 다른 컴포넌트 상태를 가질 수 있습니다. 그러나 어떤 상태 조합이 실제로 존재하는지 즉시 알 수는 없습니다.

> 8가지 상태 조합의 출처가 궁금하신 경우를 대비해 `data`는 `null` 또는 객체, `isLoading`은 `true` 또는 `false`, 그리고 `error`는 `null`또는 객체일 수 있습니다. 따라서 2 _2_ 2 = 8입니다.

### 해결책

서로 의존하는 여러 상태 변수는 `useState` 대신 `useReducer`를 도입하게되는 일반적인 시나리오입니다.

```jsx
const initialState = {
  data: [],
  error: null,
  isLoading: false
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH":
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case "SUCCESS":
      return {
        ...state,
        error: null,
        isLoading: false,
        data: action.data
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      throw new Error(`action "${action.type}" not implemented`);
  }
}

export function NonContradictingState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "FETCH" });
    fetchData()
      .then((data) => {
        dispatch({ type: "SUCCESS", data });
      })
      .catch((error) => {
        dispatch({ type: "ERROR", error });
      });
  }, []);

  ...
```

이 방법은 우리 두뇌의 오버헤드가 훨씬 적습니다. 3개의 동작과 4개의 가능한 컴포넌트 상태("FETCH", "SUCCESS", "ERROR" 및 초기 상태)가 있음을 즉시 알 수 있습니다.

#### 연습해보기

<br >

<iframe src="https://codesandbox.io/embed/gallant-orla-1nbt4l?view=split,preview&fontsize=14&editorsize=50&codemirror=1&module=/Challenge.jsx,/Solution.jsx&hidenavigation=1&theme=dark"
     style="width:calc(100% + 100px); height:500px; margin: 0 -50px; border:0; border-radius: 4px; overflow:hidden;"
     title="gallant-orla-1nbt4l"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## 깊게 중첩된 상태

마지막 흔한 문제는 (깊이) 중첩된 객체의 상태입니다. 단순히 데이터를 렌더링하는 경우에는 전혀 문제가 되지 않을 수 있습니다. 그러나 중첩 항목 업데이트를 시작하자마자 문제가 발생합니다.

### 코드 예제

여기에 깊게 중첩된 댓글을 렌더링하는 구성 요소가 있습니다. 여기서 JSX는 그다지 중요하지 않지만 `updateComment` 콜백이 버튼이나 인풋에 연결되어 있다고 상상해 보세요.

```jsx
function NestedComments() {
  const [comments, setComments] = useState([
    {
      id: "1",
      text: "Comment 1",
      children: [
        {
          id: "11",
          text: "Comment 1 1"
        },
        {
          id: "12",
          text: "Comment 1 2"
        }
      ]
    },
    {
      id: "2",
      text: "Comment 2"
    },
    {
      id: "3",
      text: "Comment 3",
      children: [
        {
          id: "31",
          text: "Comment 3 1",
          children: [
            {
              id: "311",
              text: "Comment 3 1 1"
            }
          ]
        }
      ]
    }
  ]);

  const updateComment = (id, text) => {
    // 여기가 복잡해질겁니다.
  };

  ...
```

### 문제점

리액트에서 중첩된 상태의 문제는 불변(immutable) 방식으로 업데이트해야 한다는 것입니다. 그렇지 않으면 구성 요소가 다시 렌더링되지 않습니다.

위의 예에서 깊게 중첩된 댓글에 대한 하드 코딩된 업데이트 로직은 다음과 같습니다.

```jsx
const updateComment = (id, text) => {
  setComments([
    ...comments.slice(0, 2),
    {
      ...comments[2],
      children: [
        {
          ...comments[2].children[0],
          children: [
            {
              ...comments[2].children[0].children[0],
              text: "New comment 311"
            }
          ]
        }
      ]
    }
  ]);
};
```

그러나 이 역학을 만드는 것은 정말 복잡해집니다.
<!-- 약간 복잡 -->

### 해결책

깊이 중첩된 상태 대신 평탄한 데이터 구조로 작업하는 것이 훨씬 쉽습니다. ID를 통해 항목을 서로 참조할 수 있습니다. 그럼 아래처럼 변경할 수 있습니다.

```jsx
function FlatCommentsRoot() {
  const [comments, setComments] = useState([
    {
      id: "1",
      text: "Comment 1",
      children: ["11", "12"],
    },
    {
      id: "11",
      text: "Comment 1 1"
    },
    {
      id: "12",
      text: "Comment 1 2"
    },
    {
      id: "2",
      text: "Comment 2",
    },
    {
      id: "3",
      text: "Comment 3",
      children: ["31"],
    },
    {
      id: "31",
      text: "Comment 3 1",
      children: ["311"]
    },
    {
      id: "311",
      text: "Comment 3 1 1"
    }
  ]);

  const updateComment = (id, text) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id !== id) {
        return comment;
      }
      return {
        ...comment,
        text
      };
    });
    setComments(updatedComments);
  };

  ...
```

이제 ID로 올바른 항목을 찾고 배열에서 교체하는 것은 쉽습니다.

#### 연습해보기

<br >

<iframe src="https://codesandbox.io/embed/cool-torvalds-3gw1o1?view=split,preview&fontsize=14&editorsize=50&codemirror=1&module=/Challenge.jsx,/Solution.jsx&hidenavigation=1&theme=dark"
     style="width:calc(100% + 100px); height:500px; margin: 0 -50px; border:0; border-radius: 4px; overflow:hidden;"
     title="cool-torvalds-3gw1o1"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>