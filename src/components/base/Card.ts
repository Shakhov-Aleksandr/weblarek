import {IProduct} from '../../types/index.ts';
import {ensureElement} from '../../utils/utils.ts'
import {Component} from './Component.ts';



interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class Card extends Component<IProduct> {
    // catalogElement: HTMLElement;
    private cardID: string = '';
    private cardCategory: HTMLElement | null;
    private cardDescription: HTMLElement | null;
    private cardButton: HTMLButtonElement| null;
    private cardTitle: HTMLElement;
    private cardImage: HTMLImageElement | null;
    private cardPrice: HTMLElement | null;
	private cardIndex: HTMLElement | null;

    Category: { [key: string]: string } = {
		'софт-скил': 'card__category_soft',
		'хард-скил': 'card__category_hard',
		'дополнительное': 'card__category_additional',
		'другое': 'card__category_other',
		'кнопка': 'card__category_button',
	};

    constructor(container: HTMLElement, actions: ICardActions) {
        super(container);
        this.cardCategory = container.querySelector('.card__category')
        this.cardTitle = ensureElement<HTMLElement>('.card__title', container);
        this.cardImage = container.querySelector('.card__image')
        this.cardPrice = container.querySelector('.card__price')
        this.cardDescription = container.querySelector('.card__text');
        this.cardButton = container.querySelector('.card__button');
		this.cardIndex = container.querySelector('.basket__item-index');


		if (actions?.onClick) {
			if (this.cardButton) {
				this.cardButton.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
    }


    set id(value: string){
		this.cardID = value;
	}

    get id(): string {
		return this.cardID || '';
	}

    set title(value: string) {
		this.setText(this.cardTitle, value);
	}

    set image(value: string) 
    {
        if (this.cardImage instanceof HTMLImageElement) 
        { 
            this.setImage(this.cardImage, value, this.title); 
        } 
    }


	set description(value: string) {
		this.setText(this.cardDescription, value);
	}

	set category(value: string) {
		// console.log(value)
		this.setText(this.cardCategory, value);
		// console.log(value !== 'софт-скил')
		// if (value == 'софт-скил')
		this.toggleClass(this.cardCategory, this.Category[value], true);
	}


	set price(value: number | null) {
		this.setText(
			this.cardPrice,
			value ? `${value.toString()} синапсов` : 'Бесценно'
		);
		if (value === null && this.cardButton) {
			this.cardButton.disabled = true;
		}
	}

	set button(value: string) {
		this.setText(this.cardButton, value);
	}


	set inCart(value: boolean) {
		this.changeButtonDescription(value);
	}

	set cartItemIndex(value: string) {
		if (this.cardIndex !== null)
		this.cardIndex.textContent = value;
	}

	changeButtonDescription(inCart: boolean) {
		if (inCart) {
			this.button = 'Удалить из корзины';
		} else {
			this.button = 'В корзину';
		}
	}




}