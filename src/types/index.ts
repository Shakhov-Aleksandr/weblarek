export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type TPayment = 'card' | 'cash' | null;

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}


export interface IModelData {
	catalog: IProduct[];
	shoppingCart: string[];
	preview: string | null;
}

// Интерфейс, описывающий объект заказа, передаваемый на сервер
export interface IOrder {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

export interface IUserDataForm {
	payment: string;
	address: string;
}

export interface IUserContactsForm {
	email: string;
	phone: string;
}


export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  inCart?: boolean;
  cartItemIndex: number
}

export interface IBascet {
  id: string;
  title: string;
  price: number | null;
}

export interface IBuyer {
  payment?: TPayment;
  email?: string;
  phone?: string;
  address?: string;
}

export interface IOrderResponse {
  id: string;
  total: number;
  countNubmer: number;
}

