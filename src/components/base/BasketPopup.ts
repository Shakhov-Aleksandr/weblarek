import {createElement, ensureElement} from "../../utils/utils.ts"
import { Component } from "./Component.ts";
import { EventEmitter } from "./Events.ts";
import {IEvents} from './Events.ts';
import {IProduct} from '../../types/index.ts';


// Базовая модель
export abstract class Model<T> {
    constructor(data: Partial<T>, protected events: IEvents) {
        Object.assign(this, data);
    }

    emitChanges(event: string, payload?: object) {
        this.events.emit(event, payload ?? {});
    }
}

export interface IModelData {
    catalog: IProduct[];
    shoppingCart: string[];
    preview: string | null;
}



export interface IShoppingCartView  {
	items: HTMLElement[];
    total: number;
    buttonToggler: string[];
}


// Отрисовывает корзину с ее содержимым
export class BasketPopup extends Component<IShoppingCartView> {
    protected list: HTMLElement;
    protected count: HTMLElement;
    protected button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this.list = ensureElement<HTMLElement>('.basket__list', this.container);
        this.count = this.container.querySelector('.basket__price');
        this.button = this.container.querySelector('.button');

        if (this.button) {
            this.button.addEventListener('click', () => {
                events.emit('goToOrder:submit');
            });
        }
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this.list.replaceChildren(...items);
        } else {
            this.list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
        }
    }

    set buttonToggler(items: string[]) {
        if (!items.length) {
            this.setDisabled(this.button, true);
        } else {
            this.setDisabled(this.button, false);
        }
    }

	set total(summ: number) {
		this.setText(this.count, `${summ.toString()} синапсов`);
	}

    resetCartView(){
        this.items = [];
    }
}