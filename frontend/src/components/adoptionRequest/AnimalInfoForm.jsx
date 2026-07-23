function AnimalInfoForm({ formData, handleChange }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">
        Animal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="font-medium">Animal Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-2 rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="font-medium">Animal Type</label>
          <input
            type="text"
            name="animalType"
            value={formData.animalType}
            onChange={handleChange}
            className="w-full mt-2 rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="font-medium">Breed</label>
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            className="w-full mt-2 rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="font-medium">Age</label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full mt-2 rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

      </div>
    </div>
  );
}

export default AnimalInfoForm;