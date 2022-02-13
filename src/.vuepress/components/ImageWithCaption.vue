<template>
  <figure>
    <img ref="img" :src="src" alt="alt">
    <figcaption :style="{ left: `${captionLeft}px`, transform: captionLeft ? 'translateX(-50%)' : ''  }" ref="figcaption">
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
      required: false
    }
  },
  data() {
    return {
      captionLeft: 0
    }
  },
  mounted() {
    // figcaption의 가로 위치를 이미지크기의 50%에 위치하도록 한다.
    this.$refs.img.addEventListener("load", () => {
      this.captionLeft = this.$refs.img.offsetWidth / 2
    });
  }
}
</script>

<style scoped>
figure {
  position: relative;
  margin: 0 auto;
}

figcaption {
  position: absolute;
  font-size: 13px;
}
</style>
