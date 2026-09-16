import { useEffect, useState } from "react";
import axios from "axios";

function PendingSuccessStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/success-stories/pending",
        {
          withCredentials: true,
        }
      );

      setStories(response.data);
    } catch (error) {
      console.error("Failed to fetch pending success stories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/success-stories/${id}/approve`,
        {},
        {
          withCredentials: true,
        }
      );

      alert("Success story approved!");
      fetchStories();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to approve success story."
      );
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/success-stories/${id}/reject`,
        {},
        {
          withCredentials: true,
        }
      );

      alert("Success story rejected!");
      fetchStories();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to reject success story."
      );
    }
  };

  if (loading) {
    return (
      <div className="bg-purple-50 rounded-2xl p-6">
        Loading success stories...
      </div>
    );
  }

  return (
    <div className="bg-purple-50 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">
        🏆 Success Stories Awaiting Approval
      </h2>

      {stories.length === 0 ? (
        <div className="bg-white rounded-xl p-6 text-gray-500">
          No success stories awaiting approval.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              {/* Image */}
              {story.image && (
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold text-purple-700 mb-3">
                  {story.title}
                </h3>

                <p className="mb-3">
                  <span className="font-semibold">Animal:</span>{" "}
                  {story.animalType}
                </p>

                <p className="mb-4 text-gray-700">
                  {story.story}
                </p>

                {story.volunteer && (
                  <p className="text-sm text-gray-500 mb-4">
                    Submitted by:{" "}
                    <span className="font-semibold">
                      {story.volunteer.name}
                    </span>
                  </p>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(story._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold"
                  >
                    ✅ Approve
                  </button>

                  <button
                    onClick={() => handleReject(story._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold"
                  >
                    ❌ Reject
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

export default PendingSuccessStories;