import { features } from "../Utilities/data";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <>
      <HeroMain navigate={navigate} />
      <FeaturesGrid />
    </>
  );
}

function HeroMain({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  return (
    <section className="bg-[#13131A] min-h-[540px] flex flex-col items-center justify-center text-center px-6 py-24 relative overflow-hidden">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Badge */}
      <div className="mono text-indigo-400 text-xs font-medium tracking-widest uppercase mb-6 border border-indigo-500/30 bg-indigo-500/8 px-4 py-1.5 rounded-full">
        Open Source · Free · No Sign-Ups
      </div>

      {/* Heading */}
      <h1 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.08] max-w-3xl mb-6">
        Build your CV<br />
        <span className="text-indigo-400">fast.</span>
      </h1>

      {/* Subtitle */}
      <p className="text-[#8b8fa8] text-base sm:text-lg max-w-xl leading-relaxed mb-10">
        A professional CV builder engineered for speed and clarity.
        Pick a template, fill in your details, download instantly.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => navigate("/create-cv")}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-7 py-3 rounded text-sm transition-colors"
        >
          Start building →
        </button>
        <button
          onClick={() => navigate("/templates")}
          className="border border-[#3d3f52] text-[#c9cbd8] hover:border-indigo-500/60 hover:text-white font-semibold px-7 py-3 rounded text-sm transition-colors bg-transparent"
        >
          Browse templates
        </button>
      </div>
    </section>
  );
}

function FeaturesGrid() {
  return (
    <section className="bg-[#0f0f17] border-t border-[#2a2a38] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="mono text-indigo-400 text-xs font-medium tracking-widest uppercase mb-3 text-center">
          Why Quick CV
        </p>
        <h2 className="text-white font-bold text-2xl sm:text-3xl text-center mb-12 tracking-tight">
          Everything you need, nothing you don't.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, id) => (
            <div
              key={id}
              className="bg-[#1a1a27] border border-[#2a2a38] hover:border-indigo-500/40 rounded-lg p-5 flex gap-4 items-start transition-colors"
            >
              <span className="text-indigo-400 mt-0.5 shrink-0 text-xl">{feature.icon}</span>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{feature.feature}</h3>
                <p className="text-[#8b8fa8] text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
