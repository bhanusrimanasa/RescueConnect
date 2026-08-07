import PendingAdoptionRequests from "./PendingAdoptionRequests";
import PendingApplications from "./PendingApplications";

function VolunteerDashboard({ user }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold">
          Welcome, {user?.name}
        </h1>

        <p className="mt-3 text-lg opacity-90">
          Volunteer Rescue Dashboard
        </p>

        <p className="mt-2 text-sm opacity-80">
          Review rescue cases, recommend adoption listings and evaluate adoption applications.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-4 gap-6 mt-10">

        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
          <div className="text-5xl mb-3">🚑</div>
          <h2 className="font-semibold text-lg">Assigned Reports</h2>
          <p className="text-gray-500 text-sm mt-1">
            Rescue operations assigned to you
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
          <div className="text-5xl mb-3">🏡</div>
          <h2 className="font-semibold text-lg">Adoption Listings</h2>
          <p className="text-gray-500 text-sm mt-1">
            Review newly submitted listings
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
          <div className="text-5xl mb-3">❤️</div>
          <h2 className="font-semibold text-lg">Applications</h2>
          <p className="text-gray-500 text-sm mt-1">
            Review adoption applications
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
          <div className="text-5xl mb-3">🐾</div>
          <h2 className="font-semibold text-lg">Animals Helped</h2>
          <p className="text-gray-500 text-sm mt-1">
            Your completed rescues
          </p>
        </div>

      </div>

      {/* Adoption Requests */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold mb-6">
          Adoption Listings Awaiting Review
        </h2>

        <PendingAdoptionRequests />
      </section>

      {/* Adoption Applications */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">
          Adoption Applications Awaiting Recommendation
        </h2>

        <PendingApplications />
      </section>

    </div>
  );
}

export default VolunteerDashboard;