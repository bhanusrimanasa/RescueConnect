import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyReports } from "../services/reportService";
function Dashboard() {
  const { user } = useAuth();
  const [myReports, setMyReports] = useState([]);
  useEffect(() => {
  fetchReports();
}, []);

const fetchReports = async () => {
  try {
    const data = await getMyReports();
    setMyReports(data);
  } catch (err) {
    console.log(err);
  }
};
  return (
    <div className="min-h-screen bg-gray-100 p-8">
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
          <h3 className="text-3xl font-bold mt-3">{myReports.length}</h3>
          <p className="text-gray-600">My Reports</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h2 className="text-4xl">❤️</h2>
          <h3 className="text-3xl font-bold mt-3">0</h3>
          <p className="text-gray-600">Animals Helped</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h2 className="text-4xl">🙋</h2>
          <h3 className="text-xl font-semibold mt-3">User</h3>
          <p className="text-gray-600">Current Role</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h2 className="text-4xl">🏡</h2>
          <h3 className="text-3xl font-bold mt-3">0</h3>
          <p className="text-gray-600">Adoptions</p>
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
            <h3 className="text-2xl font-bold">🐶 Report Animal</h3>
            <p className="mt-2">
              Report an injured or stray animal.
            </p>
          </Link>

          <Link
            to="/volunteer"
            className="bg-blue-600 text-white rounded-xl p-6 hover:scale-105 transition"
          >
            <h3 className="text-2xl font-bold">🙋 Become Volunteer</h3>
            <p className="mt-2">
              Join the rescue community.
            </p>
          </Link>

          <Link
            to="/reports"
            className="bg-green-600 text-white rounded-xl p-6 hover:scale-105 transition"
          >
            <h3 className="text-2xl font-bold">📄 View Reports</h3>
            <p className="mt-2">
              Browse all rescue reports.
            </p>
          </Link>

        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-12 bg-white rounded-xl shadow p-8">
  <h2 className="text-3xl font-bold mb-6">
    My Recent Reports
  </h2>

  {myReports.length === 0 ? (
    <p className="text-gray-500">
      You haven't submitted any reports yet.
    </p>
  ) : (
    <div className="space-y-4">
      {myReports.slice(0, 3).map((report) => (
        <div
          key={report._id}
          className="border rounded-lg p-4 flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold text-lg">
              {report.animalType}
            </h3>

            <p className="text-gray-600">
              {report.location}
            </p>
          </div>

          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
            {report.status}
          </span>
        </div>
      ))}
    </div>
  )}
</div>
    </div>
  );
}

export default Dashboard;