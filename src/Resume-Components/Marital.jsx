export default function Marital() {
  return (
    <>
      {/* Marital Status */}
      <div className="flex flex-col gap-5 w-full justify-center items-center">
        {/* Section 5 */}
        <h1 className="font-bold text-[2rem] w-full text-center">
          Marital Status
        </h1>
        <div className="w-full max-w-md mx-auto my-5 flex flex-col gap-2 px-2 py-4 border-[1.5px] border-blue-400 rounded-md shadow-md">
          <label
            htmlFor="goal"
            className="font-bold text-slate-500 flex items-center gap-2 mt-3"
          >
            <span className="fa-solid fa-ring"></span>
            <span>Choose your marital status</span>
          </label>
          <div className="relative">
            <select
              id="marital-status"
              name="marital-status"
              className="block appearance-none w-full bg-white border border-gray-300 text-indigo-500 py-2 px-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" disabled selected>
                Select your marital status
              </option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 10l5 5 5-5H7z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
