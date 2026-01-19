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

## 🌐 Live Demo

**[View Live Application](https://user-dash-tixio.vercel.app)**

---

## 🛠️ Tech Stack

**Frontend:** React, TypeScript, Vite, Tailwind CSS, Shadcn/ui, React Query  
**Backend:** Express, TypeScript, Prisma ORM, MongoDB, Helmet, CORS, Rate limiting

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/srijonashraf/user-dash
cd user-dash
```

````

### 2. Install dependencies

```bash
# Client
cd client
npm install

# Server
cd ../server
npm install
````

### 3. Setup environment

Copy the example environment file:

```bash
cd server
cp .env.example .env
```

Update the `.env` file with your configuration. See `.env.example` for all available options.

### 4. Generate Prisma Client

```bash
cd server
npx prisma generate
npx prisma db push
```

### 5. Seed Database

Populate the database with initial data:

```bash
npx prisma db seed
```

### 6. Run the app

```bash
# Backend (from server directory)
npm run dev

# Frontend (from client directory, in new terminal)
cd ../client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📡 API Endpoints

- `GET /users` - List users (query: `search`, `role`)
- `GET /users/:id` - Get user details
- `PATCH /users/:id/toggle-active` - Toggle active status

---

## 📂 Project Structure

```
user-dash/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   └── lib/         # Utilities
│   └── package.json
│
├── server/              # Express backend
│   ├── src/
│   │   ├── routes/      # API routes
│   │   └── services/    # Business logic
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
└── README.md
```

---

## 🧪 Scripts

### Server

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Run production build
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
```

### Client

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Run production build
```

---

## 📄 License

This project is licensed under the MIT License.
