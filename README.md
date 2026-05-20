# techassessment_sandro_torres

Backend API developed with NestJS, Prisma, PostgreSQL, and Docker.

The project implements JWT authentication and a protected task management system where authenticated users can create, list, update, and delete their own tasks.

---

# Features

- User registration
- User login with JWT authentication
- Protected routes using JWT guards
- Create tasks
- List tasks by authenticated user
- Update tasks
- Delete tasks
- Unit testing with Jest

---

# Technologies Used

- NestJS
- Prisma ORM
- PostgreSQL
- Docker & Docker Compose
- JWT Authentication
- Jest

---

# Architecture

This project follows the principles of Clean Architecture.

The codebase is separated into layers:

## Domain
- Entities
- Repository contracts

## Application
- DTOs
- Use cases
- Business logic

## Infrastructure
- Prisma repositories
- JWT strategy and guards
- External implementations

## Presentation
- Controllers
- Modules
- HTTP layer

This separation helps maintain scalability, testability, and low coupling between business logic and infrastructure.

---

# Running the Project

## 1. Clone the repository

```bash
git clone https://github.com/sandrotg/techassessment_sandro_torres.git
```

## 2. Move into the project

```bash
cd techassessment_sandro_torres
```

## 3. Install backend dependencies

```bash
cd apps/backend
npm install
```

## 4. Return to project root

```bash
cd ../..
```

## 5. Start the containers

```bash
docker compose up --build
```

---

# Important Notes

- No `.env` file is required.
- Prisma migrations are already included in the repository.
- Environment variables were intentionally configured directly inside `docker-compose.yml` to simplify the evaluation process.
- Database migrations are automatically applied when the backend container starts.

---

# API

## Base URL

```txt
http://localhost:3000/
```

---

# Available Endpoints

## Health

```http
GET /health
```

## Users

### Register User

```http
POST /users/register
```

Example payload:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456"
}
```

---

### Login

```http
POST /users/login
```

Example payload:

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

The login endpoint returns a JWT token.

---

# Authentication

Protected endpoints require the following header:

```http
Authorization: Bearer YOUR_TOKEN
```

---

# Tasks Endpoints (Protected)

## Create Task

```http
POST /tasks
```

You cans send or not a end date.

Example payload:

```json
{
  "title": "Finish technical assessment",
  "description": "Complete backend implementation",
  "completed": false
}
```

---

## Get User Tasks

```http
GET /tasks
```

Returns only the authenticated user's tasks.

---

## Update Task

```http
PUT /tasks/:id
```

Partial updates are supported, so it is not necessary to send all fields.

Example payload:

```json
{
  "completed": true
}
```

---

## Delete Task

```http
DELETE /tasks/:id
```

---

# Running Tests

Tests must be executed from:

```bash
apps/backend
```

## Register Use Case Test

```bash
npm test -- register.use-case.spec.ts
```

## Create Task Use Case Test

```bash
npm test -- create-task.use-case.spec.ts
```
