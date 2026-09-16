import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCompletedReports } from "../../services/reportService";
import { updateVolunteerLocation } from "../../services/volunteerService";

import PendingAdoptionRequests from "./PendingAdoptionRequests";
import PendingApplications from "./PendingApplications";
import AssignedReports from "../../pages/volunteer/AssignedReports";

function VolunteerDashboard({ user }) {
  const navigate = useNavigate();
  const [completedReports, setCompletedReports] = useState([]);
  const [locationStatus, setLocationStatus] = useState("Active tracking...");
  const [activeTab, setActiveTab] = useState("missions");

  useEffect(() => {
    fetchCompletedReports();
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocationStatus("GPS live tracking active");

        try {
          await updateVolunteerLocation(latitude, longitude, true);
        } catch (error) {
          console.error("Failed to update volunteer location:", error);
          setLocationStatus("Sync error (Retrying...)");
        }
      },
      (error) => {
        console.error("Location error:", error);
        setLocationStatus("GPS permission denied");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 10000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const fetchCompletedReports = async () => {
    try {
      const data = await getCompletedReports();
      setCompletedReports(data);
    } catch (error) {
      console.error("Failed to fetch completed reports:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      
      {/* ================= HERO HEADER ================= */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 text-white rounded-3xl shadow-xl p-8 md:p-10">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-800/50 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 text-emerald-100 border border-emerald-400/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Verified Responder
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Welcome back, {user?.name || "Volunteer"}!
            </h1>
            <p className="mt-2 text-emerald-100 text-sm md:text-base max-w-xl leading-relaxed">
              Your field operations center. Monitor active animal rescues, handle emergency deployment vectors, and review adoption reviews in real-time.
            </p>
          </div>

          <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col gap-1.5 min-w-[220px]">
            <span className="text-xs uppercase tracking-wider text-emerald-200 font-semibold">Field Radar Status</span>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
              {locationStatus}
            </div>
            <span className="text-[11px] text-emerald-200/70">Broadcasting location securely</span>
          </div>
        </div>
      </div>

      {/* ================= TAB NAVIGATION BAR ================= */}
      <div className="flex items-center gap-2 bg-white border border-gray-100 shadow-sm p-2 rounded-2xl overflow-x-auto">
        <button
          onClick={() => setActiveTab("missions")}
          className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
            activeTab === "missions"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-200"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <span>🚑</span> Assigned Missions
        </button>

        <button
          onClick={() => setActiveTab("listings")}
          className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
            activeTab === "listings"
              ? "bg-teal-600 text-white shadow-md shadow-teal-200"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <span>🏡</span> Adoption Listings
        </button>

        <button
          onClick={() => setActiveTab("applications")}
          className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
            activeTab === "applications"
              ? "bg-rose-600 text-white shadow-md shadow-rose-200"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <span>❤️</span> Applications
        </button>

        <button
          onClick={() => setActiveTab("helped")}
          className={`flex-1 min-w-[160px] flex items-center justify-between px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
            activeTab === "helped"
              ? "bg-amber-600 text-white shadow-md shadow-amber-200"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>🐾</span> Impact Registry
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === "helped" ? "bg-amber-700 text-white" : "bg-gray-100 text-gray-700"}`}>
            {completedReports.length}
          </span>
        </button>
      </div>

      {/* ================= TAB CONTENT PANELS ================= */}
      
      {/* TAB 1: RESCUE MISSIONS */}
      {activeTab === "missions" && (
        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 animate-fadeIn">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span>🚑</span> Active Rescue Missions
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">Emergency cases assigned directly to your operational ledger</p>
            </div>
          </div>
          <AssignedReports />
        </section>
      )}

      {/* TAB 2: ADOPTION LISTINGS */}
      {activeTab === "listings" && (
        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 animate-fadeIn">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span>🏡</span> Adoption Listings Awaiting Review
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">Inspect and verify shelter entries ready for public visibility</p>
            </div>
          </div>
          <PendingAdoptionRequests />
        </section>
      )}

      {/* TAB 3: ADOPTION APPLICATIONS */}
      {activeTab === "applications" && (
        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 animate-fadeIn">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span>❤️</span> Adoption Applications Awaiting Recommendation
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">Assess candidate compatibility to streamline forever home placements</p>
            </div>
          </div>
          <PendingApplications />
        </section>
      )}

      {/* TAB 4: ANIMALS HELPED */}
      {activeTab === "helped" && (
        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 animate-fadeIn">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span>🐾</span> Animals You Have Helped
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">Your personal ledger of completed rescue achievements</p>
            </div>
          </div>

          {completedReports.length === 0 ? (
            <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-12 text-center">
              <div className="text-4xl mb-3">🛡️</div>
              <p className="text-gray-700 font-medium">No completed rescue cases logged yet.</p>
              <p className="text-gray-400 text-sm mt-1">Complete your active missions to populate your personal impact history.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {completedReports.map((report) => (
                <div
                  key={report._id}
                  onClick={() => navigate(`/reports/${report._id}`)}
                  className="group bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        🐾 {report.animalType}
                      </h3>
                      <span className="bg-emerald-50 text-emerald-700 font-semibold text-xs px-3 py-1 rounded-full border border-emerald-200/60">
                        {report.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-sm text-gray-600 my-4">
                      <p className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700">Problem:</span> {report.problem}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700">Location:</span> {report.location}
                      </p>
                    </div>

                    <div className="text-xs text-gray-400 font-medium border-t border-gray-100 pt-3">
                      Successfully resolved on {new Date(report.updatedAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/reports/${report._id}`);
                      }}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold py-2.5 px-4 rounded-xl transition"
                    >
                      View Details
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/success-stories/create/${report._id}`);
                      }}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-purple-200 transition flex items-center justify-center gap-1.5"
                    >
                      <span>🏆</span> Write Story
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

    </div>
  );
}

export default VolunteerDashboard;