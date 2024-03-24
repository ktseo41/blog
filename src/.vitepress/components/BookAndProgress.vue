<script setup>
const { name } = defineProps({
  name: {
    type: String,
    required: true
  },
  authors: {
    type: String,
    default: '',
    required: true
  },
  thumbnail: {
    type: String,
    default: '',
    required: true
  },
  url: {
    type: String,
    default: '',
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

function formatDate(_date) {
  const date = new Date(_date)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  return `${year}년 ${month}월`
}
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
          <time :datetime="startedAt">{{ formatDate(startedAt, name) }}</time>
          <span v-if="endAt"> ~ </span>
          <time v-if="endAt" :datetime="endAt">{{ formatDate(endAt, name) }}</time>
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