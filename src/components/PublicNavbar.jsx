import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">
        VolunteerMngmt
      </h1>

      <div className="space-x-4">
        <Link
          to="/login"
          className="text-gray-600 hover:text-blue-600"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}
