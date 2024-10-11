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

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}

export type AddTodo = Pick<Todos, "title" | "description" | "dueDate" | 'userId'>;
export type Collection = "Todos";

export type LogoutMode = 'json' | 'cookie' | 'session';