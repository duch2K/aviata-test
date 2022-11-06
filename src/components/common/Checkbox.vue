<template>
  <label class="checkbox" :for="id">
    <input
      class="input"
      type="checkbox"
      :id="id"
      :value="value"
      v-model="checked"
    >
    <span class="icon" :class="{ icon_checked: checked }">
      <CheckIcon v-show="checked" color="#FFF" />
    </span>
    {{ label }}
  </label>
</template>

<script setup>
import { ref } from 'vue';
import CheckIcon from '../icons/CheckIcon.vue'

defineProps({
  value: {
    type: String,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    required: false
  }
})

const checked = ref(false)
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  user-select: none;
  cursor: pointer;

  .input {
    display: none;
  }

  .icon {
    width: 12px;
    height: 12px;
    display: block;
    margin-right: 12px;
    border: 1px solid #B9B9B9;
    border-radius: 2px;

    &_checked {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #55BB06;
      border: none;
    }
  }
}
</style>
