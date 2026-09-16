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
    Available: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
    "Medical Care": "bg-amber-50 text-amber-700 border border-amber-200/60",
    Adopted: "bg-blue-50 text-blue-700 border border-blue-200/60",
    "Foster Needed": "bg-purple-50 text-purple-700 border border-purple-200/60",
    "Owner Search": "bg-yellow-50 text-yellow-700 border border-yellow-200/60",
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200/80 transition-all duration-300 overflow-hidden flex flex-col h-full">
      
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden bg-slate-100">
        <img
          src={animal.image}
          alt={animal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

        {/* Favorite Button */}
        <button className="absolute top-3 left-3 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-sm hover:bg-rose-600 hover:text-white text-slate-700 transition">
          <Heart size={16} />
        </button>

        {/* Share Button */}
        <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-sm hover:bg-indigo-600 hover:text-white text-slate-700 transition">
          <Share2 size={16} />
        </button>

        {/* Verified Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-emerald-700 border border-emerald-100 flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold shadow-sm">
          <ShieldCheck size={14} />
          Verified Rescue
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        
        <div className="space-y-4">
          {/* Header (Name + Status) */}
          <div className="flex justify-between items-start gap-2">
            <div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {animal.name}
              </h3>
              <p className="text-slate-500 text-xs font-medium mt-0.5">
                {animal.breed}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm ${
                statusColors[animal.status] || "bg-slate-100 text-slate-700"
              }`}
            >
              {animal.status}
            </span>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-2 gap-2 text-slate-600 text-xs font-medium pt-1">
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
              <span>🐾</span> {animal.age}
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
              <span>👤</span> {animal.gender}
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
              <span>⚖️</span> {animal.size}
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 truncate">
              <MapPin size={14} className="text-slate-400 flex-shrink-0" />
              <span className="truncate">{animal.location}</span>
            </div>
          </div>

          {/* Temperament Tags */}
          {animal.temperament && animal.temperament.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {animal.temperament.map((item) => (
                <span
                  key={item}
                  className="bg-indigo-50/70 border border-indigo-100/60 text-indigo-700 px-2.5 py-0.5 rounded-lg text-xs font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          )}

          {/* Rescue Story */}
          <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
            {animal.rescueStory}
          </p>
        </div>

        {/* Footer Metadata & Actions */}
        <div className="space-y-4 pt-3 border-t border-slate-100">
          
          {/* Metadata Flags */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Clock3 size={14} className="text-slate-400" />
              <span>Rescued {animal.daysSinceRescue}d ago</span>
            </div>

            <div className="flex items-center gap-2">
              {animal.vaccinated && (
                <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-medium">
                  <Syringe size={12} /> Vaccinated
                </span>
              )}
              {animal.specialNeeds && (
                <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md font-medium">
                  Special Care
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/adoptions/${animal._id}`)}
              className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-700 rounded-xl py-2.5 text-xs font-semibold transition"
            >
              View Details
            </button>

            <button
              onClick={() => navigate(`/adoptions/${animal._id}/apply`)}
              className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-2.5 text-xs font-semibold shadow-sm transition"
            >
              Adopt ❤️
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default AdoptionCard;