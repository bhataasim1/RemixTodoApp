
import { Todos } from "../../types/types";
import directusClient from "../directus.server"
import { createItem, deleteItem, readItem, updateItem } from "@directus/sdk";

type AddTodo = Pick<Todos, "title" | "description" | "dueDate" | 'userId'>;

export class TodosService {
  private client: typeof directusClient;

  constructor() {
    this.client = directusClient;
    this.addTodo = this.addTodo.bind(this);
    this.getTodo = this.getTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  async addTodo(todo: AddTodo) {
    try {
      const response = await this.client.request(
        createItem("Todos", {
          ...todo,
          status: "pending",
          createdAt: new Date()
        })
      )

      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to add todo");
    }
  }

  async getTodo(todoId: string): Promise<Todos> {
    try {
      return await this.client.request(readItem("Todos", todoId));
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get todo");
    }
  }

  async editTodo(todoId: string, todo: Partial<Todos>) {
    try {
      return await this.client.request(
        updateItem("Todos", todoId, todo)
      );
    } catch (error) {
      console.error(error);
      throw new Error("Failed to edit todo");
    }
  }

  async deleteTodo(todoId: string) {
    try {
      return await this.client.request(
        deleteItem("Todos", todoId)
      );
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete todo");
    }
  }
}