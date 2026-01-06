export default function VolunteerSidebar({ open, onClose, setView }) {
  const menuItems = [
    "Dashboard",
    "Available Events",
    "My Events",
    "History",
    "Messages",
    "Profile & Settings",
  ];

  return (
    <>
      {/* BLUR OVERLAY */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 backdrop-blur-sm bg-black/10 z-40"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 font-bold border-b">
          Volunteer Dashboard
        </div>

        <nav className="p-4 space-y-2 text-sm">
          {menuItems.map(item => (
            <button
              key={item}
              onClick={() => {
                setView(item);
                onClose();
              }}
              className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition"
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
