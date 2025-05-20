import { itemData, customerData, orderDetails } from "../DB/db";
import { home } from "../Controller/homeController";

$('#orderSearchBtn').on('click', function () {
    console.log('Search button clicked');

    const searchValue = $('#orderSearchInput').val().trim().toLowerCase();

    if (!searchValue) {
        Swal.fire("Please enter a search value!", "", "error");
        return;
    }

    // Clear previous highlights
    $('#orderDetailsBody tr').css('background-color', '');

    // Find customer by NIC or name (case insensitive)
    const customer = customerData.find(cust =>
        cust.nic.toLowerCase().includes(searchValue) ||
        cust.name.toLowerCase().includes(searchValue)
    );

    if (!customer) {
        Swal.fire("Customer not found by NIC or name!", "", "warning");
        return;
    }

    const custId = customer.id; // confirm this property name

    // Find order by customer ID or order ID
    const orderIndex = orderDetails.findIndex(order =>
        order.customerID === custId ||
        order.orderID.toLowerCase().includes(searchValue)
    );

    if (orderIndex === -1) {
        Swal.fire("No matching order found!", "", "info");
        return;
    }

    // Highlight and scroll to that row
    const tableRow = $('#orderDetailsBody tr').eq(orderIndex);
    if (tableRow.length > 0) {
        tableRow.css('background-color', '#ffecb3'); // highlight
        $('html, body').animate({
            scrollTop: tableRow.offset().top - 100
        }, 600);
        Swal.fire("Order found and highlighted!", "", "success");
    } else {
        Swal.fire("Order row not found in the table!", "", "error");
    }
});

home();
