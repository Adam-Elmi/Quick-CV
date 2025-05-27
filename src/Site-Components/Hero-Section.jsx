import PropTypes from "prop-types";
import { features } from "../Utilities/data";
import { SvgCreate, SvgSmile } from "../Svg-Components/Svg";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <>
      <UpperSection />
      <MiddleSection navigate={navigate} />
      <LowerSection />
    </>
  );
}

function UpperSection() {
  return (
    <div className="svg-bg min-h-[200px] border-b flex gap-3 flex-col items-center justify-center bg-[#112]">
      <h1 className="paul text-[3rem] text-white">Quick Cv</h1>
      <p className="text-white text-center leading-8 text-[1rem] max-[640px]:text-[0.85rem] px-2">
        A free, open-source tool to create a professional CV quickly. No ads, no
        sign-ups—just add your details and go!
      </p>
      <div className="flex justify-center items-center gap-2 flex-wrap py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full mb-4 text-center  max-[640px]:text-[0.85rem] small-max-[640px]:text-[0.6rem]">
        <SvgSmile />
        <span>Be free to use, to contribute, and to share</span>
      </div>
    </div>
  );
}

function MiddleSection({ navigate }) {
  return (
    <div className="svg-bg-2 w-full min-h-[300px] flex flex-col gap-6 pt-5">
      <h1 className="text-[2.5rem] text-center w-full font-bold my-4 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 bg-clip-text text-transparent text-shadow">
        Create your CV quickly and easily!
      </h1>
      <div className="flex gap-4 w-full justify-center items-center flex-wrap">
        <button onClick={() => navigate("/create-cv")} className=" cursor-pointer font-mono font-semibold py-3 px-4 rounded-full bg-slate-900 text-white flex gap-2 border-2 border-slate-400 hover:bg-slate-700 transition-bg transition-[2s]">
          <SvgCreate />
          Create Your CV
        </button>
        <button onClick={() => navigate("/templates")} className=" cursor-pointer font-mono font-semibold py-3 px-6 rounded-full border-2 border-indigo-600 bg-white hover:bg-gradient-to-r from-indigo-500 to-blue-600 hover:border-[#eee] hover:text-white">
          View available Cv templates
        </button>
      </div>
      <h3 className="text-slate-500 w-full text-center my-2">
        Create your CV in minutes, no sign-ups, ads, or payments!
      </h3>
    </div>
  );
}

function LowerSection() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-slate-100">
      <h1 className="text-center w-fit font-bold text-[1.5rem]  px-4 py-2 text-slate-700  mx-2 my-6 max-[640px]:text-[1.1rem] border-b-2 border-blue-600">
        What Makes Quick CV the Best Choice?
      </h1>
      <div className="w-full bg-transparent flex gap-4 flex-wrap justify-center items-center mb-4">
        {features.map((feature, id) => (
          <div
            key={id}
            className="w-[300px] min-h-[120px] max-w-full p-2 shadow-lg bg-white rounded-lg flex flex-col border-2 border-slate-200 mx-3"
          >
            <div className="flex gap-2 border-b border-slate-200 p-2 mb-2">
              <span>{feature.icon}</span>
              <p>{feature.feature}</p>
            </div>
            <div className="w-full flex-1 flex items-center">
              <p className="px-2">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
MiddleSection.propTypes = {
  navigate: PropTypes.func
}