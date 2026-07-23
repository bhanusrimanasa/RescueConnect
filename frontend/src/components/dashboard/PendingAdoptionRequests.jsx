import { useEffect, useState } from "react";
import {
  getPendingRequests,
  approveRequest,
  rejectRequest,
} from "../../services/adoptionRequestService";

function PendingAdoptionRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const data = await getPendingRequests();
      setRequests(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
  try {
    await approveRequest(id);

    setRequests((prev) =>
      prev.filter((request) => request._id !== id)
    );

    alert("Request approved successfully!");
  } catch (err) {
    console.log(err);
    alert("Failed to approve request.");
  }
};

const handleReject = async (id) => {
  try {
    await rejectRequest(id);

    setRequests((prev) =>
      prev.filter((request) => request._id !== id)
    );

    alert("Request rejected.");
  } catch (err) {
    console.log(err);
    alert("Failed to reject request.");
  }
};

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold">
          Loading Requests...
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-6">
        Pending Adoption Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">
          No pending adoption requests.
        </p>
      ) : (
        <div className="space-y-5">
          {requests.map((request) => (
            <div
              key={request._id}
              className="border rounded-xl p-5 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold">
                  {request.name}
                </h3>

                <p>
                  <strong>Animal:</strong> {request.animalType}
                </p>

                <p>
                  <strong>Breed:</strong> {request.breed}
                </p>

                <p>
                  <strong>Location:</strong> {request.location}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  {request.animalDescription}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(request._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(request._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingAdoptionRequests;