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
<div :style="$attrs.block === '' ? {} : { display: 'inline' }">
  <label :for="`progress-${name}`">{{ label }}</label>
  <progress :id="`progress-${name}`" :value="value" :max="max">{{ value }}</progress>
  <small>{{ (value / max * 100).toFixed(0) }} %</small>
</div>
</template>
<style scoped>
small {
  display: inline-block;
  margin-left: 5px;
}
</style>
