export default function ContributionSection() {
  return (
    <section className="bg-[#0f0f17] border-t border-[#2a2a38] py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="mono text-indigo-400 text-xs font-medium tracking-widest uppercase mb-3">
          Open Source
        </p>
        <h2 className="text-white font-bold text-2xl sm:text-3xl tracking-tight mb-4">
          Built in the open, free forever.
        </h2>
        <p className="text-[#8b8fa8] text-sm leading-relaxed mb-8">
          Quick CV is open source. View the code, report issues, or contribute on GitHub.
        </p>
        <a
          href="https://github.com/Adam-Elmi/Quick-CV"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 border border-[#3d3f52] hover:border-indigo-500/60 text-[#c9cbd8] hover:text-white font-semibold px-6 py-3 rounded text-sm transition-colors"
        >
          <i className="fa-brands fa-github text-base"></i>
          View on GitHub
        </a>
      </div>
    </section>
  );
}
