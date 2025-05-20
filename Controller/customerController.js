import { Customer } from "../Model/Customer.js";
import {customerData, orderData} from "../DB/db.js";
import {setCustomerIds} from "../Controller/ordersController.js";


export class CustomerController {
    constructor() {
        $(document).ready(() => {
            this.handleEvents();
            this.generateCusyomerId();
        });
    }

    handleEvents() {
        $('#saveCustomerBtn').click(() => this.handleSaveCustomer());
        $('#updateCustomerBtn').click(() => this.handleUpdateCustomer());
        $('#resetCustomerBtn').click(() => this.clearForm());
        $('#deleteCustomerBtn').click(() => this.handleDeleteCustomer());
        $('#customerTableBody').click(() => this.handleCustomerRowClick());
    }

    handleSaveCustomer() {
        const  id = $('#id').val().trim();
        const name = $('#name').val().trim();
        const nic = $('#nic').val().trim();
        const email = $('#email').val().trim();
        const mobile = $('#mobile').val().trim();

        const nicPattern = /^(\d{9}[vVxX]|\d{12})$/; // old/new NIC formats
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobilePattern = /^07\d{8}$/; // e.g., 0771234567

        if (!name || !nic || !email || !mobile) {
            alert("Please fill out all fields.");
            return;
        }

        if (!nicPattern.test(nic)) {
            alert("Invalid NIC. Use 9 digits + V/X or 12 digits.");
            return;
        }

        if (!emailPattern.test(email)) {
            alert("Invalid email format.");
            return;
        }

        if (!mobilePattern.test(mobile)) {
            alert("Invalid mobile number. Should start with 07 and contain 10 digits.");
            return;
        }

        const customer = new Customer(id, name, nic, email, mobile);

        customerData.push(customer);
        setCustomerIds();
        this.clearForm();
        this.loadCustomerTable();
        Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true
        });
    }

    clearForm() {
        $('#customerForm')[0].reset();
        $('#saveCustomerBtn').prop('disabled', false);
        this.generateCusyomerId();
    }
    loadCustomerTable() {
        const tbody = $('#customerTableBody');
        tbody.empty();

        if (customerData.length === 0) {
            tbody.append(`<tr><td colspan="5" class="text-center">No customers found.</td></tr>`);
            return;
        }

        customerData.forEach((customer) => {
            const row = `
            <tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.nic}</td>
                <td>${customer.email}</td>
                <td>${customer.mobile}</td>
            </tr>
        `;
            tbody.append(row);
        });

    }
    handleCustomerRowClick() {
        $('#saveCustomerBtn').prop('disabled', true);
        $('#customerTableBody').on('click', 'tr', function () {
            const columns = $(this).find('td');

            $('#id').val(columns.eq(0).text());
            $('#name').val(columns.eq(1).text());
            $('#nic').val(columns.eq(2).text());
            $('#email').val(columns.eq(3).text());
            $('#mobile').val(columns.eq(4).text());

            $('#customerTableBody tr').removeClass('table-active');
            $(this).addClass('table-active');
        });
    }

    handleUpdateCustomer() {
        const id = $('#id').val().trim();
        const customerName = $('#name').val().trim();
        const customerNic = $('#nic').val().trim();
        const customerEmail = $('#email').val().trim();
        const customerPhone = $('#mobile').val().trim();

        const nicPattern = /^(\d{9}[vVxX]|\d{12})$/; // Old or new NIC format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobilePattern = /^07\d{8}$/; // Sri Lankan format: starts with 07 and has 10 digits

        if (!id || !customerName || !customerNic || !customerEmail || !customerPhone) {
            alert("Please fill out all fields.");
            return;
        }

        if (!nicPattern.test(customerNic)) {
            alert("Invalid NIC. Use 9 digits + V/X or 12 digits.");
            return;
        }

        if (!emailPattern.test(customerEmail)) {
            alert("Invalid email format.");
            return;
        }

        if (!mobilePattern.test(customerPhone)) {
            alert("Invalid mobile number. Should start with 07 and contain 10 digits.");
            return;
        }

        const index = customerData.findIndex(customer => customer.id === id);

        if (index === -1) {
            Swal.fire({
                title: "Customer Not Found!",
                icon: "error",
                draggable: true
            });
            return;
        }

        customerData[index].customerName = customerName;
        customerData[index].customerNic = customerNic;
        customerData[index].customerEmail = customerEmail;
        customerData[index].customerPhone = customerPhone;

        Swal.fire({
            title: "Updated Successfully!",
            icon: "success",
            draggable: true
        });

        this.loadCustomerTable();
        this.clearForm();
    }

    handleDeleteCustomer() {
        const id = $('#id').val();

        const index = customerData.findIndex(customer => customer.id === id);

        if (index === -1) {
            alert("Customer not found!");
            return;
        }

        if (!confirm("Are you sure you want to delete this customer?")) return;

        customerData.splice(index, 1);
        Swal.fire({
            title: "Delete Successfully!",
            icon: "success",
            draggable: true
        });

        this.loadCustomerTable();
        this.clearForm();
    }
    generateCusyomerId() {
        let id;
        if (customerData.length > 0) {
            const lastId = customerData[customerData.length - 1].id;
            const numericId = parseInt(lastId.slice(1)) + 1;
            id = 'C' + numericId.toString().padStart(3, '0');
        } else {
            id = 'C001';
        }
        document.getElementById('id').value = id;
    }
}

new CustomerController();
