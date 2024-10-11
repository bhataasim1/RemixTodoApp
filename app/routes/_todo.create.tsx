import { Form, json, redirect, useActionData } from "@remix-run/react";
import { Header } from "../components/Header";
import { Calendar } from "lucide-react";
import { ActionFunctionArgs } from "@remix-run/node";
import { ErrorType } from "../types/types";
import { getCurrentDate, validateInputData } from "../utils/validateInput";

import { TodosService } from "../.server/todos/todos.server";
import { getSession } from "../sessions";

const todosService = new TodosService();


export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = String(formData.get("title"));
  const description = String(formData.get("description"));
  const dueDate = String(formData.get("dueDate"));

  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (!userId) {
    return redirect('/login');
  }

  const errors: ErrorType = validateInputData({ title, description, dueDate });

  if (Object.keys(errors).length > 0) {
    return json({errors});
  }

  await todosService.addTodo({title, description, dueDate, userId});
  return redirect('/');
}

export default function TodoCreate() {
  const actionData = useActionData<typeof action>();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Create New Todo</h1>
            <p className="text-gray-500 mt-1">Fill in the details for your new task</p>
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
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                placeholder="Enter todo title"
              />

              {actionData?.errors && (
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
                    defaultValue={getCurrentDate()}
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
                Create Todo
              </button>
            </div>
          </Form>
        </div>
      </main>
    </div>
  );
}