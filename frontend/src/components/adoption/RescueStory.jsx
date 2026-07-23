function RescueStory({ animal }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4">
        Rescue Story
      </h2>

      <p className="text-gray-700 leading-8">
        {animal.rescueStory}
      </p>
    </div>
  );
}

export default RescueStory;