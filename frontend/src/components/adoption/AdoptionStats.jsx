import { Heart, Home, PawPrint, Users } from "lucide-react";

function AdoptionStats() {
  const stats = [
    {
      icon: PawPrint,
      value: "120+",
      label: "Animals Available",
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      icon: Heart,
      value: "850+",
      label: "Successful Adoptions",
      color: "text-rose-600 bg-rose-50 border-rose-100",
    },
    {
      icon: Home,
      value: "35+",
      label: "Partner Shelters",
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      icon: Users,
      value: "200+",
      label: "Active Volunteers",
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
  ];

  return (
    <section className="bg-slate-50/50 py-16 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200/80 transition-all duration-300 p-6 sm:p-8 text-center flex flex-col items-center justify-between"
              >
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${stat.color}`}>
                  <Icon size={26} />
                </div>

                <div className="mt-4">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AdoptionStats;