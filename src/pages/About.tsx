import { aboutQuickCv } from "../Utilities/data";

const iconColors: Record<string, string> = {
  Intro: "text-indigo-400",
  "The Problem": "text-rose-400",
  "The Solution": "text-emerald-400",
  Goal: "text-amber-400",
};

export default function About() {
  return (
    <div className="min-h-screen bg-[#13131A]">
      {/* Hero */}
      <section className="border-b border-[#2a2a38] py-20 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="mono text-indigo-400 text-xs font-medium tracking-widest uppercase mb-4">
            About
          </p>
          <h1 className="text-white font-extrabold text-4xl sm:text-5xl tracking-tight leading-[1.1] mb-5">
            Why Quick CV exists.
          </h1>
          <p className="text-[#8b8fa8] text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            A fast, open-source CV builder built to remove every obstacle between
            you and your professional profile.
          </p>
        </div>
      </section>

      {/* Cards grid */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {aboutQuickCv.map((part, id) => (
            <div
              key={id}
              className="bg-[#1a1a27] border border-[#2a2a38] hover:border-indigo-500/40 rounded-lg p-7 flex flex-col gap-4 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className={`text-xl ${iconColors[part.title] ?? "text-indigo-400"}`}>
                  <i className={part.icon}></i>
                </span>
                <h2 className="text-white font-bold text-base tracking-tight">
                  {part.title}
                </h2>
              </div>
              <p className="text-[#8b8fa8] text-sm leading-relaxed">{part.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto border border-[#2a2a38] rounded-lg p-8 flex flex-col sm:flex-row items-center justify-between gap-5 bg-[#1a1a27]">
          <p className="mono text-[#8b8fa8] text-sm text-center sm:text-left">
            Open source · contributions welcome
          </p>
          <a
            href="https://github.com/Adam-Elmi/Quick-CV"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 border border-[#3d3f52] hover:border-indigo-500/60 text-[#c9cbd8] hover:text-white font-semibold px-5 py-2.5 rounded text-sm transition-colors shrink-0"
          >
            <i className="fa-brands fa-github text-base"></i>
            View on GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
