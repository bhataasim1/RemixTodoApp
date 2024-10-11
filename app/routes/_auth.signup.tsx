import AuthForm from "../components/auth/auth-form";
import { UserCircle } from "lucide-react";
import { json, redirect, useActionData } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { getSession } from "../sessions";
import { AuthService } from "../.server/auth/AuthService";
import { User } from "../types/types";
import { validateAuthInputs } from "../utils/validateInput";

const authService = new AuthService();

export async function action({ request }: ActionFunctionArgs) {
  const formData = new URLSearchParams(await request.text());
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const email = formData.get("email");
  const password = formData.get("password");


  if (!first_name || !last_name || !email || !password) {
    return redirect("/signup");
  }

  const errors: Partial<User> = validateAuthInputs({ first_name, last_name, email, password });

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  try {
    await authService.registerUser({ first_name, last_name, email, password });
    return redirect("/login");
  } catch (error) {
    return redirect("/signup");
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  return userId ? redirect("/") : null;
}

export default function SignupPage() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
            <UserCircle className="size-11 text-white" />
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10">
          <AuthForm type="signup" errors={actionData?.errors} />
        </div>
      </div>
    </div>
  );
}