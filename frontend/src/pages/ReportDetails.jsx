import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getReportById,
  acceptReport,
  updateProgress,
} from "../services/reportService";
import ReportTimeline from "../components/ReportTimeline";
import { useAuth } from "../context/AuthContext";
import MapView from "../components/MapView";
import { updateVolunteerLocation } from "../services/volunteerService";

function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [volunteerLocation, setVolunteerLocation] = useState(null);
  const [report, setReport] = useState(null);
  const [progress, setProgress] = useState("");
  const [note, setNote] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { user } = useAuth();

  const fetchReport = async () => {
    try {
      const data = await getReportById(id);
      setReport(data);

      if (data.images && data.images.length > 0) {
        setSelectedImage(data.images[0]);
      } else {
        setSelectedImage(null);
      }
    } catch (err) {
      console.error("Failed to fetch report:", err);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [id]);

  if (!report) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 font-medium text-sm">Loading report details...</p>
      </div>
    );
  }

  const handleAccept = async () => {
    try {
      setActionLoading(true);
      await acceptReport(report._id);
      await fetchReport();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleProgressUpdate = async () => {
    if (!progress) {
      alert("Please select a progress status");
      return;
    }

    try {
      setActionLoading(true);
      await updateProgress(report._id, {
        progress,
        note,
      });

      setProgress("");
      setNote("");
      await fetchReport();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const getVolunteerLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          setVolunteerLocation({ latitude, longitude });
          await updateVolunteerLocation(latitude, longitude, true);
          alert("You are now available for rescue missions.");
        } catch (err) {
          console.error("Failed to update volunteer location:", err);
          alert("Failed to update your location.");
        }
      },
      (error) => {
        console.error(error);
        alert("Unable to get your current location.");
      },
      { enableHighAccuracy: true }
    );
  };

  const statusColor = {
    Pending: "bg-amber-50 text-amber-700 border border-amber-200/60",
    Assigned: "bg-blue-50 text-blue-700 border border-blue-200/60",
    "In Progress": "bg-indigo-50 text-indigo-700 border border-indigo-200/60",
    Rescued: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
    Closed: "bg-slate-100 text-slate-700 border border-slate-200/60",
  };

  const priorityColor = {
    Urgent: "text-rose-600 bg-rose-50 border-rose-100",
    High: "text-orange-600 bg-orange-50 border-orange-100",
    Medium: "text-amber-600 bg-amber-50 border-amber-100",
    Low: "text-slate-600 bg-slate-50 border-slate-100",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            to="/reports"
            className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-700 mb-2"
          >
            ← Back to Reports
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {report.animalType} Report
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                statusColor[report.status] || "bg-slate-100 text-slate-700"
              }`}
            >
              {report.status}
            </span>
          </div>
        </div>

        {report.priority && (
          <span
            className={`text-xs font-semibold px-3 py-1.5 rounded-xl border shadow-sm ${
              priorityColor[report.priority] || "text-slate-700 bg-slate-50"
            }`}
          >
            ⚠️ Priority: {report.priority}
          </span>
        )}
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-8">
        
        {/* ================= IMAGES SECTION ================= */}
        {report.images && report.images.length > 0 ? (
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-4">Animal Media</h2>
            
            {/* Main Preview Image */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center max-h-[500px]">
              <div
                className="absolute inset-0 bg-cover bg-center scale-110 blur-2xl opacity-20"
                style={{ backgroundImage: `url(${selectedImage || report.images[0]})` }}
              />
              <img
                src={selectedImage || report.images[0]}
                alt={`${report.animalType} report`}
                className="relative z-10 w-full h-auto max-h-[500px] object-contain"
              />
            </div>

            {/* Thumbnails */}
            {report.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {report.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    className={`flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === image
                        ? "border-indigo-600 shadow-md scale-105"
                        : "border-slate-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-20 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="h-40 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <span className="text-4xl mb-1 block">🐾</span>
              <p className="text-xs font-medium">No images uploaded for this report.</p>
            </div>
          </div>
        )}

        {/* ================= REPORT INFORMATION GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-medium text-slate-400 block uppercase tracking-wider">Problem / Issue</span>
              <p className="text-slate-900 font-semibold text-base mt-0.5">{report.problem}</p>
            </div>

            <div>
              <span className="text-xs font-medium text-slate-400 block uppercase tracking-wider">Description</span>
              <p className="text-slate-700 text-sm mt-0.5 leading-relaxed">
                {report.description || "No description provided"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-medium text-slate-400 block uppercase tracking-wider">Contact Person</span>
              <p className="text-slate-900 font-medium text-sm mt-0.5">{report.contactUser || "N/A"}</p>
            </div>

            <div>
              <span className="text-xs font-medium text-slate-400 block uppercase tracking-wider">Current Status</span>
              <p className="text-slate-900 font-medium text-sm mt-0.5 capitalize">{report.status}</p>
            </div>
          </div>
        </div>

        {/* ================= LOCATION & MAP ================= */}
        {Number.isFinite(Number(report.latitude)) && Number.isFinite(Number(report.longitude)) ? (
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>📍</span> Animal Location & Navigation
            </h2>

            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4">
              <span className="text-xs font-medium text-slate-400">Reported Address</span>
              <p className="text-slate-800 font-medium text-sm mt-0.5">{report.location || "No address details provided"}</p>
            </div>

            {report.latitude != null && report.longitude != null && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {user?.role === "volunteer" && (
                    <button
                      onClick={getVolunteerLocation}
                      className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-indigo-500 transition shadow-sm"
                    >
                      📍 Get My GPS Position
                    </button>
                  )}

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${report.latitude},${report.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-emerald-500 transition shadow-sm"
                  >
                    🧭 Open in Google Maps →
                  </a>
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-200">
                  <MapView
                    latitude={Number(report.latitude)}
                    longitude={Number(report.longitude)}
                    volunteerLocation={volunteerLocation}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="pt-6 border-t border-slate-100">
            <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-4">
              <p className="text-amber-800 text-xs font-medium">
                📌 Live GPS coordinates are not available. Please rely on the text location: <strong className="font-semibold">{report.location}</strong>
              </p>
            </div>
          </div>
        )}

        {/* ================= RESCUE STATUS CARD (Non-Volunteer) ================= */}
        {user?.role !== "volunteer" && (
          <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100">
            <h2 className="text-base font-bold text-indigo-900 mb-1">
              🚑 Rescue Mission Status
            </h2>
            <p className="text-indigo-700 text-sm">
              This case is currently <span className="font-bold">{report.status}</span>.
            </p>
            {report.assignedVolunteer && (
              <p className="mt-1 text-indigo-700 text-xs">
                Assigned Responder: <span className="font-semibold">{report.assignedVolunteer.name}</span>
              </p>
            )}
          </div>
        )}

        {/* ================= VOLUNTEER ACTIONS ================= */}
        {user?.role === "volunteer" && report.assignedVolunteer?._id === user._id && (
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Volunteer Mission Actions</h2>

            <div className="flex flex-wrap gap-3">
              {report.status === "Assigned" && (
                <button
                  onClick={handleAccept}
                  disabled={actionLoading}
                  className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-xs font-semibold hover:bg-emerald-500 transition shadow-sm disabled:opacity-50"
                >
                  🚑 Accept Mission
                </button>
              )}

              {report.status === "Rescued" && (
                <button
                  onClick={() => navigate(`/adoptions/create-from-rescue/${report._id}`)}
                  className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-xs font-semibold hover:bg-emerald-500 transition shadow-sm"
                >
                  🏡 Create Adoption Listing
                </button>
              )}

              {(report.status === "Rescued" || report.status === "Closed") && (
                <button
                  onClick={() => navigate(`/success-stories/create/${report._id}`)}
                  className="bg-purple-600 text-white px-6 py-2.5 rounded-xl text-xs font-semibold hover:bg-purple-500 transition shadow-sm"
                >
                  🏆 Write Success Story
                </button>
              )}
            </div>

            {/* ================= UPDATE RESCUE PROGRESS ================= */}
            {report.status !== "Closed" && report.status !== "Rescued" && (
              <div className="mt-6 bg-slate-50 border border-slate-200/60 rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Update Rescue Progress</h3>

                <select
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="">Select Milestone Status</option>
                  <option>Reached Location</option>
                  <option>Animal Stabilized</option>
                  <option>Taken to Veterinary Hospital</option>
                  <option>Under Treatment</option>
                  <option>Ready for Adoption</option>
                  <option>Rescued</option>
                  <option>Case Closed</option>
                </select>

                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add case notes or details about the update..."
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  rows={3}
                />

                <button
                  onClick={handleProgressUpdate}
                  disabled={actionLoading}
                  className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-indigo-500 transition shadow-sm disabled:opacity-50"
                >
                  {actionLoading ? "Saving..." : "Save Progress Update"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ================= TIMELINE SECTION ================= */}
      {report.statusHistory && report.statusHistory.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Case Timeline</h2>
          <ReportTimeline history={report.statusHistory} />
        </div>
      )}
    </div>
  );
}

export default ReportDetails;