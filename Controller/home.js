import { customerData, orderDeatails } from "../DB/db.js";

$('#orderSearchBtn').on('click', function () {
    let searchCustomer = $('#orderSearchInput').val().trim().toLowerCase();

    $('#orderDetailsBody tr').removeClass('highlight');

    if (!searchCustomer) {
        alert("Please enter a Customer NIC or ID.");
        return;
    }

    const customer = customerData.find(cust =>
        cust.nic.toLowerCase() === searchCustomer ||
        cust.id.toLowerCase() === searchCustomer
    );

    if (!customer) {
        alert("Customer not found!");
        return;
    }

    const custId = customer.id;
    let found = false;

    $('#orderDetailsBody tr').each(function () {
        const tableCustId = $(this).find('td:nth-child(3)').text().trim();

        if (tableCustId === custId) {
            alert('Customer Found!');
            $(this).addClass('highlight');
            $('html, body').animate({
                scrollTop: $(this).offset().top - 100
            }, 400);
            found = true;
            return false;
        }
    });

    if (!found) {
        alert("Order not found for this customer!");
    }
});
