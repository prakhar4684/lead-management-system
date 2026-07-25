# 🚀 LeadDesk Mini CRM

A modern Full Stack Lead Management System built with **React, Node.js, Express.js, MongoDB Atlas, and JWT Authentication**. LeadDesk Mini helps businesses capture, manage, and track customer leads through a clean and responsive dashboard.

![React](https://img.shields.io/badge/React-19-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## ✨ Features

### 🌐 Landing Page
- Responsive modern UI
- Feature showcase
- Contact/Lead submission form
- Smooth navigation

### 🔐 Authentication
- Admin Registration
- Admin Login
- JWT Authentication
- Password Hashing using bcrypt
- Protected Dashboard Routes
- Public Route Protection

### 📊 Dashboard
- View all leads
- Search leads
- Update lead status
- Delete leads
- View complete lead details
- Responsive data table
- Beautiful analytics cards

### 💾 Database
- MongoDB Atlas
- Real-time CRUD Operations

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router
- Tailwind CSS
- Framer Motion
- Axios
- React Icons

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt

---

# 📂 Project Structure

```
lead-management-system
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🔑 Authentication Flow

```
Register
      ↓
Login
      ↓
JWT Token
      ↓
Protected Dashboard
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

---

## Leads

| Method | Endpoint |
|---------|----------|
| POST | /api/leads |
| GET | /api/leads |
| GET | /api/leads/search |
| GET | /api/leads/:id |
| PATCH | /api/leads/:id/status |
| DELETE | /api/leads/:id |

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/prakhar4684/lead-management-system.git
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🔐 Environment Variables

Backend `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 📱 Screens

- Landing Page
- Login
- Register
- Dashboard
- Lead Details Drawer

---

# 🚀 Future Improvements

- Email Notifications
- Export Leads (CSV)
- Pagination
- Dashboard Charts
- Role-Based Authentication

---

# 👨‍💻 Author

**Prakhar Shukla**

📧 Email: praakharshukla4004@gmail.com

GitHub:
https://github.com/prakhar4684

LinkedIn:
www.linkedin.com/in/prakhar-shukla-746360319

---

# 📄 License

This project is licensed under the MIT License.

---

⭐ If you like this project, don't forget to star the repository.