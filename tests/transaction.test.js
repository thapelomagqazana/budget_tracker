
const {
    addTransaction,
    deleteTransaction,
    updateTransactionList,
    getTransactionsFromLocalStorage,
    saveTransactionsToLocalStorage,
} = require('../js/transactions');

describe('Transaction Functions', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });

    // Test for adding a transaction
    test('Add a transaction', () => {
        addTransaction('Salary', 2000, 'income');
        const transactions = getTransactionsFromLocalStorage();
        expect(transactions.length).toBe(1);
        expect(transactions[0]).toEqual({ name: 'Salary', amount: 2000, type: 'income' });
    });

    // Test for deleting a transaction
    test('Delete a transaction', () => {
        addTransaction('Rent', 1000, 'expense');
        addTransaction('Groceries', 200, 'expense');
        deleteTransaction(1);
        const transactions = getTransactionsFromLocalStorage();
        expect(transactions.length).toBe(1);
        expect(transactions[0]).toEqual({ name: 'Rent', amount: 1000, type: 'expense' });
    });

    // Add more tests as needed
});

// describe('UI Update Functions', () => {
//     test('Update transaction list in UI', () => {
//         // Assuming you have a test-container in your test.html file
//         document.body.innerHTML = '<div id="test-container"></div>';
//         updateTransactionList();
//         const transactionListContainer = document.getElementById('test-container');
//         expect(transactionListContainer.innerHTML).toMatchSnapshot();
//     });

//     // test('Update income and expense lists in UI', () => {
//     //     // Assuming you have a test-container in your test.html file
//     //     document.body.innerHTML = '<div id="test-container"></div>';
//     //     updateTransactionList()
//     //     const incomeListContainer = document.getElementById('incomeList');
//     //     const expenseListContainer = document.getElementById('expenseList');
//     //     expect(incomeListContainer.innerHTML).toMatchSnapshot();
//     //     expect(expenseListContainer.innerHTML).toMatchSnapshot();
//     // });

//     // Add more tests as needed
// });

