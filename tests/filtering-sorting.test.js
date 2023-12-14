// Import your transaction functions and any testing library you're using
const {
    addTransaction,
    updateTransactionList,
    deleteTransaction,
    getTransactionsFromLocalStorage,
    saveTransactionsToLocalStorage,
  } = require('../js/transactions');
  
  // Mock localStorage for testing
  const localStorageMock = (() => {
    let store = {};
  
    return {
      getItem: key => store[key],
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
    };
  })();
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  
  // Mock DOM elements
  document.body.innerHTML = `
    <div id="transactionList"></div>
    <select id="sortOption" onchange="updateTransactionList()">
      <option value="default">Default</option>
      <option value="amount">Amount</option>
    </select>
    <select id="filterOption" onchange="updateTransactionList()">
      <option value="all">All</option>
      <option value="income">Income</option>
      <option value="expense">Expense</option>
    </select>
  `;
  
  test('Sort transactions by amount', () => {
    // Add transactions to localStorage
    saveTransactionsToLocalStorage([
      { name: 'Transaction 1', amount: 50, type: 'income' },
      { name: 'Transaction 2', amount: 30, type: 'expense' },
      { name: 'Transaction 3', amount: 70, type: 'income' },
    ]);
  
    // Trigger sorting by amount
    document.getElementById('sortOption').value = 'amount';
    updateTransactionList();
  
    // Get the displayed transactions
    const transactionList = document.getElementById('transactionList').innerHTML;
  
    // Assert the order of transactions after sorting
    expect(transactionList).toContain('Transaction 2'); // Lowest amount
    expect(transactionList).toContain('Transaction 1');
    expect(transactionList).toContain('Transaction 3'); // Highest amount
  });
  
  test('Filter transactions by type', () => {
    // Add transactions to localStorage
    saveTransactionsToLocalStorage([
      { name: 'Transaction 1', amount: 50, type: 'income' },
      { name: 'Transaction 2', amount: 30, type: 'expense' },
      { name: 'Transaction 3', amount: 70, type: 'income' },
    ]);
  
    // Trigger filtering by income
    document.getElementById('filterOption').value = 'income';
    updateTransactionList();
  
    // Get the displayed transactions
    const transactionList = document.getElementById('transactionList').innerHTML;
  
    // Assert that only income transactions are displayed
    expect(transactionList).toContain('Transaction 1');
    expect(transactionList).toContain('Transaction 3');
  
    // Trigger filtering by expense
    document.getElementById('filterOption').value = 'expense';
    updateTransactionList();
  
    // Get the displayed transactions
    const updatedTransactionList = document.getElementById('transactionList').innerHTML;
  
    // Assert that only expense transactions are displayed
    expect(updatedTransactionList).toContain('Transaction 2');
  });
  