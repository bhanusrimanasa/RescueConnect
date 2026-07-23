import { Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
function AdoptionHero() {
    const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500">
      <div className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}
          <div>

            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              ❤️ RescueConnect Adoption
            </span>

            <h1 className="mt-6 text-white font-extrabold text-5xl lg:text-7xl leading-[1.1] tracking-tight">
              Give Them
              <br />
              <span className="text-yellow-300">
                A Second Chance.
              </span>
            </h1>

            <p className="mt-8 text-xl text-blue-100 max-w-xl leading-9">
              Thousands of rescued animals are waiting for someone to call
              family. Open your heart and change a life forever.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <button
                onClick={() =>
                    document
                    .getElementById("adoption-list")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 hover:bg-gray-100 transition duration-300"
                >
                <Heart size={20} />
                Adopt Now
                </button>
              <button
                onClick={() => navigate("/adoption-request")}
                className="flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 transition"
                >
                Report Animal
                <ArrowRight size={20} />
                </button>
            </div>

          </div>

          {/* Right */}
          <div className="relative flex justify-center">

            <img
              src="/images/rescuedog.jpg"
              alt="Happy rescued animal"
              className="rounded-[32px] shadow-2xl object-cover h-[500px] w-full max-w-[420px] border-4 border-white/20"
            />

            {/* Floating Card */}
            <div className="absolute bottom-8 -left-10 bg-white/90 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-2xl border border-white/40">

              <h3 className="font-bold text-gray-900 text-lg">
                ❤️ 8,500+
              </h3>

              <p className="text-gray-700 font-medium">
                Happy Adoptions
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Families created through RescueConnect
              </p>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default AdoptionHero;