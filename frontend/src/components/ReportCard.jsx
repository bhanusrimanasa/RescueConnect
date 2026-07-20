import { Link } from "react-router-dom";
function ReportCard({ report }) {
  return (
    <Link to={`/reports/${report._id}`}>
    <div className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition">
      <h2 className="text-2xl font-bold text-blue-600 mb-3">
        {report.animalType}
      </h2>

      <p>
        <span className="font-semibold">Problem:</span> {report.problem}
      </p>

      <p>
        <span className="font-semibold">Condition:</span> {report.condition}
      </p>

      <p>
        <span className="font-semibold">Location:</span> {report.location}
      </p>

      <p>
        <span className="font-semibold">Contact:</span> {report.contactUser}
      </p>

      <p>
        <span className="font-semibold">Status:</span> {report.status}
      </p>
    </div>
    </Link>
  );
}

export default ReportCard;