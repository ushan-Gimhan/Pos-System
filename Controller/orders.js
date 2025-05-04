// import {customerData} from "../DB/db";
//
//
// $('#addToCartBtn').on('click', function(e) {
//     $(document).ready(function () {
//
//         // Load Customer IDs
//         customerData.forEach(customer => {
//             $('#customer_id').append(`<option value="${customer.id}">${customer.id}</option>`);
//         });
//
//         // Load Item IDs
//         itemData.forEach(item => {
//             $('#item_id').append(`<option value="${item.itemID}">${item.itemID}</option>`);
//         });
//
//         // On Customer ID change → fill customer name
//         $('#customer_id').on('change', function () {
//             const selectedId = $(this).val();
//             const customer = customerData.find(c => c.id === selectedId);
//
//             if (customer) {
//                 $('#customer_name').val(customer.name);
//             } else {
//                 $('#customer_name').val('');
//             }
//         });
//
//         // On Item ID change → fill item details
//         $('#item_id').on('change', function () {
//             const selectedId = $(this).val();
//             const item = itemData.find(i => i.itemID === selectedId);
//
//             if (item) {
//                 $('#item_name').val(item.name);
//                 $('#item_qty_on_hand').val(item.qty);
//                 $('#item_unit_price').val(item.price.toFixed(2));
//             } else {
//                 $('#item_name').val('');
//                 $('#item_qty_on_hand').val('');
//                 $('#item_unit_price').val('');
//             }
//         });
//
//     });
//
//
// })
//
// $(document).ready(function() {
//     const today = new Date();
//     const formattedDate = today.toISOString().split('T')[0];
//     $('#orderDate').val(formattedDate);
//
//     const orderID = 'ORD-' + Math.floor(Math.random() * 10000);
//     $('#orderID').val(orderID);
//
//     $('#qty').on('input', function() {
//         const qty = parseFloat($(this).val()) || 0;
//         const unitPrice = parseFloat($('#unitPrice').val()) || 0;
//         const total = qty * unitPrice;
//         $('#total').val(total.toFixed(2));
//     });
//
//     $('#addToCartBtn').click(function() {
//         const itemID = $('#itemID').val();
//         const itemName = $('#itemName').val();
//         const qty = $('#qty').val();
//         const unitPrice = $('#unitPrice').val();
//         const total = $('#total').val();
//
//         if (!itemID || !itemName || !qty || !unitPrice) {
//             alert('Please fill all the required fields');
//             return;
//         }
//
//         const actionBtns = `
//                     <button class="btn btn-sm btn-warning action-btn">Edit</button>
//                     <button class="btn btn-sm btn-danger action-btn">Delete</button>
//                 `;
//
//         const newRow = `
//                     <tr>
//                         <td>${itemID}</td>
//                         <td>${itemName}</td>
//                         <td>${qty}</td>
//                         <td>${unitPrice}</td>
//                         <td>${total}</td>
//                         <td>${actionBtns}</td>
//                     </tr>
//                 `;
//
//         $('#cartItems').append(newRow);
//
//         $('#itemID').val('');
//         $('#itemName').val('');
//         $('#qtyOnHand').val('');
//         $('#unitPrice').val('');
//         $('#qty').val('');
//         $('#total').val('');
//     });
//
//     $('#resetBtn').click(function() {
//         $('#itemID').val('');
//         $('#itemName').val('');
//         $('#qtyOnHand').val('');
//         $('#unitPrice').val('');
//         $('#qty').val('');
//         $('#total').val('');
//         $('#customerID').val('');
//         $('#customerName').val('');
//         $('#cartItems').empty();
//     });
//
//     $('#itemID').on('blur', function() {
//         const itemID = $(this).val();
//         if (itemID === 'I001') {
//             $('#itemName').val('Keyboard');
//             $('#qtyOnHand').val('50');
//             $('#unitPrice').val('1200.00');
//         } else if (itemID === 'I002') {
//             $('#itemName').val('Mouse');
//             $('#qtyOnHand').val('100');
//             $('#unitPrice').val('800.00');
//         }
//     });
//
//     $('#customerID').on('blur', function() {
//         const customerID = $(this).val();
//         if (customerID === 'C001') {
//             $('#customerName').val('John Doe');
//         } else if (customerID === 'C002') {
//             $('#customerName').val('Jane Smith');
//         }
//     });
//
//     $('#placeOrderBtn').click(function() {
//         if ($('#cartItems tr').length === 0) {
//             alert('Cart is empty. Please add items to cart first.');
//             return;
//         }
//
//         if (!$('#customerID').val() || !$('#customerName').val()) {
//             alert('Please select a customer.');
//             return;
//         }
//
//         alert('Order placed successfully!');
//         $('#resetBtn').click();
//     });
// });