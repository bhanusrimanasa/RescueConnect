function ContactInfoForm({ formData, handleChange }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        Contact Information
      </h2>

      <div className="space-y-6">

        <div>
          <label className="font-medium">Phone</label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mt-2 rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="font-medium">
            Reason for Adoption Request
          </label>

          <textarea
            rows={4}
            name="adoptionReason"
            value={formData.adoptionReason}
            onChange={handleChange}
            className="w-full mt-2 rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

      </div>

    </div>
  );
}

export default ContactInfoForm;