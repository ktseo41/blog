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
      <component :is="'script'" src="https://utteranc.es/client.js" repo="ktseo41/blog" issue-term="pathname"
        label="Comment" theme="preferred-color-scheme" crossorigin="anonymous" async>
      </component>
    </template>
  </Layout>
</template>
