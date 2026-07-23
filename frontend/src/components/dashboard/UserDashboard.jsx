import { Link } from "react-router-dom";

function UserDashboard({
  user,
  myReports,
  myApplications,
}) {
  return (
    <>
      {/* Welcome */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold">
          Welcome back, {user?.name}! ❤️
        </h1>

        <p className="mt-3 text-lg">
          Every rescue begins with someone who cares.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mt-10">

        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h2 className="text-4xl">📄</h2>
          <h3 className="text-3xl font-bold mt-3">
            {myReports.length}
          </h3>
          <p className="text-gray-600">My Reports</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h2 className="text-4xl">❤️</h2>
          <h3 className="text-3xl font-bold mt-3">
            {myApplications.length}
          </h3>
          <p className="text-gray-600">Adoption Applications</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h2 className="text-4xl">🙋</h2>
          <h3 className="text-xl font-semibold mt-3">
            {user?.role}
          </h3>
          <p className="text-gray-600">Role</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h2 className="text-4xl">🏡</h2>
          <h3 className="text-3xl font-bold mt-3">
            {
              myApplications.filter(
                (app) => app.status === "Approved"
              ).length
            }
          </h3>
          <p className="text-gray-600">Approved</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <Link
            to="/report"
            className="bg-red-600 text-white rounded-xl p-6 hover:scale-105 transition"
          >
            <h3 className="text-2xl font-bold">
              🐶 Report Animal
            </h3>
          </Link>

          <Link
            to="/adoptions"
            className="bg-green-600 text-white rounded-xl p-6 hover:scale-105 transition"
          >
            <h3 className="text-2xl font-bold">
              🏡 Browse Adoptions
            </h3>
          </Link>

          <Link
            to="/profile"
            className="bg-blue-600 text-white rounded-xl p-6 hover:scale-105 transition"
          >
            <h3 className="text-2xl font-bold">
              👤 My Profile
            </h3>
          </Link>

        </div>
      </div>

      {/* My Recent Reports */}
      <div className="mt-12 bg-white rounded-xl shadow p-8">

        <h2 className="text-3xl font-bold mb-6">
          My Recent Reports
        </h2>

        {myReports.length === 0 ? (
          <p>No reports yet.</p>
        ) : (
          myReports.slice(0, 3).map((report) => (
            <div
              key={report._id}
              className="border rounded-lg p-4 mb-3 flex justify-between"
            >
              <div>
                <h3 className="font-bold">
                  {report.animalType}
                </h3>

                <p>{report.location}</p>
              </div>

              <span>{report.status}</span>
            </div>
          ))
        )}

      </div>

      {/* My Adoption Applications */}
      <div className="mt-12 bg-white rounded-xl shadow p-8">

        <h2 className="text-3xl font-bold mb-6">
          My Adoption Applications
        </h2>

        {myApplications.length === 0 ? (
          <p className="text-gray-500">
            You haven't applied for any animals yet.
          </p>
        ) : (
          myApplications.map((application) => (
            <div
              key={application._id}
              className="border rounded-xl p-5 mb-5"
            >
              <h3 className="text-xl font-bold">
                {application.animal?.name}
              </h3>

              <p className="mt-2">
                Status:
                <span
                  className={`ml-2 font-bold ${
                    application.status === "Approved"
                      ? "text-green-600"
                      : application.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {application.status}
                </span>
              </p>

              {application.status === "Approved" && (
                <div className="mt-4 bg-green-100 text-green-700 p-4 rounded-lg">
                  🎉 Congratulations! Your adoption application has been approved.
                </div>
              )}

              {application.status === "Rejected" && (
                <div className="mt-4 bg-red-100 text-red-700 p-4 rounded-lg">
                  ❌ Unfortunately, your adoption application was rejected.
                </div>
              )}
            </div>
          ))
        )}

      </div>
    </>
  );
}

export default UserDashboard;