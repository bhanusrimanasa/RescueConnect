function Stats() {
  const stats = [
    {
      number: "250+",
      title: "Animals Rescued",
      emoji: "❤️",
    },
    {
      number: "120+",
      title: "Active Volunteers",
      emoji: "🙋",
    },
    {
      number: "35+",
      title: "Partner Vets",
      emoji: "🏥",
    },
    {
      number: "80+",
      title: "Successful Adoptions",
      emoji: "🏡",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Our Impact
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-red-50 rounded-xl p-8 text-center shadow hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4">
                {stat.emoji}
              </div>

              <h3 className="text-3xl font-bold text-red-600">
                {stat.number}
              </h3>

              <p className="mt-2 text-gray-600">
                {stat.title}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Stats;