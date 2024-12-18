import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

// Initialize with sample tasks
const tasks = [
  { id: 1, task: "Sample Task 1", completed: true },
  { id: 2, task: "Sample Task 2", completed: false },
];

// Parse JSON bodies
app.use(express.json());

// Allow requests from all origins
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "OPTIONS"], // Added DELETE to allowed methods
  })
);

// GET /tasks - Return all tasks
app.get("/tasks", (req, res) => {
  console.log("Sending tasks:", tasks);
  res.json(tasks);
});

// POST /tasks - Add a new task
app.post("/tasks", (req, res) => {
  const { task } = req.body;

  // Validate request body
  if (!task) {
    return res.status(400).json({ error: "Task description is required" });
  }

  // Create new task object
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    task: task,
  };

  tasks.push(newTask);
  res.status(201).json(newTask); // Using 201 Created status
});

// DELETE /tasks/:id - Delete a task by ID
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send(); // Using 204 No Content status
});

app.listen(port, () => {
  console.log(`Task API running on port: ${port}`);
});
