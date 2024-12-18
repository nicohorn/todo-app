import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

// Initialize with sample tasks
let tasks = [
  { id: 1, task: "Sample Task 1", completed: true },
  { id: 2, task: "Sample Task 2", completed: false },
  { id: 3, task: "Sample Task 3", completed: false },
  { id: 4, task: "Sample Task 4", completed: false },
  { id: 5, task: "Sample Task 5", completed: false },
];

// Parse JSON bodies
app.use(express.json());

// Allow requests from all origins
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"],
  })
);

// GET /tasks - Return all tasks
app.get("/tasks", (_, res) => {
  console.log("Sending tasks", tasks);
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
    completed: false,
  };

  tasks.push(newTask);
  console.log("Created new task:", newTask);
  res.status(201).json(newTask);
});

// DELETE /tasks/:id - Delete a task by ID
app.delete("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  console.log("Deleting task:", tasks[taskIndex]);
  tasks.splice(taskIndex, 1);

  res.status(204).send();
});

// PATCH /tasks/:id - Update the status of a task by ID
app.patch("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  console.log("Updated task:", tasks[taskIndex]);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Task API running on port: ${port}`);
});
