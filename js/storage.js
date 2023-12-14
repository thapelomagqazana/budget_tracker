const TRANSACTIONS_KEY = 'budget_tracker_transactions';

function getTransactions() {
    const transactionsString = localStorage.getItem(TRANSACTIONS_KEY);
    return JSON.parse(transactionsString);
}

function setTransactions(transactions) {
    const transactionsString = JSON.stringify(transactions);
    localStorage.setItem(TRANSACTIONS_KEY, transactionsString);
}

// module.exports = {
//     getTransactions,
//     setTransactions,
// };