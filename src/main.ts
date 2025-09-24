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
console.log('1 Массив товаров из каталога: ', list.getItems());

// findGoodByID - метод получение одного товара по его id
console.log('2 Найден товар с ID из главной страницы: ', list.findGoodByID("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));

// setToShow - метод для сохранения товара для подробного отображения
list.setToShow(list.findGoodByID("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));
console.log('3 Товар сохранен для подробного отображения');

// getToShow - метод для получение товара для подробного отображения
console.log('4 Вывод товара с подробностями:', list.getToShow());

console.log('ТЕСТ КЛАССА Basket');
const basket = new Basket();
// setItemToBascet -  метод для добавления товара, который был получен в параметре в массив корзины
basket.setItemToBascet(list.findGoodByID("854cef69-976d-4c2a-a18c-2aa45046c390"));
console.log('1 Товар добавлен в корзину');

// getItemsFromBascet - метод для получения товаров, которые находятся в корзине
console.log("2 Содержимое корзины", basket.getItemsFromBascet());

// removeItemFromBascet - метод для удаления товара, полученного в параметре из массива корзины
basket.removeItemFromBascet(list.findGoodByID("854cef69-976d-4c2a-a18c-2aa45046c390"));
console.log('3 Товар удален из корзины');
console.log("3 Содержимое корзины", basket.getItemsFromBascet());

// clearBascet - метод для очистки корзины
basket.setItemToBascet(list.findGoodByID("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));
console.log("4 Содержимое корзины", basket.getItemsFromBascet());

basket.setItemToBascet(list.findGoodByID("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));
console.log("4 Содержимое корзины", basket.getItemsFromBascet());

basket.clearBascet();
console.log('4 Корзина очищена');
console.log("4 Содержимое корзины", basket.getItemsFromBascet());

// calculateSumm - метод для подсчета суммы 
basket.setItemToBascet(list.findGoodByID("854cef69-976d-4c2a-a18c-2aa45046c390"));
console.log("Сумма заказа: ", basket.calculateSumm());

// countItems - метод для получения количества товаров в корзине
console.log("Количество товаров в корзине: ", basket.countItems());

// isInBascet - метод для проверки наличия товара в корзине по его id, полученному в параметр метода 
console.log("Товар в корзине: ", basket.isInBascet("854cef69-976d-4c2a-a18c-2aa45046c390"));


const buyer = new Buyer();
// set(Payment/Address/Email/Phone) - методы для сохранения данных в соответствующие поля
buyer.setPayment("cash");
buyer.setAddress("Night");
buyer.setEmail("@");
buyer.setPhone("89");

// get(Payment/Address/Email/Phone) - методы для получения данных из соответствующих полей
console.log(buyer.getAddress());
console.log(buyer.getEmail());
console.log(buyer.getPayment());
console.log(buyer.getPhone());

// getOrderData - метод для получения значений поле класса Buyer
console.log(buyer.getOrderData());

// clear - метод для очистки поле класса Buyer
buyer.clear();
console.log(buyer.getOrderData());



const apiTest = new Products()

const api = new Api(API_URL);
const testApi = new Requests(api);
const log = testApi.getGoods();
console.log('log', log);


await log.then(res => {
  apiTest.setItems(res);
});

  console.log(apiTest.getItems());


buyer.setPayment("cash");
buyer.setAddress("Night");
buyer.setEmail("@");
buyer.setPhone("89");

console.log("Сумма заказа: ", basket.calculateSumm());
console.log("Содержимое корзины", basket.getItemsFromBascet());


console.log(testApi.postOrder(buyer.getOrderData(), basket.getItemsFromBascet(), basket.calculateSumm()))