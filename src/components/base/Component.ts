/**
 * Базовый компонент
 */
import {Products} from './components/base/Models/Products.ts'
import {IProduct} from '../../types/index.ts';
import {ensureElement} from '../../utils/utils.ts'



export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {
        // Учитывайте что код в конструкторе исполняется ДО всех объявлений в дочернем классе
    }

    // Инструментарий для работы с DOM в дочерних компонентах

    // Установить изображение с альтернативным текстом
    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }


    protected setText(element: HTMLElement | null, value: unknown) {
		if (element) {
            // console.log(element)
			element.textContent = String(value);
		}
	}



    // Вернуть корневой DOM-элемент
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        // console.log(this.container)
        return this.container;
    }
}



interface IGallaryData {
    catalog: HTMLElement;
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

    	Category: { [key: string]: string } = {
		'софт-скил': 'card__category_soft',
		'хард-скил': 'card__category_hard',
		'дополнительное': 'card__category_additional',
		'другое': 'card__category_other',
		'кнопка': 'card__category_button',
	};

    constructor(container: HTMLElement, ) {
        super(container);
        this.cardCategory = container.querySelector('.card__category')
        this.cardTitle = ensureElement<HTMLElement>('.card__title', container);
        this.cardImage = container.querySelector('.card__image')
        this.cardPrice = container.querySelector('.card__price')
        this.cardDescription = container.querySelector('.card__text');
        this.cardButton = container.querySelector('.card__button');


        this.cardCatalog = ensureElement<HTMLElement>('.gallery');
    }

    toggleClass(element: HTMLElement, className: string, force?: boolean) {
		element.classList.toggle(className, force);
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

	// set image(value: string) {
	// 	this.setImage(this.cardImage, value, this.cardTitle);
	// }
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
        if (this.cardCategory instanceof HTMLImageElement) 
        { 
            this.setText(this.cardCategory, value);
    		this.toggleClass(this.cardCategory, this.Category[value], true);
        } 
		
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

}