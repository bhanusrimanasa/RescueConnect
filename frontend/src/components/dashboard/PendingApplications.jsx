import { useEffect, useState } from "react";
import {
  getApplications,
  volunteerApproveApplication,
  volunteerRejectApplication,
} from "../../services/adoptionApplicationService";
import { 
  CheckCircle2, 
  XCircle, 
  Heart, 
  Phone, 
  User, 
  Eye, 
  Home 
} from "lucide-react";

function PendingApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [rejectionReasons, setRejectionReasons] = useState({});
  const [selectedCardId, setSelectedCardId] = useState(null);

  const fetchApplications = async () => {
    try {
      const data = await getApplications();
      setApplications(
        data.filter((app) => app.status === "Pending")
      );
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleRecommendApprove = async (id) => {
    try {
      await volunteerApproveApplication(id);

      setApplications((prev) =>
        prev.filter((app) => app._id !== id)
      );

      if (selectedCardId === id) setSelectedCardId(null);

      if (selectedApplication?._id === id) {
        setSelectedApplication(null);
      }

      alert("Recommendation sent to admin.");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          "Failed to recommend approval."
      );
    }
  };

  const handleRecommendReject = async (id) => {
    const reason = rejectionReasons[id]?.trim();

    if (!reason) {
      alert("Please provide a reason for rejection.");
      return;
    }

    try {
      await volunteerRejectApplication(id, reason);

      setApplications((prev) =>
        prev.filter((app) => app._id !== id)
      );

      if (selectedCardId === id) setSelectedCardId(null);

      setRejectionReasons((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });

      if (selectedApplication?._id === id) {
        setSelectedApplication(null);
      }

      alert("Recommendation recorded.");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          "Failed to recommend rejection."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-400 text-sm font-medium">
        Loading pending applications...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Pending Adoption Applications
        </h2>

        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
          Review applicant details before recommending approval or rejection to the administrator.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400 text-xs sm:text-sm shadow-sm">
          No pending applications.
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => {
            const isSelected = selectedCardId === app._id;

            return (
              <div
                key={app._id}
                onClick={() => setSelectedCardId(app._id)}
                className={`bg-white rounded-2xl border transition-all duration-200 p-6 sm:p-8 cursor-pointer shadow-sm ${
                  isSelected 
                    ? "border-slate-900 ring-2 ring-slate-900/10 shadow-md bg-slate-50/20" 
                    : "border-slate-200/80 hover:border-slate-300 hover:shadow-md"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

                  <div className="flex-1 space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                        <User size={20} className="text-indigo-500" />
                        {app.fullName}
                      </h3>

                      <span className="px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
                        Pending Review
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
                        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Animal Applied For</p>
                        <p className="font-semibold text-slate-800 text-xs sm:text-sm mt-1">
                          {app.animal?.name || "N/A"} <span className="text-slate-400 font-normal">({app.animal?.animalType || "N/A"})</span>
                        </p>
                      </div>

                      <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
                        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Occupation</p>
                        <p className="font-semibold text-slate-800 text-xs sm:text-sm mt-1 truncate">{app.occupation}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 text-xs sm:text-sm text-slate-600 space-y-1.5">
                      <p className="flex items-center gap-1.5">
                        <Phone size={14} className="text-slate-400 shrink-0" />
                        <span>Phone: <strong className="text-slate-800">{app.phone}</strong></span>
                      </p>

                      <p className="flex items-center gap-1.5 truncate">
                        <Home size={14} className="text-slate-400 shrink-0" />
                        <span className="truncate">Address: <strong className="text-slate-800">{app.address}</strong></span>
                      </p>

                      <p className="text-slate-400 text-[11px] pt-1 border-t border-slate-200/60">
                        Applicant ID: {app.applicant?._id || "N/A"}
                      </p>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApplication(app);
                        }}
                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition inline-flex items-center gap-2 cursor-pointer shadow-sm"
                      >
                        <Eye size={16} />
                        View Full Details
                      </button>
                    </div>
                  </div>

                  <div className="lg:w-80 flex flex-col justify-between space-y-4 pt-4 lg:pt-0 lg:border-l lg:border-slate-100 lg:pl-6">
                    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                        Rejection Reason
                      </label>

                      <textarea
                        value={
                          rejectionReasons[app._id] || ""
                        }
                        onChange={(e) =>
                          setRejectionReasons((prev) => ({
                            ...prev,
                            [app._id]: e.target.value,
                          }))
                        }
                        placeholder="Enter a reason only if you are recommending rejection..."
                        rows={3}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition"
                      />
                    </div>

                    <div className="flex flex-col gap-2.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() =>
                          handleRecommendApprove(app._id)
                        }
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm transition shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 size={16} />
                        Recommend Approval
                      </button>

                      <button
                        onClick={() =>
                          handleRecommendReject(app._id)
                        }
                        className="w-full bg-rose-600 hover:bg-rose-500 text-white py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm transition shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <XCircle size={16} />
                        Recommend Rejection
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-100">

            <div className="flex justify-between items-center p-6 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur z-10">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <User size={22} className="text-indigo-500" />
                  {selectedApplication.fullName}
                </h2>

                <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                  Full Adoption Application Details
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedApplication(null)
                }
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center transition cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">

              {/* Animal Info Banner */}
              <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                  🐾
                </div>
                <div>
                  <p className="text-[11px] font-medium text-indigo-400 uppercase tracking-wider">Applying For Animal</p>
                  <p className="font-bold text-slate-900 text-sm sm:text-base">
                    {selectedApplication.animal?.name || "N/A"} <span className="text-slate-500 font-normal">({selectedApplication.animal?.animalType || "N/A"})</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Breed: {selectedApplication.animal?.breed || "N/A"}</p>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Phone</p>
                  <p className="font-semibold text-slate-800 mt-1">{selectedApplication.phone}</p>
                </div>

                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Occupation</p>
                  <p className="font-semibold text-slate-800 mt-1">{selectedApplication.occupation}</p>
                </div>

                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5 sm:col-span-2">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Address</p>
                  <p className="font-semibold text-slate-800 mt-1">{selectedApplication.address}</p>
                </div>

                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5 sm:col-span-2">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Family Members</p>
                  <p className="font-semibold text-slate-800 mt-1">{selectedApplication.familyMembers || "Not provided"}</p>
                </div>
              </div>

              {/* Experience & Reason Sections */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <span>🐶</span> Previous Pet Experience
                  </h3>

                  <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {selectedApplication.experience || "No previous pet experience provided."}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <Heart size={16} className="text-pink-500" /> Reason for Adoption
                  </h3>

                  <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {selectedApplication.reason}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-100">
                <button
                  onClick={() =>
                    handleRecommendApprove(selectedApplication._id)
                  }
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition inline-flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <CheckCircle2 size={16} />
                  Recommend Approval
                </button>

                <button
                  onClick={() =>
                    handleRecommendReject(selectedApplication._id)
                  }
                  className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition inline-flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <XCircle size={16} />
                  Recommend Rejection
                </button>

                <button
                  onClick={() =>
                    setSelectedApplication(null)
                  }
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PendingApplications;