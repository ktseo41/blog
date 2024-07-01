---
outline: [2, 3]
---

# Chapter 12 - 단위 테스트

<br />
<div class="comment">앞선 테스트 개요에서 나왔듯이 단위 테스트가 80%로 많은 비율을 차지하므로, 단위 테스트에 대해 자세히 설명하는 것이 아주 중요할 것이다. 그래서 따로 챕터로 빼고 단위 테스트가 무엇인지부터 설명해나가는 것 같다.</div>

- 범위가 더 넓은 테스트들과 비교하여 단위 테스트는 생산성을 끌어올리는 훌륭한 수단이 될 수 있는 특성을 많이 지니고 있습니다.
  - 구글의 테스트 크기 정의에 따르면 단위 테스트는 대체로 작은 테스트에 속합니다. 작은 테스트는 빠르고 결정적이어서 개발자들이 수시로 수행하며 피드백을 즉각 얻을 수 있습니다.
  - 단위 테스트는 대체로 대상 코드와 동시에 작성할 수 있을 만큼 작성하기 쉽습니다. 따라서 엔지니어들은 커다란 시스템을 설정하거나 이해할 필요 없이 작성 중인 코드를 검증하는 데 집중할 수 있습니다.
  - 빠르게 작성할 수 있으므로 테스트 커버리지를 높이기 좋습니다. 커버리지가 높으면 엔지니어들은 기존 동작을 망가뜨리지 않으리라는 확신 속에서 코드를 변경할 수 있습니다.
  - 각각의 테스트는 개념적으로 간단하고 시스템의 특정 부분에 집중하므로 실패 시 원인을 파악하기 쉽습니다.
  - 대상 시스템의 사용법과 의도한 동작 방식을 알려주는 문서자료 좋은 예제 코드 역할을 해줍니다.

## 12.2 깨지기 쉬운 테스트 예방하기

- 깨지기 쉬운 테스트란 실제로는 버그가 없음에도, 심지어 검증 대상 코드와는 관련조차 없는 변경 때문에 실패하는 테스트를 말합니다.

### 12.2.1 변하지 않는 테스트로 만들기 위해 노력하자

- 시스템의 요구사항이 바뀌지 않는 한 절대 수정하지 않아야 합니다. 한 번 작성한 후로는 대상 시스템의 요구사항이 바뀌지 않는 한 절대 수정할 일이 없어야 합니다.

<div class="comment">당연한 말이라는 느낌. 단위 테스트 챕터에 꼭 들어가야하는건지? 다른 테스트에도 통용되는 말 아닌지? 하는 의문이 든다. 단위 테스트에서 더 통용되는 걸까?</div>

<div class="comment">Claude에게 물어보니, 단위 테스트는 빈번하게 실행되고, 수도 많고, 문서로서 활용되는 등등의 이유가 있어 특히 더 중요하게 강조된 것 같다고 답했다. 그게 맞는 것 같기도 하다.</div>

- 요점은 리팩터링, 새 기능 추가, 버그 수정 시에는 기존 테스트를 손볼 일이 없어야 한다는 것입니다.

### 12.2.2 공개 API를 이용해 테스트하자

<ul>
  <li>요구사항이 변하지 않는 한 테스트를 수정할 필요 없게 해주는 묘책들로 눈을 돌려보죠. 이중 가장 중요한 묘책은 <span class="underline">'테스트도 시스템을 다른 사용자 코드와 똑같은 방식으로 호출하기'</span>입니다. 내부 구현을 위한 코드가 아닌 공개 API를 호출하면 됩니다. 즉, 테스트가 시스템을 사용자와 똑같은 방식으로 사용하는 것입니다.</li>
</ul>

### 12.2.3 상호작용이 아니라 상태를 테스트하자

- 데이터베이스에 특정 메서드가 호출되었는지 확인하는 대신, 최종적으로 올바른 데이터가 저장되었는지 확인하는 예시
- `accounts.createUser("foobar")`

## 12.3 명확한 테스트 작성하기

- 테스트가 실패하는 이유는 크게 두 가지입니다.
  - 대상 시스템에 문제가 있거나 불완전합니다. 테스트는 정확히 이 문제를 잡아낼 목적으로 설계된 것입니다. 실패 이유가 이것이라면 버그를 고치라는 경고로 보면 됩니다.
  - 테스트 자체에 결함이 있을 수 있습니다. 이 경우는 대상 시스템에는 아무런 문제가 없습니다. 기존 테스트가 이런 이유로 실패했다면 깨지기 쉬운 테스트라는 뜻입니다. 앞 절에서 깨지기 쉬운 테스트를 피하는 요령을 설명했지만 완전히 제거하기는 거의 불가능합니다.
