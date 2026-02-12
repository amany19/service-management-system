# QuickFix Task: Real-Time Service Management System

## Project Overview

This project is a **Production-Ready Service Management System**, consisting of:

* **Admin Dashboard** – A React.js-based panel to monitor and manage service requests, users, and services.
* **Mobile Backend APIs** – Node.js/Express backend handling user authentication, service requests, and live updates.

The system implements **real-time synchronization**: any service request created via the API instantly updates the Admin Dashboard without page refresh.
* **API Documentation link** https://www.postman.com/aman77-6020/private-workspace/collection/37843902-807c2363-d712-4043-b479-81c75b0361fc/?action=share&creator=37843902
## Tech Stack

**Backend:**

* Node.js & Express.js
* Prisma ORM & MySQL
* Socket.io for real-time communication
* JWT Authentication

**Frontend (Admin Dashboard):**

* React.js (Vite)
* Tailwind CSS
* Socket.io-client
* Axios & React Router

## System Architecture

The project follows **Clean Architecture**:

```
Controllers → Services → Repositories → Database
```

* **Controllers:** Handle HTTP requests/responses
* **Services:** Contain business logic, password hashing, RBAC checks
* **Repositories:** Interact with Prisma ORM and database
* **Socket.io:** Provides live updates between backend and dashboard
* **RBAC:** Differentiates Admin and Mobile User permissions

## Features

**Admin Dashboard:**

* Live Monitor Table with instant Socket.io updates
* Status Management for service requests (Pending, In-Progress, Completed)
* Full CRUD for Users and Services

**Mobile Backend API:**

* User Authentication (Register/Login)
* Service Discovery
* Request Creation (`POST /api/requests`) with real-time notifications

**UI/UX Considerations:**

* Fully responsive layout
* Typography hierarchy and spacing for clarity
* Status badges for visual feedback
* Socket.io connection status indicator

## Setup Instructions

### Backend

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd backend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file:

   ```
   DATABASE_URL="mysql://user:password@localhost:3306/quickfix"
   JWT_SECRET="your_secret_key"
   ```
4. Run Prisma migrations:

   ```bash
   npx prisma migrate dev --name init
   ```
5. Start the backend server:

   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the Vite development server:

   ```bash
   npm run dev
   ```

### Postman

* Import `postman_collection.json` to test Mobile API and Admin flows.

## AI Usage Strategy

* Initialize the project architecture(front&back) first with a module(Repositories-Services-controllers) for Auth
* Review initialized module code using AI prompts
* Prompts were used to generate boilerplate code for Controllers, Services, Repositories.
* Prompts to generate UI components and pages
* AI-generated code was **refactored** for type safety, clean architecture, and production-readiness.
* Interfaces (`IUserService`, `IAuthRepository`) and type definitions (`UserType`, `SafeUser`) ensure strong typing.
* Manual testing ensured **real-time Socket.io updates** were functional.

## Code Quality Measures

* Clean Architecture separation
* Centralized error handling with backend middleware and clear frontend feedback
* TypeScript with service and repository interfaces
* Passwords hashed with bcrypt, JWT authentication, and RBAC enforced
* Real-time updates using Socket.io

## Evaluation Highlights

* Seamless integration between Mobile APIs and Admin Dashboard
* Organized, maintainable code structure
* Responsive, professional dashboard UI
* Efficient database design using Prisma relationships
