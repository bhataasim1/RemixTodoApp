
import { Todos } from "../../types/types";
import directusClient from "../directus.server"
import { createItem, deleteItem, readItem, readItems, updateItem } from "@directus/sdk";

type AddTodo = Pick<Todos, "title" | "description" | "dueDate" | 'userId'>;

export class TodosService {
  private client: typeof directusClient;

  constructor() {
    this.client = directusClient;
    this.addTodo = this.addTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.getTodosOfUser = this.getTodosOfUser.bind(this);
  }

  async addTodo(todo: AddTodo) {
    // console.log(todo);
    try {
      const response = await this.client.request(
        createItem("Todos", {
          ...todo,
          status: "pending",
          createdAt: new Date()
        })
      )
      // console.log(response);

      return response;
    } catch (error) {
      // console.error(error);
      throw new Error("Failed to add todo");
    }
  }

  async getUserTodo(userId: string, todoId: string): Promise<Todos> {
    try {
      return await this.client.request(
        readItem("Todos", todoId, {
          filter: {
            userId: {
              _eq: userId
            }
          }
        })
      );
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get todo");
    }
  }

  async getTodosOfUser(userId: string): Promise<Todos[]> {
    try {
      return await this.client.request(
        readItems("Todos", {
          filter: {
            userId: {
              _eq: userId
            }
          }
        })
      );
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get todos");
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