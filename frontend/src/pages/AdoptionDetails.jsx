import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAdoptionById } from "../services/adoptionService";

import AdoptionInfo from "../components/adoption/AdoptionInfo";
import HealthCard from "../components/adoption/HealthCard";
import RescueStory from "../components/adoption/RescueStory";
import ApplyCard from "../components/adoption/ApplyCard";

function AdoptionDetails() {
  const { id } = useParams();

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const data = await getAdoptionById(id);
        setAnimal(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl">
        Loading...
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="text-center mt-20 text-xl">
        Animal not found
      </div>
    );
  }

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left */}
          <img
            src={animal.image}
            alt={animal.name}
            className="w-full h-[600px] object-cover rounded-3xl shadow-xl"
          />

          {/* Right */}
          <div className="space-y-8">
            <AdoptionInfo animal={animal} />
            <HealthCard animal={animal} />
            <ApplyCard animal={animal} />
          </div>

        </div>

        <div className="mt-10">
          <RescueStory animal={animal} />
        </div>

      </div>
    </section>
  );
}

export default AdoptionDetails;