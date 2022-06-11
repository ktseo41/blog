<script setup>
import axios from 'axios'
import ProgressBar from './ProgressBar.vue';

const { name, startedAt } = defineProps({
  name: {
    type: String,
    required: true
  },
  startedAt: {
    type: Date,
    required: true
  },
  endAt: {
    type: Date,
    required: false
  },
  label: {
    type: String,
    default: '',
    required: false
  },
  inProgress: {
    type: Boolean,
    default: true,
    required: false
  },
  progressMaxValue: {
    type: Number,
    default: 100,
    required: false
  },
  progressValue: {
    type: Number,
    default: 0,
    required: false
  },
})

const { data: { documents: [book] } } = await axios({
  method: 'get',
  url: 'https://dapi.kakao.com/v3/search/book',
  params: {
    query: `"${name}"`
  },
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`
  }
})

const { authors: _authors = [], thumbnail, url } = book || {}
const authors = _authors.join(", ")

defineExpose({
  authors,
  thumbnail,
  url
})

</script>
<template>
  <figure>
    <img width="120" height="174" :src="thumbnail" :alt="name">
    <figcaption>
      <div>
        <a :href="url" target="_blank">
          <h4>{{ name }}</h4>
        </a>
        <span class="author">{{ authors }}</span>
      </div>
      <div>
        <div class="time-progress">
          <time :datetime="startedAt">{{ startedAt.toLocaleDateString().replace(/([\d]{1,2})\/([\d]{1,2})\/([\d]{4})/, "$3" + "." + "$1") }}</time>
          <span v-if="endAt"> ~ </span>
          <time v-if="endAt" :datetime="endAt">{{ endAt.toLocaleDateString().replace(/([\d]{1,2})\/([\d]{1,2})\/([\d]{4})/, "$3" + "." + "$1") }}</time>
          <span v-if="!inProgress"> ✘</span>
        </div>
        <ProgressBar :name="name" :max="progressMaxValue" :value="progressValue" />
      </div>
    </figcaption>
  </figure>
</template>
<style lang="scss" scoped>
figure {
  display: flex;
  column-gap: 20px;
  margin: 0;

  figcaption {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  .author {
    font-size: 14px;
    color: #999;
  }

  .time-progress {
    font-size: 13px;
  }
}

</style>