import { Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdoptionHero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white">
      {/* Subtle ambient lighting backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-indigo-200 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-sm">
              <Heart size={14} className="text-rose-400 fill-rose-400" /> RescueConnect Adoption Program
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Give Them <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-amber-200 to-yellow-400">
                A Second Chance.
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              Thousands of rescued animals are waiting for someone to call family. Open your heart and change a life forever through safe, verified adoptions.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() =>
                  document
                    .getElementById("adoption-list")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-200 text-sm group"
              >
                <Heart size={16} className="group-hover:scale-110 transition-transform" />
                Adopt Now
              </button>

              <button
                onClick={() => navigate("/adoption-request")}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium px-6 py-3.5 rounded-xl transition-all duration-200 text-sm backdrop-blur-sm"
              >
                Report Animal
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Image & Floating Badge */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-3xl blur-2xl transform scale-95" />
              
              <img
                src="/images/rescuedog.jpg"
                alt="Happy rescued animal"
                className="relative rounded-2xl shadow-2xl object-cover h-[450px] w-full border border-white/10"
              />

              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-slate-900/90 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl max-w-[220px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-lg">
                    🐾
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">8,500+</h3>
                    <p className="text-slate-400 text-xs font-medium">Happy Adoptions</p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-2.5 pt-2 border-t border-white/10">
                  Families united through RescueConnect
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AdoptionHero;