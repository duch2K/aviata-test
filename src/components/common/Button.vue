<template>
  <button
    class="btn"
    :class="{
      btn_main: type === 'main',
      btn_light: type === 'light',
      btn_clear: type === 'clear'
    }"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'main'
  }
})
</script>

<style lang="scss" scoped>
.btn {
  border: none;
  background: transparent;
  cursor: pointer;

  &_main {
    padding: 7px 12px 8px;
    color: #FFF;
    background: #55BB06;
    border-radius: 4px;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
  }

  &_light {
    padding: 3px 8px;
    color: #5763B3;
    background: #EAF0FA;
    border-radius: 2px;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
  }

  &_clear {
    color: #7284E4;
    border-bottom: 1px dashed #7284E4;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
  }
}
</style>
