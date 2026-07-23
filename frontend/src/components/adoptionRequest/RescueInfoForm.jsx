function RescueInfoForm({ formData, handleChange }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">
        Rescue Information
      </h2>

      <div className="space-y-6">

        <div>
          <label className="font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full mt-2 rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="font-medium">Description</label>

          <textarea
            rows={4}
            name="animalDescription"
            value={formData.animalDescription}
            onChange={handleChange}
            className="w-full mt-2 rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="font-medium">
            Rescue Story
          </label>

          <textarea
            rows={5}
            name="rescueStory"
            value={formData.rescueStory}
            onChange={handleChange}
            className="w-full mt-2 rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

      </div>
    </div>
  );
}

export default RescueInfoForm;