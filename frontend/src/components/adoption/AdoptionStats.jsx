import { Heart, Home, PawPrint, Users } from "lucide-react";

function AdoptionStats() {
  const stats = [
    {
      icon: PawPrint,
      value: "120+",
      label: "Animals Available",
      color: "text-blue-600",
    },
    {
      icon: Heart,
      value: "850+",
      label: "Successful Adoptions",
      color: "text-red-500",
    },
    {
      icon: Home,
      value: "35+",
      label: "Partner Shelters",
      color: "text-emerald-600",
    },
    {
      icon: Users,
      value: "200+",
      label: "Active Volunteers",
      color: "text-orange-500",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-8 text-center"
              >
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <Icon className={`${stat.color}`} size={30} />
                  </div>
                </div>

                <h2 className="text-4xl font-bold mt-5">
                  {stat.value}
                </h2>

                <p className="text-gray-500 mt-2">
                  {stat.label}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default AdoptionStats;