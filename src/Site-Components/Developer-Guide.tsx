import React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function DeveloperGuide() {
    const guideItems = [
        {
            title: "Simplified Architecture",
            description: "Templates are pure TypeScript functions returning raw HTML strings. No complex class hierarchies or proprietary engines.",
            code: "export default function builder(data) { ... }",
            lang: "typescript"
        },
        {
            title: "Data Placeholders",
            description: "Inject user data easily using curly braces. The renderer handles all replacements and sanitization automatically.",
            code: "<div class=\"name\">{profile.firstName}</div>",
            lang: "html"
        },
        {
            title: "Extensible Design",
            description: "Built for researchers and developers. Fork the repository, create your own templates, and share them with the world.",
            code: "git clone https://github.com/Adam-Elmi/Quick-CV",
            lang: "bash"
        }
    ];

    const mainCode = `import { CVData } from '../data';

export default function Builder(data: CVData) {
  return \`
    <div class="vibrant">
      {profile.firstName}
    </div>
  \`;
}`;

    return (
        <div className="w-full bg-white py-32 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="max-w-3xl mb-24">
                    <h2 className="text-5xl font-bold text-slate-900 tracking-tight mb-8">
                        Engineered for <span className="text-blue-600">Simplicity.</span>
                    </h2>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed">
                        Quick-CV is designed to be the most approachable CV builder for developers.
                        Focus on design and content while we handle the underlying data synchronization.
                    </p>
                </div>

                {/* Feature Grid & Code Preview Area */}
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Left: Features */}
                    <div className="flex-1 space-y-12">
                        {guideItems.map((item, id) => (
                            <div key={id} className="group">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                                        {id + 1}
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-800 tracking-tight">
                                        {item.title}
                                    </h4>
                                </div>
                                <p className="text-slate-500 font-medium leading-relaxed mb-6 pl-12">
                                    {item.description}
                                </p>
                                <div className="pl-12">
                                    <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                                        <SyntaxHighlighter
                                            language={item.lang}
                                            style={oneDark}
                                            customStyle={{
                                                margin: 0,
                                                padding: '16px 20px',
                                                fontSize: '12px',
                                                backgroundColor: '#f8fafc',
                                            }}
                                            codeTagProps={{ style: { color: '#334155' } }}
                                        >
                                            {item.code}
                                        </SyntaxHighlighter>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Main Code Card */}
                    <div className="flex-1 w-full lg:sticky lg:top-8">
                        <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-800">
                            <div className="px-8 py-6 bg-slate-900/50 border-b border-white/5 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                                </div>
                                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">template_builder.ts</span>
                            </div>

                            <div className="p-8">
                                <SyntaxHighlighter
                                    language="typescript"
                                    style={oneDark}
                                    customStyle={{
                                        margin: 0,
                                        padding: 0,
                                        fontSize: '14px',
                                        lineHeight: '1.6',
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    {mainCode}
                                </SyntaxHighlighter>
                            </div>

                            <div className="p-8 bg-slate-800/20 border-t border-white/5">
                                <div className="flex flex-col sm:flex-row gap-4 items-center">
                                    <a href="https://github.com/Adam-Elmi/Quick-CV" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-colors text-center">
                                        Fork on GitHub
                                    </a>
                                    <a href="https://github.com/Adam-Elmi/Quick-CV" className="w-full sm:w-auto px-8 py-4 bg-slate-800 text-white rounded-2xl font-bold text-sm hover:bg-slate-700 transition-colors text-center border border-white/5">
                                        Read Documentation
                                    </a>
                                </div>
                                <p className="mt-6 text-slate-500 text-xs font-semibold uppercase tracking-widest text-center">
                                    MIT Licensed • Open for Contributions
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
