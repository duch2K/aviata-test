<template>
  <div class="pathway">
    <div class="top">
      <span class="origin">{{ origin }}</span>
      <span class="time">{{ time }}</span>
      <span class="dest">{{ destination }}</span>
    </div>
    <div class="line">
      <div class="center" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  origin: {
    type: String,
    default: ''
  },
  destination: {
    type: String,
    default: ''
  },
  time: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.pathway {
  .top {
    margin-bottom: 3.5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .time {
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
  }

  .origin, .dest {
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    color: #B9B9B9;
  }

  .line {
    border-bottom: 1px solid #B9B9B9;
    position: relative;

    &::after, &::before, .center {
      content: '';
      box-sizing: border-box;
      width: 5px;
      height: 5px;
      background: #FFFFFF;
      border: 1px solid #B9B9B9;
      border-radius: 50%;
      position: absolute;
      top: 45%;
      transform: translateY(-45%);
    }

    &::after {
      right: 0;
    }

    &::before {
      left: 0;
    }

    .center {
      left: 50%;
      transform: translate(-50%, -45%);
    }
  }
}
</style>
