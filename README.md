Task Management System (MERN Stack)
Project Overview

The Task Management System is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js).
It allows authenticated users to create and manage projects and tasks with proper authentication, authorization, and data validation.

This project demonstrates secure JWT-based authentication, protected routes, RESTful API design, and React state management, making it suitable for an intermediate-level MERN internship assignment.

Core Features
Authentication & Security

User Registration, Login, Logout using JWT

Password hashing using bcrypt

Protected backend routes using authentication middleware

Protected frontend routes using React Router

JWT stored securely in browser storage

 User Profile

View logged-in user profile (name & email)
 Project Management (CRUD)

Create projects

View user-specific projects

Update project details

Delete projects

Task Management (CRUD)

Create tasks under a project

View tasks for a project

Update tasks

Delete tasks

Task Status:

Todo

In Progress

Done

Task Priority:

Low

Medium

High

Dashboard

Displays list of user projects

Project-wise task management

Clean and minimal user interface

🛠 Tech Stack
Frontend

React

React Router DOM

React Hooks

Axios

CSS

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT (jsonwebtoken)

bcryptjs

🗃 Database Models
User Model
{
  name: String,
  email: String,
  password: String,
  role: String
}

Project Model
{
  title: String,
  description: String,
  owner: ObjectId,
  createdAt: Date
}

Task Model
{
  title: String,
  description: String,
  status: "Todo | In Progress | Done",
  priority: "Low | Medium | High",
  dueDate: Date,
  project: ObjectId,
  assignedTo: ObjectId
}

📡 API Documentation
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
Projects
Method	Endpoint	Description
GET	/api/projects	Get all user projects
POST	/api/projects	Create project
PUT	/api/projects/:id	Update project
DELETE	/api/projects/:id	Delete project
Tasks
Method	Endpoint	Description
GET	/api/tasks/:projectId	Get tasks for project
POST	/api/tasks	Create task
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task
⚙️ Environment Variables
.env.example
PORT=5000
MONGO_URI=mongodb://localhost:27017/task_management_db
JWT_SECRET=your_jwt_secret_key


 Do NOT commit .env to GitHub.
Only .env.example is included.

 Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/task-management-system.git
cd task-management-system

2️⃣ Backend Setup
cd backend
npm install
npm run dev


Backend runs on:

http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

How to Run & Test

Register a new user

Login to receive JWT token

Create a project from dashboard

Open project to manage tasks

Create, update, and delete tasks

Change task status and priority

Logout and verify protected routes

Submission Requirements Checklist

GitHub repository

MERN Stack implementation

JWT authentication

Password hashing

Protected routes (frontend & backend)

Project & Task CRUD

Task status & priority

.env.example

README documentation

API documentation


