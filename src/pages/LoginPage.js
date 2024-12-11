"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSectionInView } from "@/hooks/useSectionInView";
import { useMouseTilt } from "@/hooks/useMouseTilt";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const logindiv = useRef();
  const sectionRefs = [logindiv];
  const activeSection = useSectionInView(sectionRefs);

  const tiltStyle = useMouseTilt();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Local state to manage error messages
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form submission
  const onSubmit = async (data) => {
    setErrorMessage(""); // Reset error message on new submission
    
    // console.log(temp)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(data),
      });

      const result = await response.json();
      // console.log(response.message)
      console.log(result)
    //   let result;
    // if (response.headers.get("content-type")?.includes("application/json")) {
    //   result = await response.json();
    // } else {
    //   result = { message: "Unexpected response format" };
    // }

    if (response.ok) {
      alert("Sign Up Successful!");
      // Redirect to login page after successful sign-up
      router.push("/main");
    } else {
      setErrorMessage(result.message || "Something went wrong. Please try again.");
    }


      // if (response.ok) {
      //   // If login is successful, redirect to the home page
      //   alert("Login Successful!");
      //   router.push("/"); // Redirect to home or another page
      // } else {
      //   // Display error message from backend if login fails
      //   setErrorMessage(result.message || "Invalid email or password");
      // }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  // Redirect to the SignUp page
  const toSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-purple-600">
      <div
        ref={logindiv}
        id="login"
        style={activeSection === "login" ? tiltStyle : {}}
        className="w-full max-w-md p-8 space-y-4 bg-white rounded-3xl shadow-xl transform transition-all duration-300 ease-in-out"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        <p className="text-center text-gray-500">Welcome back! Please enter your details.</p>

        {/* Display error message if any */}
        {errorMessage && <p className="mt-2 text-center text-sm text-red-600">{errorMessage}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-semibold bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all duration-300 hover:scale-[1.009]"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={toSignUp}
            className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
