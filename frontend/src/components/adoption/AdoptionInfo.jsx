import {
  MapPin,
  PawPrint,
  Mars,
  Ruler,
  ShieldCheck,
} from "lucide-react";

function AdoptionInfo({ animal }) {
  const statusColors = {
    Available: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
    "Medical Care": "bg-amber-50 text-amber-700 border border-amber-200/60",
    Adopted: "bg-blue-50 text-blue-700 border border-blue-200/60",
    "Foster Needed": "bg-purple-50 text-purple-700 border border-purple-200/60",
    "Owner Search": "bg-yellow-50 text-yellow-700 border border-yellow-200/60",
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-8">

      {/* Header (Name, Breed, Status) */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {animal.name}
          </h1>
          <p className="text-slate-500 font-medium text-base mt-1">
            {animal.breed}
          </p>
        </div>

        <span className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm self-start ${
          statusColors[animal.status] || "bg-slate-100 text-slate-700"
        }`}>
          {animal.status}
        </span>
      </div>

      {/* Key Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
        
        <div className="flex items-center gap-3 bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
            <MapPin size={18} />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">Location</span>
            <span className="text-slate-800 font-semibold text-sm">{animal.location}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
            <PawPrint size={18} />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">Age</span>
            <span className="text-slate-800 font-semibold text-sm">{animal.age}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
            <Mars size={18} />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">Gender</span>
            <span className="text-slate-800 font-semibold text-sm">{animal.gender}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-50/70 border border-slate-100 rounded-xl p-3.5">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
            <Ruler size={18} />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">Size</span>
            <span className="text-slate-800 font-semibold text-sm">{animal.size}</span>
          </div>
        </div>

      </div>

      {/* Temperament Section */}
      {animal.temperament && animal.temperament.length > 0 && (
        <div className="pt-6 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900 mb-3">
            Temperament & Traits
          </h2>

          <div className="flex flex-wrap gap-2">
            {animal.temperament.map((item) => (
              <span
                key={item}
                className="bg-indigo-50/70 border border-indigo-100/60 text-indigo-700 px-3 py-1 rounded-lg text-xs font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Verification Badge */}
      <div className="pt-6 border-t border-slate-100 flex items-center gap-2 text-emerald-600">
        <ShieldCheck size={18} />
        <span className="text-xs font-semibold tracking-wide">
          Verified Rescue & Shelter Health Record
        </span>
      </div>

    </div>
  );
}

export default AdoptionInfo;