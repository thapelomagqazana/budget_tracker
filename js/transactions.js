// Array to store transactions
let transactions = [];

// Function to add a transaction
function addTransaction(name, amount, type)
{
    const transaction = { name, amount, type };
    transactions.push(transaction)
    updateTransactionList();
}

// Function to update the transaction list in the UI
function updateTransactionList()
{
    const transactionListContainer = document.getElementById('transactionList');

    // Check if the container exists
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
function deleteTransaction(index)
{
    transactions.splice(index, 1);
    updateTransactionList();
}

// Ensure DOM is fully loaded before updating the transaction list
document.addEventListener('DOMContentLoaded', function () {
    updateTransactionList();
});

// Function to handle form submission
function handleFormSubmit(event)
{
    event.preventDefault();

    const transactionName = document.getElementById("transactionName").value;
    const transactionAmount = parseFloat(document.getElementById('transactionAmount').value);
    const transactionType = document.getElementById('transactionType').value;

    // Validate input
    if (!transactionName || isNaN(transactionAmount) || transactionAmount <= 0)
    {
        alert('Please enter valid transaction details.');
        return;
    }
    
    // Add the transaction
    addTransaction(transactionName, transactionAmount, transactionType);

    // Clear the form
    document.getElementById('transactionForm').reset();
}

// Check if the form element exists before attaching the event listener
const transactionForm = document.getElementById('transactionForm');
if (transactionForm) 
{
    transactionForm.addEventListener('submit', handleFormSubmit);
}

module.exports = {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransactionList,
};