"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: data.message || "Something went wrong",
          background: "#1e293b",
          color: "#f1f5f9",
          confirmButtonColor: "#ef4444",
          iconColor: "#ef4444",
        });

        return;
      }

      router.push("/owner");

      Swal.fire({
        title: "Login Successful!",
        icon: "success",
        draggable: true,
        background: "#1e293b",
        color: "#f1f5f9",
        confirmButtonColor: "#22d3ee",
        iconColor: "#22d3ee",
      });
    } catch (error) {
      alert(`Login failed: ${error}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div
          className={`bg-slate-800 rounded-2xl shadow-[0_0_50px_rgba(34,211,238,0.2)] border border-cyan-400/20 p-8 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          {/* Header */}
          <div
            className={`text-center mb-8 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome <span className="text-cyan-400">Back</span>
            </h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={`space-y-6 transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-cyan-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all transform hover:scale-[1.01] focus:scale-[1.02]"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-cyan-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all transform hover:scale-[1.01] focus:scale-[1.02]"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-cyan-400 text-slate-900 font-semibold rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-cyan-400/25"
            >
              Sign In
            </button>
          </form>

          {/* Back to Home */}
          <div
            className={`mt-8 text-center transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:translate-x-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
