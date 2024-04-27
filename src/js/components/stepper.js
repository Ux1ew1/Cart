const stepper = () => {
  // получаем элементы компонента
  const counterInput = document.querySelector('.counter__input')
  const counterBtnUp = document.querySelector('.counter__btn--up')
  const counterBtnDown = document.querySelector('.counter__btn--down')

  // инициализируем начальное значение степпера
  let count = Number.parseInt(counterInput?.value, 10)

  const updateButtonState = () => {
    counterBtnUp.disabled = count >= 10
    counterBtnDown.disabled = count <= 1
  }

  const handleBtnUpClick = () => {
    count++
    counterInput.value = count
    updateButtonState()
  }

  const handleBtnDownClick = () => {
    count--
    counterInput.value = count
    updateButtonState()
  }

  // добавляем обработчики событий для кнопок стреппера
  counterBtnUp.addEventListener('click', handleBtnUpClick)
  counterBtnDown.addEventListener('click', handleBtnDownClick)

  // инициализируем кнопки при загрузке страницы
  updateButtonState()
}

stepper()
