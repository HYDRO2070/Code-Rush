"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { useSectionInView } from "@/hooks/useSectionInView";
import { useMouseTilt } from "@/hooks/useMouseTilt";
import Footer from "@/components/Footer";

const ThreeLanding = dynamic(() => import("@/components/ThreeLanding"), {
  ssr: false,
});

export default function LandingPage() {
  const heroRef = useRef();
  const aboutRef = useRef();
  const contactRef = useRef();

  const sectionRefs = [heroRef, aboutRef, contactRef];
  const activeSection = useSectionInView(sectionRefs);

  const tiltStyle = useMouseTilt();

  return (
    <div className="min-h-screen text-purple-400 font-mono">
      {/* Three.js Landing Animation */}
      {/* <ThreeLanding /> */}

      <div className="w-full max-h-screen overflow-x-hidden">
        {/* Hero Section */}
        <div
          ref={heroRef}
          id="hero"
          style={activeSection === "hero" ? tiltStyle : {}}
          className="w-full h-screen flex justify-center items-center flex-col text-center px-4 sm:px-6 lg:px-8 transition-transform duration-300"
        >
          <pre className="text-purple-600 pb-2 mb-4 text-xs sm:text-sm lg:text-base">
            {`------------------------------[ WELCOME ]------------------------------`}
          </pre>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">Welcome to the Future of Coding</h1>
          <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-purple-600">
            Build and learn with interactive coding challenges
          </p>
          <pre className="text-purple-600 pt-2 mt-4 text-xs sm:text-sm lg:text-base">
            {`-------------------------------------------------------------------`}
          </pre>
        </div>

        {/* About Section */}
        <section
          ref={aboutRef}
          id="about"
          style={activeSection === "about" ? tiltStyle : {}}
          className="py-12 sm:py-16 lg:py-20 transition-transform duration-300"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <pre className="text-purple-600 pb-2 mb-4 text-xs sm:text-sm lg:text-base">
              {`------------------------------[ ABOUT US ]------------------------------`}
            </pre>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">About Us</h2>
            <p className="mt-4 max-w-3xl mx-auto text-purple-600 text-base sm:text-lg lg:text-xl">
              We provide an innovative platform for aspiring developers to sharpen their skills.
              Interactive challenges and a vibrant community await you.
            </p>
            <pre className="text-purple-600 pt-2 mt-4 text-xs sm:text-sm lg:text-base">
              {`-------------------------------------------------------------------`}
            </pre>
          </div>
        </section>

        {/* Contact Section */}
        <section
          ref={contactRef}
          id="contact"
          style={activeSection === "contact" ? tiltStyle : {}}
          className="py-12 sm:py-16 lg:py-20 transition-transform duration-300"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <pre className="text-purple-600 pb-2 mb-4 text-xs sm:text-sm lg:text-base">
              {`------------------------------[ CONTACT ]------------------------------`}
            </pre>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Get In Touch</h2>
            <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-purple-600">
              Have questions or want to collaborate? Reach out to us!
            </p>
            <div className="mt-6">
              <a
                href="mailto:contact@codeapp.com"
                className="inline-block bg-purple-700 hover:bg-purple-600 text-black py-2 px-6 rounded-full transition text-sm sm:text-base"
              >
                Email Us
              </a>
            </div>
            <pre className="text-purple-600 pt-2 mt-4 text-xs sm:text-sm lg:text-base">
              {`-------------------------------------------------------------------`}
            </pre>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
