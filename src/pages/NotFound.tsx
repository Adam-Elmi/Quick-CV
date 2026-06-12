import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f0f17] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative flex flex-col items-center gap-6 max-w-md">
        <p className="mono text-indigo-400 text-xs font-medium tracking-widest uppercase">
          404
        </p>

        <h1 className="text-white font-extrabold text-5xl sm:text-6xl tracking-tight leading-[1.1]">
          Page not found.
        </h1>

        <p className="text-[#8b8fa8] text-base sm:text-lg leading-relaxed">
          The page you're looking for doesn't exist or was moved.
        </p>

        <div className="flex items-center gap-3 mt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded text-sm transition-colors"
          >
            <i className="fa-solid fa-house text-xs"></i>
            Go home
          </Link>
          <Link
            to="/create-cv"
            className="inline-flex items-center gap-2 border border-[#3d3f52] hover:border-indigo-500/60 text-[#c9cbd8] hover:text-white font-semibold px-5 py-2.5 rounded text-sm transition-colors"
          >
            <i className="fa-solid fa-file-pen text-xs"></i>
            Build my CV
          </Link>
        </div>
      </div>
    </div>
  );
}
