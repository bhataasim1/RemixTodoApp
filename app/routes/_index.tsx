import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Header } from "../components/Header";
import { getTodosFromLocalStorage, saveTodosToLocalStorage } from "../utils/todosLocalStorage";
import { Search, Plus, ListTodo, CheckCircle2, Clock, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { FilterTodos, Todos } from "../types/types";
import { TodosCard } from "../components/Todos";
import { filterTodos, searchTodo } from "../utils/filterTodos";

export const meta: MetaFunction = () => {
  return [
    { title: "Todo App - Organize Your Tasks" },
    { name: "description", content: "A modern todo app built with Remix" },
  ];
};

// export async function loader() {
//   if (typeof window !== "undefined") {
//     const todos = getTodosFromLocalStorage();
//     return json(todos);
//   }
//   return [];
// }

export default function Index() {
  // const todos = useLoaderData<typeof loader>();
  // console.log(todos);
  const [todos, setTodos] = useState<Todos[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<FilterTodos>("all");
  const [query, setQuery] = useState<string>("");

  // console.log("todos", todos);

  useEffect(() => {
    const todos = getTodosFromLocalStorage();
    // console.log("todos", todos);
    if (todos) {
      setTodos(todos);
    }
  }, []);

  function handleDeleteTodo(id: number) {
    if (!confirm("Are you sure you want to delete this todo?")) return;

    const deletedTodo = todos.filter((todo) => todo.id !== id);

    setTodos(deletedTodo);
    saveTodosToLocalStorage(deletedTodo);
  }

  const filteredTodosData = searchTodo(filterTodos(todos, filteredTodos), query);
  // console.log("filteredTodosData", filteredTodosData);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Search and Create Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search todos..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Link
              to="/create"
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>New Todo</span>
            </Link>
          </div>
        </div>

        {/* Filter Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setFilteredTodos("all")}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg bg-white border border-gray-200 ${filteredTodos === "all" && "border-purple-400 bg-purple-50 "} hover:border-purple-400 hover:bg-purple-50 transition-all font-medium`}>
            <ListTodo className="h-5 w-5 text-purple-600" />
            <span>All</span>
          </button>
          <button
            onClick={() => setFilteredTodos("completed")}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg bg-white border border-gray-200 ${filteredTodos === "completed" && "border-green-400 bg-green-50"} hover:border-green-400 hover:bg-green-50 transition-all font-medium`}>
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span>Completed</span>
          </button>
          <button
            onClick={() => setFilteredTodos("pending")}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg bg-white border border-gray-200 ${filteredTodos === "pending" && "border-yellow-400 bg-yellow-50"} hover:border-yellow-400 hover:bg-yellow-50 transition-all font-medium`}>
            <Clock className="h-5 w-5 text-yellow-600" />
            <span>Pending</span>
          </button>
          <button
            onClick={() => setFilteredTodos("dueDate")}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg bg-white border border-gray-200 ${filteredTodos === "dueDate" && "border-red-400 bg-red-50"} hover:border-red-400 hover:bg-red-50 transition-all font-medium`}>
            <Calendar className="h-5 w-5 text-red-600" />
            <span>Due Date</span>
          </button>
        </div>

        {/* Todos Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {filteredTodosData.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">OOPS!! No todos yet</h3>
              <p className="text-gray-500">Create your first todo to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTodosData.map((todo) => (
                <TodosCard key={todo.id} todo={todo} setTodo={setTodos} deleteTodo={handleDeleteTodo} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}