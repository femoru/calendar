import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils'

import HelloWorld from '../../src/components/HelloWorld.vue'

describe('<HelloWorld />', () => {

    const localVue = createLocalVue()
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    const mountFunction = options => {
        return mount(HelloWorld, {
            localVue,
            vuetify,
            ...options,
        })
    }

    it('Should contains Welcome to Vuetify title', () => {
        const expected = "Welcome to Vuetify"
        const wrapper = mountFunction({ propsData: { title: expected } })
        const title = wrapper.find('.display-title')
        expect(title.text()).toBe(expected)
    })
})