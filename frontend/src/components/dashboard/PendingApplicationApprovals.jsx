import { useEffect, useState } from "react";
import {
  getVolunteerApprovedApplications,
  approveApplication,
  rejectApplication,
} from "../../services/adoptionApplicationService";

function PendingApplicationApprovals() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const data = await getVolunteerApprovedApplications();
      setApplications(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveApplication(id);

      setApplications((prev) =>
        prev.filter((app) => app._id !== id)
      );

      alert("Application approved successfully.");
    } catch (err) {
      console.log(err);
      alert("Failed to approve application.");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectApplication(id);

      setApplications((prev) =>
        prev.filter((app) => app._id !== id)
      );

      alert("Application rejected.");
    } catch (err) {
      console.log(err);
      alert("Failed to reject application.");
    }
  };

  if (loading) {
    return (
      <div className="mt-10 text-center">
        <h2 className="text-xl font-semibold">
          Loading Applications...
        </h2>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-pink-600">
        ❤️ Adoption Applications Awaiting Final Approval
      </h2>

      {applications.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            No volunteer-approved applications.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold">
                  {app.fullName}
                </h3>

                <p>
                  <strong>Animal:</strong>{" "}
                  {app.animal?.name}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {app.phone}
                </p>

                <p>
                  <strong>Occupation:</strong>{" "}
                  {app.occupation}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {app.address}
                </p>

                <p className="mt-2 text-gray-600">
                  <strong>Reason:</strong>{" "}
                  {app.reason}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(app._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
                >
                  Approve Adoption
                </button>

                <button
                  onClick={() => handleReject(app._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
                >
                  Reject Adoption
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingApplicationApprovals;