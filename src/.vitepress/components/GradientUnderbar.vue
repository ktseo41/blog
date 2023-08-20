<template>
  <div class="gradient-underbar">
    <slot></slot>
    <div class="gradient-underbar__inner"></div>
  </div>
</template>
<style scoped lang="scss">
// 

.gradient-underbar {
  color: var(--vp-c-neutral);
  font-size: 18px;
  --brandToYellow: var(--vp-c-brand), var(--vp-c-brand-light), var(--vp-c-yellow-lighter), var(--vp-c-yellow), rgba(255, 255, 255, 0.1);

  .gradient-underbar__inner {
    margin-top: 6px;
    background: linear-gradient(to right, var(--brandToYellow));
    height: 2px;
    width: 35%;
  }
}
</style>
