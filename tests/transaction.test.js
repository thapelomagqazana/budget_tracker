
let { transactions, addTransaction, deleteTransaction } = require('../js/transactions');

// Test adding a transaction
test('Add a transaction', () => {
    addTransaction('Salary', 2000, 'income');
    expect(transactions.length).toBe(1);
    expect(transactions[0]).toEqual({ name: 'Salary', amount: 2000, type: 'income' });
});

// Test deleting a transaction
// test('Delete a transaction', () => {
//     transactions = [
//         { name: 'Rent', amount: 1000, type: 'expense' },
//         { name: 'Groceries', amount: 200, type: 'expense' },
//     ];

//     deleteTransaction(1);
//     expect(transactions.length).toBe(1);
//     expect(transactions[0]).toEqual({ name: 'Rent', amount: 1000, type: 'expense' });
// });
