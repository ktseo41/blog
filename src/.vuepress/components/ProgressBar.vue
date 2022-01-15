<template>
<div>
  <label :for="`progress-${name}`">{{ label }}</label>
  <progress :id="`progress-${name}`" :value="value" :max="max">{{ value }}</progress>
  <small>{{ (value / max * 100).toFixed(0) }} %</small>
</div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
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
  },
}
</script>

<style>

</style>