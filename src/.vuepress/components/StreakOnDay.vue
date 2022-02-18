<template>
  <div class="streak-on-day">
    <div class="streak-on-day__ring">
      {{ streak }}
      <img width="20" height="20" src="../assets/emoji-zap.svg" alt="zap">
      <!-- <zap-emoji /> -->
    </div>  
    <div class="streak-on-day__progress-text">
      {{ streak }}일 연속 진행중
    </div>
    <slot></slot>
  </div>
</template>

<script>
// import ZapEmoji from '../assets/emoji-zap.svg'

export default {
  name: 'streak-on-day',
  components: {
    // ZapEmoji
  },
  props: {
    streak: {
      type: Number,
      required: true
    },
  }
}
</script>

<style>
.streak-on-day {
  display: inline-flex;
  align-items: center;
}
.streak-on-day__ring {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  position: relative;
  border-radius: 50%;
  border: 7px solid #f2af33;
  font-size: 20px;
  font-weight: bold;
}
.streak-on-day__progress-text {
  margin-left: 10px;
  font-weight: bold;
  font-size: 18px;
}
</style>