<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: '',
    required: false
  },
  value: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  }
})
</script>
<template>
<div class="progress-bar">
  <label :for="`progress-${name}`">{{ label }}</label>
  <progress :id="`progress-${name}`" :value="value" :max="max">{{ value }}</progress>
  <small>{{ (value / max * 100).toFixed(0) }} %</small>
</div>
</template>
<style scoped>
.progress-bar {
  display: flex;
  white-space: nowrap;
  align-items: center;
}

small {
  display: inline-block;
  margin-left: 5px;
}
progress {
  accent-color: #4abf8a;
}
</style>
