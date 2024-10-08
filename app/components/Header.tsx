import { Link } from "@remix-run/react"

export const Header = () => {
  return (
    <div className="flex items-center justify-between border-b bg-purple-400 shadow-sm px-10 py-3">
      <h1 className="text-2xl font-bold text-white">
        <Link to="/">Remix Todo App</Link>
      </h1>
    </div>
  )
}
