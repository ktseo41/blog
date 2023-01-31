<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Comment from '../components/Comment.vue';
const { frontmatter, page } = useData()
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-footer-before>
      <template v-if="frontmatter.feArticle">
        <br>
        <blockquote class="custom">
          <p>🚀 한국어로 된 프런트엔드 아티클을 빠르게 받아보고 싶다면 <a href="https://kofearticle.substack.com/" target="_blank"
              rel="noreferrer">Korean FE Article</a>을 구독해주세요.</p>
        </blockquote>
      </template>
      <Comment v-if="!frontmatter.disableComment" :key="page.relativePath"></Comment>
    </template>
  </Layout>
</template>

<style scoped lang="scss">
blockquote.custom {
  margin: 16px 0;
  border-left: 2px solid var(--vp-c-divider);
  padding-left: 16px;
  transition: border-color 0.5s;

  p {
    margin: 0;
    font-size: 16px;
    color: var(--vp-c-text-2);
    transition: color 0.5s;
  }

  a {
    font-weight: 500;
    color: var(--vp-c-brand);
    text-decoration-style: dotted;
    transition: color 0.25s;
  }
}
</style>
