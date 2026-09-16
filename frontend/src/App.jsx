import { Routes, Route } from "react-router-dom";
import CreateAdoptionFromRescue from "./pages/CreateAdoptionFromRescue";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MyReports from "./pages/MyReports";
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
import AdoptionDetails from "./pages/AdoptionDetails";
import AdoptionRequest from "./pages/AdoptionRequest";
import AdoptionApplication from "./pages/AdoptionApplication";
import CreateSuccessStory from "./pages/CreateSuccessStory";
import SuccessStoryDetails from "./pages/SuccessStoryDetails";
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
        path="/adoptions/create-from-rescue/:reportId"
        element={
          <ProtectedRoute>
            <CreateAdoptionFromRescue />
          </ProtectedRoute>
        }
      />
          <Route path="/adoptions/:id"  element={<AdoptionDetails />} /> 
          <Route
                path="/adoptions/:id/apply"
                element={
                  <ProtectedRoute>
                    <AdoptionApplication />
                  </ProtectedRoute>
                }
              />        
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
           <Route path="/profile" element={<ProtectedRoute><Profile />
                </ProtectedRoute>
            }
            />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/adoption-request"
            element={
              <ProtectedRoute>
                <AdoptionRequest />
              </ProtectedRoute>
            }
          />
                <Route
        path="/my-reports"
        element={<MyReports />}
      />
      <Route
  path="/success-stories/create/:reportId"
  element={<CreateSuccessStory />}
/>
            <Route
            path="/success-stories/:id"
            element={<SuccessStoryDetails />}
          />
                </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;