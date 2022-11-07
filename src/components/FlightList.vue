<template>
  <div class="flight-list">
    <FlightCard
      v-for="item in flights"
      class="item"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<script setup>
import FlightCard from './FlightCard.vue'
import { computed } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const flights = computed(() =>
  props.data.flights.map(item => ({
    ...item,
    airline: props.data.airlines[item.validating_carrier]
  }))
)
</script>

<style lang="scss" scoped>
.flight-list {
  .item {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
