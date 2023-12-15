

// Import the necessary functions and objects
const {
    calculateTotalIncome,
    calculateTotalExpenses,
    calculateOverallBudget,
    getTransactionsFromLocalStorage,
    saveTransactionsToLocalStorage,
  } = require('../js/transactions');

//   const {
//     getTransactionsFromLocalStorage,
//     saveTransactionsToLocalStorage,
// } = require('../js/storage');
  
  // Sample transactions for testing
  const sampleTransactions = [
    { name: 'Salary', amount: 2000, type: 'income' },
    { name: 'Groceries', amount: 100, type: 'expense' },
    { name: 'Rent', amount: 800, type: 'expense' },
  ];
  
  // Mocking localStorage for testing
  const localStorageMock = (function () {
    let store = {};
  
    return {
      getItem: function (key) {
        return store[key];
      },
      setItem: function (key, value) {
        store[key] = value.toString();
      },
      clear: function () {
        store = {};
      },
    };
  })();
  
  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
  });
  
  // Test suite for statistics functionality
  describe('Statistics functionality', () => {
    beforeEach(() => {
      localStorage.clear();
      saveTransactionsToLocalStorage(sampleTransactions);
    });
  
    // Test calculating total income
    test('Calculates total income correctly', () => {
      const transactions = getTransactionsFromLocalStorage();
      const totalIncome = calculateTotalIncome(transactions);
      expect(totalIncome).toBe(2000); // Assuming the sampleTransactions total income is 2000
    });
  
    // Test calculating total expenses
    test('Calculates total expenses correctly', () => {
      const transactions = getTransactionsFromLocalStorage();
      const totalExpenses = calculateTotalExpenses(transactions);
      expect(totalExpenses).toBe(900); // Assuming the sampleTransactions total expenses is 900
    });
  
    // Test calculating overall budget
    test('Calculates overall budget correctly', () => {
      const transactions = getTransactionsFromLocalStorage();
      const overallBudget = calculateOverallBudget(transactions);
      expect(overallBudget).toBe(1100); // Assuming the sampleTransactions overall budget is 1100
    });
  
    // // Integration test for updating statistics in UI
    // test('Updates statistics in UI correctly', () => {
    //   document.body.innerHTML = `
    //     <div id="totalIncome">0</div>
    //     <div id="totalExpenses">0</div>
    //     <div id="overallBudget">0</div>
    //   `;
  
    //   // Assuming you have functions to update the UI with the calculated statistics
    //   updateTransactionList();
    //   updateStatisticsInUI();
  
    //   expect(document.getElementById('totalIncome').textContent).toBe('2000');
    //   expect(document.getElementById('totalExpenses').textContent).toBe('900');
    //   expect(document.getElementById('overallBudget').textContent).toBe('1100');
    // });
  });
  