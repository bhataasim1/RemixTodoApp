import { Form, json, redirect, useActionData, useLoaderData } from "@remix-run/react";
import { Header } from "../components/Header";
import { Calendar } from "lucide-react";
import { ActionFunctionArgs } from "@remix-run/node";
import { ErrorType, Todos } from "../types/types";
import { validateInputData } from "../utils/validateInput";
import { getSession } from "../sessions";
import { TodosService } from "../.server/todos/todos.server";

const todoService = new TodosService();


export async function action({ request, params }: ActionFunctionArgs) {

  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (!userId) {
    return redirect('/login');
  }

  const todoId = params.todoId;

  const formData = await request.formData();
  const title = String(formData.get("title"));
  const description = String(formData.get("description"));
  const dueDate = String(formData.get("dueDate"));

  const errors: ErrorType = validateInputData({ title, description, dueDate });

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  if (todoId) {
    await todoService.editTodo(todoId, { title, description, dueDate, userId });
  }


  return redirect('/');
}

export async function loader({ params, request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  const todoId = params.todoId;

  if (todoId && userId) {
    const todo = await todoService.getUserTodo(userId, todoId);
    return json(todo);
  }

  return redirect('/');
}


export default function EditTodo() {
  const actionData = useActionData<typeof action>();
  const loaderData = useLoaderData<Todos>();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Update {loaderData.title}</h1>
            <p className="text-gray-500 mt-1">Fill in the details to Update your Todo</p>
          </div>

          <Form method="POST" className="space-y-6">

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={loaderData.title}
                onChange={(e) => loaderData.title = e.target.value}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                placeholder="Enter todo title"
              />

              {actionData?.errors?.title && (
                <p className="text-red-500 text-sm mt-1">{actionData.errors.title}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={loaderData.description}
                onChange={(e) => loaderData.description = e.target.value}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all resize-none"
                placeholder="Enter todo description"
              />

              {actionData?.errors?.description && (
                <p className="text-red-500 text-sm mt-1">{actionData.errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    defaultValue={loaderData.dueDate}
                    onChange={(e) => loaderData.dueDate = e.target.value}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                  />

                  {actionData?.errors?.dueDate && (
                    <p className="text-red-500 text-sm mt-1">{actionData.errors.dueDate}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Update Todo
              </button>
            </div>
          </Form>
        </div>
      </main>
    </div>
  );
}