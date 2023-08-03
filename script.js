// Get DOM elements
const balanceElement = document.getElementById('balance');
const incomeElement = document.getElementById('money-plus');
const expenseElement = document.getElementById('money-minus');
const listElement = document.getElementById('list');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const form = document.getElementById('form');

// Initialize transactions array
let transactions = [];

// Function to generate a random ID for transactions
function generateID() {
  return Math.floor(Math.random() * 100000);
}

// Function to display transactions in the DOM
function displayTransactions() {
  listElement.innerHTML = '';

  transactions.forEach((transaction) => {
    const listItem = document.createElement('li');

    listItem.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    listItem.innerHTML = `
      ${transaction.text} <span>${transaction.amount < 0 ? '-' : '+'}$${Math.abs(
      transaction.amount
    )}</span>
      <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">X</button>
    `;

    listElement.appendChild(listItem);
  });
}

// Function to update balance, income, and expense
function updateBalance() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((amount) => amount < 0).reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);

  balanceElement.textContent = `$${total}`;
  incomeElement.textContent = `+$${income}`;
  expenseElement.textContent = `-$${expense}`;
}

// Function to add a new transaction
function addTransaction(e) {
  e.preventDefault();

  if (textInput.value.trim() === '' || amountInput.value.trim() === '') {
    alert('Please enter a text and amount');
    return;
  }

  const transaction = {
    id: generateID(),
    text: textInput.value,
    amount: +amountInput.value
  };

  transactions.push(transaction);
  displayTransactions();
  updateBalance();

  textInput.value = '';
  amountInput.value = '';
}

// Function to delete a transaction
function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  displayTransactions();
  updateBalance();
}

// Event listener for form submission
form.addEventListener('submit', addTransaction);

// Initial display of transactions and balance
displayTransactions();
updateBalance();
