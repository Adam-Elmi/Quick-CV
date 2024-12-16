import Header from "./Header";
import HeroSection from "./Hero-Section";
import StepsSection from "./Steps-Section";

export default function Home() {

  return (
    <div>
      <Header />
      <HeroSection/>
      <StepsSection/>
    </div>
  );
}

// const Cv = () => {
//   return (
//     <div className="bg-white">
//       <div className="max-w-[400px] flex flex-col min-h-[200px] border-2 border-[#112] rounded-lg overflow-hidden">
//         <h2 className="p-2 text-center cubano text-slate-500">
//           Basic Template
//         </h2>
//         <div className="w-full flex justify-center p-2 bg-[#112]">
//           <button className="text-white border rounded-lg p-2 bg-indigo-800 hover:bg-indigo-900">
//             Use this template
//           </button>
//         </div>
//         <div className="w-full flex-1 p-2">
//           <img
//             src={temp1}
//             alt=""
//             className="border-2 w-full h-full object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
