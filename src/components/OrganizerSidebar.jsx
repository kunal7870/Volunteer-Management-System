export default function OrganizerSidebar({ open, onClose, setView }) {
  const menuItems = [
    "Dashboard",
    "Create Event",
    "My Events",
    "Volunteers",
    "Attendance",
    "Reports",
    "Messages",
    "Profile / Settings",
  ];

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 backdrop-blur-sm bg-black/10 z-40"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 font-bold border-b">
          Organizer Dashboard
        </div>

        <nav className="p-4 space-y-2 text-sm">
          {menuItems.map(item => (
            <button
              key={item}
              onClick={() => {
                setView(item);
                onClose();
              }}
              className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
