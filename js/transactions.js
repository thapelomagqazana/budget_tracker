// transactions.js

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
    const transactions = getTransactionsFromLocalStorage();
    const transaction = { name, amount, type };
    transactions.push(transaction);
    saveTransactionsToLocalStorage(transactions);
    updateTransactionList();
}

// Function to update the transaction list in the UI
function updateTransactionList() {
    const transactions = getTransactionsFromLocalStorage();
    const transactionListContainer = document.getElementById('transactionList');

    if (!transactionListContainer) {
        console.error("Error: Transaction list container not found.");
        return;
    }

    transactionListContainer.innerHTML = '';

    transactions.forEach((transaction, index) => {
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

// Function to delete a transaction
function deleteTransaction(index) {
    const transactions = getTransactionsFromLocalStorage();
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

    if (!transactionName || isNaN(transactionAmount) || transactionAmount <= 0) {
        alert('Please enter valid transaction details.');
        return;
    }

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

// Export core functionality
module.exports = {
    addTransaction,
    deleteTransaction,
    updateTransactionList,
    getTransactionsFromLocalStorage,
    saveTransactionsToLocalStorage,
};

// Attach functions to the global window object in a browser environment
// if (typeof window !== 'undefined') {
//     window.addTransaction = addTransaction;
//     window.deleteTransaction = deleteTransaction;
//     window.updateTransactionList = updateTransactionList;
// }