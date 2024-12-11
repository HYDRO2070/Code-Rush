"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSectionInView } from "@/hooks/useSectionInView";
import { useMouseTilt } from "@/hooks/useMouseTilt";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const signupDiv = useRef();
  const sectionRefs = [signupDiv];
  const activeSection = useSectionInView(sectionRefs);
  const router = useRouter();
  const tiltStyle = useMouseTilt();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Local state to handle error messages from the backend
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    // Reset error message
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Sign Up Successful!");
        // Redirect to login page after successful sign-up
        // window.location.href = "/login";
        router.push("/login");
      } else {
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setErrorMessage("An error occurred during sign-up. Please try again.");
    }
  };


  const tologin = () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-purple-600">
      <div
        ref={signupDiv}
        id="signup"
        style={activeSection === "signup" ? tiltStyle : {}}
        className="w-full max-w-md p-8 space-y-4 bg-white rounded-3xl shadow-xl transform transition-all duration-300 ease-in-out"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign Up</h2>
        <p className="text-center text-gray-500">Create a new account to get started.</p>

        {/* Display error message if any */}
        {errorMessage && (
          <p className="text-center text-sm text-red-600">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 bg-gray-100 transition-shadow shadow-md"
            />
            {errors.username && (
              <p className="mt-2 text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 bg-gray-100 transition-shadow shadow-md"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 bg-gray-100 transition-shadow shadow-md"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords don't match",
              })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 bg-gray-100 transition-shadow shadow-md"
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-semibold bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all duration-300 hover:scale-[1.009]"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={tologin}
            className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
