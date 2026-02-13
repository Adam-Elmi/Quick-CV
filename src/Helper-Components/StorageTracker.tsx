import { useState, useEffect } from 'react';
export default function StorageTracker() {
    const [usage, setUsage] = useState({ used: 0, percent: 0 });
    useEffect(() => {
        const calculateUsage = () => {
            let total = 0;
            for (let x in localStorage) {
                if (localStorage.hasOwnProperty(x)) {
                    total += (localStorage[x].length + x.length) * 2;
                }
            }
            const limit = 5 * 1024 * 1024;
            const usedKB = (total / 1024).toFixed(2);
            const percent = (total / limit) * 100;
            setUsage({ used: Number(usedKB), percent });
        };
        calculateUsage();
        window.addEventListener('cv-data-change', calculateUsage);
        return () => window.removeEventListener('cv-data-change', calculateUsage);
    }, []);
    return (
        <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-500">
            <div className="flex justify-between mb-1">
                <span>Storage Usage</span>
                <span>{usage.used} KB / 5MB</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
                <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${usage.percent > 80 ? 'bg-red-500' : 'bg-indigo-500'}`}
                    style={{ width: `${Math.min(usage.percent, 100)}%` }}
                ></div>
            </div>
            {usage.percent > 90 && (
                <p className="text-red-500 mt-1 font-medium">Storage full! Consider clearing or exporting.</p>
            )}
        </div>
    );
}
