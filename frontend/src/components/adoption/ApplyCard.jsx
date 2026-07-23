import { useNavigate } from "react-router-dom";

function ApplyCard({ animal }) {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-600 text-white rounded-3xl p-8 shadow-xl">

      <h2 className="text-3xl font-bold">
        Ready to Adopt?
      </h2>

      <p className="mt-4 text-blue-100">
        Give {animal.name} a loving forever home.
      </p>

      <button
        onClick={() => navigate(`/adoptions/${animal._id}/apply`)}
        className="w-full mt-8 bg-white text-blue-600 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
      >
        Apply for Adoption ❤️
      </button>

    </div>
  );
}

export default ApplyCard;