# iot-week01-ass-ign-ment

A simple RESTful API built with Hono + Drizzle ORM + Railway PostgreSQL.

### 1. Install dependencies

npm install

### 2. Set up your .env

Create a `.env` file in the root folder and add:

DATABASE_URL=your_postgres_connection_url  
API_SECRET=your_api_secret_here

### 3. Run the API locally

npm run dev

This will start the server on:  
📍 http://localhost:3000

### 4. Make requests 🧪

Use Postman or curl with the header:

Examples
GET localhost:3000/api
GET localhost:3000/api/students
GET localhost:3000/api/students/1

Authorization: Bearer your_api_secret_here

Deployed Website:
