import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import AnimalHealthAIAssistant from "./AnimalHealthAIAssistant";
import { HeartPulse } from "lucide-react";

function Navbar() {
  const { user, loading, setUser } = useAuth();
  const navigate = useNavigate();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  console.log(user);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <NavLink
            to="/"
            className="text-3xl font-bold text-red-600"
          >
            ❤️ RescueConnect
          </NavLink>

          {/* Navigation */}
          <div className="flex items-center gap-6">

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 font-semibold"
                  : "text-gray-700 hover:text-red-600 transition"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/reports"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 font-semibold"
                  : "text-gray-700 hover:text-red-600 transition"
              }
            >
              Reports
            </NavLink>

            <NavLink
              to="/adoptions"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 font-semibold"
                  : "text-gray-700 hover:text-red-600 transition"
              }
            >
              Adoptions
            </NavLink>

            {/* AI Vet Advisor Trigger Button (Available Globally) */}
            <button
              type="button"
              onClick={() => setIsAiModalOpen(true)}
              className="bg-pink-600 hover:bg-pink-500 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition shadow-sm cursor-pointer"
              title="AI Emergency Vet & Triage Assistant"
            >
              <HeartPulse size={16} className="animate-pulse" />
              <span>AI Vet Advisor</span>
            </button>

            {!loading && !user ? (
              <>
                <NavLink
                  to="/login"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/report"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-600 font-semibold"
                      : "text-gray-700 hover:text-red-600 transition"
                  }
                >
                  Report Animal
                </NavLink>

                <NavLink
                  to="/volunteer"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-600 font-semibold"
                      : "text-gray-700 hover:text-red-600 transition"
                  }
                >
                  Volunteer
                </NavLink>

                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-600 font-semibold"
                      : "text-gray-700 hover:text-red-600 transition"
                  }
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-600 font-semibold"
                      : "text-gray-700 hover:text-red-600 transition"
                  }
                >
                  Profile
                </NavLink>

                <button 
                  onClick={handleLogout} 
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  Logout
                </button>
              </>
            )}

          </div>
        </div>
      </nav>

      {/* AI Vet Advisor Modal Component */}
      <AnimalHealthAIAssistant 
        isOpen={isAiModalOpen} 
        onClose={() => setIsAiModalOpen(false)} 
      />
    </>
  );
}

export default Navbar;