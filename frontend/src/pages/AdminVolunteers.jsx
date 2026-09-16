import { useState, useEffect } from "react";
import { getAllVolunteers, updateVolunteerStatus } from "../services/volunteerService";

function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const fetchVolunteers = async () => {
    try {
      const data = await getAllVolunteers();
      setVolunteers(data);
    } catch (err) {
      console.error("Failed to fetch volunteers:", err);
      alert("Failed to load volunteer applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const handleStatusChange = async (volunteerId, newStatus) => {
    try {
      await updateVolunteerStatus(volunteerId, newStatus);
      alert(`Application ${newStatus} successfully!`);
      fetchVolunteers();
      setSelectedVolunteer(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Volunteer Applications</h1>
          <p className="text-gray-500 text-sm mt-1">Review applicant qualifications, background, and manage rescue roles.</p>
        </div>
        <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
          Total: {volunteers.length}
        </span>
      </div>

      {volunteers.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
          <p className="text-gray-400 font-medium">No volunteer applications found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                  <th className="p-4 sm:px-6">Applicant</th>
                  <th className="p-4 sm:px-6">Location</th>
                  <th className="p-4 sm:px-6">Availability</th>
                  <th className="p-4 sm:px-6">Status</th>
                  <th className="p-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {volunteers.map((vol) => (
                  <tr key={vol._id} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 sm:px-6">
                      <p className="font-bold text-gray-900">{vol.user?.name || "Unknown"}</p>
                      <p className="text-xs text-gray-400">{vol.user?.email || "No email"}</p>
                    </td>
                    <td className="p-4 sm:px-6 text-gray-600 font-medium">{vol.city}</td>
                    <td className="p-4 sm:px-6 text-gray-600">{vol.availability}</td>
                    <td className="p-4 sm:px-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        vol.status === "Approved" ? "bg-emerald-100 text-emerald-800" :
                        vol.status === "Rejected" ? "bg-rose-100 text-rose-800" :
                        "bg-amber-100 text-amber-800 animate-pulse"
                      }`}>
                        {vol.status}
                      </span>
                    </td>
                    <td className="p-4 sm:px-6 text-right space-x-2">
                      <button
                        onClick={() => setSelectedVolunteer(vol)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-xl text-xs font-bold transition"
                      >
                        🔍 View Profile
                      </button>
                      {vol.status !== "Approved" && (
                        <button
                          onClick={() => handleStatusChange(vol._id, "Approved")}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs"
                        >
                          Approve
                        </button>
                      )}
                      {vol.status !== "Rejected" && (
                        <button
                          onClick={() => handleStatusChange(vol._id, "Rejected")}
                          className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs"
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= DETAILED MODAL ================= */}
      {selectedVolunteer && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-gray-900">Applicant Details</h3>
                <p className="text-xs text-gray-400 mt-0.5">Submitted application review</p>
              </div>
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="text-gray-400 hover:text-gray-600 font-bold text-xl px-2"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm bg-gray-50/70 p-5 rounded-2xl border border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full Name</p>
                  <p className="font-semibold text-gray-800">{selectedVolunteer.user?.name}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</p>
                  <p className="font-semibold text-gray-800">{selectedVolunteer.user?.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone</p>
                  <p className="font-semibold text-gray-800">{selectedVolunteer.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Emergency Contact</p>
                  <p className="font-semibold text-gray-800">{selectedVolunteer.emergencyContact}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">City</p>
                  <p className="font-semibold text-gray-800">{selectedVolunteer.city}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Vehicle</p>
                  <p className="font-semibold text-gray-800">{selectedVolunteer.hasVehicle}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Experience</p>
                  <p className="font-semibold text-gray-800">{selectedVolunteer.experience}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Availability</p>
                <p className="font-semibold text-gray-800">{selectedVolunteer.availability}</p>
              </div>

              <div className="pt-2 border-t border-gray-200/60">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Reason for Volunteering</p>
                <p className="text-gray-700 bg-white p-3 rounded-xl border border-gray-200/60 italic">
                  "{selectedVolunteer.volunteerReason}"
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-bold transition"
              >
                Close
              </button>
              {selectedVolunteer.status !== "Approved" && (
                <button
                  onClick={() => handleStatusChange(selectedVolunteer._id, "Approved")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition"
                >
                  Approve Application
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminVolunteers;