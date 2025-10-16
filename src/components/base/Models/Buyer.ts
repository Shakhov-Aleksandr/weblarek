import {IBuyer, TPayment} from '../../../types/index.ts';
import {Model} from '../Model.ts'
import {IModelData,IOrder, IUserDataForm, IUserContactsForm} from '../../../types/index.ts';

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export class Buyer extends Model<IModelData> {

    protected payment: TPayment = null;
    protected address: string = "";
    protected email: string = "";
    protected phone: string = "";

    formErrors: FormErrors = {};


    order: IUserDataForm & IUserContactsForm = {
		payment: '',
		address: '',
		email: '',
		phone: ''
	};

    

    setPayment(value: TPayment) {this.payment = value;};
    setAddress(value: string) {this.address = value;};
    setEmail(value: string) {this.email = value;};
    setPhone(value: string) {this.phone = value;};

    getAddress():string {return this.address};
    getPhone():string {return this.phone};
    getEmail():string {return this.email};
    getPayment():TPayment {return this.payment};


    

    getOrderData(): IBuyer {
        return {
            payment: this.payment,
            address: this.address,
            email: this.email,
            phone: this.phone
        }
    }

    clear() {
        this.payment = null;
        this.address = "";
        this.email = "";
        this.phone = ""
    }


    validation(): IBuyer {
        let error: { [key: string]: string } = {};

        this.events.emit('UserDataFormErrors:change', this.formErrors);

        if (!this.payment) {
            error.payment = "Необходимо выбрать способ оплаты";
        } 
        
        if (!this.address) {
            error.address = "Необходимо указать адрес";
        } 

        if (!this.email) {
            error.email = "Необходимо указать адрес электронной почты";
        }

        if (!this.phone) {
            error.phone = "Необходимо указать номер телефона";
        }  
        return error;
    }

    setUserDataField(field: keyof IUserDataForm, value: string) {
		this.order[field] = value;
		if (this.validateUserData()) {
			return;
		}
	}

	validateUserData(): boolean {
		const errors: typeof this.formErrors = {};
		if (!this.order.payment) {
			errors.payment = 'Необходимо выбрать способ оплаты';
		}
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес доставки';
		}
		this.formErrors = errors;
		this.events.emit('UserDataFormErrors:change', this.formErrors);
		return Object.keys(errors).length === 0; // Если длина массива равна нулю (ошибок нет),
		// то выражение будет истинным, функция вернёт true
	}




    setUserContactsField(field: keyof IUserContactsForm, value: string) {
		this.order[field] = value;
		if (this.validateUserContacts()) {
			return;
		}
	}

	validateUserContacts(): boolean {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.formErrors = errors;
		this.events.emit('UserContactsFormErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

    

}