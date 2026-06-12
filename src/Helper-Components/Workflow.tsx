import React, { useState, useEffect, useRef } from "react";

interface WorkflowProps {
  sections: React.ReactNode[];
  labels?: string[];
}

export default function Workflow({ sections, labels }: WorkflowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("current");
    if (stored !== null) setCurrentIndex(parseInt(stored, 10));
  }, []);

  const transitionTo = (newIndex: number) => {
    if (newIndex === currentIndex) return;
    setVisible(false);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      sessionStorage.setItem("current", newIndex.toString());
      setVisible(true);
    }, 180);
  };

  useEffect(() => {
    tabRefs.current[currentIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [currentIndex]);

  const scrollTabs = (dir: "left" | "right") => {
    tabListRef.current?.scrollBy({ left: dir === "left" ? -160 : 160, behavior: "smooth" });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!tabListRef.current) return;
    e.preventDefault();
    tabListRef.current.scrollLeft += e.deltaY + e.deltaX;
  };

  const prev = () => transitionTo(Math.max(currentIndex - 1, 0));
  const next = () => transitionTo(Math.min(currentIndex + 1, sections.length - 1));

  const atFirst = currentIndex === 0;
  const atLast  = currentIndex >= sections.length - 1;

  return (
    <div className="w-full flex flex-col">
      {/* Tab bar */}
      <div className="flex items-center border-b border-[#2a2a38] bg-[#13131A]">
        <button
          onClick={() => scrollTabs("left")}
          className="shrink-0 w-8 flex items-center justify-center self-stretch text-[#8b8fa8] hover:text-white transition-colors"
          aria-label="Scroll tabs left"
        >
          <i className="fa-solid fa-chevron-left text-[10px]" />
        </button>

        <div
          ref={tabListRef}
          onWheel={handleWheel}
          className="flex-1 flex items-center overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {sections.map((_, i) => {
            const label = labels?.[i] ?? String(i + 1);
            const active = i === currentIndex;
            return (
              <button
                key={i}
                ref={el => { tabRefs.current[i] = el; }}
                onClick={() => transitionTo(i)}
                className={`shrink-0 px-4 py-1.5 mx-1 my-2 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-[#8b8fa8] hover:text-[#c9cbd8] hover:bg-white/5"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scrollTabs("right")}
          className="shrink-0 w-8 flex items-center justify-center self-stretch text-[#8b8fa8] hover:text-white transition-colors"
          aria-label="Scroll tabs right"
        >
          <i className="fa-solid fa-chevron-right text-[10px]" />
        </button>
      </div>

      {/* Section content */}
      <div
        className={`flex-1 transition-all duration-200 ease-in-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        {sections[currentIndex]}
      </div>

      {/* Prev / Next */}
      <div className="flex items-center justify-between px-5 py-4 border-t border-[#2a2a38] bg-[#13131A]">
        <button
          disabled={atFirst}
          onClick={prev}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded border border-[#2a2a38] text-[#8b8fa8] hover:text-white hover:border-[#3d3f52] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <i className="fa-solid fa-arrow-left text-xs"></i>
          Prev
        </button>

        <span className="mono text-[#3d3f52] text-xs">
          {currentIndex + 1} / {sections.length}
        </span>

        <button
          disabled={atLast}
          onClick={next}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded border border-[#2a2a38] text-[#8b8fa8] hover:text-white hover:border-[#3d3f52] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <i className="fa-solid fa-arrow-right text-xs"></i>
        </button>
      </div>
    </div>
  );
}
