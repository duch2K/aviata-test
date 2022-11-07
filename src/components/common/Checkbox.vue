<template>
  <label class="checkbox" :for="id">
    <input
      class="input"
      type="checkbox"
      :id="id"
      :value="value"
      :checked="checked"
      @change="handleChange"
    >
    <span class="icon" :class="{ icon_checked: checked }">
      <CheckIcon v-if="checked" class="check" />
    </span>
    {{ label }}
  </label>
</template>

<script setup>
import { ref, watch } from 'vue';
import CheckIcon from '../icons/CheckIcon.vue'

const props = defineProps({
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
  },
  isChecked: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['change'])

const checked = ref(props.isChecked)

watch(() => props.isChecked, (value) => {
  checked.value = value
})

const handleChange = (e) => {
  const value = e.target.checked
  checked.value = value
  emit('change', {
    value: props.value,
    isChecked: value
  })
}
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

  .check {
    fill: #FFF;
  }
}
</style>
