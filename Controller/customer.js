import { Customer } from "../Model/Customer.js";
import { customerData } from "../DB/db.js";

export class CustomerController {
    constructor() {
        $(document).ready(() => {
            this.handleEvents();
        });
    }

    handleEvents() {
        $('#saveCustomerBtn').click(() => this.handleSaveCustomer());
        $('#updateCustomerBtn').click(() => this.handleUpdateCustomer());
        $('#resetCustomerBtn').click(() => this.clearForm());
        $('#deleteCustomerBtn').click(() => this.handleDeleteCustomer());
    }

    handleSaveCustomer() {
        let id;

        if (customerData.length > 0) {
            const lastId = customerData[customerData.length - 1].id;
            const numericId = parseInt(lastId.slice(1)) + 1;
            id = 'C' + numericId.toString().padStart(3, '0');
        } else {
            id = 'C001';
        }

        const name = $('#name').val();
        const nic = $('#nic').val();
        const email = $('#email').val();
        const mobile = $('#mobile').val();

        if (!name || !nic || !email || !mobile) {
            alert("Please fill out all fields.");
            return;
        }

        const customer = new Customer(id, name, nic, email, mobile);

        customerData.push(customer);

        alert("Customer saved successfully!");
        this.clearForm();
        this.loadCustomerTable();
        this.handleCustomerRowClick();
    }

    clearForm() {
        $('#customerForm')[0].reset();
        $('#saveCustomerBtn').prop('disabled', false);
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
        const id = $('#id').val();
        const customerName = $('#name').val();
        const customerNic = $('#nic').val();
        const customerEmail = $('#email').val();
        const customerPhone = $('#mobile').val();

        const index = customerData.findIndex(customer => customer.id === id);

        if (index === -1) {
            alert("Customer not found!");
            return;
        }

        customerData[index].customerName = customerName;
        customerData[index].customerNic = customerNic;
        customerData[index].customerEmail = customerEmail;
        customerData[index].customerPhone = customerPhone;

        alert("Customer updated successfully!");
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
        alert("Customer deleted successfully!");

        this.loadCustomerTable();
        this.clearForm();
    }
}


new CustomerController();
