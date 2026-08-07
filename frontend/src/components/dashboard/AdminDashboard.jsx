import { useEffect, useState } from "react";
import {
  getReports,
  assignVolunteer,
} from "../../services/reportService";
import { getVolunteers } from "../../services/userService";

import PendingListingApprovals from "./PendingListingApprovals";
import PendingApplicationApprovals from "./PendingApplicationApprovals";

function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState({});

  useEffect(() => {
    fetchReports();
    fetchVolunteers();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await getReports();
      setReports(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchVolunteers = async () => {
    try {
      const data = await getVolunteers();
      setVolunteers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAssign = async (reportId) => {
    const volunteerId = selectedVolunteer[reportId];

    if (!volunteerId) {
      return alert("Please select a volunteer.");
    }

    try {
      await assignVolunteer(reportId, volunteerId);

      alert("Volunteer assigned successfully.");

      fetchReports();
    } catch (err) {
      console.log(err);
      alert("Failed to assign volunteer.");
    }
  };

  return (
    <div className="space-y-12">

      <h1 className="text-4xl font-bold">
        Admin Dashboard
      </h1>

      {/* ---------------- Rescue Reports ---------------- */}

      <section>
        <h2 className="text-2xl font-semibold mb-5">
          🚑 Pending Rescue Reports
        </h2>

        {reports.filter((r) => r.status === "Pending").length === 0 ? (
          <div className="bg-gray-100 rounded-lg p-6">
            No pending rescue reports.
          </div>
        ) : (
          reports
            .filter((r) => r.status === "Pending")
            .map((report) => (
              <div
                key={report._id}
                className="bg-white rounded-xl shadow p-6 mb-5"
              >
                <h2 className="text-xl font-bold">
                  {report.animalType}
                </h2>

                <p>
                  <strong>Location:</strong> {report.location}
                </p>

                <p>
                  <strong>Problem:</strong> {report.problem}
                </p>

                <select
                  className="border p-2 rounded mt-4"
                  onChange={(e) =>
                    setSelectedVolunteer({
                      ...selectedVolunteer,
                      [report._id]: e.target.value,
                    })
                  }
                >
                  <option value="">
                    Select Volunteer
                  </option>

                  {volunteers.map((v) => (
                    <option
                      key={v._id}
                      value={v._id}
                    >
                      {v.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => handleAssign(report._id)}
                  className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Assign Volunteer
                </button>
              </div>
            ))
        )}
      </section>

      {/* ---------------- Adoption Listing Approval ---------------- */}

      <section>
        <PendingListingApprovals />
      </section>

      {/* ---------------- Adoption Application Approval ---------------- */}

      <section>
        <PendingApplicationApprovals />
      </section>

    </div>
  );
}

export default AdminDashboard;