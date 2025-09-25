import {IApi, IProduct, IBuyer, IOrderResponse} from '../../types/index';

type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

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


