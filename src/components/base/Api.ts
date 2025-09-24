// import {IApi} from '../../types/index';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export interface IItem {
    id: string;
    itemIndex: number;
    category: TItemCategory;
    description: string;
    image: string;
    price: TItemPrice;
    title: string;
}
export type TItemCategory = 'софт-скил' | 'хард-скил' | 'другое' | 'кнопка' | 'дополнительное';
export type TItemPrice = number | null;

export class Requests {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getGoods(): Promise<IProduct[]> {
        return  this.api.get<{items: IProduct[]}>('/product')
        .then((response) => response.items);
    }
   
    postOrder(order: IBuyer, items: IProduct[], cost: number): Promise<IOrderResponse> {
		const payload = {
    		...order,
            total: cost,
			items: items.map(item => item.id),
		};
  		return this.api.post<IOrderResponse>('/order', payload);
	}

}

export type TPayment = 'card' | 'cash' | null;


export interface IBuyer {
  payment?: TPayment;
  email?: string;
  phone?: string;
  address?: string;
}


export interface IOrderResponse {
  id: string;
  total: number
}



export class Api {
    readonly baseUrl: string;
    protected options: RequestInit;

    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl;
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers as object ?? {})
            }
        }
    }

    protected handleResponse<T>(response: Response): Promise<T> {
        if (response.ok) return response.json();
        else return response.json()
            .then(data => Promise.reject(data.error ?? response.statusText));
    }

    get<T extends object>(uri: string) {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method: 'GET'
        }).then(this.handleResponse<T>);
    }

    post<T extends object>(uri: string, data: object, method: ApiPostMethods = 'POST') {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method,
            body: JSON.stringify(data)
        }).then(this.handleResponse<T>);
    }
}


