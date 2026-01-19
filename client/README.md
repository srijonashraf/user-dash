````markdown
# 🖥️ User Dashboard

A modern full-stack dashboard application built with **React, TypeScript, Express, and MongoDB**.  
Provides user management features with search, filtering, user details, and active status toggling.

---

## ✨ Features

- 🔍 Searchable and filterable users list  
- 🧾 User details panel with activity indicator  
- ✅ Toggle user active status with optimistic updates  
- ↕️ Sort users by name  
- 📱 Responsive UI with Tailwind CSS  
- 🛡️ Type-safe frontend and backend with TypeScript  

---

## 🛠️ Tech Stack

**Frontend:** React, TypeScript, Vite, Tailwind CSS, Shadcn/ui, React Query  
**Backend:** Express, TypeScript, Prisma ORM, MongoDB, Helmet, CORS, Rate limiting  

---

## 🚀 Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd user-dash
````

### 2. Install dependencies

```bash
# Client
cd client
npm install

# Server
cd ../server
npm install
```

### 3. Setup environment

Create `.env` in `server/`:

```
SERVER_PORT=4500
DB_CONNECTION_STRING=mongodb://localhost:27017/userdash
```

### 4. Run the app

```bash
# Backend
cd server
npm run dev

# Frontend
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📡 API Endpoints

* `GET /users` - List users (query: `search`, `role`)
* `GET /users/:id` - Get user details
* `PATCH /users/:id/toggle-active` - Toggle active status

---

## 📂 Project Structure

```
user-dash/
├── client/           # Frontend
├── server/           # Backend
└── README.md
```

---

## 📄 License

This project is licensed under the MIT License
