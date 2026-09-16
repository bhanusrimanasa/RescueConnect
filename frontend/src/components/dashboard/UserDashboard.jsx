import { Link } from "react-router-dom";

function UserDashboard({
  user,
  myReports,
  myApplications,
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-8 shadow-xl border border-indigo-800/50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-500/30">
              Personal Portal
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
              Welcome back, {user?.name || "User"}
            </h1>
            <p className="mt-2 text-indigo-200/80 text-base max-w-xl">
              Track your rescue reports, monitor adoption application milestones, and manage your community involvement.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/report"
              className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-200"
            >
              + Report Animal
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {/* My Reports */}
        <Link
          to="/my-reports"
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all group block"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">My Reports</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              📄
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-4">
            {myReports?.length || 0}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Submitted rescue requests
          </p>
        </Link>

        {/* Adoption Applications */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Applications</span>
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold text-lg">
              ❤️
            </div>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 mt-4">
            {myApplications?.length || 0}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Total pet adoptions requested
          </p>
        </div>

        {/* Account Role */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">User Role</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
              🙋
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-5 truncate">
            {user?.role || "Member"}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Access permission level
          </p>
        </div>

        {/* Approved Adoptions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Approved</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
              🏡
            </div>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 mt-4">
            {myApplications?.filter((app) => app.status === "Approved").length || 0}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Successfully cleared homes
          </p>
        </div>
      </div>

      {/* Quick Actions Navigation */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/report"
            className="flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-xl font-bold group-hover:scale-105 transition-transform">
                🐶
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Report Animal</h3>
                <p className="text-xs text-slate-500">Alert rescuers to a stray or hurt animal</p>
              </div>
            </div>
            <span className="text-slate-400 group-hover:text-indigo-600 transition-colors">→</span>
          </Link>

          <Link
            to="/adoptions"
            className="flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold group-hover:scale-105 transition-transform">
                🏡
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Browse Adoptions</h3>
                <p className="text-xs text-slate-500">Find your next companion animal</p>
              </div>
            </div>
            <span className="text-slate-400 group-hover:text-indigo-600 transition-colors">→</span>
          </Link>

          <Link
            to="/profile"
            className="flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold group-hover:scale-105 transition-transform">
                👤
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">My Profile</h3>
                <p className="text-xs text-slate-500">Update your details and settings</p>
              </div>
            </div>
            <span className="text-slate-400 group-hover:text-indigo-600 transition-colors">→</span>
          </Link>
        </div>
      </div>

      {/* Recent Reports Section */}
      <div className="mt-10 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">My Recent Reports</h2>
            <p className="text-xs text-slate-500 mt-0.5">Showing up to 3 latest reported cases</p>
          </div>
          {myReports?.length > 0 && (
            <Link to="/my-reports" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              View all →
            </Link>
          )}
        </div>

        {!myReports || myReports.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <p className="text-slate-500 text-sm">No reports submitted yet.</p>
            <Link
              to="/report"
              className="inline-block mt-3 text-xs font-semibold bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition"
            >
              Submit a Report
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {myReports.slice(0, 3).map((report) => (
              <Link
                key={report._id}
                to={`/reports/${report._id}`}
                className="block border border-slate-100 rounded-xl p-4 hover:border-indigo-200 hover:bg-slate-50/50 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {report.animalType}
                    </h3>
                    <p className="text-slate-500 text-xs mt-0.5">
                      📍 {report.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {report.status}
                    </span>
                    <span className="text-indigo-600 text-sm font-medium">
                      View →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Adoption Applications Section */}
      <div className="mt-10 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">My Adoption Applications</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track the verification progress of your adoption requests.
          </p>
        </div>

        {!myApplications || myApplications.length === 0 ? (
          <div className="bg-slate-50 rounded-xl p-8 text-center border border-dashed border-slate-200">
            <p className="text-slate-500 text-sm">You haven't applied to adopt any animals yet.</p>
            <Link
              to="/adoptions"
              className="inline-block mt-4 bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-500 transition shadow-sm"
            >
              Browse Animals for Adoption
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {myApplications.map((application) => {
              const status = application.status;
              const volunteerApproved =
                status === "Volunteer Approved" || status === "Approved";
              const volunteerRejected = status === "Volunteer Rejected";

              return (
                <div
                  key={application._id}
                  className="border border-slate-100 rounded-2xl p-6 shadow-sm bg-slate-50/30"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        🐾 {application.animal?.name || "Animal Companion"}
                      </h3>
                      <p className="text-slate-500 text-xs mt-0.5 font-medium">
                        {application.animal?.animalType || "Pet"}
                      </p>
                    </div>

                    <span
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold ${
                        status === "Approved"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : status === "Rejected" ||
                            status === "Volunteer Rejected"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : status === "Volunteer Approved"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  {/* Progress tracker */}
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <h4 className="font-semibold text-sm text-slate-900 mb-4">
                      Application Progress Pipeline
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {/* Submitted */}
                      <div className="text-center">
                        <div className="mx-auto w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                          ✓
                        </div>
                        <p className="mt-2 text-xs font-medium text-slate-700">Submitted</p>
                      </div>

                      {/* Volunteer Review */}
                      <div className="text-center">
                        <div
                          className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm ${
                            volunteerApproved
                              ? "bg-emerald-600"
                              : volunteerRejected
                              ? "bg-rose-600"
                              : "bg-amber-500"
                          }`}
                        >
                          {volunteerApproved ? "✓" : volunteerRejected ? "×" : "2"}
                        </div>
                        <p className="mt-2 text-xs font-medium text-slate-700">Volunteer Review</p>
                      </div>

                      {/* Admin Decision */}
                      <div className="text-center">
                        <div
                          className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm ${
                            status === "Approved"
                              ? "bg-emerald-600"
                              : status === "Rejected"
                              ? "bg-rose-600"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {status === "Approved" ? "✓" : status === "Rejected" ? "×" : "3"}
                        </div>
                        <p className="mt-2 text-xs font-medium text-slate-700">Admin Decision</p>
                      </div>
                    </div>
                  </div>

                  {/* Status alert box */}
                  <div
                    className={`mt-6 p-4 rounded-xl text-xs sm:text-sm ${
                      status === "Approved"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
                        : status === "Rejected" ||
                          status === "Volunteer Rejected"
                        ? "bg-rose-50 text-rose-800 border border-rose-100"
                        : status === "Volunteer Approved"
                        ? "bg-blue-50 text-blue-800 border border-blue-100"
                        : "bg-amber-50 text-amber-800 border border-amber-100"
                    }`}
                  >
                    {status === "Pending" && (
                      <p>⏳ Your application has been submitted and is currently awaiting preliminary review by a volunteer.</p>
                    )}
                    {status === "Volunteer Approved" && (
                      <p>✅ A volunteer has recommended your application! It is now queued for final administrator sign-off.</p>
                    )}
                    {status === "Volunteer Rejected" && (
                      <div>
                        <p className="font-semibold">❌ Your application was not cleared at the volunteer review stage.</p>
                        {application.rejectionReason && (
                          <p className="mt-1 opacity-90">Reason: {application.rejectionReason}</p>
                        )}
                      </div>
                    )}
                    {status === "Approved" && (
                      <p>🎉 Congratulations! Your adoption request has been fully approved. The shelter will contact you soon.</p>
                    )}
                    {status === "Rejected" && (
                      <div>
                        <p className="font-semibold">❌ Your adoption application was declined by administration.</p>
                        {application.rejectionReason && (
                          <p className="mt-1 opacity-90">Reason: {application.rejectionReason}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Review Metadata */}
                  {(application.volunteerReviewedBy || application.adminReviewedBy) && (
                    <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                      {application.volunteerReviewedBy?.name && (
                        <p>
                          Volunteer reviewer: <span className="font-semibold text-slate-700">{application.volunteerReviewedBy.name}</span>
                        </p>
                      )}
                      {application.adminReviewedBy?.name && (
                        <p>
                          Final decision by: <span className="font-semibold text-slate-700">{application.adminReviewedBy.name}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;