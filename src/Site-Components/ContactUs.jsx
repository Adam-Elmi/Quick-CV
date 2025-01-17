import { platforms } from "../Utilities/data";

export default function ContactUs() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form className="w-[500px] max-w-full bg-white flex justify-center flex-col p-4 border border-slate-200 my-5 mx-2 shadow-md rounded-lg">
        <h1 className="text-[1.5rem] font-bold text-center mb-5 text-slate-600">
          Contact Us
        </h1>
        <div className="flex justify-center gap-2 border-b-2 border-dotted pb-3">
            {platforms.map((platform, id) => (
              <a
                key={id}
                className={`text-slate-600 text-[1.2rem] ${platform.icon}`}
                href={platform.link}
              ></a>
            ))}
          </div>
        <div className="flex gap-2 flex-col">
          <div className="flex flex-col gap-2 mt-5">
            <label
              htmlFor="first-name"
              className="text-slate-500 font-[500] flex items-center gap-2"
            >
              <span className="fa-solid fa-user"></span>
              First name
            </label>
            <input
              className="border-b-[1.5px] border-slate-200 outline-none focus:border-slate-900"
              type="text"
              id="first-name"
              name="first-name"
              placeholder="Enter your first name"
            />
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <label
              htmlFor="last-name"
              className="text-slate-500 font-[500] flex items-center gap-2"
            >
              <span className="fa-solid fa-user"></span>
              Last name
            </label>
            <input
              className="border-b-[1.5px] border-slate-200 outline-none focus:border-slate-900"
              type="text"
              id="last-name"
              name="last-name"
              placeholder="Enter your last name"
            />
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <label
              htmlFor="email"
              className="text-slate-500 font-[500] flex items-center gap-2"
            >
              <span className="fa-solid fa-envelope"></span>
              Email
            </label>
            <input
              className="border-b-[1.5px] border-slate-200 outline-none focus:border-slate-900"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <label
              htmlFor="phone-number"
              className="text-slate-500 font-[500] flex items-center gap-2"
            >
              <span className="fa-solid fa-phone"></span>
              Phone number
            </label>
            <input
              className="border-b-[1.5px] border-slate-200 outline-none focus:border-slate-900"
              type="phone"
              id="phone-number"
              name="phone-number"
              placeholder="Enter your phone number"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <label htmlFor="name" className="text-slate-500 font-[500] flex items-center gap-2">
          <span className="fa-solid fa-message"></span>
            Message
          </label>
          <textarea
            className="border-b-[1.5px] border-slate-200 outline-none w-full resize-none h-auto min-h-[100px]"
            id="message"
            name="message"
            placeholder="Enter your message"
          ></textarea>
        </div>
        <button className="p-2 bg-indigo-500 text-white text-[1rem] rounded-md mt-5 font-mono border-2 mb-5">
          Submit
        </button>
        <span className="text-center">Our email: <a className="text-slate-500" mailto="true" href="mailto:Quickcv_team@gmail.com">Quickcv_team@gmail.com</a></span>
      </form>
    </div>
  );
}
