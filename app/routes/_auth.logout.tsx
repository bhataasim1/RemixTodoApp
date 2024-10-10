import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import directusClient from "../.server/directus.server";
import { destroySession, getSession } from "../session";
import { logout } from "@directus/sdk";


export async function action({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const refresh_token = session.get("refresh_token");

  // console.log("refresh_token", refresh_token);
  if (refresh_token) {
    try {
      await directusClient.request(logout(refresh_token));

      return redirect("/login", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    } catch (error) {
      return json({ error: "Error logging out" }, { status: 500 });
    }
  }

  return redirect("/login");
}