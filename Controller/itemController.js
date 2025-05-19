import {itemData} from "../DB/db.js";
import { Item } from "../Model/item.js";
import { setItemIds } from "../Controller/ordersController.js";

        $('#saveItemBtn').on('click', function(){
            let id;
            if (itemData.length > 0) {
                const lastId = itemData[itemData.length - 1].item_id;
                const numericId = parseInt(lastId.slice(1)) + 1;
                id = 'I' + numericId.toString().padStart(3, '0');
            } else {
                id = 'I001';
            }
            id = $('#item_id').val();
            const name = $('#item_name').val();
            const qty = $('#item_qty').val();
            const unitPrice = $('#item_price').val();

            if (!name || !qty || !unitPrice) {
                alert("Please fill out all fields.");
                return;
            }

            console.log(id);
            const item = new Item(id, name, unitPrice,qty);
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

            const index = itemData.findIndex(item => item.item_id === itemID);
            itemData[index].item_qty = qty;
            itemData[index].item_price = unitPrice;
            itemData[index].itemID = itemID;
            itemData[index].item_name = name;

            Swal.fire({
                title: "Update Successfully!",
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

         $('#searchItemBtn').on('click', function(){
             let item_id = $('#searchItem').val().trim();

             const index = itemData.findIndex( item=> item.item_id ===item_id);

             $('#ItemTableBody').empty();

             if (index !== -1) {
                 alert("Item found!");
                 $('#searchItem').val("");

                 let foundItem = itemData[index];
                 foundItem = `<tr>
                    <td>${item_id}</td>
                    <td>${foundItem.item_name}</td>
                    <td>${foundItem.item_qty}</td>
                    <td>${foundItem.item_price}</td>
                </tr>`;
                 $('#ItemTableBody').append(foundItem);
             } else {
                 alert("Item not found!");
             }
             loadItems();

         });
