import React, { useState, useEffect } from "react";

export default function Workflow({ sections }: { sections: React.ReactNode[]}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const storedIndex = sessionStorage.getItem("current");
    if (storedIndex !== null) {
      setCurrentIndex(parseInt(storedIndex, 10));
    }
  }, []);

  function nextChild() {
    setCurrentIndex((prevIndex: number) => {
      const newIndex: number = Math.min(prevIndex + 1, sections.length - 1);
      sessionStorage.setItem("current", newIndex.toString());
      return newIndex;
    });
  }

  function previousChild() {
    setCurrentIndex((prevIndex) => {
      const newIndex: number = Math.max(prevIndex - 1, 0);
      sessionStorage.setItem("current", newIndex.toString());
      return newIndex;
    });
  }

  function moveToClickedBtn(e: React.MouseEvent) {
    setCurrentIndex(parseInt((e.target as HTMLElement).textContent, 10) - 1);
    sessionStorage.setItem("current", (parseInt((e.target as HTMLElement).textContent, 10) - 1).toString());
  }

  return (
    <div className="w-full">
      {/* Previous and Next */}
      <div className="flex justify-between p-4 mb-3">
        <button
          disabled={currentIndex === 0}
          onClick={previousChild}
          className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
        >
          <span className="fa-solid fa-arrow-left"></span>
        </button>
        <button
          disabled={currentIndex >= sections.length - 1}
          onClick={nextChild}
          className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
        >
          <span className="fa-solid fa-arrow-right"></span>
        </button>
      </div>

      {/* Flow State */}
      <div className="flex gap-5 justify-center items-center w-full flex-wrap mb-3">
        {sections && sections.map((_, index) => (
          <button
            onClick={moveToClickedBtn}
            key={index}
            className={`w-[20px] h-[20px] cursor-pointer rounded-full ${currentIndex === index
                ? "text-white bg-blue-500"
                : "text-blue-500 bg-white"
              } border-[1.5px] border-blue-500 text-center flex justify-center items-center`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Render the current child */}
      {sections[currentIndex]}

      {/* Previous and Next */}
      <div className="flex justify-between p-4 mb-3">
        <button
          onClick={previousChild}
          className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={nextChild}
          className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}