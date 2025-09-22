import {IProduct} from '../../../types/index.ts';


export class Products  {

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