<template>
  <ul class="checkbox-group">
    <li v-for="item in items" :key="item.value">
      <Checkbox
        class="checkbox"
        :label="item.label"
        :value="item.value"
        :id="item.value"
      />
    </li>
  </ul>
</template>

<script setup>
import Checkbox from './Checkbox.vue'

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.checkbox-group {
  list-style-type: none;

  .checkbox {
    margin: 0 -12px;
    padding: 8px 12px;

    &:hover {
      background: #EBEBEB;
    }
  }
}
</style>
