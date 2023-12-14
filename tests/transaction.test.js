
const { addTransaction, deleteTransaction, getTransactionsFromLocalStorage, saveTransactionsToLocalStorage } = require('../js/transactions');

// Test adding a transaction
test('Add a transaction', () => {
    addTransaction('Salary', 2000, 'income');
    const transactions = getTransactionsFromLocalStorage();
    expect(transactions.length).toBe(1);
    expect(transactions[0]).toEqual({ name: 'Salary', amount: 2000, type: 'income' });
    saveTransactionsToLocalStorage([]);
});

// Test deleting a transaction
test('Delete a transaction', () => {

    addTransaction('Rent', 1000, 'expense');
    addTransaction('Groceries', 200, 'expense');
    deleteTransaction(1);

    const transactions = getTransactionsFromLocalStorage();
    expect(transactions.length).toBe(1);
    expect(transactions[0]).toEqual({ name: 'Rent', amount: 1000, type: 'expense' });
    saveTransactionsToLocalStorage([]);
});
