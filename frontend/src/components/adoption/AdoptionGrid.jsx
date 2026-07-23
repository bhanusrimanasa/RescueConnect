import { useEffect, useState } from "react";
import AdoptionCard from "./AdoptionCard";
import { getAllAdoptions } from "../../services/adoptionService";

function AdoptionGrid({ filters }) {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnimals = async () => {
    try {
      const data = await getAllAdoptions(filters);
      setAnimals(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, [filters]);

  if (loading) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-2xl font-bold">
          Loading adoptions...
        </h2>
      </section>
    );
  }

  return (
    <section
      id="adoption-list"
      className="bg-gray-50 py-20"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-12 text-center">

          <h2 className="text-5xl font-bold">
            Meet Your Future Best Friend ❤️
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Every rescued animal deserves a loving forever home.
          </p>

        </div>

        {animals.length === 0 ? (
          <div className="text-center py-20">

            <h2 className="text-3xl font-bold">
              No animals found 🐾
            </h2>

            <p className="text-gray-600 mt-3">
              Try changing your search filters.
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