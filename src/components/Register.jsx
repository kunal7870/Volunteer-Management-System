import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "VOLUNTEER",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await API.post("/users/register", user);
    alert("Registered successfully");
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center">
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

      {/* REGISTER CARD */}
      <form
        onSubmit={handleRegister}
        className="relative z-10 bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-1 text-center text-gray-800">
          Create Account
        </h2>

        <p className="text-sm text-gray-500 text-center mb-4">
          Join as a Volunteer or Organizer
        </p>

        <input
          name="name"
          placeholder="Full Name"
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
        >
          <option value="VOLUNTEER">Volunteer</option>
          <option value="ORGANIZER">Organizer</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded font-medium hover:bg-green-700 transition"
        >
          Register
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
