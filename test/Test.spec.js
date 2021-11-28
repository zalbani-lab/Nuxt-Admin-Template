import { mount } from '@vue/test-utils'
import Test from '@/components/test/Steps.vue'

describe('Logo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Test)
    expect(wrapper.vm).toBeTruthy()
  })
})
