import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils'

import FormReminder from '../../src/components/FormReminder.vue'

describe('<FormReminder />', () => {

    const localVue = createLocalVue()
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    const mountFunction = options => {
        return mount(FormReminder, {
            localVue,
            vuetify,
            ...options,
        })
    }

    it('Should open dialog', () => {
        const wrapper = mountFunction({ propsData: { value: true }})
        wrapper.vm.$data.dialogForm =  true
        wrapper.vm.$nextTick()
        expect(wrapper.isVisible()).toBe(true)
        expect(wrapper.element).toMatchSnapshot()
    })

})