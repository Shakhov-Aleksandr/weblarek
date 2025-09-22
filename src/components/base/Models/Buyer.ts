import {IBuyer, TPayment} from '../../../types/index.ts';


export class Buyer {

    protected payment: TPayment = null;
    protected address: string = "";
    protected email: string = "";
    protected phone: string = "";

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
}