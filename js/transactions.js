
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

// Function to update the transaction list in the UI
function updateTransactionList() {
    const transactions = getTransactionsFromLocalStorage();
    
    const incomeListContainer = document.getElementById("incomeList");
    const expenseListContainer = document.getElementById("expenseList");

    if (!incomeListContainer || !expenseListContainer) {
        console.error("Error: Transaction list container not found.");
        return;
    }

    incomeListContainer.innerHTML = '';
    expenseListContainer.innerHTML = '';

    transactions.forEach((transaction, index) => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `
            <span>${transaction.name}</span>
            <span>${transaction.amount}</span>
            <span>${transaction.type}</span>
            <button onclick="deleteTransaction(${index})">Delete</button>
        `;
        
        // Categorize transactions into income and expense lists
        if (transaction.type === "income")
        {
            incomeListContainer.appendChild(listItem);
        }
        else if (transaction.type === 'expense')
        {
            expenseListContainer.appendChild(listItem);
        }
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