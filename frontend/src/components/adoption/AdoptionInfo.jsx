import {
  MapPin,
  PawPrint,
  Mars,
  Ruler,
  ShieldCheck,
} from "lucide-react";

function AdoptionInfo({ animal }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex justify-between items-start">

        <div>
          <h1 className="text-5xl font-bold">
            {animal.name}
          </h1>

          <p className="text-2xl text-gray-500 mt-2">
            {animal.breed}
          </p>
        </div>

        <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
          {animal.status}
        </span>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-10">

        <div className="flex items-center gap-3">
          <MapPin className="text-blue-600" />
          <span>{animal.location}</span>
        </div>

        <div className="flex items-center gap-3">
          <PawPrint className="text-blue-600" />
          <span>{animal.age}</span>
        </div>

        <div className="flex items-center gap-3">
          <Mars className="text-blue-600" />
          <span>{animal.gender}</span>
        </div>

        <div className="flex items-center gap-3">
          <Ruler className="text-blue-600" />
          <span>{animal.size}</span>
        </div>

      </div>

      <div className="mt-10">

        <h2 className="font-bold text-xl mb-4">
          Temperament
        </h2>

        <div className="flex flex-wrap gap-3">

          {animal.temperament.map((item) => (
            <span
              key={item}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
            >
              {item}
            </span>
          ))}

        </div>

      </div>

      <div className="mt-10 flex items-center gap-2 text-green-600">

        <ShieldCheck />

        <span className="font-semibold">
          Verified Rescue
        </span>

      </div>

    </div>
  );
}

export default AdoptionInfo;