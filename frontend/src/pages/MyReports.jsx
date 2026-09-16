import { useEffect, useState } from "react";
import { getMyReports } from "../services/reportService";
import ReportCard from "../components/ReportCard";

function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const data = await getMyReports();
      setReports(data);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">
          Loading your reports...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <h1 className="text-3xl font-bold mb-2">
          My Reports
        </h1>

        <p className="text-gray-600 mb-8">
          Track the rescue progress of animals you have reported.
        </p>

        {/* No Reports */}
        {reports.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-gray-500">
              You haven't submitted any reports yet.
            </p>
          </div>
        ) : (
          /* Report Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.map((report) => (
              <ReportCard
                key={report._id}
                report={report}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default MyReports;