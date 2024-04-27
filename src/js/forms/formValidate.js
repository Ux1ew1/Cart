import { validateForm } from './validators'
import { form } from '../selectors/selectors'

export const formValidate = () => {
  // проверяем что форма есть
  if (form) {
    // получаем все input и select
    const allInputs = form.querySelectorAll('input, select')

    // обработчик изменения каждого поля ввода
    allInputs.forEach((input) => {
      input.addEventListener('change', () => {
        const userDate = {}

        // собираем данные только из текущего поля формы
        userDate[input.name] = input.value

        // валдация только для текущего поля
        const errors = validateForm(userDate)

        // обновление сообщения об ошибке только для текущего поля
        const errorElement = document.querySelector(`#${input.name}-error`)

        if (errorElement) {
          errorElement.textContent = errors[input.name] || ''
        }
      })
    })
  }
}
