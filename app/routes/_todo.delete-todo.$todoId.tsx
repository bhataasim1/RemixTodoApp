import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { TodosService } from "../.server/todos/todos.server";

const todoService = new TodosService();

export async function action({ params }: ActionFunctionArgs) {
  const todoId = params.todoId;

  if (!todoId) {
    return redirect('/');
  }

  await todoService.deleteTodo(todoId);

  return redirect('/');
}