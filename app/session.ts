import { createCookieSessionStorage } from "@remix-run/node";


type Session = {
  userId: string;
  first_name: string;
  last_name: string;
  email: string;
  access_token: string;
  refresh_token: string;
  expires: string;
  expires_at: string;
}

type SessionFlash = {
  error: string;
}

export const { getSession, commitSession, destroySession } = createCookieSessionStorage<Session, SessionFlash>({
  cookie: {
    name: "__session",
    secrets: [process.env.SESSION_SECRET!],
    sameSite: "lax",
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    secure: process.env.NODE_ENV === "production",
  },
});