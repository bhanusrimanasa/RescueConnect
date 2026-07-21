import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ReportAnimal from "./pages/ReportAnimal";
import Reports from "./pages/Reports";
import ReportDetails from "./pages/ReportDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Volunteer from "./pages/Volunteer";
import Adoptions from "./pages/Adoptions";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/report"
            element={
                <ProtectedRoute>
                <ReportAnimal />
                </ProtectedRoute>
            }
            />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/:id" element={<ReportDetails />} />

          <Route path="/adoptions" element={<Adoptions />} />
                    <Route
            path="/volunteer"
            element={
                <ProtectedRoute>
                <Volunteer />
                </ProtectedRoute>
            }
            />
            <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                <Dashboard />
                </ProtectedRoute>
            }
            />
                    <Route
            path="/profile"
            element={
                <ProtectedRoute>
                <Profile />
                </ProtectedRoute>
            }
            />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;