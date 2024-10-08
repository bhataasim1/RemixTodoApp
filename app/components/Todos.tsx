import { useState } from "react";
import { Todos } from "../types/types";
import { Trash2, Calendar, CheckCircle, Circle } from "lucide-react";
import { getTodosFromLocalStorage, saveTodosToLocalStorage } from "../utils/todosLocalStorage";
import { formatDate } from "../utils/formateDate";

interface TodosProps {
  todo: Todos;
  setTodo: React.Dispatch<React.SetStateAction<Todos[]>>;
  deleteTodo: (id: number) => void;
}

export const TodosCard = ({ todo, setTodo, deleteTodo }: TodosProps) => {
  const [completed, setCompleted] = useState(todo.status === "completed");
  const [isHovered, setIsHovered] = useState(false);

  const handleStatusChange = () => {
    const newStatus = todo.status === "completed" ? "pending" : "completed";
    setCompleted(newStatus === "completed");

    const storedTasks = getTodosFromLocalStorage();
    const updatedTasks = storedTasks.map((item: Todos) =>
      item.id === todo.id ? { ...item, status: newStatus } : item
    );
    setTodo(updatedTasks);

    saveTodosToLocalStorage(updatedTasks);
  };

  return (
    <div
      className="group w-full bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4 flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={handleStatusChange}
          className="mt-1 flex-shrink-0 focus:outline-none"
        >
          {completed ? (
            <CheckCircle className="w-5 h-5 text-green-500 hover:text-green-600 transition-colors" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400 hover:text-gray-500 transition-colors" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-x-4">
            <div>
              <h3 className={`text-lg font-medium ${completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                {todo.title}
              </h3>
              <p className={`mt-1 text-sm ${completed ? 'text-gray-400' : 'text-gray-500'}`}>
                {todo.description}
              </p>
            </div>

            {/* Delete button - visible on hover */}
            <button
              onClick={() => deleteTodo(todo.id)}
              className={`flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors ${isHovered ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Meta information */}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {/* Due date */}
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(todo.dueDate)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};