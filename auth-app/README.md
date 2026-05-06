# Vanilla JS Auth App [Live](https://chaicode-freeapi-showcase.netlify.app/)

A lightweight, purely vanilla JavaScript single-page authentication application. It handles user registration, login, state management, and profile viewing using [FreeAPI](https://freeapi.app/) as the backend. Styled with Tailwind CSS.

## Features

- **Full Authentication Flow**: Register, Login, and Logout functionality.
- **JWT State Management**: Securely handles Access and Refresh tokens using `localStorage`.
- **Dynamic Profile Screen**: Displays user details with an automatic letter-fallback for broken or missing avatars.
- **UI/UX Polish**:
  - Custom toast notifications for success/error handling.
  - Button loading states (disables button and shows "Processing...").
  - Clean, responsive dark-theme UI powered by Tailwind CSS.
- **Client-Side Routing**: Smoothly switches between Register, Login, and Profile screens without page reloads.

## Tech Stack

- HTML5
- Vanilla JavaScript (ES Modules)
- Tailwind CSS (v4)
- REST API (via fetch)

## Local Setup

Since the application uses ES modules (`<script type="module">`) and Tailwind CSS imports, it is best run via a local development bundler like [Vite](https://vitejs.dev/).

### Prerequisites

- Node.js installed on your machine.
- `pnpm` installed, if not follow bellow instruction with `npm`

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/anoop-rajoriya/chaicode-freeapi-showcase
   cd chaicode-freeapi-showcase
   ```

2. **Install dependencies:**

   ```bash
   cd auth-app
   pnpm install
   ```

3. **Start the development server:**

   ```bash
   pnpm dev
   ```

4. **Open in Browser:**
   Navigate to the local URL provided in your terminal (usually `http://localhost:5173`).

## API Reference

This project is pre-configured to use the free tier of [FreeAPI](https://freeapi.app/).

- **Base URL:** `https://api.freeapi.app/api/v1/users`
- **Endpoints Used:** `/register`, `/login`, `/current-user`, `/logout`

> _(No external API keys are required to run this app locally)_
