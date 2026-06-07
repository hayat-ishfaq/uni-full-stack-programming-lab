# CRM System — MERN + Next.js

A full-stack Customer Relationship Management (CRM) system built with **MongoDB**, **Express.js**, **React**, **Next.js 14**, and **Node.js**.

## Features

| Module | Description |
|--------|-------------|
| **Authentication** | JWT-based login/register, password hashing (bcrypt), protected routes |
| **Customer CRUD** | Add, view, update, delete customers with MongoDB persistence |
| **Search & Filter** | Search by name, filter by status (Lead / Active / Inactive) |
| **Dashboard** | Overview cards and charts with customer/lead statistics |
| **Invoice Generation** | Generate and download customer invoices as PDF (jsPDF) |
| **Notifications** | Toast feedback for all CRUD operations (Sonner) |
| **Chatbot** | Rule-based assistant with predefined navigation commands |
| **Real-time** | Socket.IO updates for customer and lead changes |

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React, Redux Toolkit, Tailwind CSS, Radix UI / shadcn, Axios, Socket.IO Client
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs, Socket.IO
- **PDF:** jsPDF (client-side invoice generation)

## Project Structure

```
crm-main/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Auth, customer, lead logic
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # JWT auth middleware
│   │   ├── validators/     # Joi validation
│   │   └── seed.js         # 15 sample customers
│   └── tests/
└── frontend/
    └── src/
        ├── app/            # Next.js App Router routes
        ├── views/          # Page view components (Auth, Dashboard, Customers)
        ├── components/     # Reusable UI components
        ├── hooks/          # Custom React hooks
        ├── layouts/        # Protected layout shell
        └── redux/          # Redux store and slices
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB running locally on `mongodb://localhost:27017`

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

The backend starts on **http://localhost:5000** and auto-creates an admin user.

**Default admin credentials:**
- Email: `admin@example.com`
- Password: `AdminPass123!`

### 2. Seed 15 Customers

With the backend running (admin must exist):

```bash
cd backend
npm run seed
```

This inserts 15 customers (5 Lead, 5 Active, 5 Inactive).

### 3. Frontend Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The frontend starts on **http://localhost:3000**.

## Routes

| Route | Description |
|-------|-------------|
| `/auth` | Login and registration |
| `/dashboard` | CRM dashboard with stats and charts |
| `/customers` | Customer table with search and filter |
| `/customers/[id]` | Customer detail with leads and invoice generation |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/customers?search=&status=` | List customers |
| POST | `/api/customers` | Create customer |
| PUT | `/api/customers/:id` | Update customer |
| DELETE | `/api/customers/:id` | Delete customer |
| GET/POST/PUT/DELETE | `/api/customers/:id/leads` | Lead CRUD |

## Chatbot Commands

| Command | Action |
|---------|--------|
| `help` | List all commands |
| `list customers` | Show customer names with status |
| `show customers` | Navigate to customers page |
| `add customer` | Navigate to add customer |
| `generate invoice` | Open customer detail for invoicing |

## Environment Variables

### Backend (`backend/.env`)

```
PORT=5000
CORS_ORIGIN=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/crm
JWT_SECRET=your_jwt_secret_here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=AdminPass123!
```

### Frontend (`frontend/.env`)

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

## Scripts

| Command | Location | Description |
|---------|----------|-------------|
| `npm run dev` | backend | Start Express dev server |
| `npm run seed` | backend | Seed 15 customers |
| `npm run dev` | frontend | Start Next.js dev server |
| `npm run build` | frontend | Production build |
| `npm test` | backend | Run API tests |
