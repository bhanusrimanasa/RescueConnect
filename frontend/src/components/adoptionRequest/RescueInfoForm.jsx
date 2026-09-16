import { ShieldAlert, MapPin } from "lucide-react";

function RescueInfoForm({ formData, handleChange }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
          <ShieldAlert size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Animal Details & Background</h2>
          <p className="text-slate-400 text-xs">Information for volunteers, admins, and adopters</p>
        </div>
      </div>

      {/* Form Fields Stack */}
      <div className="space-y-5 pt-2">

        {/* Location */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 block">
            Animal Location <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Where is the animal currently located?"
              required
              className="w-full bg-slate-50/60 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 block">
            Animal Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={4}
            name="animalDescription"
            value={formData.animalDescription}
            onChange={handleChange}
            placeholder="Describe the animal's appearance, behavior, and current condition..."
            required
            className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition resize-none"
          />
        </div>

        {/* Rescue Story */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 block">
            Rescue / Background Story <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={5}
            name="rescueStory"
            value={formData.rescueStory}
            onChange={handleChange}
            placeholder="Tell us how the animal came to you or share any relevant background story..."
            required
            className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition resize-none"
          />
        </div>

        {/* Adoption Reason */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 block">
            Why is this animal being put up for adoption?
          </label>
          <textarea
            rows={4}
            name="adoptionReason"
            value={formData.adoptionReason}
            onChange={handleChange}
            placeholder="Explain why the animal needs a new home..."
            className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition resize-none"
          />
        </div>

      </div>

    </div>
  );
}

export default RescueInfoForm;