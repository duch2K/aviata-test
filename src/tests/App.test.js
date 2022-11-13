import { afterEach, beforeEach, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue';

let wrapper, api

beforeEach(() => {
  wrapper = mount(App)
  api = wrapper.vm
})

afterEach(() => {
  if (wrapper) {
    wrapper.unmount()
    wrapper, api = null
  }
})

test('should filter out results by baggage', async () => {
  await wrapper.find('[data-test="filter-baggage"]').setValue(true)

  const results = wrapper.findAll('[data-test="flight-card"]')
  expect(results).toHaveLength(15)
})

test('shouldn\'t find any flight-card', async () => {
  await wrapper.find('[data-test="reset-airlines"]').trigger('click')

  const results = wrapper.findAll('[data-test="flight-card"]')
  expect(results).toHaveLength(0)
})
