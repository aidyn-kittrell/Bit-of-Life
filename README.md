# Bit-of-Life

## Overview

**Bit-of-Life** is an interactive and educational web application that simulates Conway's Game of Life, a classic example of cellular automata. This project combines creative front-end development, responsive design, and back-end functionality to create a dynamic web platform.

The application allows users to interact with a grid of cells, observe evolving patterns, and manage user accounts with authentication and administrative controls.

## Features

### Frontend
- **Dynamic Game Grid**: A resizable grid where cells can be toggled between alive and dead states.
- **Game Controls**:
  - Start, Stop, Next Generation, +23 Generations, and Reset buttons.
  - Dropdown to load predefined patterns (e.g., Block, Blinker, Beehive, Toad).
- **Responsive Design**: Built with modern CSS techniques for mobile-first design.
- **Real-Time Updates**: React.js components for live updates of the grid and generation count.

### Backend
- **User Authentication**:
  - Registration and login with hashed passwords.
  - Role-based access control (Player and Admin).
- **Admin Dashboard**:
  - View analytics (total users, games played, top users).
  - Suspend/ban users.
  - Visualize data with charts (Google Charts).
- **Database Integration**:
  - MySQL tables for users, game sessions, and patterns.
  - Session management for user login states.

## Project Structure
.
├── backend
│   ├── admin-dashboard.php
│   ├── admin.php
│   ├── database.php
│   ├── login.php
│   ├── logout.php
│   ├── player.php
│   ├── redirect.php
│   ├── register.php
│   └── suspend-user.php
├── frontend
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── GameGrid.css
│   │   ├── GameGrid.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── vite.config.js
├── LICENSE
└── README.md

## Installation

### Prerequisites
- Node.js and npm installed.
- PHP and MySQL server installed.

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd Bit-of-Life/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Configure the database connection in backend/database.php.
2. Start a local PHP server in the backend directory:
   ```bash
   php -S localhost:8000
   ```

## Usage
1. Open the frontend in your browser (default: http://localhost:5173).
2. Register a new user or log in with an existing account.
3. Interact with the game grid and use the control buttons to simulate Conway's Game of Life.
4. Admin users can access the admin dashboard to manage users and view analytics.

## Technologies Used
- **Frontend**: React.js, Vite, CSS
- **Backend**: PHP, MySQL
- **Database**: MySQL
- **Charts**: Google Charts

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- Inspired by Conway's Game of Life.
- Built as part of a web programming course project.
