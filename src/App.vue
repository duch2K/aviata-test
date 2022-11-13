<template>
  <div class="wrapper">
    <div class="container">
      <Sidebar class="sidebar" />
      <main class="main">
        <FlightList :data="items" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { provide, reactive, ref, watch } from 'vue';
import Sidebar from './components/Sidebar.vue'
import FlightList from './components/FlightList.vue'
import data from '../results.json'

const filters = reactive({
  options: [],
  airlines: Object.keys(data.airlines)
})
const items = ref(data.flights)

provide('filters', {
  filters,
  setFilter(label, value) {
    filters[label] = value
  }
})

watch(filters, (value) => {
  let result = [...data.flights]

  if (value.options.includes('refundable')) {
    result = result.filter(item => item.refundable)
  }
  if (value.options.includes('direct')) {
    result = result.filter(item => item.itineraries[0][0].segments.length === 1)
  }
  if (value.options.includes('baggage')) {
    result = result.filter(item => !item.services['0PC'])
  }

  result = result.filter(item =>
    value.airlines.includes(item.itineraries[0][0].carrier)
  )

  items.value = result
})

</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  padding: 30px 0;
  background: #E1E1E1;

  .container {
    max-width: 1170px;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    column-gap: 20px;
  }

  .main {
    flex: 1;
  }

  .sidebar {
    width: 240px;
  }

  @media all and (max-width: 991px) {
    .container {
      column-gap: 15px;
    }
  }

  @media all and (max-width: 767px) {
    .container {
      flex-direction: column;
      row-gap: 20px;
    }

    .sidebar {
      width: unset;
    }
  }
}
</style>
