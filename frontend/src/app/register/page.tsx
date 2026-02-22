"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/auth";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      if (!email || !password) {
        toast.error("All fields are required");
        return;
      }

      await register(email, password);

      toast.success("Account created successfully 🎉");
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-neutral-200">

        <h2 className="text-3xl font-semibold text-neutral-900 text-center mb-2">
          Create Account
        </h2>

        <p className="text-center text-neutral-500 mb-8 text-sm">
          Start managing your tasks today
        </p>

        <div className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-neutral-300 p-3 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-neutral-300 p-3 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-neutral-600">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 hover:underline cursor-pointer font-medium"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}