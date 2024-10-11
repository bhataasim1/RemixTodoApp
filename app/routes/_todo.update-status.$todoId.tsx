import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { TodosService } from "../.server/todos/todos.server";
import { Todos } from "../types/types";

const todosService = new TodosService();

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const status = String(formData.get("status")) as Todos['status'];
  const todoId = String(formData.get("todoId"));

  try {
    await todosService.editTodo(todoId, { status });
    return redirect('/');
  } catch (error) {
    console.error(error);
    return redirect('/');
  }
}