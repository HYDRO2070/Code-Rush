"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useMouseTilt } from "@/hooks/useMouseTilt";

export default function NavBar() {
  const router = useRouter();

  const gotonext = () => {
    router.push("/login");
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-10 p-4 flex justify-between items-center text-purple-600 font-mono">
      {/* Logo Section */}
      <a href="/" className="flex items-center space-x-3 ms-10">
        <span className="text-purple-600 font-bold">
          {`>>`} TerminalCode
        </span>
      </a>

      {/* Tilted Login Button */}
      <TiltedLoginButton gotonext={gotonext} />
    </nav>
  );
}

function TiltedLoginButton({ gotonext }) {
  const tiltStyle = useMouseTilt(10); // Adds tilt effect with max tilt value

  return (
    <button
      style={tiltStyle}
      className="me-10 px-6 py-2 text-black bg-purple-600 font-bold border border-purple-400 rounded-md shadow-md hover:bg-purple-800 hover:scale-105 transform transition-all duration-300"
      onClick={gotonext}
    >
      Login
    </button>
  );
}
