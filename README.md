# UniGig

A university-scoped freelancing platform where students can offer and hire services within their campus community.

## Features

- Student registration and JWT-based authentication
- Gig listings with search and price filtering
- Order management (place, accept, deliver, complete)
- Real-time messaging via Socket.io
- Review and rating system
- Admin portal with user/gig moderation and ban controls

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, React Router v7, Axios |
| Backend | Node.js, Express 5, Sequelize ORM |
| Database | MySQL |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| Real-time | Socket.io |

## Prerequisites

- Node.js v18+
- MySQL 8+

## Local Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd UniGig
```

### 2. Create the database

Open MySQL and run the provided schema:

```bash
mysql -u root -p < database.sql
```

Or open `database.sql` in MySQL Workbench and execute it.

### 3. Configure the backend

```bash
cd unigig-backend
cp .env.example .env
```

Edit `.env` and fill in your values:

```
PORT=8000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=unigig_db
JWT_SECRET=a_long_random_secret_string
JWT_EXPIRES_IN=7d
```

Then install dependencies and start the server:

```bash
npm install
npm run dev
```

The API will be available at `http://localhost:8000/api/v1`.

### 4. Configure the frontend

```bash
cd unigig-frontend
cp .env.example .env
```

The default `.env` points to the local backend — no changes needed unless you change the port.

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Environment Variables

### Backend (`unigig-backend/.env`)

| Variable | Description |
|---|---|
| `PORT` | Port the Express server listens on |
| `DB_HOST` | MySQL host |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | MySQL database name |
| `JWT_SECRET` | Secret key used to sign JWT tokens |
| `JWT_EXPIRES_IN` | Token expiry duration (e.g. `7d`) |

### Frontend (`unigig-frontend/.env`)

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API |

## Project Structure

```
UniGig/
├── database.sql              # MySQL schema and seed data
├── unigig-backend/
│   ├── config/               # Database connection
│   ├── controllers/          # Route handlers
│   ├── middleware/           # Auth & role guards
│   ├── models/               # Sequelize models
│   ├── routes/v1/            # API route definitions
│   ├── socket/               # Socket.io event handlers
│   └── server.js
└── unigig-frontend/
    └── src/
        ├── api/              # Axios instance & API calls
        ├── components/       # Shared UI components
        ├── context/          # React context (Auth, Socket)
        ├── pages/            # Page components by role
        └── routes/           # Protected route wrappers
```

## License

MIT
