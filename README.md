# Mini Task Management App

This is a simple todo app made with React and Express.js.

Its features are:

- A list of tasks
- Form for creating a new task
- Icons that show if a task is pending (⌛) or completed (✅)
- Buttons to update the status of a task (⌛ or ✅) or to delete the task (🗑️)

This app does not use any authentication nor authorization so it is not meant to be used in a production environment, only locally and for learning or personal purposes.

# How to set up and run the app

This application consists of a frontend and backend that need to run simultaneously. The project is set up with convenient scripts to handle this.

## Prerequisites

- Node.js and npm installed on your machine
- Git to clone the repository

## Installation & Running

1. Clone the repository and navigate to the project folder:

   ```bash
   git clone https://github.com/nicohorn/todo-app
   cd todo-app
   ```

2. Install the root project dependencies:

   ```bash
   npm install
   ```

3. Run the entire application (both frontend and backend):

   ```bash
   npm run dev
   ```

   This command will:

   - Install dependencies for both frontend and backend
   - Start the backend server on port 3001
   - Start the frontend development server (Vite)
   - Run both servers concurrently

## Alternative Setup

You can run the frontend and backend separately:

For backend only:

```bash
npm run start:backend
```

For frontend only:

```bash
npm run start:frontend
```

## Access Points

Once running, you can access:

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

#### Project structure

```
📂todo-app
┣ 📂backend
┃ ┣ 📜index.js
┃ ┗ 📜package.json
┣ 📂frontend
┃ ┣ 📂src
┃ ┃ ┣ 📂lib
┃ ┃ ┃ ┣ 📜todo_repository.ts
┃ ┃ ┃ ┗ 📜types.ts
┃ ┃ ┣ 📜App.tsx
┃ ┃ ┣ 📜index.css
┃ ┃ ┣ 📜main.tsx
┃ ┃ ┣ 📜TodoCard.tsx
┃ ┃ ┣ 📜TodoForm.tsx
┃ ┃ ┣ 📜TodoList.tsx
┃ ┣ 📜index.html
┃ ┣ 📜package.json
┣ 📜package.json
┗ 📜README.md
```

I've intentionally skipped some configuration files that aren't important.

## `/backend`

Has a single file, `index.js`, with an Express.js server configured to run in the port 5000 and a single endpoint `/tasks` that can handle four methods: `["GET", "POST", "PATCH", "DELETE"]`

It stores in memory a list of tasks and updates them or deletes them according to which method is the endpoint being called upon.

The Express.js server has `cors` allowed so that the frontend can talk to the backend.

## `/frontend`

React app set up with Vite using TypeScript and Tailwind for styling. The entry point is the `index.html` which is updated and handled by React through the `main.tsx` file.

### `/src` Structure

- **`App.tsx`**: Root component that provides the basic layout and renders the TodoList. Uses Tailwind for responsive styling with different widths for different screen sizes.

- **`main.tsx`**: Entry point for the React application. Sets up React Strict Mode and mounts the App component to the DOM.

- **`index.css`**: Global styles using Tailwind and custom CSS. Includes an animation for sliding in todo items.

- **Components**:
  - **`TodoList.tsx`**: Main container component that manages the todo state and operations. Implements loading states, error handling, and optimistic updates for better UX.
  - **`TodoCard.tsx`**: Individual todo item display with hover animations and interactive status/delete buttons. Shows task number, description, completion status (⌛/✅), and delete option (🗑️).
  - **`TodoForm.tsx`**: Form component for creating new todos with input validation and state management.

### `/src/lib`

- **`todo_repository.ts`**: Implements the Repository Pattern for data access:

  - `fetchTodos()`: GET request to retrieve all todos
  - `createTodo()`: POST request to add a new todo
  - `updateTodoStatus()`: PATCH request to toggle todo completion
  - `deleteTodo()`: DELETE request to remove a todo

- **`types.ts`**: Contains the Todo interface.
