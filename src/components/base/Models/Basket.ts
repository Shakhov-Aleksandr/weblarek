import {IProduct} from '../../../types/index.ts';


export class Basket {
    private goodsOnBascet: IProduct[] = [];

    setItemToBascet(good: IProduct) {
        this.goodsOnBascet.push(good);
    }

    getItemsFromBascet(): IProduct[] {
        return this.goodsOnBascet;
    }

    removeItemFromBascet(good: IProduct) {
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
        }});
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
