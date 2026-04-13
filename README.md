# UniGig 🎓
A university-scoped freelancing platform connecting students with skills to students with needs.

## Tech Stack
- Frontend: React.js (Vite)
- Backend: Node.js + Express.js
- Database: MySQL + Sequelize ORM
- Auth: JWT
- Real-time: Socket.io

## Prerequisites
- Node.js installed
- MySQL installed and running

## Setup Instructions

### 1. Clone the repo
git clone https://github.com/yourusername/UniGig.git
cd UniGig

### 2. Setup Database
- Open MySQL Workbench
- Run the file: database.sql
- This creates the database and all tables automatically

### 3. Setup Backend
cd unigig-backend
npm install
cp .env.example .env
# Edit .env and add your MySQL password
npm run dev

### 4. Setup Frontend
cd unigig-frontend
npm install
npm run dev

### 5. Open Browser
http://localhost:5173

