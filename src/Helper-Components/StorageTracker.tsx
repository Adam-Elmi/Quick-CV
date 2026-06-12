import { useState, useEffect } from 'react';

export default function StorageTracker() {
  const [usage, setUsage] = useState({ used: 0, percent: 0 });

  useEffect(() => {
    const calc = () => {
      let total = 0;
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += (localStorage[key].length + key.length) * 2;
        }
      }
      const limit = 5 * 1024 * 1024;
      setUsage({ used: Number((total / 1024).toFixed(1)), percent: (total / limit) * 100 });
    };
    calc();
    window.addEventListener('cv-data-change', calc);
    return () => window.removeEventListener('cv-data-change', calc);
  }, []);

  const critical = usage.percent > 80;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="mono text-[#8b8fa8] text-xs">Storage</span>
        <span className={`mono text-xs ${critical ? 'text-rose-400' : 'text-[#8b8fa8]'}`}>
          {usage.used} KB / 5 MB
        </span>
      </div>
      <div className="w-full bg-[#2a2a38] rounded-full h-1">
        <div
          className={`h-1 rounded-full transition-all duration-500 ${critical ? 'bg-rose-500' : 'bg-indigo-500'}`}
          style={{ width: `${Math.min(usage.percent, 100)}%` }}
        />
      </div>
      {usage.percent > 90 && (
        <p className="text-rose-400 text-xs mt-0.5">Storage full — consider clearing data.</p>
      )}
    </div>
  );
}
