import './scss/styles.scss';
import {cloneTemplate, ensureElement} from './utils/utils';
import {apiProducts} from './utils/data.ts';
import {API_URL} from './utils/constants.ts';
import {Card} from './components/base/Card.ts';
import {Products} from './components/base/Models/Products.ts'
import {Basket} from './components/base/Models/Basket.ts'
import {Buyer} from './components/base/Models/Buyer.ts'
import {Api} from './components/base/Api.ts'
import {Requests} from './components/base/Api.ts'

import {Page} from './components/base/Page.ts'

const events = new EventEmitter();


const page = new Page(document.body, events);



const buyer = new Buyer({}, events);
const productsFromServer = new Products()
const api = new Api(API_URL);
const testApi = new Requests(api);
const products = testApi.getGoods();

await products.then(res => {
  productsFromServer.setItems(res);
})
.catch(err => console.log("Ошибка", err));

const cards = productsFromServer.getItems();
const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');


import {CDN_URL} from './utils/constants.ts'

const items = [];

cards.forEach(item => {
  const card = new Card(cloneTemplate(cardTemplate), {
			onClick: () => events.emit('preview:change', item),
		});
  items.push(card.render(
    {
      title: item.title,
			image: `${CDN_URL}${item.image}`,
			price: item.price,
			category: item.category,
    }
  ))
})


const start = ensureElement<HTMLElement>('.gallery');
start.replaceChildren(...items)



// Отображение модального окна карточки товара

import {IProduct} from './types/index.ts';

import {Popup} from './components/base/Popup.ts';
import { EventEmitter } from './components/base/Events.ts';
const modal = new Popup(ensureElement<HTMLElement>('#modal-container'), events);
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');


events.on('preview:change', (items: IProduct) => {
//   console.log(items)
	const view = new Card(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			if (!items.inCart) {
				events.emit('Card:add', items);
			} else {
				events.emit('Card:remove', items);
			}
			view.changeButtonDescription(items.inCart);
		},
	});
	modal.render({
		setContent: view.render({
			id: items.id,
			title: items.title,
			image: `${CDN_URL}${items.image}`,
			description: items.description,
			inCart: items.inCart,
			category: items.category,
			price: items.price,
		}),
	});


  
	page.locked = true;
});

// Разблокировка скролла при закрытии модального окна
events.on('modal:close', () => {
	page.locked = false;
});


// КОРЗИНА
import {BasketPopup} from './components/base/BasketPopup.ts'

const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const shoppingCart = new BasketPopup(cloneTemplate(basketTemplate), events);


const basket = new Basket({}, events);

// Добавление товара в корзину
events.on('Card:add', (item: IProduct) => {
	item.inCart = true;
	basket.addToShoppingCart(item);
	modal.close();
});

// Удаление товара из корзины
events.on('Card:remove', (item: IProduct) => {
	item.inCart = false;
	basket.removeFromShoppingCart(item);
	modal.close();
});


// Отображение модального окна корзины
events.on('shoppingCart:select', () => {
	// Активируем кнопку "Оформить" если в корзину добавлен товар
	shoppingCart.buttonToggler = basket.getItems().map(item => item.id); 
	modal.render({
		setContent: shoppingCart.render({
			total: basket.countItems(),
		}),
	});
	page.locked = true;
});



const cardInBaskerTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

// Изменение наполнения корзины
events.on('shoppingCart:change', () => {
	page.counter = basket.countItems();
	shoppingCart.total = basket.countItems();
	shoppingCart.items = basket.getItems().map((item, cartItemIndex) => {
		const card = new Card(cloneTemplate(cardInBaskerTemplate), {
			onClick: () => {
				events.emit('cardInShoppingCart:remove', item);
				// Проверяем, не пора ли блокировать кнопку, если в корзине не осталось товаров
				shoppingCart.buttonToggler = basket.getItems().map((item) => item.id)
			},
		});
		return card.render({
			cartItemIndex: cartItemIndex + 1,
			title: item.title,
			price: item.price,
		});
	});
});

// Событие удаления карточки товара из корзины без закрытия модального окна корзины
events.on('cardInShoppingCart:remove', (item: IProduct) => {
	basket.removeFromShoppingCart(item);
});


import {UserContactsForm} from "./components/base/UserContacts.ts"

import {UserDataForm} from "./components/base/userDataForm.ts"

const userDataTemplate = ensureElement<HTMLTemplateElement>('#order');
const userContactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const userData = new UserDataForm(cloneTemplate(userDataTemplate), events);
const userContacts = new UserContactsForm(cloneTemplate(userContactsTemplate),events);

// Отображение модального окна формы ввода способа оплаты и адреса доставки
events.on('goToOrder:submit', () => {
	modal.render({
		setContent: userData.render({
			valid: false,
			errors: [],
			payment: '',
			address: '',
		}),
	});
});


// отображение модального окна формы ввода электронной почты и номера телефона
events.on('order:submit', () => {
	modal.render({
		setContent: userContacts.render({
			valid: false,
			errors: [],
			phone: '',
			email: '',
		}),
	});
});

export interface IUserDataForm {
	payment: string;
	address: string;
}


// Изменилось состояние валидации формы ввода способа оплаты и адреса доставки
events.on('UserDataFormErrors:change', (errors: Partial<IUserDataForm>) => {
	const { address, payment } = errors;
	userData.valid = !payment && !address;
	userData.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
});

// Изменилось одно из полей формы ввода способа оплаты и адреса доставки
events.on(
	/^order\..*:change/,
	(data: { field: keyof IUserDataForm; value: string }) => {
		buyer.setUserDataField(data.field, data.value);
	}
);

export interface IUserContactsForm {
	email: string;
	phone: string;
}

// Изменилось состояние валидации формы ввода электронной почты и номера телефона
events.on(
	'UserContactsFormErrors:change',
	(errors: Partial<IUserContactsForm>) => {
		const { email, phone } = errors;
		userContacts.valid = !email && !phone;
		userContacts.errors = Object.values({ email, phone })
			.filter((i) => !!i)
			.join('; ');
	}
);



// Изменилось одно из полей формы электронной почты и номера телефона
events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IUserContactsForm; value: string }) => {
		buyer.setUserContactsField(data.field, data.value);
	}
);