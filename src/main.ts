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
    
    setItems(goodsOnSite: IProduct[]) {
        this.goodsOnSite = goodsOnSite;
    }

    getItems() : IProduct[] {
        return this.goodsOnSite;
    }

}


const list = new Products();
list.setItems(apiProducts.items);
console.log('Массив товаров из каталога: ', list.getItems());
const rend = list.getItems();
rend.forEach(item => console.log(item))

