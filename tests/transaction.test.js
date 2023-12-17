
const {
    addTransaction,
    deleteTransaction,
    getTransactionsFromLocalStorage,
    confirmDeleteTransaction,
    cancelDeleteTransaction,
    hideDeleteModal,
} = require('../js/transactions');

// Mock the localStorage to avoid actual storage operations in tests
let localStorageMock = {};
global.localStorage = {
  getItem: (key) => localStorageMock[key],
  setItem: (key, value) => (localStorageMock[key] = value),
  removeItem: (key) => delete localStorageMock[key],
};

// Mock the window.confirm function
global.window.confirm = jest.fn();

// Mock the modal-related functions
const hideDeleteModalMock = jest.fn();
const showDeleteModalMock = jest.fn();

// Mock the modal hide function
global.hideDeleteModal = hideDeleteModalMock;

// Mock the modal show function
global.showDeleteModal = showDeleteModalMock;

// Mock DOM elements
document.body.innerHTML = `
  <div id="transactionList"></div>
  <button id="clearTransactionsBtn"></button>
  <div id="deleteModal">
    <div class="modal-content">
      <p>Are you sure you want to delete this transaction?</p>
      <button onclick="confirmDeleteTransaction()" class="button-hover">Yes</button>
      <button onclick="cancelDeleteTransaction()" class="button-hover">Cancel</button>
    </div>
  </div>
`;

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

    // // Test for confirming the deletion
    // test('Confirm delete transaction with modal confirmation', () => {
    //     // Add a transaction for testing
    //     addTransaction('Test', 50, 'income');
    
    //     // Get the transactions before deletion
    //     const transactionsBefore = getTransactionsFromLocalStorage();
    
    //     // Mock the confirm dialog to simulate user confirmation
    //     window.confirm.mockReturnValue(true);
    
    //     // Delete the transaction
    //     deleteTransaction(0);
    
    //     // Confirm the deletion after modal confirmation
    //     confirmDeleteTransaction();
    
    //     // Get the transactions after deletion
    //     const transactionsAfter = getTransactionsFromLocalStorage();
    
    //     // Assert that the transaction is deleted
    //     expect(transactionsAfter.length).toBe(transactionsBefore.length - 1);
    
    //     // Assert that hideDeleteModalMock was called
    //     expect(hideDeleteModalMock).toHaveBeenCalled();
    // });
    
    // // Test for canceling the deletion with modal cancellation
    // test('Cancel delete transaction with modal cancellation', () => {
    //     // Add a transaction for testing
    //     addTransaction('Test', 50, 'income');
    
    //     // Get the transactions before deletion
    //     const transactionsBefore = getTransactionsFromLocalStorage();
    
    //     // Mock the confirm dialog to simulate user cancellation
    //     window.confirm.mockReturnValue(false);
    
    //     // Attempt to delete the transaction (user cancels)
    //     deleteTransaction(0);
    
    //     // Cancel the deletion after modal cancellation
    //     cancelDeleteTransaction();
    
    //     // Get the transactions after cancellation
    //     const transactionsAfter = getTransactionsFromLocalStorage();
    
    //     // Assert that the transaction is not deleted
    //     expect(transactionsAfter.length).toBe(transactionsBefore.length);
    
    //     // Assert that hideDeleteModalMock was called
    //     expect(hideDeleteModalMock).toHaveBeenCalled();
    // });
    
    // // Clear mocks after each test
    // afterEach(() => {
    //     jest.clearAllMocks();
    // });
    

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

