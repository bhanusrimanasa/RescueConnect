import { useEffect, useState } from "react";
import {
  getAssignedReports,
  acceptReport,
  rejectReport,
  updateProgress,
} from "../../services/reportService";
import ReportTimeline from "../../components/ReportTimeline";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MapView from "../../components/MapView";
function AssignedReports() {
  const [reports, setReports] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const [progress, setProgress] = useState("");
  const [note, setNote] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchReports = async () => {
    try {
      const data = await getAssignedReports();
      setReports(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleAccept = async (id) => {
    try {
      await acceptReport(id);
      await fetchReports();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectReport(id);
      await fetchReports();
    } catch (err) {
      console.error(err);
    }
  };

  const handleProgressUpdate = async (id) => {
    if (!progress) {
      alert("Please select a progress status.");
      return;
    }

    try {
      await updateProgress(id, {
        progress,
        note,
      });

      setProgress("");
      setNote("");

      await fetchReports();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {reports.length === 0 ? (
        <p className="text-gray-500">
          No rescue missions assigned to you.
        </p>
      ) : (reports
      .filter(
        (report) =>
          report.status !== "Rescued" &&
          report.status !== "Closed"
      )
      .sort((a, b) => {
        const order = {
          Assigned: 1,
          "In Progress": 2,
          "Reached Location": 3,
          "Animal Stabilized": 4,
          "Under Treatment": 5,
          "Ready for Adoption": 6,
        };

    return (order[a.status] || 99) - (order[b.status] || 99);
  }).map((report) => {
          const isExpanded = expandedId === report._id;

          return (
            <div
              key={report._id}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              {/* ================= COLLAPSED VIEW ================= */}

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">
                    🐾 {report.animalType}
                  </h3>

                  <p className="text-gray-600 mt-1">
                    {report.location}
                  </p>

                  <p className="mt-2">
                    <span className="font-semibold">
                      Priority:
                    </span>{" "}
                    {report.priority}
                  </p>
                </div>

                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                  {report.status}
                </span>
              </div>

              {/* ================= ACTION BUTTONS ================= */}

              <div className="flex gap-3 mt-5 flex-wrap">

                {/* ACCEPT */}

                {report.status === "Assigned" && (
                  <button
                    onClick={() => handleAccept(report._id)}
                    className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                  >
                    Accept Mission
                  </button>
                )}

                {/* REJECT */}

                {report.status === "Assigned" && (
                  <button
                    onClick={() => handleReject(report._id)}
                    className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                  >
                    Reject Mission
                  </button>
                )}

                {/* VIEW DETAILS */}

                <button
                  onClick={() =>
                    setExpandedId(
                      isExpanded ? null : report._id
                    )
                  }
                  className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900"
                >
                  {isExpanded
                    ? "Hide Details"
                    : "View Details"}
                </button>
              </div>

              {/* ================= EXPANDED DETAILS ================= */}

              {isExpanded && (
                <div className="mt-8 border-t pt-6">

                  <h2 className="text-2xl font-bold text-blue-600 mb-5">
                    Rescue Report Details
                  </h2>

                  {/* ================= ANIMAL IMAGES ================= */}

                  <div className="mb-8">

                    <h3 className="text-xl font-bold mb-4">
                      🐾 Animal Images
                    </h3>

                    {report.images &&
                    report.images.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                        {report.images.map(
                          (image, index) => (
                            <div
                              key={image}
                              className="bg-gray-100 rounded-xl border overflow-hidden"
                            >
                              <img
                                src={image}
                                alt={`${report.animalType} ${
                                  index + 1
                                }`}
                                className="w-full h-56 object-contain bg-gray-100"
                              />
                            </div>
                          )
                        )}

                      </div>
                    ) : (
                      <div className="p-5 bg-gray-100 rounded-xl text-center text-gray-500">
                        No images uploaded for this report.
                      </div>
                    )}
                  </div>

                  {/* ================= REPORT INFORMATION ================= */}

                  <div className="space-y-2">

                    <p>
                      <span className="font-semibold">
                        Problem:
                      </span>{" "}
                      {report.problem}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Priority:
                      </span>{" "}
                      {report.priority || "Not provided"}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Location:
                      </span>{" "}
                      {report.location}
                    </p>
                     {/* ================= LOCATION ================= */}

<div className="mt-6">
  <h3 className="text-xl font-bold mb-3">
    📍 Animal Location
  </h3>

  {/* Written address */}
  <div className="bg-gray-50 border rounded-lg p-4">
    <p className="font-semibold text-gray-700">
      Reported Location
    </p>

    <p className="text-gray-600 mt-1">
      {report.location || "No location provided"}
    </p>
  </div>

  {/* GPS Map */}
  {Number.isFinite(Number(report.latitude)) &&
   Number.isFinite(Number(report.longitude)) ? (
    <>
      <MapView
        latitude={Number(report.latitude)}
        longitude={Number(report.longitude)}
      />

      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${report.latitude},${report.longitude}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold"
      >
        🧭 Navigate to Animal
      </a>
    </>
  ) : (
    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <p className="text-yellow-700">
        📌 Live GPS location is not available.
      </p>
      <p className="text-gray-600 text-sm mt-1">
        Please use the written location above.
      </p>
    </div>
  )}
</div>
                      
                    <p>
                      <span className="font-semibold">
                        Description:
                      </span>{" "}
                      {report.description ||
                        "No description provided"}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Contact:
                      </span>{" "}
                      {report.contactUser}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Status:
                      </span>{" "}
                      {report.status}
                    </p>

                  </div>

                  {/* ================= PROGRESS UPDATE ================= */}

                  {user?.role === "volunteer" &&
                    report.status !== "Closed" &&
                    report.status !== "Rescued" && (

                    <div className="bg-gray-50 rounded-xl p-6 mt-8">

                      <h2 className="text-2xl font-bold mb-6">
                        🚑 Update Rescue Progress
                      </h2>

                      <select
                        value={progress}
                        onChange={(e) =>
                          setProgress(e.target.value)
                        }
                        className="w-full border rounded-lg p-3 mb-4"
                      >
                        <option value="">
                          Select Progress
                        </option>

                        <option>
                          Reached Location
                        </option>

                        <option>
                          Animal Stabilized
                        </option>

                        <option>
                          Taken to Veterinary Hospital
                        </option>

                        <option>
                          Under Treatment
                        </option>

                        <option>
                          Ready for Adoption
                        </option>

                        <option>
                          Rescued
                        </option>

                        <option>
                          Case Closed
                        </option>
                      </select>

                      <textarea
                        value={note}
                        onChange={(e) =>
                          setNote(e.target.value)
                        }
                        placeholder="Add a note..."
                        className="w-full border rounded-lg p-3 mb-4"
                        rows={4}
                      />

                      <button
                        onClick={() =>
                          handleProgressUpdate(
                            report._id
                          )
                        }
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                      >
                        Save Progress
                      </button>

                    </div>
                  )}

                  {/* ================= RESCUED ================= */}

                  {user?.role === "volunteer" &&
                    report.status === "Rescued" && (

                    <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-6">

                      <h2 className="text-xl font-bold text-green-700">
                        🐾 Animal Rescued Successfully
                      </h2>

                      <p className="text-gray-600 mt-2 mb-4">
                        This animal can now be listed
                        for adoption.
                      </p>

                      <button
                        onClick={() =>
                          navigate(
                            `/adoptions/create-from-rescue/${report._id}`
                          )
                        }
                        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
                      >
                        🏡 Create Adoption Listing
                      </button>

                    </div>
                  )}

                  {/* ================= TIMELINE ================= */}

                  <div className="mt-8">

                    <ReportTimeline
                      history={report.statusHistory}
                    />

                  </div>

                </div>
              )}

            </div>
          );
        })
      )}
    </div>
  );
}

export default AssignedReports;