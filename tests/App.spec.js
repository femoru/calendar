import '@testing-library/jest-dom'
import Vuetify from 'vuetify'
import { render, fireEvent } from '@testing-library/vue'

import { store as reminderStore } from '../src/store/store'
import App from '../src/App.vue'

describe('<App />', () => {

    const customRender = (component, options, callback) => {
        const root = document.createElement('div')
        root.setAttribute('data-app', 'true')

        const store = {
            state: {},
            modules: {
                store: reminderStore
            }
        }
        store.modules.store.state.reminders = []

        return render(component, {
            container: document.body.appendChild(root),
            vuetify: new Vuetify(),
            store,
            ...options,
        }, callback)
    }

    it('Should show calendar', () => {
        const { getByText } = customRender(App)
        expect(getByText('Abril 2021')).toBeInTheDocument()
    })

    it('Should open dialog for new reminder', async () => {
        const { getByText, getByTestId, getByLabelText } = customRender(App)
        getByText('Abril 2021')
        const btnNewReminder = getByTestId('formReminder')
        await fireEvent.click(btnNewReminder)

        getByLabelText('Event')
        getByLabelText('Date')
        getByLabelText('Time')
        getByLabelText('Location')
        getByText('Save')
    })

    it('Should save for new reminder', async () => {
        const { getByText, getByTestId, getByLabelText, getByRole } = customRender(App)

        getByText('Abril 2021')
        const btnNewReminder = getByTestId('formReminder')
        await fireEvent.click(btnNewReminder)

        const inputEvent = getByLabelText('Event')
        const inputDate = getByLabelText('Date')
        const inputTime = getByLabelText('Time')
        const inputLocation = getByLabelText('Location')
        const combo = getByRole('combobox')

        await fireEvent.update(inputEvent, 'Nuevo evento')
        await fireEvent.update(inputDate, '2021-04-01')
        await fireEvent.update(inputTime, '13:00')
        await fireEvent.update(inputLocation, 'Cali, Valle del Cauca, Colombia')
        await fireEvent.touch(inputLocation)
        await fireEvent.click(combo)

        const btnSave = getByText('Save')
        await fireEvent.click(btnSave)

        getByText(/Nuevo evento/)
        // await waitFor(() => {
        //     const calendarBody = container.querySelector('.calendar-body')
        //     within(calendarBody).getByText(/Nuevo evento/)
        //     screen.debug(calendarBody)
        // })
    })


})