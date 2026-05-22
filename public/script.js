const API_URL = "/api/expenses";

const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");
const loginForm = document.getElementById("loginForm");
const logoutButton = document.getElementById("logoutButton");

const form = document.getElementById("expenseForm");
const recordId = document.getElementById("recordId");
const title = document.getElementById("title");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const category = document.getElementById("category");
const date = document.getElementById("date");
const recordsTable = document.getElementById("recordsTable");
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");
const cancelEdit = document.getElementById("cancelEdit");
const formTitle = document.getElementById("formTitle");
const addIncomeButton = document.getElementById("addIncomeButton");
const addExpenseButton = document.getElementById("addExpenseButton");
const analyticsMonth = document.getElementById("analyticsMonth");
const analyticsCategory = document.getElementById("analyticsCategory");

let records = [];

date.valueAsDate = new Date();
analyticsMonth.value = new Date().toISOString().slice(0, 7);

loginForm.addEventListener("submit", event => {
  event.preventDefault();
  loginPage.classList.add("d-none");
  dashboardPage.classList.remove("d-none");
  loadRecords();
});

logoutButton.addEventListener("click", () => {
  dashboardPage.classList.add("d-none");
  loginPage.classList.remove("d-none");
  loginForm.reset();
});

async function loadRecords() {
  try {
    const response = await fetch(API_URL);
    records = await response.json();
    renderRecords();
    loadSummary();
    renderAnalytics();
  } catch (error) {
    alert("Could not load records. Please check that the Node.js server is running.");
  }
}

async function loadSummary() {
  const response = await fetch("/api/summary");
  const summary = await response.json();

  document.getElementById("totalIncome").textContent = formatCurrency(summary.income);
  document.getElementById("totalExpense").textContent = formatCurrency(summary.expense);
  document.getElementById("balance").textContent = formatCurrency(summary.balance);
  document.getElementById("savings").textContent = formatCurrency(summary.savings);
}

