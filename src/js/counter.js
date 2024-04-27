const counter = document.querySelector('.counter') // компонент
const counterInput = document.querySelector('.counter__input') // инпут
const counterBtnUp = document.querySelector('.counter__btn--up')
const counterBtnDown = document.querySelector('.counter__btn--down')
const counterBtns = document.querySelectorAll('.counter__btn')

let count = Number.parseInt(counterInput?.value, 10)

counterBtnUp.addEventListener('click', (event) => {
  console.log('click up')
  count++

  if (count === 10) {
    counterBtnUp.setAttribute('disabled', '')
  } else {
    counterBtnUp.removeAttribute('disabled', '')
  }
  counterInput.value = count
})

counterBtnDown.addEventListener('click', (event) => {
  count--
  if (count === 1) {
    counterBtnDown.setAttribute('disabled', '')
  } else {
    counterBtnDown.removeAttribute('disabled', '')
  }
})
