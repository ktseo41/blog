# How to apply utterances in VitePress (VitePress 블로그에 utternaces 적용하기)

## 1. https://utteranc.es/ 에 접속해 지시를 따라 repo를 지정합니다.

## 2. Comment용 컴포넌트를 만듭니다.

```vue
<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://utteranc.es/client.js';
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.setAttribute('repo', '[ENTER REPO HERE]');
  script.setAttribute('issue-term', 'pathname');
  script.setAttribute('label', 'Comment');
  script.setAttribute('theme', 'preferred-color-scheme');
  document.querySelector('#comment').appendChild(script);
})
</script>
<template>
  <div id="comment"></div>
</template>
```

## 3. 기본 테마 레이아웃을 확장합니다. ([theme-introduction#layout-slots](https://vitepress.vuejs.org/guide/theme-introduction#layout-slots))

```html
<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Comment from '../components/Comment.vue';

const { page } = useData()
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-footer-before>
      <Comment :key="page.relativePath"></Comment>
    </template>
  </Layout>
</template>
```

```javascript
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'

export default {
  ...DefaultTheme,
  // override the Layout with a wrapper component that
  // injects the slots
  Layout: MyLayout
}
```

## 4. (선택) frontmatter를 사용해 댓글을 숨길 수 있습니다.

```html{3,7,14}
<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Comment from '../components/Comment.vue';

const { frontmatter } = useData()
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-footer-before>
      <Comment v-if="!frontmatter.disableComment" :key="page.relativePath"></Comment>
    </template>
  </Layout>
</template>
```

#### 예시

```md
---
disableComment: true
---

## Hello World
```