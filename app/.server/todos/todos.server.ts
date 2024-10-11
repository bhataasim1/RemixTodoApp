
import { AddTodo, Todos } from "../../types/types";
import { BaseService } from "./BaseService.server";

export class TodosService extends BaseService {
  constructor() {
    super();
    this.addTodo = this.addTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.getTodosOfUser = this.getTodosOfUser.bind(this);
  }

  async addTodo(todo: AddTodo): Promise<Todos> {
    return await this.createItem("Todos", todo);
  }

  async getUserTodo(userId: string, todoId: string): Promise<Todos> {
    return await this.readItem("Todos", todoId, userId);
  }

  async getTodosOfUser(userId: string): Promise<Todos[]> {
    return await this.readAllItems("Todos", userId);
  }

  async editTodo(todoId: string, todo: Partial<Todos>) {
    return await this.updateTodoItem("Todos", todoId, todo);
  }

  async deleteTodo(todoId: string) {
    return await this.deleteTodoItem("Todos", todoId);
  }
}