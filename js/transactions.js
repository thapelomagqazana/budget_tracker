
let selectedIndexToDelete;
let transactionsList;

// Function to get transactions from localStorage
function getTransactionsFromLocalStorage() {
    const storedTransactions = localStorage.getItem('transactions');
    return storedTransactions ? JSON.parse(storedTransactions) : [];
}

// Function to save transactions to localStorage
function saveTransactionsToLocalStorage(transactions) {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


// Function to calculate total income
function calculateTotalIncome()
{
    const transactions = getTransactionsFromLocalStorage();
    return transactions.filter(transaction => transaction.type === "income").reduce((total, transaction) => total + transaction.amount, 0);
}


// Function to calculate total expenses
function calculateTotalExpenses()
{
    const transactions = getTransactionsFromLocalStorage();
    return transactions.filter(transaction => transaction.type === "expense").reduce((total, transaction) => total + transaction.amount, 0);

}

// Function to calculate the overall budget
function calculateOverallBudget()
{
    const totalIncome = calculateTotalIncome();
    const totalExpenses = calculateTotalExpenses();
    return totalIncome - totalExpenses;
}

// Function to add a transaction
function addTransaction(name, amount, type) {

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
        const totalIncomeElement = document.getElementById("totalIncome");
        const totalExpensesElement = document.getElementById("totalExpenses");
        const overallBudgetElement = document.getElementById("overallBudget");

        const clearTransactionsBtn = document.getElementById('clearTransactionsBtn');

        if (!transactionListContainer || !totalIncomeElement || !totalExpensesElement || !clearTransactionsBtn) {
            console.error("Error: Required elements not found.");
            return;
        }


        // Show or hide the clear button based on the presence of transactions
        clearTransactionsBtn.style.display = transactions.length > 0 ? 'block' : 'none';

        transactionListContainer.innerHTML = '';

        sortedTransactions.forEach((transaction, index) => {
            const listItem = document.createElement('div');
            listItem.id = 'transaction-item';
            listItem.innerHTML = `
                <span>${transaction.name}</span>
                <span>${transaction.amount}</span>
                <span>${transaction.type}</span>
                <button class="button-hover" onclick="deleteTransaction(${index})">Delete</button>
            `;
            transactionListContainer.appendChild(listItem);
        });

        // Update statistics
        totalIncomeElement.textContent = calculateTotalIncome();
        totalExpensesElement.textContent = calculateTotalExpenses();
        overallBudgetElement.textContent = calculateOverallBudget();
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

    selectedIndexToDelete = index;
    transactionsList = transactions;

    // Show the delete modal
    const deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display = 'flex';


}

// Function to confirm the deletion after modal confirmation
function confirmDeleteTransaction() {
    deleteTransaction(selectedIndexToDelete);
    hideDeleteModal();

    // Remove transaction
    transactionsList.splice(selectedIndexToDelete, 1);
    saveTransactionsToLocalStorage(transactionsList);
    updateTransactionList();
}

// Function to cancel the deletion after modal cancellation
function cancelDeleteTransaction() {
    hideDeleteModal();
}

// Function to hide the delete modal
function hideDeleteModal() {
    const deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display = 'none';
}


// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    const transactionNameInput = document.getElementById("transactionName");
    const transactionAmountInput = document.getElementById('transactionAmount');

    const transactionName = transactionNameInput.value;
    const transactionAmount = parseFloat(transactionAmountInput.value);
    const transactionType = document.getElementById('transactionType').value;

    if (!transactionName || isNaN(transactionAmount) || transactionAmount <= 0) {
        alert('Please enter valid transaction details.');
        // Add validation classes
        transactionNameInput.classList.add('invalid-input');
        transactionAmountInput.classList.add('invalid-input');
        return;
    }

    // Reset validation classes
    transactionNameInput.classList.remove('invalid-input');
    transactionAmountInput.classList.remove('invalid-input');

    addTransaction(transactionName, transactionAmount, transactionType);

    // Apply the animation class
    const addButton = document.getElementById('addTransactionBtn');
    addButton.classList.add('form-submit-animation');

    // Remove the animation class after a delay
    setTimeout(() => {
        addButton.classList.remove('form-submit-animation');
    }, 300);

    document.getElementById('transactionForm').reset();
}

// Attach event listener to clear transactions button
const clearTransactionsBtn = document.getElementById('clearTransactionsBtn');
if (clearTransactionsBtn) {
    clearTransactionsBtn.addEventListener('click', handleClearTransactions);
}

// Function to handle clearing all transactions
function handleClearTransactions() {
    // Display a confirmation dialog
    const confirmClear = confirm("Are you sure you want to clear all transactions?");
    if (!confirmClear) {
        return; // User canceled the clear operation
    }

    // Clear all transactions
    saveTransactionsToLocalStorage([]);
    updateTransactionList(); // Update the list after clearing transactions
}

// Function to handle clearing all transactions
function handleClearTransactions_(confirmFunction = confirm) {
    // Display a confirmation dialog
    const confirmClear = confirmFunction("Are you sure you want to clear all transactions?");
    if (!confirmClear) {
        return; // User canceled the clear operation
    }

    // Clear all transactions
    saveTransactionsToLocalStorage([]);
    updateTransactionList(); // Update the list after clearing transactions
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

// Attach event listener to buttons for click effect
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mousedown', () => {
        button.classList.add('button-clicked');
    });
    button.addEventListener('mouseup', () => {
        button.classList.remove('button-clicked');
    });
});

// Export for Node.js environment
module.exports = {
    addTransaction,
    deleteTransaction,
    updateTransactionList,
    calculateTotalIncome,
    calculateTotalExpenses,
    calculateOverallBudget,
    getTransactionsFromLocalStorage,
    saveTransactionsToLocalStorage,
    handleClearTransactions,
    handleClearTransactions_,
    confirmDeleteTransaction,
    cancelDeleteTransaction,
    hideDeleteModal,
};