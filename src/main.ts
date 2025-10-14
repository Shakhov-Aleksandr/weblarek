import './scss/styles.scss';
import {cloneTemplate, ensureElement} from './utils/utils';
import {apiProducts} from './utils/data.ts';
import {API_URL} from './utils/constants.ts';
import {Card} from './components/Card.ts';
import {Products} from './components/base/Models/Products.ts'
import {Basket} from './components/base/Models/Basket.ts'
import {Buyer} from './components/base/Models/Buyer.ts'
import {Api} from './components/base/Api.ts'
import {Requests} from './components/base/Api.ts'


const list = new Products();

const buyer = new Buyer();

const productsFromServer = new Products()
const newBascet = new Basket();
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





import {IProduct} from './types/index.ts';

import {Popup} from './components/Popup.ts';
import { EventEmitter } from './components/base/Events.ts';
const events = new EventEmitter();
const modal = new Popup(ensureElement<HTMLElement>('#modal-container'), events);
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');


events.on('preview:change', (items: IProduct) => {
  // console.log(items)
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


  
	// page.locked = true;
});
