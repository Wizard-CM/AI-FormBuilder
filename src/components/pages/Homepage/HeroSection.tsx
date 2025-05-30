"use client";
import GenerateFormInput from "@/components/GenerateFormInput";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import React, { useState } from "react";

type SuggestionText = {
  label: string;
  text: string;
};

type Props = {
  totalForms?: number;
  isSubscribed?: boolean;
};

const HeroSection: React.FC<Props> = ({ totalForms, isSubscribed }) => {
  const [text, setText] = useState<string>("");

  return (
    <section className="w-full min-h-screen relative overflow-hidden ">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Main Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>



        {/* Dot Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        ></div>



        {/* Animated Lines */}
        <div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-20 animate-pulse"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-20 animate-pulse"
          style={{ animationDuration: "4s", animationDelay: "1s" }}
        ></div>

        {/* Vertical Lines */}
        <div
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-20 animate-pulse"
          style={{ animationDuration: "5s" }}
        ></div>
        <div
          className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-20 animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        ></div>

        {/* Radial Fade Mask */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-full px-4 py-2 mb-8 hover:bg-gray-700 hover:bg-opacity-50 transition-all duration-300 shadow-lg">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">
              AI-Powered Form Builder
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Build AI-Driven Forms
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Effortlessly
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 mb-4 leading-relaxed max-w-3xl mx-auto">
            Leverage the power of AI to create responsive and dynamic forms in
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-semibold">
              {" "}
              minutes
            </span>
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-gray-500">
            <div className="flex items-center gap-2 bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-full px-3 py-2 border border-gray-700 border-opacity-30">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-full px-3 py-2 border border-gray-700 border-opacity-30">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-full px-3 py-2 border border-gray-700 border-opacity-30">
              <ArrowRight className="w-4 h-4 text-green-400" />
              <span>No Code Required</span>
            </div>
          </div>
        </div>

        {/* Form Input Section Placeholder */}
        <GenerateFormInput totalForms={1} isSubscribed={true} />


        {/* Stats */}
        <div className="text-center mt-16 text-gray-500">
          <p className="text-sm">
            Join <span className="text-blue-400 font-semibold">10,000+</span>{" "}
            users building forms with AI
          </p>
        </div>
      </div>

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 70%,
            rgba(0, 0, 0, 0.4) 100%
          );
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
