import { useState } from "react";

export default function Profile({ user, setUser }) {
  const [name, setName] = useState(user.name);

  const handleSave = () => {
    const updatedUser = { ...user, name };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Profile updated (locally)");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Email (read-only) */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          value={user.email}
          disabled
          className="w-full border p-2 rounded bg-gray-100"
        />
      </div>

      {/* Role */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Role</label>
        <input
          value={user.role}
          disabled
          className="w-full border p-2 rounded bg-gray-100"
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
}
