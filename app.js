document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('investmentForm');
    const submitBtn = document.getElementById('submitBtn');
    const editBtn = document.getElementById('editBtn');

    // Custom event for form submission
    form.addEventListener('investmentSubmitted', (e) => {
        saveFormData();
    });

    // Custom event for editing form data
    editBtn.addEventListener('formEdit', () => {
        populateFormFromLocalStorage();
    });

    // Event listener for form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Dispatch custom event when form is submitted
        form.dispatchEvent(new Event('investmentSubmitted'));
    });

    // Event listener for edit button
    editBtn.addEventListener('click', () => {
        // Dispatch custom event when edit button is clicked
        editBtn.dispatchEvent(new Event('formEdit'));
    });

    // Function to save form data to local storage
    function saveFormData() {
        const formData = {
            amount: document.getElementById('amount').value,
            rate: document.getElementById('rate').value,
            interest: calculateInterest(),
            taxableRate: document.getElementById('taxableRate').value,
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
            document.getElementById('rate').value = formData.rate;
            document.getElementById('interest').value = formData.interest;
            document.getElementById('taxableRate').value = formData.taxableRate;
            document.getElementById('tax').value = formData.tax;
            document.getElementById('total').value = formData.total;
        }
    }

    // Function to calculate interest
    function calculateInterest() {
        const amount = parseFloat(document.getElementById('amount').value);
        const rate = parseFloat(document.getElementById('rate').value);
        return (amount * rate).toFixed(2);
    }

    // Function to calculate tax
    function calculateTax() {
        const interest = calculateInterest();
        const taxableRate = parseFloat(document.getElementById('taxableRate').value)
        return (interest * taxableRate).toFixed(2);
    }

    // Function to calculate total
    function calculateTotal() {
        const amount = parseFloat(document.getElementById('amount').value);
        const interest = calculateInterest();
        const tax = calculateTax();
        const amountWithInterest = parseFloat(amount) + parseFloat(interest);
        return (amountWithInterest - tax).toFixed(2);
    }

    // Function to clear form fields
    function clearForm() {
        document.getElementById('amount').value = '';
        document.getElementById('rate').value = '';
        document.getElementById('interest').value = '';
        document.getElementById('taxableRate').value = '';
        document.getElementById('tax').value = '';
        document.getElementById('total').value = '';
    }
});
