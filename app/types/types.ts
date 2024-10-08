export type Todos = {
  id: number;
  title: string;
  description: string;
  status: "pending" | "completed";
  createdAt: Date;
  dueDate: string;
};

export type FilterTodos = "all" | "pending" | "completed" | "dueDate";