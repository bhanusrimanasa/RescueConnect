import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SuccessStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/success-stories"
        );

        setStories(response.data);
      } catch (error) {
        console.error("Failed to fetch success stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuccessStories();
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            ❤️ Success Stories
          </h2>

          <p className="text-center text-gray-500">
            Loading rescue stories...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          ❤️ Success Stories
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Every rescue begins with kindness and ends with hope.
        </p>

        {stories.length === 0 ? (
          <div className="text-center text-gray-500 bg-gray-50 rounded-2xl p-10">
            <div className="text-5xl mb-4">🐾</div>

            <p className="text-lg">
              No success stories have been published yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {stories.map((story) => (
              <div
                  key={story._id}
                  onClick={() => navigate(`/success-stories/${story._id}`)}
                  className="bg-red-50 rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer"
                >

                {/* Animal Image */}
                {story.image && (
                  <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                    <img
                      src={story.image}
                      alt={story.animalType}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6">

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-red-600 mb-4">
                    {story.title}
                  </h3>

                  {/* Animal */}
                  <p className="mb-3">
                    <span className="font-semibold text-gray-700">
                      Animal:
                    </span>{" "}
                    {story.animalType}
                  </p>

                  {/* Story */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">
                      Rescue Story ❤️
                    </h4>

                    <p className="text-gray-600 leading-relaxed">
                      {story.story}
                    </p>
                  </div>

                  {/* Volunteer */}
                  {story.volunteer?.name && (
                    <p className="text-sm text-gray-500 mt-5 pt-4 border-t">
                      Rescued by{" "}
                      <span className="font-semibold">
                        {story.volunteer.name}
                      </span>
                    </p>
                  )}

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default SuccessStories;