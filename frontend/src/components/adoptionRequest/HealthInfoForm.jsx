function HealthInfoForm({ formData, handleChange }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        Health Information
      </h2>

      <div className="space-y-5">

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="vaccinated"
            checked={formData.vaccinated}
            onChange={handleChange}
          />
          Vaccinated
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="sterilized"
            checked={formData.sterilized}
            onChange={handleChange}
          />
          Sterilized
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="specialNeeds"
            checked={formData.specialNeeds}
            onChange={handleChange}
          />
          Special Needs
        </label>

      </div>

    </div>
  );
}

export default HealthInfoForm;