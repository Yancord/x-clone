# X Clone – Full Stack Microblogging Application

A simple full-stack microblogging application inspired by X (Twitter).  
Users can register, log in, create posts, and view a global feed.

This project focuses on **clean architecture, full-stack implementation, and code quality**, rather than heavy UI styling.

---

## Tech Stack

### Frontend
- Next.js (App Router)
- React (Server & Client Components)
- TypeScript
- Tailwind CSS

### Backend
- Next.js Route Handlers (REST API)
- Prisma ORM
- PostgreSQL (Neon)

### Authentication
- iron-session (cookie-based authentication)
- bcrypt (password hashing)

### Deployment
- Vercel
- Neon PostgreSQL

---

# Features

- User registration
- User login & logout
- Session-based authentication
- Protected routes via middleware
- Global feed (all posts)
- User profile page (own posts)
- Post creation (max 280 characters)
- Server-side rendering
- Secure password hashing



## Design Decisions

### 1. Next.js App Router
Chosen for:
- Built-in routing
- Server Components support
- Clean separation of client and server logic
- Seamless Vercel deployment

### 2. REST API via Route Handlers
Instead of a separate Express server:
- Cleaner monolithic structure
- Easier deployment
- Shared types between frontend and backend

### 3. Prisma + PostgreSQL (Neon)
Prisma provides:
- Type-safe database access
- Migrations
- Clean data modeling

Neon was chosen for:
- Serverless PostgreSQL
- Free tier
- Easy Vercel integration

### 4. iron-session Authentication
Selected instead of JWT for:
- Simplicity
- Secure HTTP-only cookies
- Better integration with Server Components

Sessions are:
- Encrypted
- Stored in cookies
- Validated server-side
- Destroyed on logout

### 5. Middleware Protection
Middleware ensures:
- Unauthenticated users cannot access protected routes
- Logged-in users cannot access login/register pages
- Clean access control

---

# Assumptions & Scope

- Users can only create posts for themselves.
- Users cannot access other users' profile pages.
- The global feed displays all posts.
- UI is intentionally minimal (focus on architecture).
- No pagination (simplified scope).
- No follow/like system.
- No image uploads.

The primary focus was functionality and structure.

---

# Local Development Setup

## 1. Clone Repository

git clone https://github.com/Yancord/x-clone.git

cd x-clone


## 2. Install Dependencies

npm install

## 3. Environment Variables

Create a `.env` file in the root:

DATABASE_URL=your_neon_database_url

DIRECT_URL=your_neon_direct_url

SESSION_PASSWORD=your_long_random_secret

NEXT_PUBLIC_APP_URL=http://localhost:3000

`SESSION_PASSWORD` must be at least 32 characters.

## 4. Generate Prisma Client

npx prisma generate

## 5. Run Migrations

npx prisma migrate dev


## 6. Seed Database (Optional)

npm run db:seed

## 7. Start Development Server

npm run dev

Open:

http://localhost:3000


# Production Build

To test production locally:

npm run build
npm start


---

# Deployment (Vercel)

1. Push project to GitHub.
2. Import repository in Vercel.
3. Add environment variables:
   - DATABASE_URL
   - DIRECT_URL
   - SESSION_PASSWORD
4. Deploy.

---

# Security Considerations

- Passwords are hashed with bcrypt.
- Sessions use HTTP-only cookies.
- Middleware protects restricted routes.
- Users cannot post as other users.
- Server-side validation for all inputs.

---

# Future Improvements

- Pagination
- Edit/Delete posts
- Avatar upload
- Dark mode
- Testing (unit + E2E)
- Rate limiting
- CI/CD pipeline

---

# Summary

This project demonstrates:

- Full-stack Next.js development
- Server & Client Components
- Secure session authentication
- Prisma + PostgreSQL integration
- Route protection with middleware
- Clean and maintainable architecture

The focus was on clarity, architecture, and functionality, as required.


