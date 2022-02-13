<template>
  <figure>
    <img :src="src" alt="alt">
    <figcaption>
      {{ caption }}
      <slot name="figcaption"></slot>
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: "ImageWithCaption",
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      required: true
    }
  },
}
</script>

<style scoped>
figure {
  margin: 0 auto;
}
</style>
