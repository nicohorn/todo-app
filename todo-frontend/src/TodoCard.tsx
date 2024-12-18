import { Todo } from "./lib/types";

export default function TodoCard({ todo, idx }: { todo: Todo; idx: number }) {
  return (
    <div className="flex justify-between my-1 border px-2 py-1 todo-item">
      <span>
        {idx + 1}. {todo.task}
      </span>
      <span>{todo.completed ? "✅" : "⌛"}</span>
    </div>
  );
}
