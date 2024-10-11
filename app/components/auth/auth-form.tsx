import { Form, Link } from "@remix-run/react";
import { Mail, Lock } from "lucide-react";
import { User } from "../../types/types";

type AuthFormProps = {
  type: "login" | "signup";
  errors?: Partial<User>;
};

export default function AuthForm({ type, errors }: AuthFormProps) {
  return (
    <div className="w-full max-w-full">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {type === "login" ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-gray-500 mt-2">
          {type === "login"
            ? "Enter your details to access your account"
            : "Enter your details to get started"}
        </p>
      </div>

      <Form
        method="POST"
        className="space-y-6"
      >
        <div className="space-y-4">
          {
            type === "signup" && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                      placeholder="Enter your first name"
                    />

                  </div>
                  {
                    errors?.first_name && (
                      <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
                    )
                  }
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                      placeholder="Enter your last name"
                    />

                  </div>
                  {
                    errors?.last_name && (
                      <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
                    )
                  }
                </div>
              </div>
            )
          }
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                placeholder="Enter your email"
              />
            </div>
            {
              errors?.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )
            }
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                name="password"
                id="password"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                placeholder="Enter your password"
              />
            </div>
            {
              errors?.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )
            }
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          {type === "login" ? "Sign in" : "Create account"}
        </button>

        <div className="text-center text-sm">
          <span className="text-gray-500">
            {type === "login" ? "Don't have an account? " : "Already have an account? "}
          </span>
          <Link
            to={type === "login" ? "/signup" : "/login"}
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            {type === "login" ? "Sign up" : "Sign in"}
          </Link>
        </div>
      </Form>
    </div>
  );
}