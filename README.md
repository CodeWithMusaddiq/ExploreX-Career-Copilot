# ExploreX – Career Copilot

ExploreX is a full-stack career guidance platform built with the MERN stack. It helps students explore career paths, compare opportunities, build personalized roadmaps, connect with mentors, and manage career-related information through a centralized platform.

## 🚀 Features

- 🔐 JWT-based authentication
- 👤 Protected user profiles and routes
- 🧭 Career discovery and personalized guidance
- 📊 Career comparison
- 🗺️ Career roadmap generation
- 👨‍🏫 Mentor discovery and booking
- 📅 Booking conflict prevention
- 💬 Career guidance chat interface
- 🌐 Multilingual career guidance support
- 🛡️ Server-side input validation with Zod
- 🚦 API rate limiting
- 🔒 Helmet security headers and strict CORS
- 🧪 Backend integration testing
- 🗄️ MongoDB-based data persistence
- ⚡ RESTful backend APIs

## 🏗️ Tech Stack

### Frontend
- React
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Zod

### Testing & Security
- Jest
- Supertest
- Helmet
- express-rate-limit
- Zod validation

## 📂 Project Structure

```text
ExploreX/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── tests/
│   └── server.js
│
└── README.md
