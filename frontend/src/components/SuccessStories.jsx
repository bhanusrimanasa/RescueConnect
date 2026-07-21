function SuccessStories() {
  const stories = [
    {
      name: "Bruno",
      animal: "🐶",
      before: "Found with a broken leg near the highway.",
      after: "Recovered after treatment and adopted by a loving family.",
    },
    {
      name: "Mittens",
      animal: "🐱",
      before: "Abandoned kitten suffering from malnutrition.",
      after: "Healthy, vaccinated, and happily adopted.",
    },
    {
      name: "Chinnu",
      animal: "🐮",
      before: "Rescued after a road accident.",
      after: "Recovered with veterinary care and now lives safely in a shelter.",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          ❤️ Success Stories
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Every rescue begins with kindness and ends with hope.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.name}
              className="bg-red-50 rounded-2xl shadow-md hover:shadow-xl transition p-6"
            >
              <div className="text-6xl text-center mb-4">
                {story.animal}
              </div>

              <h3 className="text-2xl font-bold text-center text-red-600 mb-4">
                {story.name}
              </h3>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-700">Before</h4>
                <p className="text-gray-600">{story.before}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">After ❤️</h4>
                <p className="text-gray-600">{story.after}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default SuccessStories;