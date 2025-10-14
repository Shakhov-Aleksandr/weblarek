import {IEvents} from './base/Events.ts';
import {ensureElement} from '../utils/utils.ts'
import {Component} from './base/Component.ts';


export interface IPopup  {
	setContent: HTMLElement;
}

// Отображает модальное окно, выводит внутри окна переданный контент
export class Popup extends Component<IPopup>{
	protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;
	constructor(container: HTMLElement, protected events: IEvents){
		super(container);

        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);

        this._closeButton.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('mousedown', this.close.bind(this));
        this._content.addEventListener('mousedown', (event) => event.stopPropagation());
	}
    set setContent(value: HTMLElement) {
        // if (this._content !== null)
        this._content.replaceChildren(value);
    }

    open() {
        document.addEventListener("keydown", this.handleESC.bind(this))
        this.toggleClass(this.container,'modal_active', true)
        this.events.emit('modal:open');
    }

    close() {
        document.removeEventListener("keydown", this.handleESC.bind(this));
        this.toggleClass(this.container,'modal_active')
        // this._content = null;
        this.events.emit('modal:close');
    }

    handleESC(evt:KeyboardEvent){
        if(evt.key === "Escape"){
            this.close();
        };
    }

    render(data: IPopup): HTMLElement {
        console.log(data)
        super.render(data);
        this.open();
        // console.log(this.container)
        return this.container;
    }
}