import React, { useState, useEffect, useRef } from "react";

export default function Workflow({ sections }: { sections: React.ReactNode[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedIndex = sessionStorage.getItem("current");
    if (storedIndex !== null) {
      setCurrentIndex(parseInt(storedIndex, 10));
    }
  }, []);

  const transitionToIndex = (newIndex: number) => {
    if (newIndex === currentIndex) return;

    // Start fade out
    setIsVisible(false);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      sessionStorage.setItem("current", newIndex.toString());
      // Start fade in
      setIsVisible(true);

      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200); 
  };

  function nextChild() {
    const newIndex = Math.min(currentIndex + 1, sections.length - 1);
    transitionToIndex(newIndex);
  }

  function previousChild() {
    const newIndex = Math.max(currentIndex - 1, 0);
    transitionToIndex(newIndex);
  }

  function moveToClickedBtn(index: number) {
    transitionToIndex(index);
  }

  return (
    <div className="w-full max-w-4xl mx-auto" ref={containerRef}>
      {/* Previous and Next (Top) */}
      <div className="flex justify-between p-4 mb-3">
        <button
          disabled={currentIndex === 0}
          onClick={previousChild}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 text-white py-2 px-6 rounded-lg transition-all shadow-md disabled:shadow-none cursor-pointer flex items-center gap-2"
        >
          <i className="fa-solid fa-arrow-left"></i> <span>Prev</span>
        </button>
        <button
          disabled={currentIndex >= sections.length - 1}
          onClick={nextChild}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 text-white py-2 px-6 rounded-lg transition-all shadow-md disabled:shadow-none cursor-pointer flex items-center gap-2"
        >
          <span>Next</span> <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      {/* Flow State (Progress Indicators) */}
      <div className="flex gap-4 justify-center items-center w-full flex-wrap mb-8">
        {sections && sections.map((_, index) => (
          <button
            onClick={() => moveToClickedBtn(index)}
            key={index}
            className={`w-8 h-8 cursor-pointer rounded-full transition-all duration-300 font-bold text-xs ${currentIndex === index
              ? "text-white bg-blue-500 scale-110 shadow-lg border-transparent"
              : "text-blue-500 bg-white hover:bg-blue-50 border-blue-200"
              } border-2 flex justify-center items-center`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div
        className={`transition-all duration-300 ease-in-out min-h-[400px] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
      >
        {sections[currentIndex]}
      </div>

      {/* Previous and Next (Bottom) */}
      <div className="flex justify-between p-6 mt-6 border-t border-slate-100">
        <button
          disabled={currentIndex === 0}
          onClick={previousChild}
          className="bg-blue-500 hover:bg-blue-600 disabled:opacity-30 disabled:bg-slate-300 text-white font-bold py-2.5 px-8 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl active:scale-95"
        >
          <i className="fa-solid fa-arrow-left text-sm"></i> <span>Prev</span>
        </button>
        <button
          disabled={currentIndex >= sections.length - 1}
          onClick={nextChild}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-8 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:bg-slate-300 disabled:shadow-none flex items-center gap-2 cursor-pointer"
        >
          <span>Next</span> <i className="fa-solid fa-arrow-right text-sm"></i>
        </button>
      </div>
    </div>
  );
}