
const {
    addTransaction,
    deleteTransaction,
    getTransactionsFromLocalStorage,
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
        // Add a transaction for testing
        addTransaction('Test', 50, 'income');
    
        // Get the transactions before deletion
        const transactionsBefore = getTransactionsFromLocalStorage();
    
        // Mock the confirm dialog to simulate user confirmation
        jest.spyOn(window, 'confirm').mockImplementation(() => true);
    
        // Delete the transaction
        deleteTransaction(0);
    
        // Get the transactions after deletion
        const transactionsAfter = getTransactionsFromLocalStorage();
    
        // Assert that the transaction is deleted
        expect(transactionsAfter.length).toBe(transactionsBefore.length - 1);
    });
    
    test('Cancel delete operation', () => {
        // Add a transaction for testing
        addTransaction('Test', 50, 'income');
    
        // Get the transactions before deletion
        const transactionsBefore = getTransactionsFromLocalStorage();
    
        // Mock the confirm dialog to simulate user cancellation
        jest.spyOn(window, 'confirm').mockImplementation(() => false);
    
        // Attempt to delete the transaction (user cancels)
        deleteTransaction(0);
    
        // Get the transactions after deletion
        const transactionsAfter = getTransactionsFromLocalStorage();
    
        // Assert that the transaction is not deleted
        expect(transactionsAfter.length).toBe(transactionsBefore.length);
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

