import { Link } from "react-router-dom";

function ReportCard({ report }) {
  const statusColor = {
    Pending: "bg-amber-50 text-amber-700 border border-amber-200/60",
    Assigned: "bg-blue-50 text-blue-700 border border-blue-200/60",
    "In Progress": "bg-indigo-50 text-indigo-700 border border-indigo-200/60",
    Rescued: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
    Closed: "bg-slate-100 text-slate-700 border border-slate-200/60",
  };

  const priorityColor = {
    Urgent: "text-rose-600 bg-rose-50 border-rose-100",
    High: "text-orange-600 bg-orange-50 border-orange-100",
    Medium: "text-amber-600 bg-amber-50 border-amber-100",
    Low: "text-slate-600 bg-slate-50 border-slate-100",
  };

  const animalIcons = {
    Dog: "🐶",
    Cat: "🐱",
    Cow: "🐄",
    Bird: "🐦",
    Goat: "🐐",
    Rabbit: "🐰",
  };

  const imageUrl =
    report.images && report.images.length > 0 ? report.images[0] : null;

  return (
    <Link to={`/reports/${report._id}`} className="group block h-full">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200/80 transition-all duration-300 overflow-hidden flex flex-col h-full">
        
        {/* Image Section */}
        <div className="relative h-56 overflow-hidden bg-slate-100">
          {imageUrl ? (
            <>
              {/* Blurred backdrop for aesthetic fill */}
              <div
                className="absolute inset-0 bg-cover bg-center scale-110 blur-xl opacity-30"
                style={{ backgroundImage: `url(${imageUrl})` }}
              />
              <div className="absolute inset-0 bg-slate-900/10" />

              {/* Main Image */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
                <img
                  src={imageUrl}
                  alt={`${report.animalType} report`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-xl"
                />
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
              <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                {animalIcons[report.animalType] || "🐾"}
              </span>
            </div>
          )}

          {/* Priority Badge Overlay */}
          {report.priority && (
            <div className="absolute top-3 left-3 z-20">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-lg border shadow-sm backdrop-blur-md bg-white/90 ${
                  priorityColor[report.priority] || "text-slate-700 bg-slate-50"
                }`}
              >
                ⚠️ {report.priority}
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-5 flex flex-col flex-grow justify-between">
          <div>
            {/* Title + Status */}
            <div className="flex justify-between items-start gap-2 mb-3">
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {report.animalType}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm ${
                  statusColor[report.status] || "bg-slate-100 text-slate-700"
                }`}
              >
                {report.status}
              </span>
            </div>

            {/* Problem / Situation */}
            {report.problem && (
              <p className="text-slate-700 text-sm font-medium mb-2 line-clamp-1">
                <span className="text-slate-400 font-normal">Problem:</span> {report.problem}
              </p>
            )}

            {/* Location */}
            <p className="text-slate-500 text-xs mb-3 flex items-center gap-1.5 truncate">
              <span>📍</span>
              <span className="truncate">{report.location}</span>
            </p>

            {/* Description */}
            {report.description && (
              <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed">
                {report.description}
              </p>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-3 border-t border-slate-100">
            <span className="w-full inline-flex items-center justify-center bg-slate-50 group-hover:bg-indigo-600 text-slate-700 group-hover:text-white py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-200 shadow-sm">
              View Details →
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
}

export default ReportCard;