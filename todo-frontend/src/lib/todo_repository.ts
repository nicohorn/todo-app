export async function fetchTodos() {
  const response = await fetch("http://localhost:3001/tasks", { mode: "cors" });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function createTodo(todo_description: string) {
  const response = await fetch("http://localhost:3001/tasks", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ task: todo_description }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
