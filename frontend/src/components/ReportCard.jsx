import { Link } from "react-router-dom";

function ReportCard({ report }) {
  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    Accepted: "bg-blue-100 text-blue-700",
    Rescued: "bg-green-100 text-green-700",
  };
  const animalIcons = {
  Dog: "🐶",
  Cat: "🐱",
  Cow: "🐄",
  Bird: "🐦",
  Goat: "🐐",
  Rabbit: "🐰",
};
  return (
    <Link to={`/reports/${report._id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden">

        {/* Placeholder Image */}
       
<div className="h-48 bg-gray-200 flex items-center justify-center text-7xl">
  {animalIcons[report.animalType] || "🐾"}
</div>
        <div className="p-5">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-red-600">
              {report.animalType}
            </h2>

            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                statusColor[report.status] || "bg-gray-100 text-gray-700"
              }`}
            >
              {report.status}
            </span>
          </div>

          <p className="text-gray-700 mb-3">
            <span className="font-semibold">🚨 Problem:</span>{" "}
            {report.problem}
          </p>

          <p className="text-gray-700 mb-3">
            <span className="font-semibold">⚠️ Condition:</span>{" "}
            {report.condition}
          </p>

          <p className="text-gray-700 mb-3">
            <span className="font-semibold">📍 Location:</span>{" "}
            {report.location}
          </p>

          {report.description && (
            <p className="text-gray-500 text-sm line-clamp-2 mb-4">
              {report.description}
            </p>
          )}

          <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
            View Details →
          </button>

        </div>
      </div>
    </Link>
  );
}

export default ReportCard;