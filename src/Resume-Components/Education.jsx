export default function Education() {
  const education = [
    { id: "college-1", placeholder: "Enter your college or school 1" },
    { id: "college-2", placeholder: "Enter your college or school 2" },
    { id: "college-3", placeholder: "Enter your college or school 3" },
    { id: "college-4", placeholder: "Enter your college or school 4" },
  ];
  return (
    <>
      {/* Education */}
      <div className="flex flex-col gap-5 w-full justify-center items-center">
        {/* Section 3 */}
        <h1 className="font-bold text-[2rem] w-full text-center">Education</h1>
        {education.map((ed, id) => (
          <div
            key={id}
            className="flex flex-col gap-2 w-full max-w-[400px] border-[1.5px] p-2 border-blue-400 rounded-md shadow-md"
          >
            <label
              htmlFor="goal"
              className="font-bold text-slate-500 flex items-center gap-2 mt-3"
            >
              <span className="fa-solid fa-school"></span>
              <span>Enter your college or school {id + 1}</span>
            </label>
            <div>
              <input
                required
                type="text"
                placeholder={ed.placeholder}
                id={ed.id}
                className="border-2 w-full border-slate-100 py-2 px-4 rounded-md"
              />
              <div className="w-full max-w-md mx-auto my-5">
                <label
                  htmlFor="start-year"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Start Year
                </label>
                <input
                  required
                  type="number"
                  id="start-year"
                  name="start-year"
                  min="1900"
                  max="2100"
                  placeholder="Year"
                  className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-4"
                />

                <label
                  htmlFor="end-year"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  End Year
                </label>
                <input
                  required
                  type="number"
                  id="end-year"
                  name="end-year"
                  min="1900"
                  max="2100"
                  placeholder="Year"
                  className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
