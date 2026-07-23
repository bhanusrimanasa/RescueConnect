function AdoptionFilters({ filters, setFilters }) {
  return (
    <section className="bg-white py-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Search by name..."
            value={filters.search}
            onChange={(e) =>
              setFilters({
                ...filters,
                search: e.target.value,
              })
            }
            className="border rounded-xl px-4 py-3"
          />

          <select
            value={filters.animalType}
            onChange={(e) =>
              setFilters({
                ...filters,
                animalType: e.target.value,
              })
            }
            className="border rounded-xl px-4 py-3"
          >
            <option value="">All Animals</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
          </select>

          <input
            type="text"
            placeholder="Location"
            value={filters.location}
            onChange={(e) =>
              setFilters({
                ...filters,
                location: e.target.value,
              })
            }
            className="border rounded-xl px-4 py-3"
          />

          <select
            value={filters.status}
            onChange={(e) =>
              setFilters({
                ...filters,
                status: e.target.value,
              })
            }
            className="border rounded-xl px-4 py-3"
          >
            <option value="">All Status</option>
            <option value="Available">Available</option>
            <option value="Medical Care">Medical Care</option>
            <option value="Adopted">Adopted</option>
            <option value="Foster Needed">Foster Needed</option>
          </select>

        </div>

        <div className="mt-6 flex justify-end">

          <button
            onClick={() =>
              setFilters({
                search: "",
                animalType: "",
                location: "",
                status: "",
              })
            }
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700"
          >
            Clear Filters
          </button>

        </div>

      </div>
    </section>
  );
}

export default AdoptionFilters;