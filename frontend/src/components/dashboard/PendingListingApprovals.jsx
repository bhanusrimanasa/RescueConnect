import { useEffect, useState } from "react";
import {
  getVolunteerApprovedRequests,
  adminApproveRequest,
  adminRejectRequest,
} from "../../services/adoptionRequestService";
import { 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  User, 
  Eye, 
  ShieldCheck, 
  FileText, 
  Calendar 
} from "lucide-react";

function PendingListingApprovals() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectionReasons, setRejectionReasons] = useState({});
  const [selectedCardId, setSelectedCardId] = useState(null);

  const fetchRequests = async () => {
    try {
      const data = await getVolunteerApprovedRequests();
      setRequests(data);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await adminApproveRequest(id);

      setRequests((prev) =>
        prev.filter((r) => r._id !== id)
      );

      if (selectedCardId === id) setSelectedCardId(null);

      if (selectedRequest?._id === id) {
        setSelectedRequest(null);
      }

      alert("Listing Approved successfully.");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          "Failed to approve listing."
      );
    }
  };

  const handleReject = async (id) => {
    const reason = rejectionReasons[id]?.trim();

    if (!reason) {
      alert("Please provide a reason for rejection.");
      return;
    }

    try {
      await adminRejectRequest(id, reason);

      setRequests((prev) =>
        prev.filter((r) => r._id !== id)
      );

      if (selectedCardId === id) setSelectedCardId(null);

      setRejectionReasons((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });

      if (selectedRequest?._id === id) {
        setSelectedRequest(null);
      }

      alert("Listing Rejected.");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          "Failed to reject listing."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-400 text-sm font-medium">
        Loading listing approvals...
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Adoption Listings Awaiting Final Approval
        </h2>

        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
          These pet listings have been approved by a volunteer and require your final administrative review.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400 text-xs sm:text-sm shadow-sm">
          No listings awaiting approval.
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map((request) => {
            const isSelected = selectedCardId === request._id;

            return (
              <div
                key={request._id}
                onClick={() => setSelectedCardId(request._id)}
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
                        <FileText size={20} className="text-indigo-500" />
                        {request.name}
                      </h3>

                      <span className="px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                        Volunteer Approved
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
                        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Animal / Breed</p>
                        <p className="font-semibold text-slate-800 text-xs sm:text-sm mt-1">
                          {request.animalType} <span className="text-slate-400 font-normal">({request.breed || "N/A"})</span>
                        </p>
                      </div>

                      <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
                        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Location</p>
                        <p className="font-semibold text-slate-800 text-xs sm:text-sm mt-1 truncate">{request.location}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 text-xs sm:text-sm text-slate-600 space-y-1.5">
                      <p className="flex items-center gap-1.5">
                        <User size={14} className="text-slate-400 shrink-0" />
                        <span>Submitted By: <strong className="text-slate-800">{request.submittedBy?.name || "N/A"}</strong></span>
                      </p>

                      {request.volunteerReviewedBy?.name && (
                        <p className="flex items-center gap-1.5 pt-1 border-t border-slate-200/60">
                          <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                          <span>Volunteer Reviewer: <strong className="text-slate-800">{request.volunteerReviewedBy.name}</strong></span>
                        </p>
                      )}
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRequest(request);
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
                        value={rejectionReasons[request._id] || ""}
                        onChange={(e) =>
                          setRejectionReasons((prev) => ({
                            ...prev,
                            [request._id]: e.target.value,
                          }))
                        }
                        placeholder="Required only when rejecting..."
                        rows={3}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition"
                      />
                    </div>

                    <div className="flex flex-col gap-2.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleApprove(request._id)}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm transition shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 size={16} />
                        Approve Listing
                      </button>

                      <button
                        onClick={() => handleReject(request._id)}
                        className="w-full bg-rose-600 hover:bg-rose-500 text-white py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm transition shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <XCircle size={16} />
                        Reject Listing
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
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-100">

            <div className="flex justify-between items-center p-6 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur z-10">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <FileText size={22} className="text-indigo-500" />
                  {selectedRequest.name}
                </h2>

                <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                  Full Adoption Listing Details
                </p>
              </div>

              <button
                onClick={() => setSelectedRequest(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center transition cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">

              {/* Listing Photo if available */}
              {selectedRequest.image && (
                <div className="w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-slate-200/80 bg-slate-100">
                  <img 
                    src={selectedRequest.image} 
                    alt={selectedRequest.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Animal Type</p>
                  <p className="font-semibold text-slate-800 mt-1">{selectedRequest.animalType}</p>
                </div>

                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Breed</p>
                  <p className="font-semibold text-slate-800 mt-1">{selectedRequest.breed || "N/A"}</p>
                </div>

                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Age / Gender</p>
                  <p className="font-semibold text-slate-800 mt-1">
                    {selectedRequest.age || "N/A"} {selectedRequest.gender ? `• ${selectedRequest.gender}` : ""}
                  </p>
                </div>

                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Location</p>
                  <p className="font-semibold text-slate-800 mt-1 flex items-center gap-1">
                    <MapPin size={14} className="text-slate-400 shrink-0" />
                    {selectedRequest.location}
                  </p>
                </div>

                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5 sm:col-span-2">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Submitted By</p>
                  <p className="font-semibold text-slate-800 mt-1 flex items-center gap-1">
                    <User size={14} className="text-slate-400 shrink-0" />
                    {selectedRequest.submittedBy?.name || "N/A"} <span className="text-slate-400 font-normal">({selectedRequest.submittedBy?.email || "No email"})</span>
                  </p>
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-slate-900">
                  Description & Background
                </h3>

                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {selectedRequest.description || selectedRequest.reason || "No description provided."}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-100">
                <button
                  onClick={() => handleApprove(selectedRequest._id)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition inline-flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <CheckCircle2 size={16} />
                  Approve Listing
                </button>

                <button
                  onClick={() => handleReject(selectedRequest._id)}
                  className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition inline-flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <XCircle size={16} />
                  Reject Listing
                </button>

                <button
                  onClick={() => setSelectedRequest(null)}
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

export default PendingListingApprovals;