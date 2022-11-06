<template>
  <aside class="sidebar">
    <FilterBlock class="filter" :items="OPTIONS" />
    <FilterBlock class="filter" :items="airlines" />
    <Button type="clear">Сбросить все фильтры</Button>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import FilterBlock from './FilterBlock.vue'
import Button from './common/Button.vue'
import results from '../../results.json'
import { OPTIONS } from '../constants';

const airlines = computed(() =>
  Object.keys(results.airlines).map(item => ({
    label: results.airlines[item],
    value: item
  }))
)
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  row-gap: 12px;

  .filter {
    width: 100%;
  }
}
</style>
