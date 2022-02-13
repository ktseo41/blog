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
  width: 450px;
}

figcaption {
  font-size: 13px;
}

@media (min-width: 799px){
  figure {
    width: auto;
  }
}
</style>
