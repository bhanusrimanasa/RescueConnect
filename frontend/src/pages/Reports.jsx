import { useState,useEffect } from "react";
import { getReports } from "../services/reportService";
import ReportCard from "../components/ReportCard";
function Reports() {

  const [reports, setReports] = useState([]);
  const fetchReports = async () => {
  try {
    const data = await getReports();
    setReports(data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchReports();
}, []);

  return (
    <div className="p-6">
    <h1 className="text-3xl font-bold mb-6">Animal Reports</h1>

    {reports.length === 0 ? (
  <p>No reports found.</p>
) : (reports.map((report) => (
      <div>
        <ReportCard key={report._id} report={report} />
      </div>
    )))}
  </div>
  );
}

export default Reports;