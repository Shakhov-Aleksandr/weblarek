import {IProduct, IBascet} from '../../../types/index.ts';


export class Basket {
    private goods: IProduct[] = [];

    setItem(good: IProduct) {
        this.goods.push(good);
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
