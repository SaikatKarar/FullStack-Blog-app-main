# Full-Stack Blog App

A production-ready **MERN stack blogging platform** where users can create, publish, and manage blog posts with comments, while admins moderate content through a dashboard. Built as a learning-friendly yet scalable full‑stack project.

---

## ✨ Features

### 🔐 Authentication & Authorization

* User registration & login
* JWT-based authentication
* Role-based access (User / Admin)

### 📝 Blog Posts

* Create, read, update, delete (CRUD)
* Draft & publish workflow
* Rich text content
* Image upload support

### 💬 Comments

* Add comments on posts
* Nested/threaded comments
* Admin moderation & deletion

### 🖼 Media Handling

* Image upload via **Cloudinary**
* File handling with **Multer**

### 🛠 Admin Dashboard

* Manage users & roles
* Manage posts & comments
* View basic platform stats

### 🌐 Public UI & API

* Browse all blogs
* Search & pagination
* Individual post pages

### ⚡ Frontend UX

* React (Vite)
* Tailwind CSS
* Lightweight Redux (slices)
* React Router

---

## 🧰 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Cloudinary
* Multer

### Frontend

* React (Vite)
* Tailwind CSS
* Redux Toolkit
* React Router

### Tooling

* ESLint
* PostCSS
* Vite
* npm

---

## 🔌 API Endpoints (Examples)

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Blogs

* `GET /api/blogs`
* `GET /api/blogs/:id`
* `POST /api/blogs`
* `PUT /api/blogs/:id`
* `DELETE /api/blogs/:id`

### Comments

* `POST /api/comments`
* `GET /api/comments?postId=...`
* `DELETE /api/comments/:id`

### Admin

* `GET /api/dashboard/stats`
* `PUT /api/users/:id/role`

---

## 🚀 Quick Setup

### 1️⃣ Environment Variables

Create a `.env` file in **Backend**:

```env
MONGODB_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

## 🌍 Deployment Notes

* Deploy **Backend** on Render / Heroku / AWS
* Deploy **Frontend** on Vercel / Netlify
* Store environment variables securely
* Enable CORS only for trusted origins
* Use HTTPS and rotate secrets regularly

---

## 📌 About

This project is ideal as:

* A **starter MERN project**
* A **learning reference** for full‑stack development
* A base for extending into a production blog platform

---

**Author:** Saikat Karar
