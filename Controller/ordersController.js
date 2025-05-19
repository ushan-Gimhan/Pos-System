import { OrderModel } from '../Model/orders.js';
import { OrderDeatails } from '../Model/orderDeatails.js';
import {customerData, itemData , orderDeatails} from "../DB/db.js";

const model = new OrderModel();

window.addEventListener('DOMContentLoaded', () => {
    const customerSelect = document.getElementById('customerID');
    const itemSelect = document.getElementById('itemOrderID');

    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
        (today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    document.getElementById('orderDate').value = formattedDate;

    const orderId = generateOrderId(1); // Replace 1 with the next available number
    document.getElementById('orderID').value = orderId;


    document.getElementById('qtyInOrder').addEventListener('input', () => {
        const qty = parseInt(document.getElementById('qtyInOrder').value);
        const price = parseFloat(document.getElementById('unitPrice').value);
        if (!isNaN(qty) && !isNaN(price)) {
            document.getElementById('total').value = qty * price;
        } else {
            document.getElementById('total').value = '';
        }
    });

    document.getElementById('resetOrderBtn').addEventListener('click', () => {
        document.getElementById('Orders').querySelectorAll('input').forEach(input => input.value = '');
        customerSelect.selectedIndex = 0;
        itemSelect.selectedIndex = 0;
    });

    function generateOrderId(num) {
        return `O${num.toString().padStart(3, '0')}`;
    }

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

        const indexI = itemData.findIndex(item => item.item_id === itemId);
        itemData[indexI].item_qty = availableQty;
        itemData[indexI].item_price = unitPrice;
        itemData[indexI].item_name = itemName;

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

        document.getElementById('itemOrderID').value = '';
        document.getElementById('itemNameInOrder').value = '';
        document.getElementById('qtyOnHand').value = '';
        document.getElementById('unitPrice').value = '';
        document.getElementById('qtyInOrder').value = '';
        document.getElementById('total').value = '';
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

