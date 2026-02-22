# 📝 Task Management System

A full-stack Task Management System built with modern technologies.  
This application allows users to register, log in, and manage their personal tasks with full CRUD functionality.

---

## 🚀 Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (or your DB)
- JWT Authentication (Access + Refresh Tokens)

---

## ✨ Features

### 🔐 Authentication
- User Registration
- User Login
- JWT-based Authentication
- Refresh Token Mechanism
- Protected Routes
- Secure Logout

### 📝 Task Management (Full CRUD)
- Create Task
- View Tasks (Paginated)
- Edit Task (Title & Description)
- Toggle Task Status (Pending / Completed)
- Delete Task (with confirmation)
- Search Tasks
- Filter by Status
- User-specific Task Isolation

### 🎨 UI / UX Enhancements
- Clean, modern dashboard UI
- Collapsible "Add Task" form
- Inline task editing
- Confirmation before delete
- Disabled save button when title is empty
- Proper error handling
- Toast notifications
- Responsive design

---

## 📂 Project Structure
TaskManagementSystem/
│
├── frontend/ # Next.js application
├── backend/ # Express + Prisma API
└── README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/hixrathiee/task_management
cd TaskManagementSystem
```

2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a .env file:

DATABASE_URL=your_database_url
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

Run migrations:
npx prisma migrate dev

Start backend:

```bash
npm run dev
```

Backend runs on:
http://localhost:5000

3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
http://localhost:3000


🔐 Authentication Flow

-User logs in.
-Server returns:
-Access Token (short-lived)
-Refresh Token (long-lived)
-Access token is used for protected routes.
-If expired, refresh token generates a new access token.

🧠 Key Implementation Details

-Prisma used for database management.
-Tasks are strictly filtered by userId.
-API includes proper 401 handling and refresh token logic.
-Hydration mismatch handled properly in Next.js.
-Prevented infinite refresh loop in API layer.
-Trim validation for task titles.
-Clean UX improvements like confirmation dialogs and disabled save state.

👩‍💻 Author

Anjali Rathi
Full Stack Developer
