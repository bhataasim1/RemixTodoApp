import { authentication, createDirectus, createItem, deleteItem, readItem, readItems, rest, updateItem } from "@directus/sdk";
import { AddTodo, Collection, Todos } from "../../types/types";


type Schema = {
  Todos: Todos[];
}

export class BaseService {
  protected readonly directusClient;

  constructor() {
    this.directusClient = createDirectus<Schema>(process.env.DIRECTUS_URL!)
      .with(rest())
      .with(authentication("json"));
  }

  protected async createItem(collection: Collection, item: AddTodo): Promise<Todos> {
    try {
      return await this.directusClient.request(
        createItem(collection, {
          ...item,
          status: "pending",
          createdAt: new Date()
        })
      )
    } catch (error) {
      throw new Error("Failed to create item");
    }
  }

  protected async readItem(collection: Collection, itemId: string, userId: string): Promise<Todos> {
    try {
      return await this.directusClient.request(
        readItem(collection, itemId, {
          filter: {
            userId: {
              _eq: userId
            }
          }
        })
      );
    } catch (error) {
      throw new Error("Failed to read item");
    }
  }

  protected async readAllItems(collection: Collection, userId: string): Promise<Todos[]> {
    try {
      return await this.directusClient.request(
        readItems(collection, {
          filter: {
            userId: {
              _eq: userId
            }
          }
        })
      );
    } catch (error) {
      throw new Error("Failed to read items");
    }
  }

  protected async updateTodoItem(collection: Collection, itemId: string, item: Partial<Todos>) {
    try {
      return await this.directusClient.request(
        updateItem(collection, itemId, item)
      );
    } catch (error) {
      throw new Error("Failed to update item");
    }
  }

  protected async deleteTodoItem(collection: Collection, itemId: string) {
    try {
      return await this.directusClient.request(
        deleteItem(collection, itemId)
      );
    } catch (error) {
      throw new Error("Failed to delete item");
    }
  }
}