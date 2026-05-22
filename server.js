const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "data", "expenses.json");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function ensureDataFile() {
  const dataDir = path.dirname(DATA_FILE);

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]");
  }
}

function readExpenses() {
  try {
    ensureDataFile();
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (error) {
    console.error("Could not read expense file:", error);
    return [];
  }
}

function writeExpenses(expenses) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2));
}

// Get all transactions
app.get("/api/expenses", (req, res) => {
  res.json(readExpenses());
});

// Add a new income/expense transaction
app.post("/api/expenses", (req, res) => {
  const { title, amount, type, category, date } = req.body;

  if (!title || !amount || !type || !category || !date) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const numericAmount = Number(amount);
  if (Number.isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ message: "Amount must be a positive number." });
  }

  const expenses = readExpenses();
  const newExpense = {
    id: Date.now().toString(),
    title,
    amount: numericAmount,
    type,
    category,
    date
  };

  expenses.push(newExpense);
  writeExpenses(expenses);
  res.status(201).json(newExpense);
});

// Update an existing transaction
app.put("/api/expenses/:id", (req, res) => {
  const expenses = readExpenses();
  const index = expenses.findIndex(item => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Record not found." });
  }

  const { title, amount, type, category, date } = req.body;
  const numericAmount = Number(amount);

  if (!title || !amount || !type || !category || !date || Number.isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ message: "Please provide valid record data." });
  }

  expenses[index] = {
    id: req.params.id,
    title,
    amount: numericAmount,
    type,
    category,
    date
  };

  writeExpenses(expenses);
  res.json(expenses[index]);
});

// Delete a transaction
app.delete("/api/expenses/:id", (req, res) => {
  const expenses = readExpenses();
  const filteredExpenses = expenses.filter(item => item.id !== req.params.id);

  if (expenses.length === filteredExpenses.length) {
    return res.status(404).json({ message: "Record not found." });
  }

  writeExpenses(filteredExpenses);
  res.json({ message: "Record deleted successfully." });
});

// Summary endpoint for dashboard cards
app.get("/api/summary", (req, res) => {
  const expenses = readExpenses();

  const income = expenses
    .filter(item => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expense = expenses
    .filter(item => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  res.json({
    income,
    expense,
    balance: income - expense,
    savings: income - expense,
    count: expenses.length
  });
});

app.listen(PORT, () => {
  console.log(`Expense Tracker running at http://localhost:${PORT}`);
});
