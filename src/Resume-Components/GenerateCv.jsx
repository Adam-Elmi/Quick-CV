import { useContext, useState, useEffect } from "react";
import { InputContext } from "./InputContext";

export default function GenerateCV() {
  const { value1, value2, value3, value4, value5 } = useContext(InputContext);
  const [isVisible, setIsVisible] = useState(false);

  function changeVisibilty() {
    setIsVisible(!isVisible);
  }

  function check() {
    if (
      value1 === "" ||
      value2 === "" ||
      value3 === "" ||
      value4 === "" ||
      value5 === ""
    ) {
      setIsVisible(true);
    }
  }
  return (
    <>
      <div className="flex flex-col p-2 gap-5 justify-center items-center m-2">
        <div className="flex flex-col gap-4 justify-center items-center w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            id="Layer_1"
            width="150"
            height="150"
            fill="#000"
            version="1.1"
            viewBox="0 0 480 480"
          >
            <g id="SVGRepo_iconCarrier">
              <path d="M413.648 74.336 341.664 2.352A7.95 7.95 0 0 0 336 0H104C81.944 0 64 17.944 64 40v344c0 22.056 17.944 40 40 40h88v56h16v-56h120c4.416 0 8-3.576 8-8v-40c0-14.88 10.216-27.432 24-30.984V480h16v-56c22.056 0 40-17.944 40-40V80a7.95 7.95 0 0 0-2.352-5.664M344 27.312 388.688 72H344zM400 384c0 13.232-10.768 24-24 24v-72c0-4.424-3.584-8-8-8-26.472 0-48 21.528-48 48v32H104c-13.232 0-24-10.768-24-24V40c0-13.232 10.768-24 24-24h224v64c0 4.424 3.584 8 8 8h64z"></path>
              <path d="M224 48H112c-4.416 0-8 3.576-8 8v112c0 4.424 3.584 8 8 8h112c4.416 0 8-3.576 8-8V56c0-4.424-3.584-8-8-8m-40 112h-32v-16c0-8.824 7.176-16 16-16s16 7.176 16 16zm-24-56c0-4.416 3.592-8 8-8s8 3.584 8 8-3.592 8-8 8-8-3.584-8-8m56 56h-16v-16c0-10.488-5.136-19.72-12.952-25.56 3.064-4.032 4.952-9 4.952-14.44 0-13.232-10.768-24-24-24s-24 10.768-24 24c0 5.44 1.888 10.408 4.952 14.44C141.136 124.28 136 133.512 136 144v16h-16V64h96zM248 72h40v16h-40zM248 104h48v16h-48zM312 104h40v16h-40zM248 136h104v16H248zM144 200h64v16h-64zM224 200h48v16h-48zM288 200h80v16h-80zM112 232h64v16h-64zM192 232h128v16H192zM336 232h32v16h-32zM112 264h32v16h-32zM160 264h96v16h-96zM272 264h96v16h-96zM112 296h32v16h-32zM160 296h96v16h-96zM272 296h96v16h-96zM112 328h72v16h-72zM200 328h112v16H200zM112 360h32v16h-32zM160 360h136v16H160z"></path>
            </g>
          </svg>
          <p className="text-[1.2rem]">Create generate your cv</p>
        </div>
        <button
          onClick={check}
          className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
        >
          Generate CV
        </button>
      </div>
      <div
        className={`fixed bottom-0 inset-0 ${
          isVisible ? "flex" : "hidden"
        } items-center justify-center bg-gray-800 bg-opacity-50 z-50`}
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative mx-2">
          {/* Close Button */}
          <button
            onClick={changeVisibilty}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times text-xl"></i>
          </button>

          {/* Modal Header */}
          <div className="text-center mb-4">
            <i className="fas fa-exclamation-circle text-yellow-500 text-3xl mb-2"></i>
            <h2 className="text-2xl font-semibold text-gray-800">
              Please Fill All Fields
            </h2>
          </div>
          {/* Close Button */}
          <div className="mt-6 text-center">
            <button
              onClick={changeVisibilty}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
