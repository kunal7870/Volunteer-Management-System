import { Menu, Bell } from "lucide-react";

export default function Navbar({ user, onMenuClick, onLogout }) {
  return (
    <header className="flex items-center justify-between bg-white shadow px-4 py-3">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded hover:bg-gray-100"
        >
          <Menu />
        </button>

        <h1 className="font-semibold">
          Welcome, {user.name}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded hover:bg-gray-100">
          <Bell />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button
          onClick={onLogout}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
