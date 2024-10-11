import directusClient from "../.server/directus.server";
import AuthForm from "../components/auth/auth-form";
import { UserCircle } from "lucide-react";
import { createUser } from "@directus/sdk";
import { redirect } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { getSession } from "../sessions";

export async function action({ request }: ActionFunctionArgs) {
  const formData = new URLSearchParams(await request.text());
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const email = formData.get("email");
  const password = formData.get("password");

  const userRole = process.env.USER_ROLE_ID;

  try {
    await directusClient.request(createUser({ first_name, last_name, email, password, role: userRole }));
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
          <AuthForm type="signup" />
        </div>
      </div>
    </div>
  );
}