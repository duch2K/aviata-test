<template>
  <TransitionGroup class="flight-list" name="list" tag="div">
    <FlightCard
      v-for="item in data"
      class="item"
      :key="item.id"
      :item="item"
      data-test="flight-card"
    />
  </TransitionGroup>
</template>

<script setup>
import FlightCard from './FlightCard.vue'

defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
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

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
