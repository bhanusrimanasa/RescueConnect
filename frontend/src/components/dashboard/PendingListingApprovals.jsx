import { useEffect, useState } from "react";
import {
  getVolunteerApprovedRequests,
  adminApproveRequest,
  adminRejectRequest,
} from "../../services/adoptionRequestService";

function PendingListingApprovals() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const data = await getVolunteerApprovedRequests();
      setRequests(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await adminApproveRequest(id);

      setRequests((prev) =>
        prev.filter((r) => r._id !== id)
      );

      alert("Listing Approved");
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await adminRejectRequest(id);

      setRequests((prev) =>
        prev.filter((r) => r._id !== id)
      );

      alert("Listing Rejected");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-16">

      <h2 className="text-3xl font-bold mb-8">
        Adoption Listings Awaiting Final Approval
      </h2>

      {requests.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          No listings awaiting approval.
        </div>
      ) : (
        <div className="space-y-6">

          {requests.map((request) => (

            <div
              key={request._id}
              className="bg-white rounded-2xl shadow-md p-6"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    {request.name}
                  </h2>

                  <p>
                    <strong>Animal:</strong>{" "}
                    {request.animalType}
                  </p>

                  <p>
                    <strong>Breed:</strong>{" "}
                    {request.breed}
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {request.location}
                  </p>

                  <p>
                    <strong>Submitted By:</strong>{" "}
                    {request.submittedBy?.name}
                  </p>

                  <div className="mt-4">

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      Volunteer Approved
                    </span>

                  </div>

                </div>

                <div className="flex flex-col gap-3">

                  <button
                    onClick={() =>
                      handleApprove(request._id)
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                  >
                    Approve Listing
                  </button>

                  <button
                    onClick={() =>
                      handleReject(request._id)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                  >
                    Reject Listing
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default PendingListingApprovals;