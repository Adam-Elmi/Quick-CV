import { steps } from "../Utilities/data";
import { SvgProcess } from "../Svg-Components/Svg";

export default function StepsSection() {
  return (
    <div className="w-full bg-white py-24 px-6 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black mb-6 border border-indigo-100 uppercase tracking-widest">
            <SvgProcess />
            3 Steps to Success
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            How it <span className="text-indigo-600">works.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((value, id) => (
            <div
              key={id}
              className="group bg-slate-50 p-8 rounded-3xl border border-slate-100 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:border-indigo-100 hover:-translate-y-2"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl group-hover:text-indigo-600 transition-colors">
                  {value.icon}
                </div>
                <span className="text-4xl font-black text-slate-200 group-hover:text-indigo-100 transition-colors leading-none">
                  0{id + 1}
                </span>
              </div>

              <span className="text-indigo-400 font-bold text-xs uppercase tracking-widest mb-3 block">
                {value.step}
              </span>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-4">
                {value.toDo}
              </h3>
              <p className="text-slate-500 font-semibold text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
