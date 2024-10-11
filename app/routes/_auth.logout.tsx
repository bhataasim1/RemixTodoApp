import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import directusClient from "../.server/directus.server";
import { destroySession, getSession } from "../sessions";
import { logout } from "@directus/sdk";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const refresh_token = session.get("refresh_token");
  // console.log(refresh_token);

  if (refresh_token) {
    try {
      await directusClient.request(logout(refresh_token));

      return redirect("/login", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    } catch (error) {
      // console.error(error);
      return json({ error: "Error logging out" }, { status: 500 });
    }
  }

  return redirect("/login");
}