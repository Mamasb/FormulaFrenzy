# Formula Frenzy

**Formula Frenzy** is an educational math game designed to engage students in grades 7–9 with interactive math challenges that help improve their understanding of complex formulas. Built with React, TypeScript, and Vite, the project leverages modern web technologies to provide a fast, scalable, and maintainable single-page application (SPA).

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Setup and Installation](#setup-and-installation)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For static type checking and improved code maintainability.
- **Vite**: A fast build tool and development server.
- **React Router**: For client-side routing between pages (Home, Game, Login, Register).
- **CSS**: For styling components.

## Project Structure

The project is organized as follows:


## How It Works

1. **`public/index.html`**  
   This HTML file contains the basic scaffold for the application. It includes a `<div>` with an ID of `root`, which serves as the mounting point for the React app. It also loads the entry module at `/src/main.tsx`.

2. **`src/main.tsx`**  
   The entry point for the React application. This file:
   - Imports React and ReactDOM.
   - Wraps the app in a `<BrowserRouter>` to enable client-side routing.
   - Mounts the main `<App />` component into the `root` div.

3. **`src/App.tsx`**  
   The main app component, which defines the routes using React Router. It maps URL paths (such as `/`, `/game`, `/login`, and `/register`) to the corresponding page components.

4. **Page Components (`src/pages/`)**  
   Each page component represents a different section of the application:
   - **Home.tsx**: The landing page that welcomes users and provides navigation to start the game.
   - **Game.tsx**: The game interface where math questions are displayed and user input is processed.
   - **Login.tsx**: A basic login form for user authentication.
   - **Register.tsx**: A form to register new users.

5. **Routing**  
   Using React Router’s `<Routes>` and `<Route>` components, the application dynamically renders the appropriate page based on the current URL without needing to reload the page.

## Setup and Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**

   ```bash
   git clone [repository-url]
   cd formula-frenzy-frontend
