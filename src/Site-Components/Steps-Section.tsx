import { steps } from "../Utilities/data";

export default function StepsSection() {
  return (
    <section className="bg-[#13131A] border-t border-[#2a2a38] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="mono text-indigo-400 text-xs font-medium tracking-widest uppercase mb-3 text-center">
          How it works
        </p>
        <h2 className="text-white font-bold text-2xl sm:text-3xl text-center mb-14 tracking-tight">
          Three steps to your CV.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#2a2a38] rounded-lg overflow-hidden border border-[#2a2a38]">
          {steps.map((step, id) => (
            <div
              key={id}
              className="bg-[#13131A] p-8 flex flex-col gap-4 hover:bg-[#1a1a27] transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="mono text-indigo-400 text-xs font-bold tracking-widest uppercase">
                  {step.step}
                </span>
                <span className="mono text-5xl font-black text-[#2a2a38] group-hover:text-[#3d3f52] transition-colors leading-none select-none">
                  0{id + 1}
                </span>
              </div>
              <div className="text-indigo-400 text-2xl">{step.icon}</div>
              <h3 className="text-white font-bold text-lg tracking-tight">{step.toDo}</h3>
              <p className="text-[#8b8fa8] text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
