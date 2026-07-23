import {
  Heart,
  Share2,
  MapPin,
  ShieldCheck,
  Syringe,
  Clock3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
function AdoptionCard({ animal }) {
    const navigate = useNavigate();
  const statusColors = {
    Available: "bg-green-100 text-green-700",
    "Medical Care": "bg-orange-100 text-orange-700",
    Adopted: "bg-blue-100 text-blue-700",
    "Foster Needed": "bg-purple-100 text-purple-700",
    "Owner Search": "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">

     
      <div className="relative overflow-hidden">

        <img
          src={animal.image}
          alt={animal.name}
          className="h-72 w-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

       
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

        
        <button className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition">
          <Heart size={18} />
        </button>

       
        <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition">
          <Share2 size={18} />
        </button>

        <div className="absolute bottom-4 left-4 bg-green-600 text-white flex items-center gap-2 px-3 py-1 rounded-full text-sm shadow-lg">
          <ShieldCheck size={16} />
          Verified Rescue
        </div>
      </div>

      
      <div className="p-6">

        
        <div className="flex justify-between items-start">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {animal.name}
            </h2>

            <p className="text-gray-500">
              {animal.breed}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              statusColors[animal.status]
            }`}
          >
            {animal.status}
          </span>

        </div>

        
        <div className="grid grid-cols-2 gap-3 mt-5 text-gray-600">

          <p>🐾 {animal.age}</p>

          <p>{animal.gender}</p>

          <p>{animal.size}</p>

          <p className="flex items-center gap-1">
            <MapPin size={16} />
            {animal.location}
          </p>

        </div>

       
        <div className="flex flex-wrap gap-2 mt-5">

          {animal.temperament.map((item) => (
            <span
              key={item}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              {item}
            </span>
          ))}

        </div>

       
        <p className="text-gray-600 mt-5 leading-7 line-clamp-3">
          {animal.rescueStory}
        </p>

       
        <div className="flex items-center gap-2 mt-4 text-gray-500 text-sm">
          <Clock3 size={16} />
          Rescued {animal.daysSinceRescue} days ago
        </div>

       
        <div className="flex flex-wrap gap-3 mt-5">

          {animal.vaccinated && (
            <span className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              <Syringe size={15} />
              Vaccinated
            </span>
          )}

          {animal.specialNeeds && (
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
              Special Care
            </span>
          )}

        </div>

       
        <div className="flex gap-4 mt-8">

          <button
  onClick={() => navigate(`/adoptions/${animal._id}`)}
  className="flex-1 border-2 border-blue-600 text-blue-600 rounded-xl py-3 font-semibold hover:bg-blue-600 hover:text-white transition"
>
  View Details
</button>

          <button onClick={() => navigate(`/adoptions/${animal._id}/apply`)} className="flex-1 bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-300">
            Adopt ❤️
          </button>

        </div>

      </div>

    </div>
  );
}

export default AdoptionCard;