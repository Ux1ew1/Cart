import { nanoid } from 'nanoid'
import { generateProductCardHTML } from './productCard'
import { form } from '../selectors/selectors'
import { productList, paginationList } from '../selectors/selectors'

let PRODDUCTS = [] // Переменная для хранения данных о продуктах.
const itemsPerPage = 10 // количество элементов на одной странице
let currentPage = 1 // Текущая страница

// Функция подгрузки данных из db.json
export async function loadJSON() {
  try {
    const response = await fetch('http://localhost:3000/products')
    PRODDUCTS = await response.json()
    displayProducts(currentPage)
    generatePagination(currentPage)
    console.log('Данные из db.json:', PRODDUCTS)

    // if (Array.isArray(PRODDUCTS)) PRODDUCTS.forEach((product) => generateProductCardHTML(product))
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  }
}

// Функция для отображения карточек на странцие
const displayProducts = (page) => {
  productList.innerHTML = ''
  // Вычисляем начальный и конечный инлекс элементов для текущей страницы
  const start = (page - 1) * itemsPerPage
  const end = page * itemsPerPage

  const paginatedItems = PRODDUCTS.slice(start, end) // Получаем карточки для страницы

  if (Array.isArray(PRODDUCTS)) {
    paginatedItems.forEach((product) => {
      generateProductCardHTML(product) // Генерируем 10 карточек на странице
    })
  }
}

const generatePagination = () => {
  paginationList.innerHTML = '' // Очищаем контейнер
  const pageCount = Math.ceil(PRODDUCTS.length / itemsPerPage) // Количество страниц
  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement('button') // Создаём кнопку
    button.textContent = i // Даём каждой кнопке свой индекс равный странице
    button.addEventListener('click', () => {
      currentPage = i // По клику на страницу меняем переменную
      displayProducts(currentPage) // Вызываем фукнцию для отрисовки следующих 10-ти карточек
    })
    paginationList.appendChild(button) // Добавляем кнопки в контейнер
  }
}

/**
 * Функция обработки кликов и добавления товара в корзину по его ID
 * @param {MouseEvent} event - Событие клика
 */
export function addProductToBasket(event) {
  // Получаем id карточки
  const id = event.currentTarget.parentElement?.dataset?.id

  // Находим товар по его ID в PRODDUCTS
  const product = findProductById(id, PRODDUCTS)

  if (product) {
    // Добавляем товар в корзину и т.д.
    console.log(product)
  } else {
    console.error(`Товар с ID ${id} не найден`)
  }
}

/**
 * Функция для поиска товара по его ID в базе данных
 * @param {string} id - Идентификатор товара
 * @param {Array<Object>} products - Массив товаров
 * @returns {Object|null} - Найденный товар или null, если товар не найден
 */
export function findProductById(id, products) {
  // Находим товар по его ID в переданном массиве
  const foundProduct = products.find((product) => product.id === id)

  return foundProduct || null
}

/**
 * Обработчик отправки формы для добавления нового товара.
 * @param {Event} event - Событие отправки формы.
 * @returns {Promise<void>} - Промис.
 */
export const handleFormSubmit = async (event) => {
  event.preventDefault() // предотвр. отправку данных

  // Целевой элемент, на к-ом произошел клик (форма)
  const form = event.target

  // Получаем все инпуты внутри формы
  const inputLists = form.querySelectorAll('input')

  // Объект для отправки на бек
  const newProduct = {
    id: nanoid(),
  }

  // пополняем объект по атрибуту name инпутов
  inputLists.forEach((input) => (newProduct[input?.name] = input?.value))

  // добавляем категорию товара в объект newProduct
  newProduct.category = document.querySelector('#productCategory')?.value

  try {
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST', // Здесь так же могут быть GET, PUT, DELETE
      body: JSON.stringify(newProduct), // Тело запроса в JSON-формате
      headers: {
        // Добавляем необходимые заголовки
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    if (response.ok) {
      // Показ компонента уведомления
      const notificationInfo = new Notification({
        variant: 'green',
        title: 'Добавление товара',
        subtitle: 'Товар добавлен на страницу',
      })

      // Обновляем полученные ранее данные
      PRODDUCTS.push(newProduct)

      // Вставляем новую карточку товара в HTML
      generateProductCardHTML(newProduct)
    } else {
      console.error('Ошибка при добавлении товара:', response.statusText)
    }
  } catch (error) {
    console.error('Ошибка при отправке данных на сервер:', error)
  }
}

// Привязываем обработчик submit к форме
form.addEventListener('submit', handleFormSubmit)
