<template>
  <div class="filter-block">
    <div class="head">
      <h4 class="title">Опции тарифа</h4>
      <button
        class="reset-btn"
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
      >
        <CloseFilterIcon :color="closeBtnColor" />
      </button>
    </div>
    <CheckboxGroup :items="items" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import CloseFilterIcon from './icons/CloseFilterIcon.vue'
import CheckboxGroup from './common/CheckboxGroup.vue'

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const isHover = ref(false);

const closeBtnColor = computed(() => isHover.value ? '#7284E4' : '#B9B9B9')
</script>

<style lang="scss" scoped>
.filter-block {
  padding: 12px;
  background: #F5F5F5;
  border-radius: 4px;

  .head {
    display: flex;
    margin-bottom: 12px;
  }

  .title {
    flex: 1;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
  }

  .reset-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: transparent;
    cursor: pointer;
  }
}
</style>
