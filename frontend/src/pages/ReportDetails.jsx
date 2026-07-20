import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReportById } from "../services/reportService";

function ReportDetails() {
  const { id } = useParams();

  const [report, setReport] = useState(null);

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

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
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
    </div>
  );
}

export default ReportDetails;