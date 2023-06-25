<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'info'
  }
})

const { type } = toRefs(props)
</script>
<template>
  <div class="callout">
    <img width="20" height="20" src="../../assets/info.svg" alt="info">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped lang="scss">
.callout {
  display: flex;
  align-items: flex-start;
  margin-top: 24px;
  padding: 8px 16px 8px 0;
  color: rgb(191, 219, 254);
  background-color: rgba(30, 58, 138, 0.3);
  border: 1px solid rgba(191, 219, 254, 0.3);
  border-radius: 8px;

  img {
    margin: 4px 8px 0 12px;
  }

  :slotted(a) {
    color: rgb(0, 138, 230);
  }

  :slotted(p) {
    margin: 0;
  }

  :slotted(p:not(:first-child)) {
    margin-top: 8px;
  }
}
</style>