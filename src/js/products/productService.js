import { nanoid } from 'nanoid'
import { generateProductCardHTML } from './productCard'
import { form } from '../selectors/selectors'

let PRODUCTS = [] // переменная для хранения данных о продуктах

// функция для подгрузки данных из db.json
export async function loadJSON() {
  try {
    const response = await fetch('http://localhost:3000/products')
    PRODUCTS = await response.json()

    console.log('данные из db.json:', PRODUCTS)

    if (Array.isArray(PRODUCTS))
      PRODUCTS.forEach((product) => {
        generateProductCardHTML(product)
      })
  } catch (error) {
    console.log('Ошибка загрузки данных:', error)
  }
}

export function addProductToBasket(event) {
  // получаем id карточки
  const id = event.currentTarget.parentElement?.dataset?.id

  const product = findProductById(id, PRODUCTS)

  if (product) {
    // добавляем товар в корзину
    console.log(product)
  } else {
    console.error(`Товар с ID ${id} не найден`)
  }
}

export function findProductById(id, products) {
  const foundProduct = products.find((product) => {
    product.id === id
  })
  return foundProduct || null
}

export const handleFormSubmit = async (event) => {
  event.preventDefault()
}
