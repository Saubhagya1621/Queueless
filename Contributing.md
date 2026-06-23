<div align="center">

# Contributing to QueueLess

Thank you for your interest in contributing to **QueueLess**! 🎉

QueueLess is a real-time digital queue and token management platform designed to minimize physical waiting times and improve service efficiency through virtual token generation, live queue tracking, and real-time notifications.

This document describes the development workflow, coding standards, team responsibilities, and contribution practices followed during the development of the project.

</div>

---

# Table of Contents

1. Technology Stack
2. Project Status
3. Team Structure & Feature Distribution
4. Git Branching Strategy
5. Contribution Workflow
6. Commit Message Convention
7. Issue Tracking and Communication
8. Pull Request Policy
9. Coding Standards
10. General Contribution Guidelines
11. Getting Started
12. Best Practices
13. Acknowledgements
14. Code of Conduct
15. License

---

# Technology Stack

## Frontend

* React 19
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Socket.io Client
* React Hot Toast

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Socket.io
* JWT Authentication
* bcrypt.js

## Version Control

* Git
* GitHub

---

# Project Status

> 🚧 QueueLess is currently under active development as a Hackathon MVP and has not yet been deployed.

---

# Team Structure & Feature Distribution

| Team Member              | Role                               | Responsibilities                                                                                                                                                                         |
| ------------------------ | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Saubhagya Srivastava** | Full Stack Lead & Team Coordinator | Responsible for project architecture, backend development, authentication, database integration, API design, and frontend integration while coordinating overall development activities. |
| **Sarvesh Kumar**        | Backend Developer                  | Contributed to backend development, frontend implementation, and feature integration across various modules of the application.                                                          |
| **Shalini Yadav**        | Frontend Developer                 | Responsible for user interface development, component implementation, responsive design, styling, and user experience enhancements, with additional support for backend integration.     |
| **Sumit Kumar**          | Documentation Support              | Assisted with documentation activities and contributed to the preparation of the Product Requirements Document (PRD).                                                                    |

---

# Feature Distribution

## 🛠 Backend Development

### Modules

* Authentication and Authorization
* API Development
* Database Integration
* Queue Management Logic
* Real-Time Communication

### Contributors

* Saubhagya Srivastava
* Sarvesh Kumar
* Shalini Yadav

---

## 🎨 Frontend Development

### Modules

* User Interface Development
* Component Design
* Responsive Layouts
* Tailwind CSS Styling
* API Integration

### Contributors

* Shalini Yadav
* Sarvesh Kumar
* Saubhagya Srivastava

---

## 📄 Documentation

### Modules

* Product Requirements Document (PRD)
* Project Documentation
* Validation Support

### Contributor

* Sumit Kumar

---

# Git Branching Strategy

QueueLess follows a lightweight collaboration model suitable for rapid hackathon development.

```text
main
```

* All team members are added as collaborators to the repository.
* Contributors push changes directly to the `main` branch.
* Significant changes are communicated and discussed among team members before integration.
* Frequent commits are encouraged to maintain version history and simplify debugging.
* Team coordination helps minimize merge conflicts and ensures smooth development.

---

# Contribution Workflow

QueueLess follows an iterative and communication-driven development process.

```text
Develop Feature
      ↓
Commit Changes
      ↓
Push to main
      ↓
Discuss with Team
      ↓
Continue Development
```

## Development Process

1. Team members implement new features or bug fixes.
2. Changes are committed with meaningful commit messages.
3. Updates are pushed directly to the repository.
4. Major changes are discussed collaboratively.
5. Continuous feedback ensures smooth integration.
6. Frequent commits help maintain a clear development history.

This streamlined workflow enables rapid development during the Hackathon MVP phase.

---

# Commit Message Convention

QueueLess follows the **Conventional Commits** specification to maintain a clean and understandable commit history.

## Commit Types

| Type        | Description                                       |
| ----------- | ------------------------------------------------- |
| `feat:`     | Introduces a new feature                          |
| `fix:`      | Fixes a bug                                       |
| `docs:`     | Documentation changes                             |
| `style:`    | UI and formatting improvements                    |
| `refactor:` | Code restructuring without changing functionality |
| `test:`     | Adding or updating tests                          |
| `chore:`    | Maintenance tasks and dependency updates          |

## Examples

