---
feArticle: true
---

# 뷰의 새로운 컴포지션 API를 사용해야 하는 이유

> 원문: https://aschmelyun.com/blog/why-you-should-be-using-vue-new-composition-api/

아마 뷰의 새로운 [컴포지션 API](https://v3.vuejs.org/guide/composition-api-introduction.html)에 대한 소식이 계속해서 들려오고 있을 것입니다. 하지만, 이 새로운 API가 약간 무섭고 위협적이게 느껴질것이며 어느 부분에서 훨씬 더 나은지 명확하게 다가오지 않을 것입니다.

이 글에서는 이전 방식과 새로운 방식을 비교하며 컴포지션 API를 배워야 하는 이유를 명확하게 설명합니다. 예제는 간단하게 시작하여 점점 더 복잡해지기 때문에 이를 통해 컴포지션 API가 이전 방식과 크게 다르지 않다는 것도 알 수 있을 것 입니다.

컴포지션 API는 뷰 2의 옵션 API를 대체하지만 뷰 3 애플리케이션에서 _필수_ 가 아니라는 장점이 있습니다. 이전에 뷰 2에서 했던 것처럼 여전히 검증된 옵션 API를 사용하고 컴포넌트를 작성할 수 있습니다. 이제 바로 이 새로운 방법을 채택하고 싶거나 업데이트에 익숙해지기를 원하는 사람들을 위해 몇 가지 예를 살펴보겠습니다. 아래 예시는 뷰 3의 컴포지션 API를 사용하여 재작성된 몇 가지 일반적이고 간단한 컴포넌트입니다.

## 간단한 카운터

아래 예시는 프런트엔드 프레임워크를 배울때 "Hello world"격인 카운터 컴포넌트 예제입니다. 뷰 2에서는 어떻게 작성하는지 살펴보죠.

```vue
<template>
  <div class="counter">
    <span>{{ counter }}</span>
    <button @click="counter += 1">+1</button>
    <button @click="counter -= 1">-1</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      counter: 0
    }
  }
}
</script>
```

0부터 시작하는 카운터 데이터 객체를 `span` 태그를 통해 표시하고 있습니다. 다음으로 `v-on:click` 속성이 있는 두 개의 버튼과 카운터를 1씩 늘리거나 줄이는 인라인 코드가 있습니다. 또한, 스크립트 태그에서는 `data` 메서드가 반환한 객체를 통해 해당 카운터를 초기화합니다.

이제 동일한 컴포넌트가 뷰 3에서 어떻게 작성되는지 살펴보겠습니다.

```vue
<template>
  <span>{{ counter }}</span>
  <button @click="counter += 1">+1</button>
  <button @click="counter -= 1">-1</button>
</template>
<script>
import { ref } from 'vue';
export default {
  setup() {
    const counter = ref(0);

    return {
      counter
    };
  }
}
</script>
```

가장 먼저 눈에 띄는 것은 템플릿에서 **감싸는 `div`를 제거**했다는 것입니다. 이전 뷰에서는 템플릿 태그 아래에 하나 이상의 최상위 요소가 있는 구성 요소를 렌더링 하려고 하면 오류가 발생했습니다. 뷰 3에서는 더 이상 그렇지 않습니다!

스크립트는 이전 방식보다 약간 길어졌습니다. 하지만 현재는 최소한의 기능이고 컴포지션 API에 대한 설정이 _약간_ 더 많기 때문에 이정도는 예상할 수 있습니다. 변경 사항을 한 줄씩 살펴보겠습니다.

```javascript
import { ref } from 'vue';
```

컴포지션 API에서 데이터 포인트 [반응성](https://vuejs.org/api/reactivity-core.html#ref)을 제공하려면 `ref` 메서드가 필요합니다. 기본적으로 `setup` 메서드에서 반환된 변수는 반응형이 _아닙니다_.

```javascript
export default {
  setup() { ... }
}
```

다음으로 새로운 `setup` 방법이 있습니다. 모든 컴포지션 API 컴포넌트의 진입점이며, 여기에서 반환된 객체의 모든 항목이 나머지 컴포넌트에 노출됩니다. 여기에는 `computed` 속성, `data` 객체, `methods` 및 컴포넌트 수명 주기 훅 등이 포함됩니다.

```javascript
setup() {
  const counter = ref(0);

  return {
    counter
  };
}
```

먼저 앞에서 언급한 `ref` 메서드를 사용하여 카운터를 생성하고 초기값인 0을 전달합니다. 그런 다음 객체에 래핑 된 카운터를 반환하기만 하면 됩니다.

그럼 우리 컴포넌트는 이전과 동일하게 작동하여 현재 값을 표시하고 사용자가 주어진 버튼을 누름에 따라 조정할 수 있도록 합니다! 계속해서 동적인 변화가 조금 더 있는 항목을 살펴보겠습니다.

## 장바구니

이번에는 복잡성을 높이기 위해 뷰의 두 가지 공통 속성인 `computed` 속성과 `methods`를 사용하는 컴포넌트를 만들어 보겠습니다. 좋은 예로 전자 상거래 사이트에서 사용자가 선택한 항목을 담아두는 장바구니 컴포넌트가 있습니다.

옵션 API를 사용하는 뷰 2의 예는 다음과 같습니다.

```vue
<template>
  <div class="cart">
    <div class="row" v-for="(item, index) in items">
      <span>{{ item.name }}</span>
      <span>{{ item.quantity }}</span>
      <span>{{ item.price * item.quantity }}</span>
      <button @click="removeItem(index)">Remove</button>
    </div>
    <div class="row">
      <h3>Total: <span>{{ cartTotal }}</span></h3>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          name: "Cool Gadget",
          quantity: 3,
          price: 19.99
        },
        {
          name: "Mechanical Keyboard",
          quantity: 1,
          price: 129.99
        }
      ]
    }
  },
  methods: {
    removeItem(index) {
      this.items.splice(index, 1);
    }
  },
  computed: {
    cartTotal() {
      return this.items.reduce((total, item) => {
        return total += (item.price * item.quantity);
      }, 0);
    }
  }
}
</script>
```

장바구니의 항목은 `v-for`로 나열되며 각 항목 뒤에는 클릭 시 기본 배열에서 항목을 제거하는 버튼이 있습니다. 카트의 총비용은 `reduce`를 사용하는 `computed` 속성을 통해 계산되며 값은 항목 하단에 표시됩니다. 꽤 간단하다고 생각합니다!

컴포지션 API를 사용하면 뷰 3에서 어떻게 보이는지 살펴보겠습니다.

```vue
<template>
  <div class="cart">
    <div class="row" v-for="(item, index) in items">
      <span>{{ item.name }}</span>
      <span>{{ item.quantity }}</span>
      <span>{{ item.price * item.quantity }}</span>
      <button @click="removeItem(index)">Remove</button>
    </div>
    <div class="row">
      <h3>Total: <span>{{ cartTotal }}</span></h3>
    </div>
  </div>
</template>
<script>
import { ref, computed } from 'vue';
export default {
  setup() {
    const items = ref([
      {
        name: "Cool Gadget",
        quantity: 3,
        price: 19.99
      },
      {
        name: "Mechanical Keyboard",
        quantity: 1,
        price: 129.99
      }
    ]);

    const removeItem = (index) => {
      items.value.splice(index, 1);
    };

    const cartTotal = computed(() => {
      return items.value.reduce((total, item) => {
        return total += (item.price * item.quantity);
      }, 0);
    });

    return {
        items,
        removeItem,
        cartTotal
    };
  }
}
</script>
```

가장 큰 차이점은 `computed` 속성과 메서드가 루트 뷰 객체의 자체 속성에 있는 것이 아니라 기본 `setup()` 메서드에서 정의되고 반환된 일반 메서드라는 것입니다.

메서드의 경우 간단히 함수로 생성합니다.
```javascript
const removeItem = (index) => {
    items.value.splice(index, 1);
};
```

반환하는 객체에 포함하는 한, 컴포넌트 모든 영역에서 노출되어 사용할 수 있습니다. `computed` 속성은 기본 뷰 패키지에서 가져온 `computed` 메서드로 감싸진다는 점을 제외하면 거의 동일합니다.

```javascript
const cartTotal = computed(() => {
  return items.value.reduce((total, item) => {
    return total += (item.price * item.quantity);
  }, 0);
});
```

이렇게 하면 **컴포넌트의 일부를 분리**하고 재사용할 수 있고 다른 여러 컴포넌트로 가져올 수 있는 기능을 더 분리할 수 있습니다. 다음 예에서 이를 수행하는 방법을 살펴보겠습니다.

예를 들어, 원하는 경우 `cartTotal` `computed` 속성 또는 `removeItem` 메서드를 _자체 파일_ 로 쉽게 분할할 수 있습니다. 그렇게 하면, 위의 기본 컴포넌트에서 정의하고 사용하는 대신 가져오고 지정된 메서드를 호출할 수 있습니다.

이제 마지막 컴포넌트입니다!

## 좋아요 버튼

마지막 예시는 앞선 두 예시보다 훨씬 더 복잡합니다. API 엔드포인트에서 데이터를 가져와 사용자 입력에 반응해야 하는 컴포넌트는 어떻게 작성하는지 살펴보겠습니다.

뷰 2 애플리케이션의 옵션 API에서는 다음과 같습니다.

```vue
<template>
  <button @click="sendLike" :disabled="isDisabled">{{ likesAmount }}</button>
</template>
<script>
export default {
  data() {
    return {
      likes: 0,
      isDisabled: false
    }
  },
  mounted() {
    fetch('/api/post/1')
      .then((response) => response.json())
      .then((data) => {
        this.likes = data.post.likes;
      });
  },
  methods: {
    sendLike() {
      this.isDisabled = true;
      this.likes++;

      fetch('/api/post/1/likes', {
        method: 'POST'
      })
        .then((response) => {
          this.isDisabled = false;
        })
        .catch((error) => {
          this.likes--;
          this.isDisabled = false;
        });
    }
  },
  computed: {
    likesAmount() {
      return this.likes + ' people have liked this';
    }
  }
}
</script>
```

이전 예제보다 조금 더 복잡하지만 하나씩 살펴보겠습니다.

템플릿 내의 버튼부터 시작합니다. `v-on:click`에 `sendLike` 메서드가 바인딩되고 `disabled` 속성이 `isDisabled` 데이터 속성에 결합돼 있습니다. 버튼 안에는 `likes` 데이터 속성으로 좋아요 수를 표시하고 있습니다.

스크립트 영역에서는 0개의 `likes`와 false로 기본 설정된 `isDisabled`를 반환해 데이터 객체를 초기화합니다. `mounted()` 수명 주기 메서드를 사용하여 API 엔드포인트를 호출하고 좋아요 수를 특정 게시물의 좋아요 수로 설정합니다.

그런 다음 `sendLike` 메서드를 정의하여 버튼을 비활성화하고 좋아요를 1씩 늘립니다.

마지막으로 가상 API에 요청을 보내고 응답을 기다립니다. 어느 쪽이든 버튼에서 비활성화 속성을 제거하지만 서버가 어떤 이유로 오류를 반환하면 기록된 좋아요를 제거하고 `likes`를 이전 값으로 재설정합니다.

이제 컴포지션 API를 사용하여 뷰 3에서 유사한 컴포넌트가 어떻게 보이는지 봅시다.

```vue
<template>
  <button @click="sendLike" :disabled="isDisabled">{{ likesAmount }}</button>
</template>
<script>
import { ref, computed, onMounted } from 'vue';
export default {
  setup() {
    const likes = ref(0);
    const isDisabled = ref(false);

    onMounted(() => {
      fetch('/api/post/1')
        .then((response) => response.json())
        .then((data) => {
          likes = data.post.likes;
        });
    });

    const sendLike = async () => {
      isDisabled.value = true;
      likes.value++;

      fetch('/api/post/1/likes', {
        method: 'POST'
      })
        .then((response) => {
          isDisabled.value = false;
        })
        .catch((error) => {
          likes.value--;
          isDisabled.value = false;
        });
    }

    const likesAmount = computed(() => {
      return likes.value + ' people have liked this';
    });

    return {
      likes,
      isDisabled,
      likesAmount,
      sendLike
    };
  }
}
</script>
```

좋습니다. 이 컴포넌트와 이전 카운터 컴포넌트의 주요 차이점은 **mounted** 수명 주기 훅이 추가되었다는 점입니다. `mounted`는 뷰 2 옵션 API에서는 또 다른 별도의 메서드였던 대신 `setup`에서 단순히 함수로 작성되었고 `onMounted()` 메서드로 래핑 됩니다.

여기에서 컴포지션 API가 컴포저블과 함께 빛을 발할 수 있습니다. 이 좋아요 버튼 컴포넌트는 약간 길어지고 있으며 별도의 파일로 분할하여 가져올 수 있는 기능이 일부 포함되어 있습니다.

예를 들어 서로 다른 컴포넌트에서 좋아요 검색 및 업데이트를 포함하고 싶을 수 있으므로 이를 처리하는 새 자바스크립트 파일을 만들 수 있습니다.

```js
// useLikes.js
import { ref, computed, onMounted } from 'vue';

export default function useLikes(postId) {
  const likes = ref(0);
  const likesAmount = computed(() => {
    return likes + ' people have liked this'
  });

  onMounted(() => {
    fetch(`/api/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        likes.value = data.post.likes;
      });
  });

  return {
    likes,
    likesAmount
  }
}
```

이 렌더링 없는 컴포넌트인 `useLikes`는 기본 좋아요 숫자 0으로 시작합니다. 그런 다음 ID가 전달된 게시물의 API 엔드포인트로 가져오기 요청을 보냅니다. 완료되면 좋아요가 업데이트되어 현재 포스트 항목과 일치하게 됩니다.

그렇다면 이 컴포저블이 메인 컴포넌트에서 어떻게 다시 사용될까요?

```vue
<template>
  <button @click="sendLike" :disabled="isDisabled">{{ likesAmount }}</button>
