import Vuetify from 'vuetify'
import { render, waitFor } from '@testing-library/vue'


import FormReminder from '../../src/components/FormReminder.vue'

describe('<FormReminder />', () => {


    const customRender = (component, options, callback) => {
        const root = document.createElement('div')
        root.setAttribute('data-app', 'true')

        return render(component, {
            container: document.body.appendChild(root),
            vuetify: new Vuetify(),
            ...options,
        }, callback)
    }

    it('Should open dialog', () => {
        const { getByLabelText } = customRender(FormReminder)
        getByLabelText('Event')
    })


    it('Should have inputs related with form new reminder', () => {
        const { getByLabelText, getByText } = customRender(FormReminder)
        getByLabelText('Event')
        getByLabelText('Date')
        getByLabelText('Time')
        getByLabelText('Location')
        getByText('Cancel')
        getByText('Save')
    })

    it('Should show delete button when edit reminder', async () => {
        const { getByText } = customRender(FormReminder, { propsData: { reminder: { id: 2 } } })
        await waitFor(() => {
            getByText('Delete')
        })
    })

})