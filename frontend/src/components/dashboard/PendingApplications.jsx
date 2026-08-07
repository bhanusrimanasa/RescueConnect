import { useEffect, useState } from "react";
import {
  getApplications,
  volunteerApproveApplication,
  volunteerRejectApplication,
} from "../../services/adoptionApplicationService";

function PendingApplications() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const data = await getApplications();
      setApplications(
        data.filter((app) => app.status === "Pending")
      );
    } catch (err) {
      console.log(err);
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

      alert("Recommendation sent to admin.");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRecommendReject = async (id) => {
    try {
      await volunteerRejectApplication(id);

      setApplications((prev) =>
        prev.filter((app) => app._id !== id)
      );

      alert("Recommendation recorded.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">
      <h2 className="text-3xl font-bold mb-6">
        Pending Adoption Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-gray-500">
          No pending applications.
        </p>
      ) : (
        <div className="space-y-5">
          {applications.map((app) => (
            <div
              key={app._id}
              className="border rounded-xl p-5 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-xl">
                  {app.fullName}
                </h3>

                <p>
                  <strong>Animal:</strong> {app.animal?.name}
                </p>

                <p>
                  <strong>Phone:</strong> {app.phone}
                </p>

                <p className="mt-2 text-gray-600">
                  {app.reason}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleRecommendApprove(app._id)}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg"
                >
                  Recommend Approval
                </button>

                <button
                  onClick={() => handleRecommendReject(app._id)}
                  className="bg-red-600 text-white px-5 py-2 rounded-lg"
                >
                  Recommend Rejection
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingApplications;