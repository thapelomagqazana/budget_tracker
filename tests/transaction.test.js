
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
});


