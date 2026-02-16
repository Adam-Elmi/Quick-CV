import { aboutQuickCv } from "../Utilities/data";

export default function About() {
  const repo = (
    <a
      className="text-indigo-600 font-semibold hover:text-indigo-700 underline decoration-indigo-200 underline-offset-4 transition-all"
      href="https://github.com/Adam-Elmi/Quick-Cv"
    >
      GitHub repository
    </a>
  );

  return (
    <div
      className="min-h-screen bg-[#fafafa] pb-20 relative overflow-x-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.015) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}
    >
      <div className="max-w-5xl mx-auto px-6 pt-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <h1 className="paul text-7xl font-black tracking-tighter text-[#171717] mb-8">
            Build your CV at the <span className="text-[#2b58d0]">speed of thought</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-[#6b7280] leading-relaxed font-semibold">
            Quick-CV is a high-performance builder engineered for responsiveness
            and minimal distraction. Build your professional future, instantly.
          </p>
          <div className="mt-12 flex justify-center gap-6">
            <div className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#f9fafb] text-[#171717] rounded-xl text-sm font-bold border border-[#d1d5d9] shadow-sm">
              <i className="fa-solid fa-code text-xs"></i> Open Source
            </div>
            <a
              href="https://github.com/Adam-Elmi/Quick-Cv"
              className="inline-flex items-center gap-3 px-8 py-3 bg-[#2b58d0] text-white rounded-xl text-sm font-bold shadow-[0_-3px_0_0_rgba(0,0,0,0.2) inset, 0_2px_4px_rgba(0,0,0,0.1)] hover:bg-[#3b68e0] transition-all transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <i className="fa-brands fa-github text-lg"></i> Repository
            </a>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {aboutQuickCv.map((part, id) => (
            <div
              key={id}
              className="group bg-white/80 backdrop-blur-xl p-10 rounded-3xl border border-[#0000000d] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(43,88,208,0.1)] hover:border-[#2b58d033] transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-5 mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all group-hover:scale-110 ${part.title === 'Intro' ? 'bg-blue-50 text-[#2b58d0]' :
                  part.title === 'The Problem' ? 'bg-rose-50 text-rose-600' :
                    part.title === 'The Solution' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-amber-50 text-amber-600'
                  }`}>
                  <i className={`fa-solid ${part.icon}`}></i>
                </div>
                <h3 className="text-2xl font-black text-[#171717] tracking-tighter">
                  {part.title}
                </h3>
              </div>
              <p className="text-[#6b7280] text-lg leading-relaxed font-medium">
                {part.text}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="max-w-3xl mx-auto text-center p-10 bg-white/40 backdrop-blur-sm border border-[#00000005] rounded-[2.5rem] shadow-sm text-[#9ca3af] font-semibold text-base tracking-tight italic">
          Crafted with precision engineering. Explore the repository and contribute on {repo}.
        </div>
      </div>
    </div>
  );
}
