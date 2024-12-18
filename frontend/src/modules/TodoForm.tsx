import { useState } from "react";

interface TodoFormProps {
  onCreateTodo: (description: string) => Promise<void>;
}

export default function TodoForm({ onCreateTodo }: TodoFormProps) {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      await onCreateTodo(description);
      setDescription(""); // Clear the input after successful creation
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  return (
    <form
      className="border border-gray-300 bg-gray-200 px-2 py-2 flex gap-2 rounded-md"
      onSubmit={handleSubmit}
    >
      <input
        className=" border px-2 outline-none placeholder:text-sm grow rounded-md"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter todo description"
      />
      <button
        className="px-2 text-sm hover:bg-orange-300 font-semibold rounded-md py-2 bg-gray-400 text-white border transition"
        type="submit"
      >
        Add Todo
      </button>
    </form>
  );
}
