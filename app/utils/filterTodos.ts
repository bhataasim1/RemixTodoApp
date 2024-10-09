import { FilterTodos, Todos } from "../types/types";

const keys: (keyof Pick<Todos, 'title' | 'description'>)[] = ['title', 'description'];

export function filterTodos(todos: Todos[], filter: FilterTodos) {
  switch (filter) {
    case "all":
      return todos;
    case "completed":
      return todos.filter((todo) => todo.status === "completed");
    case "pending":
      return todos.filter((todo) => todo.status === "pending");
    case "dueDate": {
      const inCompletedTodos = todos.filter((todo) => todo.status !== "completed");
      return inCompletedTodos.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    }
    default:
      return [];
  }
}

export function searchTodo(todo: Todos[], query: string): Todos[] {
  return todo.filter((todo) => {
    return keys.some((key) => todo[key]?.toLowerCase().includes(query?.toLowerCase()));
  });
}