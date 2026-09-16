import { PawPrint } from "lucide-react";

function AnimalInfoForm({ formData, handleChange }) {
  const animalTypes = [
    "Dog",
    "Cat",
    "Cow",
    "Bird",
    "Rabbit",
    "Other",
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
          <PawPrint size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Animal Information</h2>
          <p className="text-slate-400 text-xs">Provide basic details about the rescued animal</p>
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">

        {/* Animal Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 block">
            Animal Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Example: Bruno"
            required
            className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />
        </div>

        {/* Animal Type */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 block">
            Animal Type <span className="text-rose-500">*</span>
          </label>
          <select
            name="animalType"
            value={formData.animalType}
            onChange={handleChange}
            required
            className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition appearance-none cursor-pointer"
          >
            <option value="">Select Animal Type</option>
            {animalTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Breed */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 block">
            Breed <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            placeholder="Example: Indian Pariah"
            required
            className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />
        </div>

        {/* Age */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 block">
            Age <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Example: 2 years"
            required
            className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />
        </div>

        {/* Gender */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 block">
            Gender <span className="text-rose-500">*</span>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition appearance-none cursor-pointer"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Size */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 block">
            Size <span className="text-rose-500">*</span>
          </label>
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
            className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition appearance-none cursor-pointer"
          >
            <option value="">Select Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

      </div>

    </div>
  );
}

export default AnimalInfoForm;