# 💰 WealthWay - Personal Finance Tracker

WealthWay is a full-stack personal finance tracking web application that helps users easily manage their **expenses**, **earnings**, and **overall financial health**. It offers a clean, intuitive interface to visualize spending habits, track income, and make better money decisions.

---

## ✨ Features

- 🔐 User Authentication (Register, Login, Logout)
- 📊 Visual Analytics: Pie Charts & Line Graphs
- 🧾 Expense and Earning Tracking with Categories
- 📅 Filter by Date, Category, or Custom Range
- 🧠 Smart Summaries for Total Expenses & Earnings
- 📬 Support/Contact Page with email and DB saving
- 🗂 Profile Management (Edit, Delete Account)
- 🌗 Light/Dark Mode (optional)
- 🔧 Admin-level email alerts (for support)

---

## 🛠 Tech Stack

### Frontend:
- React.js
- Redux Toolkit
- Tailwind CSS
- React Router
- Chart.js / Recharts

### Backend:
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt (password hashing)
- Nodemailer (email integration)

---

## 📷 Screenshots

<!-- Add screenshots here if available -->
<!-- Example: ![Dashboard](./screenshots/dashboard.png) -->

---

## 🧪 Getting Started

### 📦 Install Dependencies

#### Backend:
```terminal
cd backend
npm install

#### Frontend:
```terminal
cd frontend
npm install

🔐 Set up Environment Variables
Create a .env file in /backend directory and add the following:

MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL="http://localhost:----"
TOKEN_SECRET_KEY=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_EMAIL_PASSWORD=your_app_password

🚀 Run the App
Backend:
nodemon start
Frontend:
npm run dev

🙋‍♂️ Author
Developed by: Prince Singh
📧 Email: princesinghps1619@gmail.om
🔗 LinkedIn: https://www.linkedin.com/in/prince-singh-ps171619/