```text
feat: add digital token generation
fix: resolve socket connection issue
docs: update README and PRD
style: improve dashboard responsiveness
refactor: optimize queue update logic
```

Following consistent commit conventions improves readability and simplifies collaboration.

---

# Issue Tracking and Communication

During the Hackathon MVP phase, QueueLess adopts a lightweight communication-driven approach for managing features, bugs, and development discussions.

## Communication Channels

* Team members primarily communicate through messaging platforms.
* Features and bug fixes are discussed collaboratively before implementation.
* Major modifications are communicated among contributors to avoid conflicts.
* Continuous feedback enables rapid iteration and faster development.

## Issue Resolution Workflow

```text
Identify Issue
      ↓
Discuss with Team
      ↓
Implement Fix
      ↓
Commit Changes
      ↓
Push to Repository
```

---

# Pull Request Policy

Due to the small team size and rapid development cycle, Pull Requests are not mandatory during the Hackathon MVP phase.

* Contributors push changes directly to the repository.
* Team members coordinate changes through discussion and collaboration.
* Significant modifications are reviewed informally before further development.

This lightweight workflow enables faster iteration and efficient teamwork.

---

# Coding Standards

To ensure consistency, maintainability, and readability across the codebase, contributors are expected to follow the coding practices adopted by the QueueLess team.

## General Guidelines

* Use meaningful and descriptive variable names.
* Write modular and reusable components and functions.
* Maintain a consistent folder structure.
* Follow proper indentation and formatting practices.
* Keep functions focused on a single responsibility.
* Add comments where necessary to improve code readability.
* Avoid code duplication and promote reusability.
* Prefer clear and maintainable solutions over unnecessary complexity.

---

## Frontend Standards

* Build reusable React components.
* Use Tailwind CSS utilities consistently.
* Maintain separation between UI components and business logic.
* Keep component files organized and easy to understand.
* Ensure responsive design across different screen sizes.

---

## Backend Standards

* Follow RESTful API design principles.
* Separate controllers, routes, models, and middleware.
* Keep business logic modular and maintainable.
* Implement proper validation and error handling.
* Ensure secure authentication and authorization practices.

---

## Code Quality

* Write clean and readable code.
* Test features before pushing changes.
* Maintain consistency with existing project conventions.
* Ensure new changes do not break existing functionality.

---

# General Contribution Guidelines

Contributors are encouraged to follow these practices:

1. Understand the existing project structure before making changes.
2. Maintain consistency with the established architecture and coding standards.
3. Write meaningful commit messages following the Conventional Commits specification.
4. Communicate significant changes with the team before implementation.
5. Verify functionality before pushing updates.
6. Keep code modular, reusable, and maintainable.
7. Update documentation whenever necessary.

---

# Getting Started

Follow the steps below to set up QueueLess locally.

## Clone the Repository

```bash
git clone <repository-url>
cd queueless
```

---

## Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## Install Backend Dependencies

```bash
cd ../backend
npm install
```

---

## Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

---

## Start the Backend Server

```bash
cd backend
npm start
```

---

# Best Practices

* Prioritize readability and maintainability.
* Avoid unnecessary dependencies.
* Reuse existing components whenever possible.
* Follow separation of concerns.
* Keep functions and components focused on a single responsibility.
* Perform frequent commits to preserve development history.
* Collaborate actively with other team members.

---

# Code of Conduct

All contributors are expected to maintain a collaborative and respectful environment.

* Treat fellow contributors with respect and professionalism.
* Encourage constructive feedback and open communication.
* Support knowledge sharing and teamwork.
* Maintain an inclusive and positive development environment.
* Focus on collaboration and continuous improvement.

---

# License

QueueLess is licensed under the **MIT License**.

By contributing to this project, contributors agree that their contributions will be governed by the terms and conditions of the MIT License.

---

# Acknowledgements

QueueLess is being developed collaboratively by:

* **Saubhagya Srivastava** — Full Stack Lead & Team Coordinator
* **Sarvesh Kumar** — Backend Developer
* **Shalini Yadav** — Frontend Developer
* **Sumit Kumar** — Documentation Support

The team values collaboration, knowledge sharing, and continuous improvement throughout the development process.

---

Thank you for contributing to **QueueLess**! 🚀

Together, we aim to build a smarter and more efficient queue management experience.

