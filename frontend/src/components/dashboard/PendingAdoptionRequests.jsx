import { useEffect, useState } from "react";
import {
  getPendingRequests,
  volunteerApproveRequest,
  volunteerRejectRequest,
} from "../../services/adoptionRequestService";
import { 
  CheckCircle2, 
  XCircle, 
  PawPrint, 
  Phone, 
  User 
} from "lucide-react";

function PendingAdoptionRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectionReasons, setRejectionReasons] = useState({});
  const [selectedCardId, setSelectedCardId] = useState(null);

  const fetchRequests = async () => {
    try {
      const data = await getPendingRequests();
      setRequests(data);
    } catch (err) {
      console.error("Failed to fetch adoption requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await volunteerApproveRequest(id);
      setRequests((prev) => prev.filter((request) => request._id !== id));
      if (selectedCardId === id) setSelectedCardId(null);
      alert("Recommendation sent to admin.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to send recommendation.");
    }
  };

  const handleReject = async (id) => {
    const reason = rejectionReasons[id]?.trim();

    if (!reason) {
      alert("Please provide a reason for rejection.");
      return;
    }

    try {
      await volunteerRejectRequest(id, reason);
      setRequests((prev) => prev.filter((request) => request._id !== id));
      if (selectedCardId === id) setSelectedCardId(null);
      setRejectionReasons((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
      alert("Request rejected.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to reject request.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-400 text-sm font-medium">
        Loading Adoption Requests...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Adoption Listings Awaiting Review
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
          Verify the animal information before recommending the listing to an administrator.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400 text-xs sm:text-sm shadow-sm">
          No adoption requests awaiting review.
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map((request) => {
            const isSelected = selectedCardId === request._id;

            return (
              <div
                key={request._id}
                onClick={() => setSelectedCardId(request._id)}
                className={`bg-white rounded-2xl border transition-all duration-200 p-6 sm:p-8 space-y-6 cursor-pointer shadow-sm ${
                  isSelected 
                    ? "border-slate-900 ring-2 ring-slate-900/10 shadow-md bg-slate-50/20" 
                    : "border-slate-200/80 hover:border-slate-300 hover:shadow-md"
                }`}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 pb-6 border-b border-slate-100">
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                      <PawPrint size={20} className="text-indigo-500" />
                      {request.name}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm flex items-center gap-1.5">
                      <User size={14} className="text-slate-400 shrink-0" />
                      Submitted by: <span className="font-semibold text-slate-700">{request.submittedBy?.name || "Unknown"}</span>
                    </p>
                  </div>

                  <span className="bg-amber-50 border border-amber-200 text-amber-700 px-3.5 py-1 rounded-full text-xs font-semibold shrink-0 self-start">
                    Pending Review
                  </span>
                </div>

                {/* Animal details grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Animal Type</p>
                    <p className="font-semibold text-slate-800 text-xs sm:text-sm mt-1">{request.animalType}</p>
                  </div>

                  <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Breed</p>
                    <p className="font-semibold text-slate-800 text-xs sm:text-sm mt-1 truncate">{request.breed}</p>
                  </div>

                  <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Age</p>
                    <p className="font-semibold text-slate-800 text-xs sm:text-sm mt-1">{request.age}</p>
                  </div>

                  <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Gender</p>
                    <p className="font-semibold text-slate-800 text-xs sm:text-sm mt-1">{request.gender}</p>
                  </div>

                  <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Size</p>
                    <p className="font-semibold text-slate-800 text-xs sm:text-sm mt-1">{request.size}</p>
                  </div>

                  <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Location</p>
                    <p className="font-semibold text-slate-800 text-xs sm:text-sm mt-1 truncate">{request.location}</p>
                  </div>
                </div>

                {/* Contact row */}
                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                  <Phone size={15} className="text-slate-400 shrink-0" />
                  <span>Contact Phone: <strong className="text-slate-900">{request.phone}</strong></span>
                </div>

                {/* Images */}
                {request.images?.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-sm text-slate-900">Animal Images</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {request.images.map((image, index) => (
                        <img
                          key={`${request._id}-${index}`}
                          src={image}
                          alt={`${request.name} ${index + 1}`}
                          className="w-full h-36 object-cover rounded-xl border border-slate-200 shadow-sm"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Description & Story */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-slate-900">Animal Description</h4>
                    <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {request.animalDescription}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <span>📖</span> Rescue Story
                    </h4>
                    <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 text-xs sm:text-sm text-slate-600 whitespace-pre-line leading-relaxed">
                      {request.rescueStory}
                    </div>
                  </div>
                </div>

                {/* Health attributes */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Vaccinated</p>
                    <p className="font-semibold text-slate-800 text-xs sm:text-sm mt-1">{request.vaccinated ? "Yes" : "No"}</p>
                  </div>
                  <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Sterilized</p>
                    <p className="font-semibold text-slate-800 text-xs sm:text-sm mt-1">{request.sterilized ? "Yes" : "No"}</p>
                  </div>
                  <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Special Needs</p>
                    <p className="font-semibold text-slate-800 text-xs sm:text-sm mt-1">{request.specialNeeds ? "Yes" : "No"}</p>
                  </div>
                </div>

                {/* Rejection reason box */}
                <div className="space-y-2 pt-2" onClick={(e) => e.stopPropagation()}>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                    Rejection Reason (Required if rejecting)
                  </label>
                  <textarea
                    value={rejectionReasons[request._id] || ""}
                    onChange={(e) =>
                      setRejectionReasons((prev) => ({
                        ...prev,
                        [request._id]: e.target.value,
                      }))
                    }
                    placeholder="Enter a reason if you are rejecting this listing..."
                    rows={2}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleApprove(request._id)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 size={16} />
                    Recommend Approval
                  </button>

                  <button
                    onClick={() => handleReject(request._id)}
                    className="flex-1 bg-rose-600 hover:bg-rose-500 text-white py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <XCircle size={16} />
                    Recommend Rejection
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PendingAdoptionRequests;