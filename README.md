# Event Management System (EMS) - Backend

[![Node.js](https://img.shields.io/badge/Node.js-v22.20.0-green)](https://nodejs.org/) 
[![License](https://img.shields.io/badge/License-ISC-blue)](https://opensource.org/licenses/ISC)

---

## Overview
The **Event Management System (EMS)** backend provides APIs and database management for handling users, vendors, products, and orders in an event management platform. Built with **Node.js, Express, and SQLite**, it supports role-based authentication and dashboards for Admin, Vendor, and User.

**Key Features:**
- User authentication and role-based access (Admin, Vendor, User)
- Admin dashboard for managing users and vendors
- Vendor product management
- User cart and order management
- Sample data preloaded for testing

---

## Technology Stack
- **Backend:** Node.js, Express
- **Database:** SQLite
- **Frontend:** HTML, CSS, Bootstrap (served as static files)
- **Dependencies:** body-parser, cors, sqlite3

---

## Installation & Setup

1. Clone the repository:
```bash
git clone <YOUR_REPO_URL>
cd event-management-system/backend
Install dependencies:

bash
Copy code
npm install
Start the server:

bash
Copy code
npm start
Server runs at: http://localhost:3000

Project Structure
pgsql
Copy code
backend/
├── app.js               # Main server file
├── database.db          # SQLite database
├── package.json
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── vendor.js        # Vendor routes
│   ├── user.js          # User routes
│   └── admin.js         # Admin routes
└── assets/              # CSS/JS files for frontend
Sample User Accounts
Role	Email	Password
Admin	admin@example.com	admin123
Vendor	vendor@example.com	vendor123
User	user@example.com	user123

API Endpoints
Authentication

POST /api/auth/login – Login using email and password

Admin

GET /api/admin/users – Get all users

GET /api/admin/vendors – Get all vendors

Vendor

GET /api/vendor/:id/items – Get vendor items

POST /api/vendor/:id/items – Add a new item

DELETE /api/vendor/items/:id – Delete an item

User

GET /api/user/:id/cart – Get user cart items

POST /api/user/:id/cart – Add item to cart

DELETE /api/user/cart/:id – Remove item from cart

GET /api/user/:id/orders – Get user orders

POST /api/user/:id/checkout – Checkout cart items

Usage
Start the backend server.

Open the frontend login page in a browser.

Login with provided credentials.

Access role-specific dashboards:

Admin: Manage users and vendors

Vendor: Manage products

User: Manage cart and orders

Contributing
Fork the repository

Create a new branch:

bash
Copy code
git checkout -b feature/your-feature
Make changes and commit:

bash
Copy code
git commit -m "Add new feature"
Push to your branch:

bash
Copy code
git push origin feature/your-feature
Open a Pull Request

License
This project is licensed under the ISC License.

pgsql
Copy code

This version is **perfect for GitHub**:  
- Uses badges  
- Clean markdown sections  
- Clear instructions for setup and usage  
- API documentation and project structure  

If you want, I can also **add a “Screenshots / Demo” section with example images or GIFs** to make it more appealing to the company.  

Do you want me to add that?
