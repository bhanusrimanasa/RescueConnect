import { useEffect, useState } from "react";
import { getReports } from "../services/reportService.js";
import ReportCard from "./ReportCard";
import { Link } from "react-router-dom";

function LatestReports() {
  const [reports, setReports] = useState([]);

  
  const fetchReports = async () => {
    try {
      const data = await getReports();
      setReports(data.slice(0, 3)); // Show only latest 3 reports
    } catch (err) {
      console.log(err);
    }
  };
useEffect(() => {
    fetchReports();
  }, []);

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-10">

          <h2 className="text-4xl font-bold">
            Latest Rescue Reports
          </h2>

          <Link
            to="/reports"
            className="text-red-600 font-semibold"
          >
            View All →
          </Link>

        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reports.map((report) => (
            <ReportCard
              key={report._id}
              report={report}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default LatestReports;