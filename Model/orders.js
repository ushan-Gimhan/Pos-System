export class OrderModel {
    constructor() {
        this.items = [
            { id: 'I001', name: 'Pen', qty: 100, price: 50 },
            { id: 'I002', name: 'Pencil', qty: 200, price: 30 },
        ];
    }


    getAllItems() {
        return this.items;
    }

    findItemById(id) {
        return this.items.find(i => i.id === id);
    }
}