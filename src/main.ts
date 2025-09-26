import './scss/styles.scss';
import {apiProducts} from './utils/data.ts';
import {API_URL} from './utils/constants.ts';
import {Products} from './components/base/Models/Products.ts'
import {Basket} from './components/base/Models/Basket.ts'
import {Buyer} from './components/base/Models/Buyer.ts'
import {Api} from './components/base/Api.ts'
import {Requests} from './components/base/Api.ts'

console.log('ТЕСТ КЛАССА Products');

const list = new Products();
// setItems - метод для сохранения массива товаров полученного в параметрах метода
list.setItems(apiProducts.items);

// getItems - метод для получение массива товаров из модели
console.log('\n 1 Массив товаров из каталога: ', list.getItems());

// findGoodByID - метод получение одного товара по его id
console.log('\n 2 Найден товар с ID из главной страницы: ', list.findGoodByID("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));

// setToShow - метод для сохранения товара для подробного отображения
list.setToShow(list.findGoodByID("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));
console.log('\n 3 Товар сохранен для подробного отображения: ', list.findGoodByID("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));

// getToShow - метод для получение товара для подробного отображения
console.log('\n 4 Вывод товара для подробного отображения: ', list.getToShow());



console.log('\n\n\nТЕСТ КЛАССА Basket');
const basket = new Basket();
// setItemToBascet -  метод для добавления товара, который был получен в параметре в массив корзины
basket.setItem(list.findGoodByID("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));
console.log('1 Товар добавлен в корзину:', list.findGoodByID("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));
basket.setItem(list.findGoodByID("854cef69-976d-4c2a-a18c-2aa45046c390"));
console.log('1 Товар добавлен в корзину:', list.findGoodByID("854cef69-976d-4c2a-a18c-2aa45046c390"));

// getItemsFromBascet - метод для получения товаров, которые находятся в корзине
console.log("\n2 Содержимое корзины", basket.getItems());

// removeItemFromBascet - метод для удаления товара, полученного в параметре из массива корзины
basket.removeItem(list.findGoodByID("854cef69-976d-4c2a-a18c-2aa45046c390"));
console.log('\n3 Товар удален из корзины:', list.findGoodByID("854cef69-976d-4c2a-a18c-2aa45046c390"));
console.log("3 Содержимое корзины", basket.getItems());

// calculateSumm - метод для подсчета суммы 
console.log("4 Сумма заказа: ", basket.calculateSumm());

// clearBascet - метод для очистки корзины
basket.clear();
console.log("\n5 Корзина очищена");
console.log("5 Содержимое корзины", basket.getItems());

// countItems - метод для получения количества товаров в корзине
console.log("\n6 Количество товаров в корзине: ", basket.countItems());

// isInBascet - метод для проверки наличия товара в корзине по его id, полученному в параметр метода 
console.log("\n7 Товар в корзине: ", basket.isInBascet("854cef69-976d-4c2a-a18c-2aa45046c390"));



console.log('\n\n\nТЕСТ КЛАССА Buyer');
const buyer = new Buyer();
// set(Payment/Address/Email/Phone) - методы для сохранения данных в соответствующие поля
buyer.setPayment("cash");
console.log("1 Проверка валидации: " , buyer.validation());
buyer.setAddress("Night");
buyer.setEmail("@");
buyer.setPhone("89");

// get(Payment/Address/Email/Phone) - методы для получения данных из соответствующих полей
console.log('\n2 Вывод данных по отдельности');
console.log("Адрес: " , buyer.getAddress());
console.log("Почта: ", buyer.getEmail());
console.log("Способ оплаты: ", buyer.getPayment());
console.log("Телефон: ", buyer.getPhone());

// getOrderData - метод для получения значений поле класса Buyer
console.log("\n3 Вывод всех данных: ", buyer.getOrderData());

// clear - метод для очистки поле класса Buyer
buyer.clear();
console.log("\n4 Данные очищены: ", buyer.getOrderData());


console.log('\n\n\nТЕСТ КЛАССА Requests');
const productsFromServer = new Products()
const newBascet = new Basket();
const api = new Api(API_URL);
const testApi = new Requests(api);
const products = testApi.getGoods();

products.then(res => {
  productsFromServer.setItems(res);
})
.catch(err => console.log("Ошибка", err));

console.log("Товары с сервера: ", productsFromServer.getItems());

buyer.setPayment("cash");
buyer.setAddress("Night");
buyer.setEmail("@");
buyer.setPhone("89");

newBascet.setItem(list.findGoodByID("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));
console.log("Товары в корзине: ", newBascet.getItems());
console.log("Сумма заказа: ", newBascet.calculateSumm());

const resultFromServer = testApi.postOrder(buyer.getOrderData(), newBascet.getItems(), newBascet.calculateSumm());
resultFromServer.then(res => {
  console.log("\n Сервер вернул сообщение:");

  console.log("ID заказа: ", res.id);
  console.log("Сумма заказа: ", res.total);
}).catch(err => console.log("Ошибка", err));