</template>
<script>
import { useLikes } from '@/useLikes';
import { ref, computed, onMounted } from 'vue';
export default {
  setup() {
    const {
      likes,
      likesAmount
    } = useLikes(1);

    const isDisabled = ref(false);

    const sendLike = async () => {
      isDisabled.value = true;
      likes.value++;

      fetch('/api/post/1/likes', {
        method: 'POST'
      })
        .then((response) => {
          isDisabled.value = false;
        })
        .catch((error) => {
          likes.value--;
          isDisabled.value = false;
        });
    }

    return {
      likes,
      isDisabled,
      likesAmount,
      sendLike
    };
  }
}
</script>
```

먼저 import 문을 사용하여 `useLikes` 기능을 가져온 다음 각각 **`likes`** `ref` 객체 및 **`likesAmount`**  메서드로 구성된 객체를 해체해 사용합니다. 동일한 `useLikes` 함수를 통해 기본 컴포넌트로 가져옵니다.

남은 작업은 하드 코딩된 값으로 1로 설정한 `postId` 속성을 전달하는 것뿐이었습니다.

## 마무리

여기까지입니다! 뷰 2로 작성된 **3개의 다른 컴포넌트**와 뷰 3로 복제된 컴포넌트를 보았습니다.

프레임워크 경험이 있는 개발자든 아직 요령을 배우고 있는 개발자든 이 최신 버전의 뷰를 사용하는 데 도움이 되었기를 바랍니다. 다양하고 때로는 위협적인 모양에도 불구하고 컴포지션 API는 프런트엔드 코드를 보다 안정적이고 유지 관리하기 쉬운 방식으로 구성하고 리팩터링 하는 데 도움이 될 수 있습니다.

질문이나 의견이 있거나 일반적인 웹 개발에 대해 더 많은 대화를 나누고 싶다면 주저하지 말고 [Twitter](https://twitter.com/aschmelyun)로 문의하세요!