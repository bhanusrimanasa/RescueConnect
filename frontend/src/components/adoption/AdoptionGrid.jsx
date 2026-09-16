import { useEffect, useState } from "react";
import AdoptionCard from "./AdoptionCard";
import { getAllAdoptions } from "../../services/adoptionService";

function AdoptionGrid({ filters }) {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnimals = async () => {
    try {
      setLoading(true);
      const data = await getAllAdoptions(filters);
      setAnimals(data);
    } catch (err) {
      console.error("Failed to fetch adoptions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, [filters]);

  if (loading) {
    return (
      <section className="py-24 text-center bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin mx-auto mb-4"></div>
          <h2 className="text-lg font-bold text-slate-700">
            Finding available companions...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section
      id="adoption-list"
      className="bg-slate-50/50 py-20 border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-12 text-center space-y-3">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Available For Adoption
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Meet Your Future Best Friend ❤️
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Every rescued animal deserves a loving forever home. Explore our verified listings and find your perfect match.
          </p>
        </div>

        {/* Grid Content / Empty State */}
        {animals.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm max-w-xl mx-auto p-8">
            <span className="text-5xl mb-3 block">🐾</span>
            <h3 className="text-xl font-bold text-slate-900">
              No animals found
            </h3>
            <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
              We couldn't find any animals matching your current filter criteria. Try resetting or tweaking your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {animals.map((animal) => (
              <AdoptionCard
                key={animal._id}
                animal={animal}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default AdoptionGrid;