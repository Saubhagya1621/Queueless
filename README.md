# <h1 align="center">🎫 QueueLess</h1>

<div align="center">
  <h3><strong>"Skip the queue, not your turn"</strong></h3>
  <p><strong>Real-Time Digital Queue & Token Management Platform</strong></p>

[![Made with React](https://img.shields.io/badge/Frontend-React_19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com)
[![Socket.io](https://img.shields.io/badge/Realtime-Socket.io-010101?style=for-the-badge&logo=socketdotio)](https://socket.io)
[![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Timeline](https://img.shields.io/badge/Timeline-Hackathon%20MVP%202026-orange?style=for-the-badge&logo=calendar&logoColor=white)]()
[![License](https://img.shields.io/badge/License-MIT%20Licensed-blue?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://opensource.org/licenses/MIT)

---
> QueueLess is a smart, real-time digital queue and token management system that eliminates the need for customers to stand in physical waiting lines at hospitals, banks, and government offices.

</div>

---

## 📋 Table of Contents
* [🎯 Project Theme](#-project-theme)
* [🚨 Problem Statement](#-problem-statement)
* [✅ Solution & Core Value Proposition](#-solution--core-value-proposition)
* [🛠️ Complete Tech Stack Details](#️complete-tech-stack-details)
* [📁 Project Structure](#-project-structure)
* [🚀 Setup and Run Instructions](#-setup-and-run-instructions)
* [📡 API Endpoints Reference](#-api-endpoints-reference)
* [🤝 User Roles](#-user-roles)
* [🔮 Future Roadmap](#-future-roadmap)
* [👥 Team Identity & Roles](#-team-identity--roles)
* [📄 License](#-license)

---

## 🎯 Project Theme
* **Theme Selection:** Smart Token Management and Appointment Platform.
* **Context:** Developed as a high-fidelity **Hackathon MVP** for the *TechPreneur Industrial Training 2026* organized by *Gryork Consultants Pvt. Ltd.*
* **Document Version:** v1.0 (June 2026).

---

## 🚨 Problem Statement
 
<p align="justify">Long waiting queues remain a major challenge across India in hospitals, banks, government offices, and service centres. Traditional systems rely on manual processes and physical waiting lines, leading to:</p>
 
- 🕐 Long physical waiting times
- 👥 Overcrowded waiting areas
- ❓ Lack of transparency in queue status
- 📋 Inefficient manual token handling
- 📊 No real-time updates or notifications

<p align="justify">A recent **Frontline (The Hindu)** report on *"Queue Republic: India, Time Poverty and Urban Inequality"* highlights how citizens spend significant amounts of time waiting for essential services — a form of time poverty affecting productivity and quality of life.</p>

---

## ✅ Solution & Core Value Proposition

QueueLess addresses these challenges through:
 
- 🎫 **Virtual Token Generation** — join queues digitally from anywhere
- 📍 **Real-Time Queue Tracking** — live position updates without refreshing
- 🔔 **Live Notifications** — get notified when your turn approaches
- 📊 **Analytics Dashboard** — data-driven operational insights for admins
- ⚡ **Socket.io Powered** — instant synchronisation across all connected users

---

## 🛠️ Complete Tech Stack Details

<div align = "center">
<h2><strong>Frontend</strong></h2>

| Technology | Purpose |
|---|---|
| **React 19** | UI library with component-based architecture |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS** | Utility-first styling with dark mode support |
| **React Router DOM** | Client-side routing and navigation |
| **Socket.io Client** | Real-time live queue updates |
| **Axios** | HTTP client for API communication |
| **React Hot Toast** | Toast notifications |
</div>
 
<div align = "center">
<h2><strong>Backend</strong></h2>

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web framework for REST APIs |
| **MongoDB Atlas** | Cloud NoSQL database |
| **Mongoose** | MongoDB ODM for schema modelling |
| **Socket.io** | Real-time bidirectional communication |
| **JWT (jsonwebtoken)** | Secure authentication tokens |
| **bcryptjs** | Password hashing |
| **cookie-parser** | HTTP cookie handling |
| **dotenv** | Environment variable management |
| **cors** | Cross-origin resource sharing |
</div>

<div align = "center">
<h2><strong>Architecture</strong></h2>
</div>

- **MERN Stack** — MongoDB, Express, React, Node.js
- **REST API** — structured API endpoints with role-based access
- **WebSockets** — Socket.io for real-time synchronisation
- **RBAC** — Role-Based Access Control (user / operator / admin)
- **JWT + HttpOnly Cookies** — secure, stateless authentication

---

## 📁 Project Structure

```text
queueless/
├── backend/                                        # Node.js + Express backend
│   ├── node_modules/
│   ├── src/ 
│   │   ├── controllers/                            # Business logic
│   │   │   ├── admin.controller.js
│   │   │   ├── auth.controller.js
│   │   │   ├── operator.controller.js
│   │   │   └── serviceCenter.controller.js
│   │   ├── middlewares/                            # JWT verification, role check
│   │   │   └── auth.middleware.js
│   │   ├── models/                                 # Mongoose schemas
│   │   │   ├── serviceCenter.model.js
│   │   │   ├── token.model.js
│   │   │   └── user.model.js
│   │   ├── routes/                                 # Express route definitions
│   │   │   ├── admin.routes.js
│   │   │   ├── auth.routes.js
│   │   │   ├── operator.routes.js
│   │   │   └── serviceCenter.routes.js
│   │   └── utils/                                  # DB connection, token generator
│   ├── index.js                                    # App entry point with Socket.io
│   ├── seed.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
├── frontend/                                     # React + Vite frontend
│   ├── node_modules/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/                          # Reusable components (Navbar, ProtectedRoute)
│   │   ├── context/                             # AuthContext, ThemeContext
│   │   ├── data/                                 
│   │   ├── hooks/                               # Custom hooks (useAuth, useTheme)
│   │   ├── pages/                               # All 8 pages
│   │   │   ├── AdminOverview.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MyToken.jsx
│   │   │   ├── OperatorDashboard.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ServiceDetail.jsx
│   │   ├── socket/                              # Socket.io client setup
│   │   ├── utils/                               # API functions and axios instance
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Setup and Run Instructions

### Prerequisites
 
Make sure you have these installed:
- [Node.js](https://nodejs.org) v18 or above
- [Git](https://git-scm.com)
- A [MongoDB Atlas](https://cloud.mongodb.com) account
### 1. Clone the Repository
 
```bash
git clone https://github.com/Saubhagya1621/Queueless.git
cd Queueless
```
 
### 2. Setup Backend
 
```bash
cd backend
npm install
```
 
Create a `.env` file inside the `backend` folder:
 
```env
PORT=8000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=queueless_secret_key
CORS_ORIGIN=http://localhost:5173
```
 
Seed the database with test data:
 
```bash
node src/seed.js
```
 
Start the backend server:
 
```bash
npm run dev
```
 
Backend runs at `http://localhost:8000`
 
### 3. Setup Frontend
 
Open a new terminal:
 
```bash
cd frontend
npm install
npm run dev
```
 
Frontend runs at `http://localhost:5173`
 
### 4. Test Login Credentials
 
| Role | Email | Password |
|---|---|---|
| Customer | user@test.com | 123456 |
| Operator | operator@test.com | 123456 |
| Admin | admin@test.com | 123456 |
 
> Use the quick-fill buttons on the Login page to auto-fill credentials.

---

## 📡 API Endpoints Reference

<div align = "center">
<h2>Auth</h2>

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
</div>
 
<div align = "center"> 
<h2>Service Centers</h2>

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/servicecenter` | Get all service centers | No |
| GET | `/api/servicecenter/:id` | Get service center by ID | No |
| POST | `/api/servicecenter/join` | Join a queue | Yes |
| GET | `/api/servicecenter/token/my-token` | Get my active token | Yes |
| PATCH | `/api/servicecenter/token/:id/cancel` | Cancel token | Yes |
</div>
<div align="center">
<h2>Operator</h2>

| Method | Endpoint | Description | Role |
|---|---|---|---|
| GET | `/api/operator/queue/:counterId` | Get queue for counter | Operator |
| PATCH | `/api/operator/call-next` | Call next token | Operator |
| PATCH | `/api/operator/skip/:id` | Skip token | Operator |
| POST | `/api/operator/walk-in` | Add walk-in | Operator |
</div>
<div align="center">
<h2>Admin</h2>

| Method | Endpoint | Description | Role |
|---|---|---|---|
| GET | `/api/admin/overview` | Get full overview | Admin |
| PATCH | `/api/admin/counter/:centerId/:counterId` | Toggle counter status | Admin |
</div>
---

## 🤝 User Roles

```
Customer  →  Browse centers → Join queue → Track token → Cancel token
Operator  →  View queue → Call next → Skip → Add walk-in
Admin     →  Monitor all counters → View analytics → Open/close counters
```

---

## 🔮 Future Roadmap

| Phase | Planned Features |
|---|---|
| **Phase 2** | SMS Notifications · Mobile App · Appointment Scheduling · QR-Based Queue Joining |
| **Phase 3** | Smart Counter Allocation · Predictive Queue Analytics · Multi-Language Support |

---

## 👥 Team Identity & Roles
<div align="center">
<h2><strong>Team Name: <b>NextUp</b><strong></h2>
</div>

| Team Member | Official Designation & Responsibilities | ID |
| :--- | :--- | :--- |
| **Saubhagya Srivastava** | Full Stack Lead & Team Coordination | TECHA84998 |
| **Sarvesh Kumar** | Backend Developer | TECHDAC0C8 |
| **Shalini Yadav** | Frontend Developer | TECH012FF3 |
| **Sumit Kumar** | Testing & Documentation | TECHA12F49 |


*Built with ❤️ for TechPreneur Industrial Training 2026*

---

## 📄 License

Distributed under the MIT License. See the internal repository LICENSE details for full operational terms and permissions.

