import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import Home from "./pages/Home";



function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  if (user) {
    if (user.role === "VOLUNTEER") {
      return <VolunteerDashboard user={user} setUser={setUser} />;
    }
    if (user.role === "ORGANIZER") {
      return <OrganizerDashboard user={user} setUser={setUser} />;
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Home/>} />

      <Route path="/login" element={<Login onLogin={setUser} />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
