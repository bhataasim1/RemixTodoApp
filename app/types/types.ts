export type Todos = {
  id: number;
  title: string;
  description: string;
  status: "pending" | "completed";
  createdAt: Date;
  dueDate: string;

  userId: string;
};

export type FilterTodos = "all" | "pending" | "completed" | "dueDate";

export type ErrorType = {
  title?: string;
  description?: string;
  dueDate?: string;
}