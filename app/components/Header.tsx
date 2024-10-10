import { Link, useFetcher } from "@remix-run/react"

export const Header = ({ userId }: { userId?: string | null }) => {
  const fetcher = useFetcher();
  return (
    <div className="flex items-center justify-between border-b bg-purple-400 shadow-sm px-10 py-3">
      <h1 className="text-2xl font-bold text-white">
        <Link to="/">Remix Todo App</Link>
      </h1>
      <div>
        {userId && (
          <fetcher.Form method="post" action="/logout">
            <button type="submit" className="text-white font-medium">Logout</button>
          </fetcher.Form>
        )}
      </div>
    </div>
  )
}
