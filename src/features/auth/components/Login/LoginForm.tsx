"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconEye,
  IconLockFilled,
  IconMail,
  IconStarFilled,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { loginSchema, loginType } from "../../schemas/login.schema";
import { setToken } from "../../server/auth.actions";
import { loginAction } from "../../server/login.actions";
import { authActions } from "../../slices/auth.slice";

export default function LoginForm() {
  const { setAuthStates } = authActions;
  const dispatch = useDispatch();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(loginSchema),
  });

  const handleLogin: SubmitHandler<loginType> = async function (values) {
    const response = await loginAction(values);

    if (response.success) {
      toast.success(response.message);

      if (response.token) {
        await setToken(response.token);
        dispatch(
          setAuthStates({
            isAuthenticated: true,
            userInfo: {
              name: response.user?.name,
              email: response.user?.email,
              role: response.user?.role,
            },
          }),
        );
      }

      router.push("/");
    }

    if (!response.success) {
      if (response.fieldErrors) {
        for (const [key, messages] of Object.entries(response.fieldErrors)) {
          setError(key as keyof loginType, { message: messages[0] });
        }
      }

      setError("root", { type: "manual", message: response.message });
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-primary-600">
              Fresh<span className="text-gray-800">Cart</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600">
            Sign in to continue your fresh shopping experience
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                placeholder="Enter your email"
                id="email"
                {...register("email")}
              />
              <IconMail
                stroke={2}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {errors?.email && (
              <div className="text-red-600 mt-2 bg-red-200 rounded-md text-sm px-2 py-1">
                <p>*{errors.email.message}</p>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <Link
                tabIndex={-1}
                href="/forget-password"
                className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer font-medium"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={"password"}
                id="password"
                className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                placeholder="Enter your password"
                {...register("password")}
              />
              <IconLockFilled className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <button
                tabIndex={-1}
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <IconEye stroke={2} />
              </button>
            </div>

            {errors?.password && (
              <div className="text-red-600 mt-2 bg-red-200 rounded-md text-sm px-2 py-1">
                <p>*{errors.password.message}</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary-600 accent-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-3 text-sm text-gray-700">
                Keep me signed in
              </span>
            </label>
          </div>

          {errors?.root && (
            <div className="text-red-600 mt-2 bg-red-200 rounded-md text-sm px-2 py-1">
              <p>*{errors?.root.message}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p className="text-gray-600">
            New to FreshCart?
            <Link
              href="/signup"
              className="text-primary-600 hover:text-primary-700 ms-2 font-semibold cursor-pointer"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
          <div className="flex items-center">
            <IconLockFilled className="mr-1" />
            SSL Secured
          </div>
          <div className="flex items-center">
            <IconUsers stroke={2} className="mr-1" />
            50K+ Users
          </div>
          <div className="flex items-center">
            <IconStarFilled className="mr-1" />
            4.9 Rating
          </div>
        </div>
      </div>
    </div>
  );
}
