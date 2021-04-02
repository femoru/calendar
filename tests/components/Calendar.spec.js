import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils'

import Calendar from '../../src/components/Calendar.vue'

describe('<Calendar />', () => {

    const localVue = createLocalVue()
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    const mountFunction = options => {
        return mount(Calendar, {
            localVue,
            vuetify,
            ...options,
        })
    }

    it('Should contains Enero 2021 title', () => {
        const expected = "Enero 2021"
        const wrapper = mountFunction({ propsData: { value: "2021-01" } })
        const title = wrapper.find('.calendar-title')
        expect(title.text()).toBe(expected)
    })

    it('Should show next month when click next', async () => {
        const expected = "Febrero 2021"
        const wrapper = mountFunction({ propsData: { value: "2021-01" } })

        const buttonNext = wrapper.find('.calendar-next-month')  
        await buttonNext.trigger('click')
        
        const title = wrapper.find('.calendar-title')
        expect(title.text()).toBe(expected)
    })
    it('Should show prev month when click next',async () => {
        const expected = "Diciembre 2020"
        const wrapper = mountFunction({ propsData: { value: "2021-01" } })

        const buttonNext = wrapper.find('.calendar-prev-month')   
        await buttonNext.trigger('click')

        const title = wrapper.find('.calendar-title')
        expect(title.text()).toBe(expected)
    })
})