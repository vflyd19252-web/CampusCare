# CampusCare — Student Backend

Separate Node.js/Express/MySQL API for the student/client side only. Admin APIs are intentionally not included.

## Included
- Student registration/login; passwords are bcrypt-hashed.
- JWT-protected student profile.
- Create complaint with optional JPG/PNG/WEBP image (5 MB maximum).
- List only the logged-in student's complaints.
- View own complaint details and status timeline.

## Setup
1. Install Node.js 18+ and MySQL 8+.
2. Run `database/schema.sql` in MySQL Workbench. It creates database `campuscare` and tables `students`, `complaints`, `complaint_updates`.
3. Copy `.env.example` to `.env`; enter your MySQL password and set a long random `JWT_SECRET`. Never upload `.env`.
4. In this folder run `npm install`, then `npm run dev`.
5. Check `http://localhost:5000/api/health`.

## API
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | API + database health |
| POST | `/api/student/auth/register` | Register |
| POST | `/api/student/auth/login` | Login |
| GET | `/api/student/auth/me` | Current student profile |
| POST | `/api/student/complaints` | Submit complaint |
| GET | `/api/student/complaints` | List own complaints |
| GET | `/api/student/complaints/:id` | Own details + timeline |

For protected routes send `Authorization: Bearer TOKEN`. Register JSON fields: `name`, `rollNo`, `email`, `department`, `semester`, optional `room`, `password`. Login fields: `email`, `password`. Complaint creation uses multipart fields `title`, `category`, `location`, `description`, optional file field `image`.

## Admin teammate integration
Use this same `campuscare` database and these same complaint tables. When admin changes status, update `complaints.status` and insert a corresponding row in `complaint_updates`. This package contains no admin endpoints.

## Frontend note
The React frontend currently has mock/localStorage logic. This API does not automatically replace it; student screens must be connected to these routes. Local API base URL: `http://localhost:5000`.
