import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import VolunteerSidebar from "../components/VolunteerSideBar";
import API from "../services/api";
import Profile from "../components/Profile";

export default function VolunteerDashboard({ user, setUser }) {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState("Dashboard");
  const [events, setEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);

  /* ================= FETCH EVENTS ================= */
  useEffect(() => {
    API.get("/events").then(res => {
      setEvents(res.data);

      const joined = res.data.filter(event =>
        event.volunteers?.some(v => v.id === user.id)
      );

      setJoinedEvents(joined);
    });
  }, []);

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // Redirect to Home
  };

  /* ================= JOIN EVENT ================= */
  const joinEvent = async (eventId) => {
    await API.post(`/events/join/${eventId}/${user.id}`);

    const res = await API.get("/events");
    setEvents(res.data);

    const joined = res.data.filter(event =>
      event.volunteers?.some(v => v.id === user.id)
    );

    setJoinedEvents(joined);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        user={user}
        onMenuClick={() => setSidebarOpen(true)}
        onLogout={logout}
      />

      <VolunteerSidebar
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
                <h3 className="font-bold">Available Events</h3>
                <p className="text-2xl">{events.length}</p>
              </div>

              <div className="bg-green-100 p-4 rounded">
                <h3 className="font-bold">Joined Events</h3>
                <p className="text-2xl">{joinedEvents.length}</p>
              </div>
            </div>
          )}

          {/* ================= AVAILABLE EVENTS ================= */}
          {view === "Available Events" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {events.map(e => (
                <div
                  key={e.id}
                  className="bg-white p-4 rounded shadow"
                >
                  <h3 className="font-bold">{e.title}</h3>
                  <p className="text-sm text-gray-600">
                    {e.description}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    📍 {e.location} | 📅 {e.eventDate}
                  </p>

                  {!joinedEvents.some(j => j.id === e.id) ? (
                    <button
                      onClick={() => joinEvent(e.id)}
                      className="mt-3 w-full bg-blue-600 text-white py-1 rounded"
                    >
                      Join Event
                    </button>
                  ) : (
                    <p className="mt-3 text-green-600 text-sm font-medium text-center">
                      ✔ Joined
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ================= MY EVENTS ================= */}
          {view === "My Events" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {joinedEvents.length === 0 && (
                <p className="text-gray-500">
                  You haven’t joined any events yet.
                </p>
              )}

              {joinedEvents.map(e => (
                <div
                  key={e.id}
                  className="bg-green-50 p-4 rounded shadow"
                >
                  <h3 className="font-bold">{e.title}</h3>
                  <p className="text-sm">{e.location}</p>
                  <p className="text-xs text-gray-500">
                    📅 {e.eventDate}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* ================= OTHER VIEWS ================= */}
          {view === "History" && <p>Past participation</p>}
          {view === "Messages" && <p>Messages UI</p>}

          {view === "Profile & Settings" && (
            <Profile user={user} setUser={setUser} />
          )}

          {view === "Settings" && <p>Settings</p>}
        </div>
      </main>
    </div>
  );
}
