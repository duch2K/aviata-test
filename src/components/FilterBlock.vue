<template>
  <div class="filter-block">
    <div class="head">
      <h4 class="title">Опции тарифа</h4>
      <button
        class="reset-btn"
        @click="setFilter(label, [])"
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
        :data-test="`reset-${label}`"
      >
        <CloseFilterIcon
          class="reset-icon"
          :class="{ 'reset-icon_hover': isHover }"
        />
        <span class="tooltip" :class="{ 'tooltip_active': isHover }">
          Сбросить выбор
        </span>
      </button>
    </div>
    <ul class="checkbox-list">
      <li v-if="hasAll">
        <Checkbox
          class="checkbox"
          label="Все"
          value="_all"
          id="_all"
          :is-checked="filters[label].length === items.length"
          @change="handleChange"
        />
      </li>
      <li v-for="item in items" :key="item.value">
        <Checkbox
          class="checkbox"
          :label="item.label"
          :value="item.value"
          :id="item.value"
          :is-checked="filters[label].includes(item.value)"
          @change="handleChange"
          :data-test="`filter-${item.value}`"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import CloseFilterIcon from './icons/CloseFilterIcon.vue'
import Checkbox from './common/Checkbox.vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    default: ''
  },
  hasAll: {
    type: Boolean,
    default: false
  },
})
const { label } = props

const isHover = ref(false);
const { filters, setFilter } = inject('filters')

const handleChange = ({ value, isChecked }) => {
  if (value === '_all') {
    if (!isChecked) {
      setFilter(label, [])
    } else {
      setFilter(label, props.items.map(item => item.value))
    }
    return
  }

  let result = [...filters[label]]

  if (result.includes(value) && !isChecked) {
    result = result.filter(item => item !== value)
  } else if (!result.includes(value) && isChecked) {
    result.push(value)
  }

  setFilter(label, result)
}
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
    position: relative;
  }

  .reset-icon {
    fill: #B9B9B9;

    &_hover {
      fill: #7284E4;
    }
  }

  .tooltip {
    visibility: hidden;
    padding: 9px;
    background: #FFFFFF;
    border: 1px solid #D9D9D9;
    border-radius: 6px;
    text-align: center;
    font-weight: 400;
    font-size: 12px;
    white-space: nowrap;
    line-height: 16px;
    position: absolute;
    left: 50%;
    top: -50px;
    transform: translateX(-50%);
    z-index: 2;
    opacity: 0;
    transition: opacity 1s;

    &_active {
      visibility: visible;
      opacity: 1;

      &::before {
        content: '';
        width: 12px;
        height: 12px;
        border-width: 1px;
        border-style: solid;
        border-color: transparent #D9D9D9 #D9D9D9 transparent;
        background: #FFFFFF;
        position: absolute;
        top: 80%;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
      }
    }
  }

  .checkbox-list {
    list-style-type: none;
  }

  .checkbox {
    margin: 0 -12px;
    padding: 8px 12px;

    &:hover {
      background: #EBEBEB;
    }
  }
}
</style>
