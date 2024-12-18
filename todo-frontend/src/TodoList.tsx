import { useState, useEffect } from "react";
import { Todo } from "./lib/types";
import { createTodo, fetchTodos } from "./lib/todo_repository";
import TodoCard from "./TodoCard";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTodos() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        setTodos([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadTodos();
  }, []);

  const handleCreateTodo = async (description: string) => {
    try {
      const newTodo = await createTodo(description);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  if (isLoading) return <div>Loading todos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {todos.map((todo, idx) => (
        <TodoCard key={todo.id} todo={todo} idx={idx} />
      ))}
      <TodoForm onCreateTodo={handleCreateTodo} />
    </div>
  );
};

export default TodoList;
