import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReportById,acceptReport,markRescued,updateProgress } from "../services/reportService";
import ReportTimeline from "../components/ReportTimeline";
import { useAuth } from "../context/AuthContext";
function ReportDetails() {
  const { id } = useParams();

  const [report, setReport] = useState(null);
  const [progress, setProgress] = useState("");
const [note, setNote] = useState("");
  const { user } = useAuth();
  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const data = await getReportById(id);
      console.log(data); // For debugging
      setReport(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!report) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold">Loading...</h2>
      </div>
    );
  }
  const handleAccept = async () => {
  try {
    await acceptReport(report._id);
    fetchReport();
  } catch (err) {
    console.error(err);
  }
};

const handleRescue = async () => {
  try {
    await markRescued(report._id);
    fetchReport();
  } catch (err) {
    console.error(err);
  }
};
const handleProgressUpdate = async () => {
  try {
    await updateProgress(report._id, {
      progress,
      note,
    });

    setProgress("");
    setNote("");

    fetchReport();
  } catch (err) {
    console.error(err);
  }
};
 return (
  <div className="max-w-5xl mx-auto mt-10">

    {/* Report Details Card */}
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        {report.animalType}
      </h1>

      <p className="mb-2">
        <span className="font-semibold">Problem:</span> {report.problem}
      </p>

      <p className="mb-2">
        <span className="font-semibold">Condition:</span> {report.condition}
      </p>

      <p className="mb-2">
        <span className="font-semibold">Location:</span> {report.location}
      </p>

      <p className="mb-2">
        <span className="font-semibold">Description:</span>{" "}
        {report.description || "No description provided"}
      </p>

      <p className="mb-2">
        <span className="font-semibold">Contact:</span> {report.contactUser}
      </p>

      <p className="mb-2">
        <span className="font-semibold">Status:</span> {report.status}
      </p>
      {user?.role === "volunteer" &&
  report.assignedVolunteer?._id === user._id &&
  report.status === "Assigned" && (
    <button
      onClick={handleAccept}
      className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
    >
      Accept Mission
    </button>
)}

  {user?.role === "volunteer" &&
  report.assignedVolunteer?._id === user._id &&
  report.status !== "Closed" && (
    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        🚑 Update Rescue Progress
      </h2>

      <select
        value={progress}
        onChange={(e) => setProgress(e.target.value)}
        className="w-full border rounded-lg p-3 mb-4"
      >
        <option value="">Select Progress</option>
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
        placeholder="Add a note..."
        className="w-full border rounded-lg p-3 mb-4"
        rows={4}
      />

      <button
        onClick={handleProgressUpdate}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Save Progress
      </button>

    </div>
)}

    </div>

    {/* Timeline */}
    <ReportTimeline history={report.statusHistory} />

  </div>
);
}

export default ReportDetails;