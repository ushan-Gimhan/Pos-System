import {itemData} from "../DB/db.js";
import { Item } from "../Model/item.js";
import { setItemIds } from "../Controller/ordersController.js";

        genarateItemId();
        loadItems();
        $('#saveItemBtn').on('click', function(){
            const id = $('#item_id').val().trim();
            const name = $('#item_name').val().trim();
            const qty = $('#item_qty').val().trim();
            const unitPrice = $('#item_price').val().trim();

            const namePattern = /^[A-Za-z0-9\s\-()]+$/;  // Allows letters, numbers, spaces, hyphens, and parentheses
            const qtyPattern = /^\d+$/;                  // Only positive integers
            const pricePattern = /^\d+(\.\d{1,2})?$/;     // Valid decimal number with up to 2 decimal places

            if (!name || !qty || !unitPrice) {
                alert("Please fill out all fields.");
                return;
            }

            if (!namePattern.test(name)) {
                alert("Invalid item name. Only letters, numbers, spaces, hyphens, and () are allowed.");
                return;
            }

            if (!qtyPattern.test(qty)) {
                alert("Invalid quantity. Enter a whole number.");
                return;
            }

            if (!pricePattern.test(unitPrice)) {
                alert("Invalid unit price. Use a valid number (e.g., 10 or 10.99).");
                return;
            }

            console.log(id);
            const item = new Item(id, name, parseFloat(unitPrice), parseInt(qty));
            console.log(item);

            itemData.push(item);
            loadItems();
            setItemIds();

            Swal.fire({
                title: "Added Successfully!",
                icon: "success",
                draggable: true
            });

            clearForm();
        });

        $('#updateItemBtn').on('click', function(){
            const itemID = $('#item_id').val().trim();
            const name = $('#item_name').val().trim();
            const qty = $('#item_qty').val().trim();
            const unitPrice = $('#item_price').val().trim();

            const namePattern = /^[A-Za-z0-9\s\-()]+$/;    // Letters, numbers, spaces, hyphens, parentheses
            const qtyPattern = /^\d+$/;                    // Only positive integers
            const pricePattern = /^\d+(\.\d{1,2})?$/;      // Decimal numbers with up to 2 decimal places

            if (!name || !qty || !unitPrice) {
                alert("Please fill out all fields.");
                return;
            }

            if (!namePattern.test(name)) {
                alert("Invalid item name. Only letters, numbers, spaces, hyphens, and () are allowed.");
                return;
            }

            if (!qtyPattern.test(qty)) {
                alert("Invalid quantity. Enter a whole number.");
                return;
            }

            if (!pricePattern.test(unitPrice)) {
                alert("Invalid unit price. Use a valid number like 10 or 10.99.");
                return;
            }

            const index = itemData.findIndex(item => item.item_id === itemID);

            if (index === -1) {
                alert("Item not found!");
                return;
            }

            itemData[index].item_qty = parseInt(qty);
            itemData[index].item_price = parseFloat(unitPrice);
            itemData[index].item_id = itemID;  // Fixed from 'itemID' to 'item_id'
            itemData[index].item_name = name;

            Swal.fire({
                title: "Updated Successfully!",
                icon: "success",
                draggable: true
            });

            loadItems();
            clearForm();
        });

        $('#resetItemBtn').on('click', function(){
            clearForm();
            $('#saveItemBtn').prop('disabled', false);
        });

         export function loadItems() {
             $('#ItemTableBody').empty();
             itemData.map((item, index) => {
                 let itemID = item.item_id;
                 let iName = item.item_name;
                 let qty = item.item_qty;
                 let unitPrice = item.item_price;

                 console.log(itemID);

                 let data = `<tr>
                    <td>${itemID}</td>
                    <td>${iName}</td>
                    <td>${qty}</td>
                    <td>${unitPrice}</td>
                </tr>`;
                 console.log(data);
                 $('#ItemTableBody').append(data);
             });
         }
         function clearForm() {
             $('#item_id').val("");
             $('#item_name').val("");
             $('#item_qty').val("");
             $('#item_price').val("");
             genarateItemId();
         }


         $('#deleteItemBtn').on('click', function(){
             let id = $("#item_id").val().trim();
             const index = itemData.findIndex( item=> item.item_id ===id);

             if (index === -1) {
                 alert("Item not found!");
                 return;
             }

             if (!confirm("Are you sure you want to delete this Item?")) return;

             itemData.splice(index, 1);
             Swal.fire({
                 title: "Delete Successfully!",
                 icon: "success",
                 draggable: true
             });

             loadItems();
             clearForm();
         });

         $("#ItemTableBody").on('click', 'tr', function() {
             $('#saveItemBtn').prop('disabled', true);

             let idx = $(this).index();
             console.log(idx);
             let obj =itemData[idx];
             console.log(obj);

             let id = obj.item_id;
             let name = obj.item_name;
             let qty = obj.item_qty;
             let price = obj.item_price;

             $('#item_id').val(id);
             $('#item_name').val(name);
             $('#item_qty').val(qty);
             $('#item_price').val(price);

         });

$('#searchItemBtn').on('click', function () {
    let item_id = $('#searchItem').val().trim();

    // Remove previous highlights
    $('#ItemTableBody tr').removeClass('highlight');

    const index = itemData.findIndex(item => item.item_id === item_id);

    if (index !== -1) {
        alert("Item found!");
        $('#searchItem').val("");

        // Scroll to and highlight the matching row
        const $targetRow = $(`#item-${item_id}`);
        if ($targetRow.length) {
            $targetRow[0].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            $targetRow.addClass('highlight');

            // Remove highlight after a short delay
            setTimeout(() => {
                $targetRow.removeClass('highlight');
            }, 2000);
        }
    } else {
        alert("Item not found!");
    }
});

function genarateItemId(){
             let id;
             if (itemData.length > 0) {
                 const lastId = itemData[itemData.length - 1].item_id;
                 const numericId = parseInt(lastId.slice(1)) + 1;
                 id = 'I' + numericId.toString().padStart(3, '0');
             } else {
                 id = 'I001';
             }
             document.getElementById('item_id').value = id;
}
