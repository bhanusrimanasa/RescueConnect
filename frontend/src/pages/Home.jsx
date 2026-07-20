import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">
        RescueConnect
      </h1>

      <p className="text-gray-600 mb-8">
        Helping stray animals get help faster.
      </p>

      <div className="flex gap-4">
        <Link
          to="/report"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Report an Animal
        </Link>

        <Link
          to="/reports"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          View Reports
        </Link>
      </div>
    </div>
  );
}

export default Home;