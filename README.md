# Smart Expense Tracker Web Application

This is a full-stack web application for the IU Project Java and Web Development portfolio.

## Features

- Add income and expense records
- Edit and delete existing records
- Real-time dashboard summary
- Category filter and title search
- Responsive browser-based user interface
- Frontend communicates with a Node.js backend API
- Data is stored persistently in a JSON file

## Technology Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Storage: JSON file
- Tools: VS Code, GitHub, Browser, Postman

## Installation

1. Install Node.js.
2. Open this project folder in VS Code.
3. Run:

```bash
npm install
npm start
```

4. Open the app in your browser:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | /api/expenses | Get all records |
| POST | /api/expenses | Add a record |
| PUT | /api/expenses/:id | Update a record |
| DELETE | /api/expenses/:id | Delete a record |
| GET | /api/summary | Get dashboard totals |

## Suggested GitHub Structure

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

## Screencast Demo Plan

1. Start the app with npm start.
2. Show dashboard totals.
3. Add one income record.
4. Add one expense record.
5. Edit an expense.
6. Filter records by category.
7. Delete a record.
8. Show that totals update dynamically.
