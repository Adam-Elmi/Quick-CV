import { aboutQuickCv } from "../Utilities/data";
import imageSrc from "../assets/media/naruto_togather.jpg"

export default function About() {
  const repo = (
    <a className="text-indigo-500 hover:border-b hover:border-indigo-300" href="https://github.com/Adam-Elmi/Quick-Cv">
      GitHub repository
    </a>
  );
  return (
    <div className="min-h-screen bg-gray-100">
      <img src={imageSrc} />
      <div className="w-full flex justify-center items-center flex-col gap-5 px-2">
        <h1 className="text-4xl text-center mt-10">
          About <span className="paul text-indigo-500">Quick-CV</span>
        </h1>
        <p className="text-center text-slate-500 text-lg leading-9 mt-5 p-2 mx-2 bg-white border border-slate-100 shadow-md w-fit rounded-md">
          <span className="fa-solid fa-cubes text-indigo-500 mr-2"></span>
          This is a project that I created to help people create their CVs easily.
          The project is open-source and you can contribute to it by visiting
          the {repo}.
        </p>
        {/* About Quick-Cv: Long Description */}
        {aboutQuickCv.map((part, id) => (
          <div
            key={id}
            className="border border-slate-100 mx-5 bg-white shadow-md rounded-md my-3 w-[1100px] max-w-full"
          >
            <div className="border-b border-slate-200 h-[35px] p-2 flex items-center">
              <span className={`p-2 font-[500] ${part.title === 'Intro' ? 'text-blue-500' : part.title === 'Problems' ? 'text-red-500' : part.title === 'Solution' ? 'text-green-500' : 'text-purple-500'}`}>
                <i className={`fa-solid ${part.icon} mr-2`}></i>
                {part.title}
              </span>
            </div>
            <div>
              <p className="p-4 leading-8 text-slate-500 text-lg">
                {part.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
