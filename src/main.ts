import './scss/styles.scss';
import {apiProducts} from './utils/data.ts';
import './types/index.ts';

// import { IProduct, IBuyer } from './types/index.ts';

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

class Products  {

    protected goodsOnSite : IProduct[] = [];
    protected goodPresentation? : IProduct;
    
    setItems(goods: IProduct[]) {
        this.goodsOnSite = goods;
    }

    getItems() : IProduct[] {
        return this.goodsOnSite;
    }

    findGoodByID (id : string) : IProduct  {
        const foundGood = this.goodsOnSite.find(good => good.id === id);
        if (!foundGood) {
            throw new Error(`Товар с ID ${id} не найден.`);
        }
        return foundGood;
    }

    setToShow(good : IProduct) {
        this.goodPresentation = good;
    }

    getToShow() : IProduct  {
        if (this.goodPresentation == undefined) {
            throw new Error(`Ошибка`);
        }
        return this.goodPresentation;
    }

}


class Bascet {
    protected goodsOnBascet : IProduct[] = [];

    setItemToBascet(good : IProduct) {
        console.log("Товар добавлен в корзину");
        this.goodsOnBascet.push(good);
    }

    getItemsFromBascet() : IProduct[] {
        // console.log("Содержимое казины:");
        return this.goodsOnBascet;
    }

    removeItemFromBascet(good : IProduct) {
        this.goodsOnBascet = this.goodsOnBascet.filter(item => item.id !== good.id);
    }

    clearBascet() {
        console.log("Корзина очищена");
        this.goodsOnBascet = [];
    }

    calculateSumm(): number {
    let totalSum = 0;
    this.goodsOnBascet.forEach(good => {
        if (good.price !== null) {
            totalSum += good.price;
        }
    });
    return totalSum;
    }

    countItems(): number {
        return this.goodsOnBascet.length;
    }

    isInBascet (id : string): boolean  {
        if (this.goodsOnBascet.find(good => good.id === id))  return true
        else return false;
    }

    
}

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


const bascet = new Bascet();
// setItemToBascet -  метод для добавления товара, который был получен в параметре в массив корзины
bascet.setItemToBascet(list.findGoodByID("854cef69-976d-4c2a-a18c-2aa45046c390"));

// getItemsFromBascet - метод для получения массива товаров, которые находятся в корзине
console.log("Содержимое корзины", bascet.getItemsFromBascet());

// removeItemFromBascet - метод для удаления товара, полученного в параметре из массива корзины
bascet.removeItemFromBascet(list.findGoodByID("854cef69-976d-4c2a-a18c-2aa45046c390"));
console.log("Содержимое корзины", bascet.getItemsFromBascet());

// clearBascet - метод для очистки корзины
bascet.setItemToBascet(list.findGoodByID("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));
bascet.setItemToBascet(list.findGoodByID("854cef69-976d-4c2a-a18c-2aa45046c390"));
bascet.clearBascet();
console.log("Содержимое корзины", bascet.getItemsFromBascet());

// calculateSumm - метод для подсчета суммы 
bascet.setItemToBascet(list.findGoodByID("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));
bascet.setItemToBascet(list.findGoodByID("854cef69-976d-4c2a-a18c-2aa45046c390"));
console.log("Сумма заказа: ", bascet.calculateSumm());

// countItems - метод для получения количества товаров в корзине
console.log("Количество товаров в корзине: ", bascet.countItems());

// isInBascet - метод для проверки наличия товара в корзине по его id, полученному в параметр метода 
console.log("Товар в корзине: ", bascet.isInBascet("854cef69-976d-4c2a-a18c-2aa45046c390"));

