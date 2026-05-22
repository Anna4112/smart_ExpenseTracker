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

## Installation & Setup

### 1. Install Node.js

Download Node.js (LTS version):

https://nodejs.org

Check installation:

```bash
node -v
npm -v
```

---

### 2. Download or Clone the Project

```bash
git clone https://github.com/<your-username>/<repository>.git
cd expense-tracker-webapp
```

Or download the ZIP folder and extract it.

---

### 3. Install Dependencies

Open the project in VS Code and run:

```bash
npm install
```

---

### 4. Run the Application

Start the backend server:

```bash
npm start
```

You should see:

```text
Server running on port 3000
```

---

### 5. Open in Browser

```text
http://localhost:3000
```

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

---

## Assignment Requirements Covered

This project fulfills the IU assignment requirements:
- Responsive frontend
- Dynamic JavaScript features
- Backend communication using Node.js
- Browser-based application
- Persistent data storage
- Installation and run instructions included
