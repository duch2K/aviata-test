<template>
  <div class="wrapper">
    <div class="container">
      <Sidebar class="sidebar" />
      <main class="main">
        <FlightList :data="data" />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import FlightList from './components/FlightList.vue'
import data from '../results.json'

</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  padding-top: 30px;
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