- 테스트가 실패하면 엔지니어는 가장 먼저 실패한 이유가 앞의 두 부류 중 어디에 속하는지를 파악한 후 실제 문제를 조사해야 합니다. 이 일을 얼마나 빠르게 마치느냐는 테스트의 명확성에 달렸습니다. 명확한 테스트라 함은 존재 이유와 실패 원인을 엔지니어가 곧바로 알아차릴 수 있는 테스트를 말합니다. 
- 테스트 명확성은 시간이 흐를수록 더욱 중요해집니다.

### 12.3.1 완전하고 간결하게 만들자

- 완전한 테스트란 결과에 도달하기까지의 논리를 읽는 이가 이해하는 데 필요한 모든 정보를 본문에 담고 있는 테스트를 말합니다.
- 간결한 테스트란 코드가 산만하지 않고, 관련 없는 정보는 포함하지 않은 테스트입니다.

### 12.3.2 메서드가 아니라 행위를 테스트하자

- 행위 주도 테스트는 대체로 메서드 중심 테스트보다 명확합니다. 이유는 세 가지 정도 들 수 있습니다.

  1. 자연어에 더 가깝게 읽히기 때문에 힘들여 분석하지 않아도 자연스럽게 이해할 수 있습니다.
  2. 테스트 각각이 더 좁은 범위를 검사하기 때문에 원인과 결과가 더 분명하게 드러납니다.
  3. 각 테스트가 짧고 서술적이어서 이미 검사한 기능이 무엇이지 더 쉽게 확인할 수 있습니다.

<div class="comment">코드보다도 조금 더 자연어에 가까워야한다는 느낌이다.</div>

- 모든 행위는 given, when, then이라는 세 요소로 구성됨을 기억해주세요

**테스트 이름은 검사하는 행위에 어울리게 짓자**

- 테스트의 이름은 매우 중요합니다. 실패 보고서에 테스트 이름만 덩그러니 표시되는 경우도 많기 때문에 문제가 무엇인지 설명해줄 단서가 이름뿐일 수 있습니다.

### 12.3.3 테스트에 논리를 넣지 말자

<ul>
  <li class="underline">테스트를 검증하는 테스트를 작성해봐야 할 것 같은 느낌이 든다면 무언가 잘못된 것입니다!</li>
</ul>

## 12.4 테스트와 코드 공유: DRY가 아니라 DAMP!

- DRY를 고집하는 대신 테스트 코드는 DAMP가 되도록 노력해야 합니다.
- DAMP는 '서술적이고 의미 있는 문구(Descriptive And Meaningful Phrases)'를 뜻합니다.
- DAMP가 DRY를 대체하지는 않습니다. 보완해주는 개념입니다. 도우미 메서드와 테스트 인프라는 테스트를 더 명확하게 만드는 데 여전히 도움을 줄 수 있습니다.

### 12.4.1 공유 값

**코드 12-22 도우미 메서드를 사용해 값을 공유하는 예**
```java
# A helper method wraps a constructor by defining arbitrary defaults for
# each of its parameters.
def newContact(firstName="Grace", lastName="Hopper", phoneNumber="555-123-4567"):
  return Contact(firstName, lastName, phoneNumber)

# Tests call the helper, specifying values for only the parameters that they care about.
def test_fullNameShouldCombineFirstAndLastNames(self):
  def contact = newContact(firstName="Ada", lastName="Lovelace")
  self.assertEqual(contact.fullName(), "Ada Lovelace")

// Languages like Java that don’t support named parameters can emulate them by returning a mutable "builder" object that represents the value under construction.
private static Contact.Builder newContact() {
  return Contact.newBuilder()
      .setFirstName("Grace")
      .setLastName("Hopper")
      .setPhoneNumber("555-123-4567");
}

// Tests then call methods on the builder to overwrite only the parameter that they care about, then call build() to get a real value out of the builder.
@Test
public void fullNameShouldCombineFirstAndLastNames() {
  Contact contact = newContact()
      .setFirstName("Ada")
      .setLastName("Lovelace")
      .build();
  assertThat(contact.getFullName()).isEqualTo("Ada Lovelace");
}
```

<div class="comment">그냥 도우미 코드 없이 테스트 블럭 내에서 직접 호출하면 안되나? 아마 예시는 간단해서 그래도 되겠지만 실제에서는 다르겠지</div>

## 느낀 점

- Playwright 등을 이용해 테스트하는 것이 좋은 테스트 사례일 수 있을 것 같다. `placeholder가 '이름을 입력하세요'인 input을 찾아서 입력하고. '확인' 버튼을 클릭하면, 페이지에 입력한 이름이 나타난다.` 내부 로직은 상관안하는 방식이기도 하므로 공개 API를 이용해 테스트하는 것, 메서드가 아니라 행위를 테스트하는 것을 모두 담고있는 것 같다.


<style scoped lang="scss">
.underline {
  text-decoration: underline;
  text-decoration-style: wavy;
  text-underline-offset: 3px;
  text-decoration-color: var(--vp-c-indigo-1);
}

.comment {
    padding-left: 1.25rem;
    color: var(--vp-c-indigo-1);
    font-size: 14px;
    margin: 0 0 16px;
}
</style>