import { Todos } from "../types/types";


export const getTodosFromLocalStorage = () => {
  const todos = window.localStorage.getItem("todos");
  if (todos) {
    return JSON.parse(todos);
  }
  return [];
}

export const saveTodosToLocalStorage = (todos: Todos[]) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }
}