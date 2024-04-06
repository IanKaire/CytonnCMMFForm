document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('investmentForm');
    const submitBtn = document.getElementById('submitBtn');
    const editBtn = document.getElementById('editBtn');

    // Event listener for form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveFormData();
    });

    // Event listener for edit button
    editBtn.addEventListener('click', () => {
        populateFormFromLocalStorage();
    });

    // Function to save form data to local storage
    function saveFormData() {
        const formData = {
            amount: document.getElementById('amount').value,
            interest: calculateInterest(),
            tax: calculateTax(),
            total: calculateTotal()
        };

        localStorage.setItem('formData', JSON.stringify(formData));
        clearForm();
    }

    // Function to populate form fields from local storage
    function populateFormFromLocalStorage() {
        const formData = JSON.parse(localStorage.getItem('formData'));
        if (formData) {
            document.getElementById('amount').value = formData.amount;
            document.getElementById('interest').value = formData.interest;
            document.getElementById('tax').value = formData.tax;
            document.getElementById('total').value = formData.total;
        }
    }

    // Function to calculate interest
    function calculateInterest() {
        const amount = parseFloat(document.getElementById('amount').value);
        const rate = 0.17;
        return (amount * rate).toFixed(2);
    }

    // Function to calculate tax
    function calculateTax() {
        const interest = parseFloat(document.getElementById('interest').value);
        const taxableRate = 0.05;
        return (interest * taxableRate).toFixed(2);
    }

    // Function to calculate total
    function calculateTotal() {
        const amount = parseFloat(document.getElementById('amount').value);
        const interest = parseFloat(document.getElementById('interest').value);
        const tax = parseFloat(document.getElementById('tax').value);
        return (amount + interest - tax).toFixed(2);
    }

    // Function to clear form fields
    function clearForm() {
        document.getElementById('amount').value = '';
        document.getElementById('interest').value = '';
        document.getElementById('tax').value = '';
        document.getElementById('total').value = '';
    }
});
