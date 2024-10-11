import { Lock } from "lucide-react";
import AuthForm from "../components/auth/auth-form";
import { ActionFunctionArgs } from "@remix-run/node";
import directusClient from "../.server/directus.server";
import { redirect } from "@remix-run/react";
import { commitSession, getSession } from "../sessions";
import { readMe } from "@directus/sdk";

export async function action({ request }: ActionFunctionArgs) {

  const session = await getSession(request.headers.get("Cookie"));
  console.log(session);

  const formData = await request.formData();
  const email = String(formData.get("email"))
  const password = String(formData.get("password"))

  const res = await directusClient.login(email, password);
  console.log(res);
  try {
    await directusClient.setToken(res.access_token);
    const user = await directusClient.request(readMe());
    const userId = user.id;
    const first_name = user.first_name;
    const last_name = user.last_name;
    const email = user.email;

    if (userId === null) {
      session.flash("error", "Invalid email or password");

      return redirect("/login", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    res.access_token && session.set("access_token", res.access_token);
    res.refresh_token && session.set("refresh_token", res.refresh_token);
    res.expires && session.set("expires", String(res.expires));
    res.expires_at && session.set("expires_at", String(res.expires_at));
    email && session.set("email", email);
    userId && session.set("userId", userId);
    first_name && session.set("first_name", first_name);
    last_name && session.set("last_name", last_name);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    session.flash("error", "Invalid email or password");

    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
}

// export async function loader({ request }: LoaderFunctionArgs) {
//   const session = await getSession(request.headers.get("Cookie"));
//   const userId = session.get("userId");
//   // console.log("userId", userId);
//   return userId ? redirect("/") : null;
// }

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
            <Lock className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10">
          <AuthForm type="login" />
        </div>
      </div>
    </div>
  );
}