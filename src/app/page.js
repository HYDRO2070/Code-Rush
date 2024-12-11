"use client";

import { useState, useEffect } from "react";
import LandingPage from "@/pages/LandingPage";
import NavBar from "@/components/NavBar";
import MainNavbar from "@/components/MainNavBar";


function ConsoleLoadingAnimation() {
  const [frame, setFrame] = useState(0);
  const [message, setMessage] = useState("Loading...");
  const chars = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"];
  const messages = [
    "Booting up...",
    "Loading assets...",
    "Connecting to server...",
    "Fetching data...",
    "Almost ready...",
  ];

  useEffect(() => {
    let frameInterval = setInterval(() => {
      setFrame((prev) => (prev + 1) % chars.length);
    }, 100); // Update animation frame every 100ms

    let messageInterval = setInterval(() => {
      setMessage((prevMessage) => {
        const currentIndex = messages.indexOf(prevMessage);
        return messages[(currentIndex + 1) % messages.length];
      });
    }, 1000); // Update loading message every 1 second

    return () => {
      clearInterval(frameInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-purple-400 font-mono">
      <div className="text-2xl">
        {chars[frame]} {message}
      </div>
    </div>
  );
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Wait 5 seconds before showing the page content

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <ConsoleLoadingAnimation />;
  }

  return (
    <>
      {/* <NavBar /> */}
      <MainNavbar/>
      <LandingPage />
    </>
  );
}
