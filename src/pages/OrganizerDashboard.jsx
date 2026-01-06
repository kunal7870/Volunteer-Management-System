import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import OrganizerSidebar from "../components/OrganizerSidebar";
import API from "../services/api";

export default function OrganizerDashboard({ user, setUser }) {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    location: "",
    eventDate: "",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState("Dashboard");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  /* ================= FETCH EVENTS ================= */
  const fetchEvents = async () => {
    const res = await API.get("/events");
    const myEvents = res.data.filter(
      e => e.organizer?.id === user.id
    );
    setEvents(myEvents);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  /* ================= CREATE EVENT ================= */
  const createEvent = async () => {
    await API.post(`/events/create/${user.id}`, event);

    setEvent({
      title: "",
      description: "",
      location: "",
      eventDate: "",
    });

    fetchEvents();
    alert("Event created successfully");
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        user={user}
        onMenuClick={() => setSidebarOpen(true)}
        onLogout={logout}
      />

      <OrganizerSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        setView={(v) => {
          setView(v);
          setSidebarOpen(false);
        }}
      />

      <main className="p-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">{view}</h2>

          {/* ================= DASHBOARD ================= */}
          {view === "Dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-100 p-4 rounded">
                <h3 className="font-bold">Total Events</h3>
                <p className="text-2xl">{events.length}</p>
              </div>

              <div className="bg-green-100 p-4 rounded">
                <h3 className="font-bold">Total Volunteers</h3>
                <p className="text-2xl">
                  {events.reduce(
                    (sum, e) => sum + (e.volunteers?.length || 0),
                    0
                  )}
                </p>
              </div>
            </div>
          )}

          {/* ================= CREATE EVENT ================= */}
          {view === "Create Event" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  className="border p-2"
                  placeholder="Title"
                  value={event.title}
                  onChange={e =>
                    setEvent({ ...event, title: e.target.value })
                  }
                />

                <input
                  className="border p-2"
                  placeholder="Location"
                  value={event.location}
                  onChange={e =>
                    setEvent({ ...event, location: e.target.value })
                  }
                />

                <input
                  className="border p-2"
                  type="date"
                  value={event.eventDate}
                  onChange={e =>
                    setEvent({ ...event, eventDate: e.target.value })
                  }
                />

                <textarea
                  className="border p-2"
                  placeholder="Description"
                  value={event.description}
                  onChange={e =>
                    setEvent({ ...event, description: e.target.value })
                  }
                />
              </div>

              <button
                onClick={createEvent}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
              >
                Create Event
              </button>
            </>
          )}

          {/* ================= MY EVENTS ================= */}
          {view === "My Events" && (
            <div className="space-y-3">
              {events.map(e => (
                <div
                  key={e.id}
                  className="bg-gray-50 p-4 rounded shadow flex justify-between"
                >
                  <div>
                    <h3 className="font-bold">{e.title}</h3>
                    <p className="text-xs text-gray-500">
                      {e.volunteers?.length || 0} volunteers
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedEvent(e);
                      setView("Volunteers");
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    View Volunteers
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ================= VOLUNTEERS ================= */}
          {view === "Volunteers" && selectedEvent && (
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="text-lg font-bold mb-2">
                Volunteers for: {selectedEvent.title}
              </h3>

              <button
                onClick={() => {
                  setSelectedEvent(null);
                  setView("My Events");
                }}
                className="text-blue-600 text-sm mb-3"
              >
                ← Back to My Events
              </button>

              {selectedEvent.volunteers?.length === 0 ? (
                <p className="text-gray-500">No volunteers joined yet.</p>
              ) : (
                <ul className="space-y-2">
                  {selectedEvent.volunteers.map(v => (
                    <li
                      key={v.id}
                      className="bg-white p-3 rounded shadow flex justify-between"
                    >
                      <span>{v.name}</span>
                      <span className="text-sm text-gray-500">{v.email}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* ================= PLACEHOLDERS ================= */}
          {view === "Attendance" && <p>Attendance module coming soon</p>}
          {view === "Reports" && <p>Reports & analytics coming soon</p>}
          {view === "Messages" && <p>Messages UI coming soon</p>}
          {view === "Profile / Settings" && (
            <p>Organizer profile & settings</p>
          )}
        </div>
      </main>
    </div>
  );
}
