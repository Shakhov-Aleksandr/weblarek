import {IProduct, IBascet } from '../../../types/index.ts';
import {Model} from '../Model.ts';
import {IModelData} from '../../../types/index.ts';






export class Basket extends Model<IModelData> {
    private goods: IProduct[] = [];
    preview: string | null = ""; 
    shoppingCart: IProduct[] = [];

    setItem(good: IProduct) {
        this.goods.push(good);
		this.emitChanges('catalog:change', { catalog: this.goods });
    }

    // Получение данных одной карточки для ее отображения в модальном окне
	setPreview(item: IProduct) {
		this.preview = item.id;
		this.emitChanges('preview:change', item);
	}

    addToShoppingCart(item: IProduct) {
		this.goods.push(item);
		this.emitChanges('shoppingCart:change', item);
	}

    removeFromShoppingCart(item: IProduct) {
		const index = this.goods.indexOf(item);
		this.goods.splice(index, 1);
		item.inCart = false;
		this.emitChanges('shoppingCart:change', item);
	}



    getItems(): IBascet[] {
        let bascet: IBascet[] = [];
        this.goods.forEach(element => {
            bascet.push({id: element.id, title: element.title, price: element.price});
        });
        return bascet;
    }
 

    removeItem(good: IProduct) {
        this.goods = this.goods.filter(item => item.id !== good.id);
    }

    clear() {
        this.goods = [];
    }
 
    calculateSumm(): number {
        let totalSum = 0;
        this.goods.forEach(good => {
            if (good.price !== null) {
            totalSum += good.price;
        }});
        return totalSum;
    }

    countItems(): number {
        return this.goods.length;
    }

    isInBascet (id : string): boolean  {
        if (this.goods.find(good => good.id === id))  return true
        else return false;
    }    
}
