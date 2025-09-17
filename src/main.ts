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
    // protected good : IProduct;
    
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
        this.goodsOnBascet.push(good);
    }

    getItemsFromBascet() : IProduct[] {
        return this.goodsOnBascet;
    }

    removeItemFromBascet(good : IProduct) {
        this.goodsOnBascet = this.goodsOnBascet.filter(item => item.id !== good.id);
    }

    clearBascet() {
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

    
}

const list = new Products();
list.setItems(apiProducts.items);
console.log('Массив товаров из каталога: ', list.getItems());
// const rend = list.getItems();
// rend.forEach(item => console.log(item))
// console.log(list.findGoodByID("854cef69-976d-4c2a-a18c-2aa45046c390"));

const bascet = new Bascet();
bascet.setItemToBascet(list.findGoodByID("854cef69-976d-4c2a-a18c-2aa45046c390"));
// bascet.getItemsFromBascet();s
console.log(bascet.getItemsFromBascet());

bascet.setItemToBascet(list.findGoodByID("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));

console.log(bascet.getItemsFromBascet());
