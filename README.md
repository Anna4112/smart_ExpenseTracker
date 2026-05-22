# Smart Expense Tracker

A responsive full-stack web application that helps users manage their income and expenses in one place.  
The application focuses on clean UI design, responsive layouts, dynamic features, and backend communication using Node.js.

---

## Features

### 1. Login Page
- Email input
- Password input
- Login button
- Forgot password link
- Create account link
- Centered responsive card layout

### 2. Dashboard
Summary cards:
- Total Balance
- Total Income
- Total Expenses
- Savings

Other features:
- Add Expense button
- Add Income button
- Recent transactions table
- Edit/Delete transaction actions

### 3. Add/Edit Transactions
Users can:
- Add income
- Add expenses
- Edit transactions
- Delete transactions

Each transaction contains:
- Type
- Category
- Amount
- Date
- Description

### 4. Analytics
- Pie chart for expenses by category
- Bar chart for monthly income vs expenses
- Month/category filters

### 5. Responsive Design
- Built with Bootstrap and custom CSS
- Mobile and desktop responsive
- Rounded cards and clean layout

### 6. Backend Communication
Frontend communicates with a Node.js backend API to:
- Save records
- Load records
- Update records
- Delete records

Data is stored in a JSON file.

---

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap

### Backend
- Node.js
- Express.js

### Storage
- JSON file (`expenses.json`)

### Tools
- VS Code
- GitHub
- Chrome Browser

---

## Project Structure

```text
expense-tracker-webapp/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── data/
│   └── expenses.json
├── server.js
├── package.json
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | /api/expenses | Get all transactions |
| POST | /api/expenses | Add new transaction |
| PUT | /api/expenses/:id | Update transaction |
| DELETE | /api/expenses/:id | Delete transaction |
| GET | /api/summary | Get dashboard totals |

---

## Dynamic Features

- Real-time dashboard updates
- Form validation
- Add/Edit/Delete functionality
- Analytics charts
- Responsive layout behavior
