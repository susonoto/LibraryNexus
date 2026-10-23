# LibraryNexus — MERN Library Management System

A modern library operations dashboard built with **MongoDB, Express, React, and Node.js**. Includes book circulation tracking, 15-day return reminders by email, seat occupancy, library events, staff directory, important resources, and college website directory.

## Features
- **Circulation:** track which student has which book, issue date, due date, days remaining, and return status.
- **Email reminders:** daily scheduler emails students when a book is due soon or overdue. The default loan period is 15 days.
- **Seats:** occupancy status, student, start/end time, and availability.
- **Events:** upcoming and completed library events.
- **Staff:** head librarian, assistant, and staff directory.
- **Resources & college links:** one place for KIHAs, NPTEL, and configurable college websites.
- **Dashboard:** overview cards, recent circulation, due-soon list, and responsive navigation.
- **Light/dark neumorphic UI:** toggle theme; responsive layout; Lucide icons.

## Stack
- React + Vite
- Express + Node.js
- MongoDB + Mongoose
- Nodemailer + node-cron
- Lucide React icons

## Requirements
- Node.js 20+
- MongoDB local instance or MongoDB Atlas connection
- SMTP account if email reminders are required

## Run locally

### 1. Backend
```bash
cd server
cp .env.example .env
npm install
# Edit .env and set MONGODB_URI. Configure SMTP to send real email.
npm run seed
npm run dev
```
API runs at `http://localhost:5000`.

### 2. Frontend
In a second terminal:
```bash
cd client
npm install
npm run dev
```
Open the Vite URL shown in the terminal (usually `http://localhost:5173`).

## Email reminder configuration
Set these in `server/.env`:
```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-account@example.com
SMTP_PASS=your-app-password
MAIL_FROM=LibraryNexus <your-account@example.com>
REMINDER_HOUR=9
```
The scheduler runs daily at the configured hour and emails active loans due within 3 days or already overdue. Loan due dates are set to **15 days after issue** by default. Never commit real credentials. For Gmail, use an app password where applicable, not your normal account password.

## API overview
- `GET/POST /api/books`
- `GET/POST /api/loans`, `PATCH /api/loans/:id/return`
- `GET/POST /api/seats`
- `GET/POST /api/events`
- `GET/POST /api/staff`
- `GET/POST /api/resources`
- `GET/POST /api/websites`
- `GET /api/dashboard`
- `POST /api/reminders/run` (manual reminder trigger; protect this endpoint before production)

## Important production notes
This is a starter project, not a fully hardened institutional deployment. Before real use, add authentication and role-based permissions, audit logs, rate limiting, input validation, backups, HTTPS, CSRF protection where applicable, and restrict reminder-trigger access. Configure institutional privacy policy and email consent/retention practices. The included seed data is fictional demo data. Replace demo resources, staff, emails, and college links with verified official details.

## License
MIT — see [LICENSE](LICENSE).
