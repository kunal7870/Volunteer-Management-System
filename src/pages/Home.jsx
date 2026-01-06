import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />

      {/* HERO WITH BACKGROUND IMAGE */}
      <section
        className="relative h-[90vh] flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* CONTENT */}
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Connect Volunteers with Meaningful Events
          </h1>

          <p className="mt-4 text-gray-200 max-w-2xl mx-auto">
            Discover join and List events 
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded text-lg transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose Volunteer?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature
            title="Easy Event Management"
            desc="Organizers can create, manage, and track events effortlessly."
          />
          <Feature
            title="Volunteer Tracking"
            desc="Track volunteer participation and attendance in real time."
          />
          <Feature
            title="Smart Dashboard"
            desc="Get insights and reports with a clean, simple dashboard."
          />
        </div>
      </section> */}

      {/* HOW IT WORKS
      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Step number="1" text="Sign up as a Volunteer or Organizer" />
          <Step number="2" text="Browse or Create Events" />
          <Step number="3" text="Join, Manage & Track Participation" />
        </div>
      </section> */}

      {/* CTA */}
      <section className="bg-blue-400 text-white py-16 text-center">
        <h2 className="text-3xl font-bold">
          Ready !!!!!!!!
        </h2>
        <p className="mt-4">
          Join today and be a part.
        </p>

        <Link
          to="/register"
          className="inline-block mt-6 bg-white text-blue-600 px-6 py-3 rounded text-lg"
        >
          Join Now
        </Link>
      </section>

      <Footer />
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Feature({ title, desc }) {
  return (
    <div className="bg-gray-100 p-6 rounded shadow text-center">
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function Step({ number, text }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
        {number}
      </div>
      <p className="mt-4 text-gray-700">{text}</p>
    </div>
  );
}
