import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await API.post("/users/login", { email, password });
    if (res.data) onLogin(res.data);
    else alert("Invalid credentials");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* LOGIN CARD */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-white/95 backdrop-blur-md p-8 rounded-xl shadow-xl w-80"
      >
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Welcome Back
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Login to continue
        </p>

        <input
          type="email"
          required
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          required
          className="w-full mb-5 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-5 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
