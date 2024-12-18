import { Todo } from "../lib/types";

interface TodoCardProps {
  todo: Todo;
  idx: number;
  onUpdateTodoStatus: (todo_id: number) => Promise<void>;
  onDeleteTodo: (todo_id: number) => Promise<void>;
}

//Pass the index only to enumerate the tasks in the card
export default function TodoCard({
  todo,
  idx,
  onUpdateTodoStatus,
  onDeleteTodo,
}: TodoCardProps) {
  return (
    <div className="flex justify-between my-1 rounded-md border px-2 py-2 todo-item group hover:border-gray-300 transition">
      <span className="flex gap-2">
        <p className=" bg-slate-800 px-2 font-bold rounded-full text-white">
          {idx + 1}
        </p>
        <p className={`${todo.completed && "line-through text-gray-400"}`}>
          {todo.task}
        </p>
      </span>
      <span
        onClick={() => onUpdateTodoStatus(todo.id)}
        title={`Change state to ${todo.completed ? "Pending" : "Completed"}`}
        className="transition cursor-pointer active:scale-90 hover:scale-125"
      >
        {todo.completed ? "✅" : "⌛"}
      </span>
      <span
        onClick={() => {
          onDeleteTodo(todo.id);
        }}
        title="Delete"
        className="cursor-pointer opacity-0 active:scale-90 hover:scale-125 group-hover:opacity-100 absolute -right-8 transition"
      >
        🗑️
      </span>
    </div>
  );
}
