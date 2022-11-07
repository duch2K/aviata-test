<template>
  <aside class="sidebar">
    <FilterBlock
      class="filter"
      label="options"
      :items="OPTIONS"
    />
    <FilterBlock
      class="filter"
      label="airlines"
      :items="airlines"
      has-all
    />
    <Button type="clear" @click="reset">Сбросить все фильтры</Button>
  </aside>
</template>

<script setup>
import { computed, inject } from 'vue'
import FilterBlock from './FilterBlock.vue'
import Button from './common/Button.vue'
import results from '../../results.json'
import { OPTIONS } from '../constants'

const { setFilter } = inject('filters')

const airlines = computed(() =>
  Object.keys(results.airlines).map(item => ({
    label: results.airlines[item],
    value: item
  }))
)

const reset = () => {
  setFilter('options', [])
  setFilter('airlines', [])
}
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
