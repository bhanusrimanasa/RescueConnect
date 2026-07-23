import PendingAdoptionRequests from "./PendingAdoptionRequests";
import PendingApplications from "./PendingApplications";
function VolunteerDashboard({ user }) {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold">
          Welcome, {user?.name}
        </h1>

        <p className="mt-3">
          Volunteer Dashboard
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mt-10">

        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h2 className="text-4xl">🚑</h2>
          <p>Pending Reports</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h2 className="text-4xl">🏡</h2>
          <p>Pending Adoptions</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h2 className="text-4xl">❤️</h2>
          <p>Applications</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h2 className="text-4xl">🐶</h2>
          <p>Animals Helped</p>
        </div>

      </div>

      <div className="mt-12">
        <PendingAdoptionRequests />
        <div className="mt-12">
            <PendingApplications />
            </div>
      </div>

    </>
  );
}

export default VolunteerDashboard;