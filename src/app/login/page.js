"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMouseTilt } from "@/hooks/useMouseTilt";
import MainNavbar from "@/components/MainNavBar";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "@/redux/userSlice";

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const tiltStyle = useMouseTilt();

  const onSubmit = async (data) => {
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      // console.log(result)
      if (response.ok) {
        dispatch(
          login({
            user: { name: result.username, email: data.email },
          })
        );
        alert("Login Successful!");
        router.push("/main");
      } else {
        setErrorMessage(result.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const toSignUp = () => {
    router.push("/signup");
  };

  return (
    <>
      <MainNavbar/>
      <div className="min-h-screen flex items-center justify-center px-4 bg-black text-purple-400 font-mono">
        <div
          style={tiltStyle}
          className="w-full max-w-md p-6 border border-purple-700 rounded-md shadow-lg transform transition-all duration-300 ease-in-out bg-black sm:max-w-lg lg:max-w-md"
        >
          {/* Console Header */}
          <pre className="border-b border-purple-700 text-purple-500 text-xs sm:text-sm lg:text-base">
            {`-------------------[ LOGIN ]-------------------`}
          </pre>

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-sm sm:text-base">{errorMessage}</p>
            )}

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm">
                Enter Email:
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="w-full p-2 mt-1 bg-black border border-purple-700 rounded text-purple-400 placeholder-purple-500 focus:outline-none focus:ring focus:ring-purple-600 text-sm sm:text-base"
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
                Enter Password:
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: "Password is required" })}
                className="w-full p-2 mt-1 bg-black border border-purple-700 rounded text-purple-400 placeholder-purple-500 focus:outline-none focus:ring focus:ring-purple-600 text-sm sm:text-base"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-2 bg-purple-700 text-black rounded hover:bg-purple-600 transition text-sm sm:text-base"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <p className="mt-4 text-sm sm:text-base">
            Don’t have an account?{" "}
            <span
              onClick={toSignUp}
              className="text-purple-500 hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>

          {/* Console Footer */}
          <pre className="border-t border-purple-700 text-purple-500 text-xs sm:text-sm lg:text-base mt-4">
            {`-----------------------------------------------`}
          </pre>
        </div>
      </div>
    </>
  );
}
