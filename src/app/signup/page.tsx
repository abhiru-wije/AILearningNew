"use client";

import { SignupRequest } from "@/types/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const montserrat = Montserrat({ subsets: ["latin"] });

// Define the form data type explicitly
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  terms?: boolean;
}

// Define validation schema with Yup
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setError(null);

      const signupData: SignupRequest = {
        email: data.email,
        firstname: data.firstName,
        lastname: data.lastName,
        mobile_number: data.phoneNumber,
        password: data.password,
      };

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Signup failed");
      }

      router.push("/login");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm">
          <div className="text-center mb-8">
            <h1
              className={`${montserrat.className} text-3xl font-bold text-gray-900 mb-2`}
            >
              Create Your Account
            </h1>
            <p className="text-gray-600">
              Join BrightBuddy and start your child's learning journey
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  {...register("firstName")}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-gray-900`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  {...register("lastName")}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-gray-900`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-gray-900`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                {...register("phoneNumber")}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-gray-900`}
                placeholder="1234567890"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-gray-900`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-gray-900`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  {...register("terms")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    Privacy Policy
                  </Link>
                </label>
                {errors.terms && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.terms.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block w-1/2 relative">
        <Image
          src="/signup.jpg"
          alt="Signup"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
