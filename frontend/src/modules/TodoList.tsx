import { useState, useEffect } from "react";
import { Todo } from "../lib/types";
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  updateTodoStatus,
} from "../lib/todo_repository";
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
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      console.error("Error creating todo:", error);
    }
  };

  const handleTodoUpdate = async (todo_id: number) => {
    try {
      //Optimistic update
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todo_id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      await updateTodoStatus(todo_id);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleTodoDelete = async (todo_id: number) => {
    try {
      //Optimistic update
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todo_id));
      await deleteTodo(todo_id);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  if (isLoading) return <div>Loading todos...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {todos.map((todo, idx) => (
        <TodoCard
          onUpdateTodoStatus={handleTodoUpdate}
          onDeleteTodo={handleTodoDelete}
          key={todo.id}
          todo={todo}
          idx={idx}
        />
      ))}
      <TodoForm onCreateTodo={handleCreateTodo} />
    </div>
  );
};

export default TodoList;
