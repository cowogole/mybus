// Libraries
import Vuetify from 'vuetify'

// Components
import HelloWorld from '@/components/HelloWorld.vue'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'

describe('HelloWorld.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })


  it('should emit an event when the action v-btn is clicked', () => {
    const wrapper = mount(HelloWorld, {
      localVue,
      vuetify,
    })

    const event = jest.fn()
    const button = wrapper.find('.v-text-field')

    // Here we bind a listener to the wrapper
    // instance to catch our custom event
    // https://vuejs.org/v2/api/#Instance-Methods-Events
    wrapper.vm.$on('action-btn:clicked', event)

    expect(event).toHaveBeenCalledTimes(0)

    // Simulate a click on the button
    button.trigger('click')

    // Ensure that our mock event was called
    expect(event).toHaveBeenCalledTimes(1)
  })
})