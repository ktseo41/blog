<template>
  <div class="streak-on-day">
    <div class="streak-on-day__ring">
      {{ streak }}
      <img width="20" height="20" src="../../assets/emoji-zap.svg" alt="zap">
    </div>
    <div class="streak-on-day__progress-text">
      {{ streak }}일 연속 진행중
      <div class="streak-on-day__progress-subtext">총 {{ complete }}개 강의 완료</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'streak-on-day',
  props: {
    streak: {
      type: Number,
      required: true
    },
    complete: {
      type: Number,
      required: false
    }
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

.streak-on-day__progress-subtext {
  margin-top: 10px;
  font-size: 11px;
  color: #555;
}
</style>