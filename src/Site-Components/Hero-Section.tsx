import PropTypes from "prop-types";
import { features } from "../Utilities/data";
import { SvgCreate, SvgSmile } from "../Svg-Components/Svg";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeUp {
          animation: fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
      <UpperSection />
      <MiddleSection navigate={navigate} />
      <LowerSection />
    </>
  );
}

function UpperSection() {
  return (
    <div className="svg-bg min-h-[400px] border-b flex gap-6 flex-col items-center justify-center bg-[#0f172a] relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)] pointer-events-none"></div>

      <div className="animate-float">
        <div className="animate-fadeUp inline-flex items-center gap-3 py-2 px-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 rounded-full border border-indigo-500/30 text-xs sm:text-sm font-bold shadow-2xl backdrop-blur-md" style={{ animationDelay: '100ms' }}>
          <SvgSmile />
          <span>Open source & Free forever</span>
        </div>
      </div>

      <h1 className="animate-fadeUp paul text-5xl md:text-7xl lg:text-[5rem] text-white drop-shadow-2xl tracking-tighter text-center leading-[1.1] md:leading-[0.9] px-4" style={{ animationDelay: '300ms' }}>
        Create your CV <br className="hidden md:block" /> at the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">speed of light</span>
      </h1>

      <p className="animate-fadeUp text-slate-400 text-center leading-relaxed text-lg md:text-xl max-w-2xl px-6 font-semibold" style={{ animationDelay: '500ms' }}>
        A professional, high-performance CV builder engineered for clarity and speed.
        Zero sign-ups, zero ads—purely open source.
      </p>
    </div>
  );
}

function MiddleSection({ navigate }: { navigate: NavigateFunction }) {
  return (
    <div className="svg-bg-2 w-full flex flex-col gap-10 py-12 md:py-16 bg-white relative">
      <div className="animate-fadeUp flex gap-4 md:gap-6 w-full justify-center items-center flex-wrap px-6" style={{ animationDelay: '700ms' }}>
        <button
          onClick={() => navigate("/create-cv")}
          className="w-full sm:w-auto cursor-pointer font-black py-4 md:py-5 px-8 md:px-10 rounded-[1.25rem] bg-slate-900 text-white flex justify-center items-center gap-3 shadow-[0_20px_40px_-10px_rgba(15,23,42,0.3)] hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <SvgCreate />
          Build Your CV
        </button>
        <button
          onClick={() => navigate("/templates")}
          className="w-full sm:w-auto cursor-pointer font-black py-4 md:py-5 px-8 md:px-10 rounded-[1.25rem] border-2 border-indigo-600 bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_20px_40px_-10px_rgba(99,102,241,0.2)]"
        >
          Explore Templates
        </button>
      </div>
    </div>
  );
}

function LowerSection() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-slate-50 py-16 md:py-24">
      <h1 className="text-center w-fit font-black text-2xl md:text-3xl px-6 py-3 text-slate-800 mx-2 mb-12 border-b-4 border-blue-600 rounded-sm">
        What Makes Quick CV the Best Choice?
      </h1>
      <div className="max-w-7xl mx-auto flex gap-6 md:gap-8 flex-wrap justify-center items-stretch px-6">
        {features.map((feature, id) => (
          <div
            key={id}
            className="w-full max-w-[320px] p-6 shadow-lg bg-white rounded-2xl flex flex-col border border-slate-200 transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:border-blue-200 group"
          >
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4 mb-4">
              <span className="text-2xl md:text-3xl p-3 bg-blue-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </span>
              <h2 className="text-slate-800 font-bold text-lg md:text-xl">{feature.feature}</h2>
            </div>
            <div className="w-full flex-1 flex items-center">
              <p className="text-slate-500 leading-relaxed font-medium text-sm md:text-base">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
MiddleSection.propTypes = {
  navigate: PropTypes.func,
};
