# How to apply utterances in VitePress (VitePress 블로그에 utternaces 적용하기)

## 1. Access https://utteranc.es/ and follow the instruction

## 2. extend default theme layout (using [theme-introduction#layout-slots](https://vitepress.vuejs.org/guide/theme-introduction#layout-slots))

```html
<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-footer-before>
      <component :is="'script'" src="https://utteranc.es/client.js"
        repo="[ENTER REPO HERE]"
        issue-term="pathname"
        theme="preferred-color-scheme"
        crossorigin="anonymous"
        async>
      </component>
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

## 3. (optional) use frontmatter to hide comment

```html{3,5,11}
<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
const { frontmatter } = useData()
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template v-if="!frontmatter.disableComment" #doc-footer-before>
      <component :is="'script'" src="https://utteranc.es/client.js" repo="[ENTER REPO HERE]" issue-term="pathname"
        label="Comment" theme="preferred-color-scheme" crossorigin="anonymous" async>
      </component>
    </template>
  </Layout>
</template>
```