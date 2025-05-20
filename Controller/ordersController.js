import { OrderModel } from '../Model/orders.js';
import { OrderDeatails } from '../Model/orderDeatails.js';
import { Cart } from '../Model/cart.js';
import {customerData, itemData, orderData, orderDeatails,CartData} from "../DB/db.js";

window.addEventListener('DOMContentLoaded', () => {
    const customerSelect = document.getElementById('customerID');
    const itemSelect = document.getElementById('itemOrderID');
    setDate();
    generateOrderId();

    document.getElementById('qtyInOrder').addEventListener('input', () => {
        const qtyInOrder = parseInt(document.getElementById('qtyInOrder').value);
        const unitPrice = parseFloat(document.getElementById('unitPrice').value);
        const totalField = document.getElementById('totalInvoice');

        if (!isNaN(qtyInOrder) && !isNaN(unitPrice) && qtyInOrder >= 0 && unitPrice >= 0) {
            totalField.value = (qtyInOrder * unitPrice).toFixed(2);
        } else {
            totalField.value = '';
        }
    });

    document.getElementById('resetOrderBtn').addEventListener('click', () => {
        document.getElementById('Orders').querySelectorAll('input').forEach(input => input.value = '');
        customerSelect.selectedIndex = 0;
        itemSelect.selectedIndex = 0;
    });

    document.getElementById('addToCartBtn').addEventListener('click', function () {
        const itemId = document.getElementById('inputItemId').value;
        const itemName = document.getElementById('itemNameInOrder').value;
        const qtyOnHand = parseInt(document.getElementById('qtyOnHand').value);
        const unitPrice = parseFloat(document.getElementById('unitPrice').value);
        const qtyInOrder = parseInt(document.getElementById('qtyInOrder').value);

        if (!itemId || !itemName || isNaN(qtyInOrder) || qtyInOrder <= 0) {
            alert("Please fill in valid item and quantity details.");
            return;
        }

        if (qtyInOrder > qtyOnHand) {
            alert("Quantity exceeds available stock.");
            return;
        }

        const total = qtyInOrder * unitPrice;
        const availableQty = qtyOnHand - qtyInOrder;

        const cart = new Cart(itemId,itemName,qtyOnHand,unitPrice,qtyInOrder,total);

        CartData.push(cart);

        const indexI = itemData.findIndex(item => item.item_id === itemId);
        itemData[indexI].item_qty = availableQty;
        clearItems();

        const cartTableBody = document.getElementById('cartItems');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${itemId}</td>
        <td>${itemName}</td>
        <td>${qtyInOrder}</td>
        <td>${unitPrice.toFixed(2)}</td>
        <td>${total.toFixed(2)}</td>
        <td><button class="btn btn-danger btn-sm remove-cart-item" id="remove">Remove</button></td>
    `;
        cartTableBody.appendChild(row);
    });

    document.getElementById('cartItems').addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-cart-item')) {
            event.target.closest('tr').remove();
        }
    });
});
export function setCustomerIds(){
    const customerIds = customerData.map(customer => customer.id);
    const dropdown = document.getElementById("dropdownList");
    const input = document.getElementById("inputCustomerId");

    dropdown.innerHTML = "";

    customerIds.forEach(id => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.className = "dropdown-item";
        a.textContent = id;

        a.addEventListener("click", function (e) {
            e.preventDefault();
            input.value = this.textContent;
            $('#customerName').val(getCustomerByUd(this.textContent).name);
        });

        li.appendChild(a);
        dropdown.appendChild(li);
    });}
    function getCustomerByUd(id) {
        return customerData.find(item => item.id === id);
    }

    export function setItemIds(){
        const ItemIds = itemData.map(item => item.item_id);
        const dropdownItem = document.getElementById("dropdownItemList");
        const input = document.getElementById("inputItemId");

        dropdownItem.innerHTML = "";

        ItemIds.forEach(id => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.className = "dropdown-item";
            a.textContent = id;

            a.addEventListener("click", function (e) {
                e.preventDefault();
                input.value = this.textContent;
                $('#itemNameInOrder').val(getIetmByUd(this.textContent).item_name);
                $('#qtyOnHand').val(getIetmByUd(this.textContent).item_qty);
                $('#unitPrice').val(getIetmByUd(this.textContent).item_price);
            });

            li.appendChild(a);
            dropdownItem.appendChild(li);
    });}
    function getIetmByUd(id) {
        return itemData.find(item => item.item_id === id);
    }

$('#placeOrderBtn').on('click', function () {
    const orderId = $('#orderInID').val().trim();
    const date = $('#orderInDate').val().trim();
    const custID = $('#inputCustomerId').val().trim();
    const name = $('#customerName').val().trim();

    if (!orderId || !date || !custID || !name) {
        alert("Please fill in all order and customer details.");
        return;
    }

    if (CartData.length === 0) {
        alert("Cart is empty. Please add items to the cart.");
        return;
    }

    console.log(CartData);

    let odata = new OrderModel(orderId, date);
    orderData.push(odata);

    let grandTotal = getTotalBalance();
    document.getElementById('total').value = grandTotal;

    let order = new OrderDeatails(orderId, date, custID, name, grandTotal);
    orderDeatails.push(order);

    $('#totalAmount').text("Rs. " + grandTotal.toFixed(2));

    $('#cartItems').empty();
    generateOrderId();
    clearCustomer();
    CartData.length = 0;
    $('#orderId').val(orderId);
    $('#orderDate').val(date);
    $('#custId').val(custID);
    $('#custName').val(name);
});


function getTotalBalance(){
        let grandTotal = 0;

        for (let item of CartData) {
            grandTotal += item.totalInvoice;
        }

        return grandTotal;
    }

$("#cartItems").on('click', 'tr', function() {
    let CId = $(this).index();
    let obj = CartData[CId];

    let selectedItemId = obj.itemId;
    $('#remove').on('click', function () {
        const cartIndex = CartData.findIndex(item => item.itemId === selectedItemId);

        if (cartIndex !== -1) {
            const removedItem = CartData[cartIndex];
            const removedQty = removedItem.qtyInOrder;

            const itemIndex = itemData.findIndex(item => item.item_id === selectedItemId);

            if (itemIndex !== -1) {
                itemData[itemIndex].item_qty += removedQty;
            }

            CartData.splice(cartIndex, 1);

            $(`#orderTableBody tr`).filter(function () {
                return $(this).find('td:eq(2)').text() === selectedItemId;
            }).remove();

            $('#item_qty').val(itemData[itemIndex].item_qty);
        }
    });
});
function addOrderToTable() {
    $('#orderDetailsBody').empty();

    orderDeatails.forEach(order => {
        const row = `
            <tr>
                <td>${order.O_id}</td>
                <td>${order.O_Date}</td>
                <td>${order.Cust_id}</td>
                <td>${order.Cust_name}</td>
                <td>Rs. ${order.Total.toFixed(2)}</td>
            </tr>
        `;
        $('#orderDetailsBody').append(row);
    });
}
function clearItems(){
    document.getElementById('inputItemId').value = '';
    document.getElementById('itemNameInOrder').value = '';
    document.getElementById('qtyOnHand').value = '';
    document.getElementById('unitPrice').value = '';
    document.getElementById('qtyInOrder').value = '';
    document.getElementById('totalInvoice').value = '';
}
function generateOrderId() {
    let id;
    if (orderData.length > 0) {
        const lastId = orderData[orderData.length - 1].O_Id;
        const numericId = parseInt(lastId.slice(1)) + 1;
        id = 'P' + numericId.toString().padStart(3, '0');
    } else {
        id = 'P001';
    }
    document.getElementById('orderInID').value = id;
}
function setDate(){
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
        (today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    document.getElementById('orderInDate').value = formattedDate;
}
function clearCustomer(){
    document.getElementById('inputCustomerId').value = '';
    document.getElementById('customerName').value = '';
}
function resetForm(){
    $('#resetOrderBtn').on('click', function(){
        generateOrderId();
        setDate();
        clearItems();
        clearCustomer();
    })
}
$('#pay').on('click', function () {
    const paymentMethod = $('#paymentMethod').val();

    if (!paymentMethod) {
        Swal.fire({
            title: "Please select a payment method!",
            icon: "warning"
        });
        return;
    }

    Swal.fire({
        title: "Payment Successfully!",
        icon: "success",
        draggable: true
    });

    addOrderToTable();
    resetForm();
    clearInvoid();
});

$('#applyDiscountBtn').on('click', function () {
    const total = parseFloat($('#total').val()) || 0;
    const discountInput = parseFloat($('#dis').val().replace(/[^\d.]/g, '')) || 0;

    let finalAmount;

    if (discountInput === '' || isNaN(discountInput)) {
        finalAmount = total;
    } else {
        const discount = parseFloat(discountInput);
        if (discount < 0 || discount > 100) {
            Swal.fire({
                icon: "warning",
                title: "Invalid Discount",
                text: "Please enter a value between 0 and 100"
            });
            return;
        }
        finalAmount = total - (total * (discount / 100));
    }

    $('#disAmount').val(finalAmount.toFixed(2));
});

function clearInvoid(){
    $('#orderId').val('');
    $('#orderDate').val('');
    $('#itemId').val('');
    $('#custId').val('');
    $('#custName').val('');
    $('#disAmount').val('');
    $('#dis').val('')
    $('#total').val('');
    $('#paymentMethod').val('');

}


