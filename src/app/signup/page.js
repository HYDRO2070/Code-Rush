"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMouseTilt } from "@/hooks/useMouseTilt";
import { useRouter } from "next/navigation";
import MainNavbar from "@/components/MainNavBar";

export default function SignupPage() {
  const signupDiv = useRef();
  const router = useRouter();
  const tiltStyle = useMouseTilt();

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Sign Up Successful!");
        router.push("/main");
      } else {
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setErrorMessage("An error occurred during sign-up. Please try again.");
    }
  };

  const toLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <MainNavbar/>
      <div className="min-h-screen flex items-center justify-center px-4 bg-black text-purple-400 font-mono">
        <div
          ref={signupDiv}
          style={tiltStyle}
          className="w-full max-w-md p-6 border border-purple-700 rounded-md shadow-lg transform transition-all duration-300 ease-in-out bg-black sm:max-w-lg lg:max-w-md"
        >
          {/* Console Header */}
          <pre className="border-b border-purple-700 text-purple-500 text-xs sm:text-sm lg:text-base">
            {`------------------[ SIGN UP ]------------------`}
          </pre>

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {errorMessage && (
              <p className="text-red-500 text-sm sm:text-base">{errorMessage}</p>
            )}

            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm">
                Username:
              </label>
              <input
                type="text"
                id="username"
                {...register("username", { required: "Username is required" })}
                className="w-full p-2 mt-1 bg-black border border-purple-700 rounded text-purple-400 placeholder-purple-500 focus:outline-none focus:ring focus:ring-purple-600"
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm">
                Email:
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="w-full p-2 mt-1 bg-black border border-purple-700 rounded text-purple-400 placeholder-purple-500 focus:outline-none focus:ring focus:ring-purple-600"
                placeholder="example@domain.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm">
                Password:
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: "Password is required" })}
                className="w-full p-2 mt-1 bg-black border border-purple-700 rounded text-purple-400 placeholder-purple-500 focus:outline-none focus:ring focus:ring-purple-600"
                placeholder="Enter a strong password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords don't match",
                })}
                className="w-full p-2 mt-1 bg-black border border-purple-700 rounded text-purple-400 placeholder-purple-500 focus:outline-none focus:ring focus:ring-purple-600"
                placeholder="Re-enter your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-2 bg-purple-700 text-black rounded hover:bg-purple-600 transition text-sm sm:text-base"
            >
              Sign Up
            </button>
          </form>

          {/* Footer */}
          <p className="mt-3 text-sm sm:text-base">
            Already have an account?{" "}
            <span
              onClick={toLogin}
              className="text-purple-500 hover:underline cursor-pointer"
            >
              Sign in
            </span>
          </p>

          {/* Console Footer */}
          <pre className="border-t border-purple-700 text-purple-500 text-xs sm:text-sm lg:text-base mt-3">
            {`-----------------------------------------------`}
          </pre>
        </div>
      </div>
    </>
  );
}
