// app.js

// Import your CSS file
// import 'budget_tracker/css/styles.css';

// Import necessary modules or files
import { getTransactionsFromLocalStorage, saveTransactionsToLocalStorage, addTransaction, deleteTransaction } from './transactions';

// Function to initialize the application
function initializeApp() {
  // Add your initialization logic here
  console.log('Initializing the application');

  // Example: Load transactions from localStorage
  const transactions = getTransactionsFromLocalStorage();
  console.log('Loaded transactions:', transactions);

  // Example: Add a new transaction
  addTransaction('Salary', 2000, 'income');
  console.log('Added a new transaction:', getTransactionsFromLocalStorage());

  // Example: Delete a transaction
  deleteTransaction(0);
  console.log('Deleted a transaction:', getTransactionsFromLocalStorage());
}

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);