function renderRecords() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = filterCategory.value;

  const filtered = records.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchText);
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  recordsTable.innerHTML = "";

  if (filtered.length === 0) {
    recordsTable.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">No records found.</td></tr>`;
    return;
  }

  filtered.forEach(item => {
    const badgeClass = item.type === "income" ? "text-bg-success" : "text-bg-danger";
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.date}</td>
      <td>${item.category}</td>
      <td>${item.title}</td>
      <td>${formatCurrency(item.amount)}</td>
      <td><span class="badge ${badgeClass}">${item.type}</span></td>
      <td>
        <button class="btn btn-outline-primary btn-sm action-button" onclick="startEdit('${item.id}')">Edit</button>
        <button class="btn btn-outline-danger btn-sm action-button" onclick="deleteRecord('${item.id}')">Delete</button>
      </td>
    `;
    recordsTable.appendChild(row);
  });
}

form.addEventListener("submit", async event => {
  event.preventDefault();

  const payload = {
    title: title.value.trim(),
    amount: Number(amount.value),
    type: type.value,
    category: category.value,
    date: date.value
  };

  const isEditing = Boolean(recordId.value);
  const url = isEditing ? `${API_URL}/${recordId.value}` : API_URL;
  const method = isEditing ? "PUT" : "POST";

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json();
    alert(error.message || "Something went wrong.");
    return;
  }

  resetForm();
  loadRecords();
});

function startEdit(id) {
  const item = records.find(record => record.id === id);
  if (!item) return;

  recordId.value = item.id;
  title.value = item.title;
  amount.value = item.amount;
  type.value = item.type;
  category.value = item.category;
  date.value = item.date;
  formTitle.textContent = "Edit Transaction";
  document.getElementById("transactionFormCard").scrollIntoView({ behavior: "smooth" });
}

async function deleteRecord(id) {
  if (!confirm("Delete this record?")) return;
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadRecords();
}

function resetForm() {
  form.reset();
  recordId.value = "";
  date.valueAsDate = new Date();
  formTitle.textContent = "Add/Edit Transaction";
}

function setTransactionType(selectedType) {
  type.value = selectedType;
  formTitle.textContent = selectedType === "income" ? "Add Income" : "Add Expense";
  document.getElementById("transactionFormCard").scrollIntoView({ behavior: "smooth" });
}

function renderAnalytics() {
  drawCategoryPieChart();
  drawMonthlyBarChart();
}

function drawCategoryPieChart() {
  const canvas = document.getElementById("categoryChart");
  const ctx = canvas.getContext("2d");
  const width = canvas.width = canvas.offsetWidth;
  const height = canvas.height = 230;
  ctx.clearRect(0, 0, width, height);

  const selectedCategory = analyticsCategory.value;
  const expenses = records.filter(item => item.type === "expense" && (selectedCategory === "all" || item.category === selectedCategory));
  const totals = {};

  expenses.forEach(item => {
    totals[item.category] = (totals[item.category] || 0) + item.amount;
  });

  const entries = Object.entries(totals);
  const total = entries.reduce((sum, entry) => sum + entry[1], 0);

  if (entries.length === 0) {
    drawEmptyChart(ctx, width, height, "No expense data available");
    return;
  }

  const colors = ["#4f46e5", "#ef4444", "#22c55e", "#f59e0b", "#06b6d4", "#8b5cf6", "#64748b"];
  let startAngle = 0;
  const centerX = 110;
  const centerY = 110;
  const radius = 75;

  entries.forEach(([label, value], index) => {
    const sliceAngle = (value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = colors[index % colors.length];
    ctx.fill();

    ctx.fillRect(230, 45 + index * 26, 14, 14);
    ctx.fillStyle = "#111827";
    ctx.font = "14px Arial";
    ctx.fillText(`${label}: ${formatCurrency(value)}`, 252, 57 + index * 26);
    startAngle += sliceAngle;
  });
}

function drawMonthlyBarChart() {
  const canvas = document.getElementById("monthlyChart");
  const ctx = canvas.getContext("2d");
  const width = canvas.width = canvas.offsetWidth;
  const height = canvas.height = 230;
  ctx.clearRect(0, 0, width, height);

  const selectedMonth = analyticsMonth.value;
  const monthlyRecords = records.filter(item => item.date.startsWith(selectedMonth));
  const income = monthlyRecords.filter(item => item.type === "income").reduce((sum, item) => sum + item.amount, 0);
  const expense = monthlyRecords.filter(item => item.type === "expense").reduce((sum, item) => sum + item.amount, 0);
  const maxValue = Math.max(income, expense, 1);

  ctx.fillStyle = "#111827";
  ctx.font = "14px Arial";
  ctx.fillText(`Month: ${selectedMonth}`, 20, 25);

  drawBar(ctx, 70, height - 35, 80, income, maxValue, "#22c55e", "Income");
  drawBar(ctx, 200, height - 35, 80, expense, maxValue, "#ef4444", "Expenses");
}

function drawBar(ctx, x, bottom, barWidth, value, maxValue, color, label) {
  const maxBarHeight = 140;
  const barHeight = (value / maxValue) * maxBarHeight;
  ctx.fillStyle = color;
  ctx.fillRect(x, bottom - barHeight, barWidth, barHeight);

  ctx.fillStyle = "#111827";
  ctx.font = "14px Arial";
  ctx.fillText(label, x + 8, bottom + 20);
  ctx.fillText(formatCurrency(value), x - 5, bottom - barHeight - 8);
}

function drawEmptyChart(ctx, width, height, message) {
  ctx.fillStyle = "#6b7280";
  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.fillText(message, width / 2, height / 2);
  ctx.textAlign = "left";
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}

searchInput.addEventListener("input", renderRecords);
filterCategory.addEventListener("change", renderRecords);
cancelEdit.addEventListener("click", resetForm);
addIncomeButton.addEventListener("click", () => setTransactionType("income"));
addExpenseButton.addEventListener("click", () => setTransactionType("expense"));
analyticsMonth.addEventListener("change", renderAnalytics);
analyticsCategory.addEventListener("change", renderAnalytics);
