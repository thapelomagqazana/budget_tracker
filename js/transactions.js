
// Function to get transactions from localStorage
function getTransactionsFromLocalStorage() {
    const storedTransactions = localStorage.getItem('transactions');
    return storedTransactions ? JSON.parse(storedTransactions) : [];
}

// Function to save transactions to localStorage
function saveTransactionsToLocalStorage(transactions) {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Function to add a transaction
function addTransaction(name, amount, type) {
    if (!name || isNaN(amount) || amount <= 0) {
        alert('Please enter valid transaction details.');
        return;
    }
    // console.log(name, amount, type); // Log the values
    const transactions = getTransactionsFromLocalStorage();
    const transaction = { name, amount, type };
    transactions.push(transaction);
    saveTransactionsToLocalStorage(transactions);
    updateTransactionList();
}

// Function to update income and expense lists in the UI with sorting and filtering options
function updateTransactionList() {
    const transactions = getTransactionsFromLocalStorage();
    const sortOption = document.getElementById('sortOption');
    const filterOption = document.getElementById('filterOption');

    if (sortOption && filterOption)
    {
            // Apply sorting and filtering based on user choices
        const filteredTransactions = transactions.filter(transaction => {
            if (filterOption.value === 'all') {
                return true; // Show all transactions
            } else {
                return transaction.type === filterOption.value;
            }
        });

        const sortedTransactions = sortTransactions(filteredTransactions, sortOption.value);

        const transactionListContainer = document.getElementById('transactionList');

        if (!transactionListContainer) {
            console.error("Error: Transaction list container not found.");
            return;
        }

        transactionListContainer.innerHTML = '';

        sortedTransactions.forEach((transaction, index) => {
            const listItem = document.createElement('div');
            listItem.innerHTML = `
                <span>${transaction.name}</span>
                <span>${transaction.amount}</span>
                <span>${transaction.type}</span>
                <button onclick="deleteTransaction(${index})">Delete</button>
            `;
            transactionListContainer.appendChild(listItem);
        });
    }


}

// Function to sort transactions based on the selected option
function sortTransactions(transactions, sortOption) {
    if (sortOption === 'amount') {
        return transactions.slice().sort((a, b) => a.amount - b.amount);
    } else {
        return transactions; // Default order or other sorting options
    }
}
// Function to delete a transaction by index
function deleteTransaction(index) {
    const transactions = getTransactionsFromLocalStorage();

    if (index < 0 || index >= transactions.length)
    {
        console.error("Error: Invalid index for deletion.");
        return;
    }

    // Display a confirmation dialog
    const confirmDelete = confirm("Are you sure you want to delete this transaction?");
    if (!confirmDelete)
    {
        return; // User canceled the delete operation
    }

    transactions.splice(index, 1);
    saveTransactionsToLocalStorage(transactions);
    updateTransactionList();
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    const transactionName = document.getElementById("transactionName").value;
    const transactionAmount = parseFloat(document.getElementById('transactionAmount').value);
    const transactionType = document.getElementById('transactionType').value;

    addTransaction(transactionName, transactionAmount, transactionType);
    document.getElementById('transactionForm').reset();
}

// Ensure DOM is fully loaded before updating the transaction list
document.addEventListener('DOMContentLoaded', function () {
    updateTransactionList();
});

// Attach event listener to form submission
const transactionForm = document.getElementById('transactionForm');
if (transactionForm) {
    transactionForm.addEventListener('submit', handleFormSubmit);
}

// Export for Node.js environment
module.exports = {
    addTransaction,
    deleteTransaction,
    updateTransactionList,
    getTransactionsFromLocalStorage,
    saveTransactionsToLocalStorage,
};