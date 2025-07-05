import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div>
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Welcome to My Portfolio
        </h2>
        <p className="text-lg md:text-xl text-gray-300">
          Full Stack Developer | Designer | Creator
        </p>
      </div>
    </section>
  );
}
