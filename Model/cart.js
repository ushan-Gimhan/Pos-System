export class Cart{
    constructor(itemId,itemName,qtyOnHand,unitPrice,qtyInOrder,totalInvoice){
        this.itemId = itemId;
        this.itemName = itemName;
        this.qtyOnHand = qtyOnHand;
        this.unitPrice = unitPrice;
        this.qtyInOrder = qtyInOrder;
        this.totalInvoice=totalInvoice;
    }
}
