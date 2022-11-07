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
    <p v-if="transfer" class="transfer">
      через {{ transfer.location }}, {{ transferAfter }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { secsToHours, toTimestamp } from '../../helpers';

const props = defineProps({
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
  },
  transfer: {
    type: Object,
    default: null,
  },
})

const transferAfter = computed(() => {
  if (!props.transfer) {
    return 0
  }

  const { transfer } = props
  const diff = toTimestamp(transfer.transferTime) - toTimestamp(transfer.depTime)

  return secsToHours(diff)
})
</script>

<style lang="scss" scoped>
.pathway {
  display: flex;
  flex-direction: column;
  justify-content: center;

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

  .transfer {
    margin-top: 5px;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #FF9900;
  }
}
</style>
