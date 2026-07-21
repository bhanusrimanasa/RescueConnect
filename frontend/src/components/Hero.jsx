import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-red-50 to-orange-50 py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">

        {/* Left Content */}
        <div className="flex-1">

          <h1 className="text-5xl font-bold leading-tight text-gray-800">
            Every Life
            <span className="text-red-600"> Deserves </span>
            A Second Chance ❤️
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            RescueConnect helps compassionate people report injured stray
            animals, connect with volunteers, locate nearby veterinary
            hospitals, and find loving homes through adoption.
          </p>

          <div className="flex gap-4 mt-8">

            <Link
              to="/report"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
            >
              Report an Animal
            </Link>

            <Link
              to="/volunteer"
              className="border-2 border-red-600 text-red-600 px-6 py-3 rounded-lg hover:bg-red-600 hover:text-white transition"
            >
              Become a Volunteer
            </Link>

          </div>

        </div>

        {/* Right Image */}

        <div className="flex-1">
          <img
            src="/dog.jpg"
            alt="Rescued Dog"
            className="rounded-3xl shadow-xl"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;