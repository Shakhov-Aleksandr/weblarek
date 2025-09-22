import './scss/styles.scss';
import {apiProducts} from './utils/data.ts';
import {Products} from './components/base/Models/Products.ts'
import {Basket} from './components/base/Models/Basket.ts'
import {Buyer} from './components/base/Models/Buyer.ts'


const list = new Products();
// setItems - метод для сохранения массива товаров полученного в параметрах метода
list.setItems(apiProducts.items);

// getItems - метод для получение массива товаров из модели
console.log('Массив товаров из каталога: ', list.getItems());

// findGoodByID - метод получение одного товара по его id
console.log('Товар с ID: ', list.findGoodByID("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));

// setToShow - метод для сохранения товара для подробного отображения
console.log('Товар сохранен для подробного отображения', list.setToShow(list.findGoodByID("c101ab44-ed99-4a54-990d-47aa2bb4e7d9")));

// getToShow - метод для получение товара для подробного отображения
console.log('Вывод товара с подробностями:', list.getToShow());


const basket = new Basket();
// setItemToBascet -  метод для добавления товара, который был получен в параметре в массив корзины
basket.setItemToBascet(list.findGoodByID("854cef69-976d-4c2a-a18c-2aa45046c390"));

// getItemsFromBascet - метод для получения массива товаров, которые находятся в корзине
console.log("Содержимое корзины", basket.getItemsFromBascet());

// removeItemFromBascet - метод для удаления товара, полученного в параметре из массива корзины
basket.removeItemFromBascet(list.findGoodByID("854cef69-976d-4c2a-a18c-2aa45046c390"));
console.log("Содержимое корзины", basket.getItemsFromBascet());

// clearBascet - метод для очистки корзины
basket.setItemToBascet(list.findGoodByID("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));
basket.setItemToBascet(list.findGoodByID("854cef69-976d-4c2a-a18c-2aa45046c390"));
basket.clearBascet();
console.log("Содержимое корзины", basket.getItemsFromBascet());

// calculateSumm - метод для подсчета суммы 
basket.setItemToBascet(list.findGoodByID("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));
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
