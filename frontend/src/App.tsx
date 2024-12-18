import TodoList from "./components/TodoList";

export default function App() {
  return (
    <main className="flex w-screen mt-20 justify-center items-center">
      <div className="xl:w-[30%] md:w-[50%] w-[80%]">
        <h1 className="text-3xl my-5 uppercase font-bold">Todo App</h1>
        <TodoList />
      </div>
    </main>
  );
}
