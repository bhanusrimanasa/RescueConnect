import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function SuccessStoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/success-stories/${id}`
        );

        setStory(response.data);
      } catch (error) {
        console.error("Failed to fetch success story:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        Loading success story...
      </div>
    );
  }

  if (!story) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <p className="text-gray-500 mb-4">
          Success story not found.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Image */}
        {story.image && (
          <div className="w-full max-h-[550px] bg-gray-100 flex items-center justify-center">
            <img
              src={story.image}
              alt={story.animalType}
              className="max-w-full max-h-[550px] object-contain"
            />
          </div>
        )}

        <div className="p-8">

          {/* Title */}
          <h1 className="text-4xl font-bold text-purple-700 mb-4">
            {story.title}
          </h1>

          {/* Animal */}
          <p className="text-lg mb-6">
            <span className="font-semibold">
              Animal:
            </span>{" "}
            {story.animalType}
          </p>

          {/* Complete Story */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ❤️ The Rescue Story
            </h2>

            <p className="text-gray-700 text-lg leading-8 whitespace-pre-line">
              {story.story}
            </p>
          </div>

          {/* Volunteer */}
          {story.volunteer?.name && (
            <div className="mt-8 pt-6 border-t">
              <p className="text-gray-500">
                Rescued by{" "}
                <span className="font-semibold text-gray-700">
                  {story.volunteer.name}
                </span>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default SuccessStoryDetails;