export class Orders{
    set order_id(value) {
        this._order_id = value;
    }

    set customer_id(value) {
        this._customer_id = value;
    }

    set order_date(value) {
        this._order_date = value;
    }
    get order_id() {
        return this._order_id;
    }

    get customer_id() {
        return this._customer_id;
    }

    get order_date() {
        return this._order_date;
    }
    constructor(order_id,customer_id,order_date){
        this._order_id = order_id;
        this._customer_id = customer_id;
        this._order_date = order_date;
    }
}