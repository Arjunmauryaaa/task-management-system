📝 Task Management System – Setup Guide
📦 Prerequisites

Make sure you have the following installed:

Node.js (v16+ recommended)

MongoDB (local via MongoDB Compass)

Git

npm

⚙️ Environment Variables

Create a .env file inside the backend folder.

backend/.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task_management_db
JWT_SECRET=your_jwt_secret_key

 Installation & Run Instructions
1️⃣ Clone the Repository
git clone https://github.com/Arjunmauryaaa/task-management-system
cd task-management-system

2️⃣ Backend Setup
cd backend
npm install
npm run dev


Backend will run at:

http://localhost:5000

3️⃣ Frontend Setup

Open a new terminal:

cd frontend
npm install
npm run dev


Frontend will run at:

http://localhost:5173

 How to Use the Application

Open http://localhost:5173

Register a new user

Login with credentials

Create projects from the dashboard

Open a project to manage tasks

Create, update, and delete tasks

Logout to test protected routes
