import { useState, useEffect } from "react";

export default function Workflow({ children }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load the current index from sessionStorage on component mount
  useEffect(() => {
    const storedIndex = sessionStorage.getItem("current");
    if (storedIndex !== null) {
      setCurrentIndex(parseInt(storedIndex, 10));
    }
  }, []);

  function nextChild() {
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.min(prevIndex + 1, children.length - 1);
      sessionStorage.setItem("current", newIndex);
      return newIndex;
    });
  }

  function previousChild() {
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0);
      sessionStorage.setItem("current", newIndex);
      return newIndex;
    });
  };

  function moveToClickedBtn(e) {
    setCurrentIndex(parseInt(e.target.textContent, 10) - 1);
    sessionStorage.setItem("current", (parseInt(e.target.textContent, 10) - 1));
  };

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
          disabled={currentIndex >= children.length - 1}
          onClick={nextChild}
          className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
        >
          <span className="fa-solid fa-arrow-right"></span>
        </button>
      </div>

      {/* Flow State */}
      <div className="flex gap-5 justify-center items-center w-full flex-wrap mb-3">
        {children.map((_, index) => (
          <button
            onClick={moveToClickedBtn}
            key={index}
            className={`w-[20px] h-[20px] rounded-full ${
              currentIndex === index
                ? "text-white bg-blue-500"
                : "text-blue-500 bg-white"
            } border-[1.5px] border-blue-500 text-center flex justify-center items-center`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Render the current child */}
      {children[currentIndex]}

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
