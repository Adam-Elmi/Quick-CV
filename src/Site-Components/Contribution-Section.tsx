import React from "react";

export default function ContributionSection() {
    return (
        <div className="w-full bg-slate-50 py-16 border-t border-slate-100">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="paul text-3xl font-black text-slate-900 tracking-tight mb-4">
                    Open Source & Free Forever
                </h2>
                <p className="text-slate-500 font-semibold mb-8">
                    Support the project by contributing or forking the repository.
                </p>
                <a
                    href="https://github.com/Adam-Elmi/Quick-CV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-black shadow-lg hover:bg-slate-800 transition-all hover:-translate-y-1 active:scale-95"
                >
                    <i className="fa-brands fa-github text-xl"></i>
                    CONTRIBUTE ON GITHUB
                </a>
            </div>
        </div>
    );
}
