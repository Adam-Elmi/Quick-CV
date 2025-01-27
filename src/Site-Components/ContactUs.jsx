import { useState } from "react";
import { platforms } from "../Utilities/data";
import ContactModal from "../Helper-Components/ContactModal";

export default function ContactUs() {
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPurpose) {
      setIsModalVisible(true);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-2">
      <div className="flex flex-col justify-center items-center md:flex-row w-full ">
        {/* Left Purpose Section */}
        {/* <ReportIssue/> */}
        {/* Right Form Section */}
        <div className="md:w-1/2 p-4">
          <form
            className="w-full bg-white flex justify-center flex-col p-4 border border-slate-200 my-5 shadow-md rounded-lg"
            onSubmit={handleSubmit}
          >
            <h1 className="text-[1.5rem] font-bold text-center mb-5 text-slate-600">
              Contact Us
            </h1>

            {/* Social Media Links */}
            <div className="flex justify-center gap-2 border-b-2 border-dotted pb-3">
              {platforms.map((platform, id) => (
                <a
                  key={id}
                  className={`text-slate-600 text-[1.2rem] ${platform.icon}`}
                  href={platform.link}
                ></a>
              ))}
            </div>

            {/* Form Fields */}
            <div className="flex gap-2 flex-col">
              <FirstName />
              <LastName />
              <Email />
              <PhoneNumber />
              <Purpose setSelectedPurpose={setSelectedPurpose} />
              {selectedPurpose && (
                <PurposeField selectedPurpose={selectedPurpose} />
              )}
              <Message />
            </div>

            {/* Submit Button */}
            <button className="p-2 bg-indigo-500 text-white text-[1rem] rounded-md mt-5 font-mono border-2 mb-5">
              Submit
            </button>

            {/* Contact Email */}
            <span className="text-center">
              Our email:{" "}
              <a
                className="text-indigo-500 border-b-2 border-dotted border-indigo-500 pb-[0.5px] hover:text-pink-500"
                mailto="true"
                href="mailto:Quickcv_team@gmail.com"
              >
                Quickcv_team@gmail.com
              </a>
            </span>
          </form>
        </div>
      </div>

      {isModalVisible && (
        <ContactModal
          message="Please choose the purpose of your message."
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </div>
  );
}

function Purpose({ setSelectedPurpose }) {
  const purposes = [
    { purpose: "Report a Problem", icon: "fa-solid fa-bug" },
    { purpose: "Thanks Giving", icon: "fa-solid fa-heart" },
    { purpose: "Request Improvement", icon: "fa-solid fa-lightbulb" },
    { purpose: "Request New Feature", icon: "fa-solid fa-star" },
    { purpose: "Other", icon: "fa-solid fa-ellipsis-h" },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      <div className="mb-5 flex flex-col">
        <label className="text-slate-500 font-semibold text-lg">
          Choose the reason of your message{" "}
          <span className="text-red-500">*</span>
          <br />
          <span className="text-sm text-slate-400">
            This helps us filter messages and prioritize the ones to be done
            first.
          </span>
        </label>
      </div>
      <div className="flex flex-col gap-3 mb-5">
        {purposes.map((item, index) => (
          <span
            key={index}
            onClick={() => setSelectedPurpose(item.purpose)}
            className={`cursor-pointer px-4 py-2 rounded-md border border-slate-300 transition-colors duration-300 ease-in-out flex items-center gap-2 ${
              item.purpose === "Report a Problem"
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : item.purpose === "Thanks Giving"
                ? "bg-pink-100 text-pink-600 hover:bg-pink-200"
                : item.purpose === "Request Improvement"
                ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                : item.purpose === "Request New Feature"
                ? "bg-green-100 text-green-600 hover:bg-green-200"
                : "bg-gray-100 text-blue-600 hover:bg-gray-200"
            }`}
          >
            <i className={item.icon}></i>
            {item.purpose}
          </span>
        ))}
      </div>
    </div>
  );
}

function PurposeField({ selectedPurpose }) {
  const getColorAndIcon = (purpose) => {
    switch (purpose) {
      case "Report a Problem":
        return { color: "text-red-600", icon: "fa-solid fa-bug" };
      case "Thanks Giving":
        return { color: "text-pink-600", icon: "fa-solid fa-heart" };
      case "Request Improvement":
        return { color: "text-yellow-600", icon: "fa-solid fa-lightbulb" };
      case "Request New Feature":
        return { color: "text-green-600", icon: "fa-solid fa-star" };
      default:
        return { color: "text-blue-600", icon: "fa-solid fa-ellipsis-h" };
    }
  };

  const { color, icon } = getColorAndIcon(selectedPurpose);

  return (
    <div className="flex flex-col gap-2 mt-5">
      <label className={`text-slate-500 font-[500] flex items-center gap-2`}>
        Purpose
      </label>
      <div
        className={`flex items-center gap-2 border-[1.5px] border-slate-200 p-1 ${color}`}
      >
        <span className={`${icon} ml-2`}></span>
        <input
          className={`w-full p-2 outline-none focus:border-slate-900 ${color}`}
          type="text"
          value={selectedPurpose}
          readOnly
        />
      </div>
    </div>
  );
}

function FirstName() {
  return (
    <div className="flex flex-col gap-2 mt-5">
      <label
        htmlFor="first-name"
        className="text-slate-500 font-[500] flex items-center gap-2"
      >
        First name
      </label>
      <div className="flex items-center gap-2 border-[1.5px] border-slate-200 p-1">
        <span className="fa-solid fa-user ml-2 text-slate-500"></span>
        <input
          className="w-full p-2 outline-none focus:border-slate-900 text-blue-500"
          type="text"
          id="first-name"
          name="first-name"
          placeholder="Enter your first name"
          spellCheck="false"
          required={true}
        />
      </div>
    </div>
  );
}

function LastName() {
  return (
    <div className="flex flex-col gap-2 mt-5">
      <label
        htmlFor="last-name"
        className="text-slate-500 font-[500] flex items-center gap-2"
      >
        Last name
      </label>
      <div className="flex items-center gap-2 border-[1.5px] border-slate-200 p-1">
        <span className="fa-solid fa-user ml-2 text-slate-500"></span>
        <input
          className="w-full p-2 outline-none focus:border-slate-900 text-blue-500"
          type="text"
          id="last-name"
          name="last-name"
          placeholder="Enter your last name"
          spellCheck="false"
          required={true}
        />
      </div>
    </div>
  );
}

function Email() {
  return (
    <div className="flex flex-col gap-2 mt-5">
      <label
        htmlFor="email"
        className="text-slate-500 font-[500] flex items-center gap-2"
      >
        Email
      </label>
      <div className="flex items-center gap-2 border-[1.5px] border-slate-200 p-1">
        <span className="fa-solid fa-envelope ml-2 text-slate-500"></span>
        <input
          className="w-full p-2 outline-none focus:border-slate-900 text-blue-500"
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          spellCheck="false"
          required={true}
        />
      </div>
    </div>
  );
}

function PhoneNumber() {
  return (
    <div className="flex flex-col gap-2 mt-5">
      <label
        htmlFor="phone-number"
        className="text-slate-500 font-[500] flex items-center gap-2"
      >
        Phone number
      </label>
      <div className="flex items-center gap-2 border-[1.5px] border-slate-200 p-1">
        <span className="fa-solid fa-phone ml-2 text-slate-500"></span>
        <input
          className="w-full p-2 outline-none focus:border-slate-900 text-blue-500"
          type="phone"
          id="phone-number"
          name="phone-number"
          placeholder="Enter your phone number"
          spellCheck="false"
        />
      </div>
    </div>
  );
}

function Message() {
  return (
    <div className="flex flex-col gap-2 mt-5">
      <label
        htmlFor="message"
        className="text-slate-500 font-[500] flex items-center gap-2"
      >
        <span className="fa-solid fa-message ml-2 text-slate-500"></span>
        Message
      </label>
      <div className="flex items-center gap-2 border-[1.5px] border-slate-200 p-1">
        <textarea
          className="w-full p-2 outline-none focus:border-slate-900 text-blue-500 resize-none h-auto min-h-[100px]"
          id="message"
          name="message"
          placeholder="Enter your message"
          spellCheck="false"
          required={true}
        ></textarea>
      </div>
    </div>
  );
}

function ReportIssue() {
  return (
    <div className="border p-4 bg-white rounded-lg shadow-md w-fit h-fit">
      <div className="mb-5 flex flex-col">
        <label className="text-slate-500 font-semibold text-lg">
          Release Issue to Repo
          <br />
          <span className="text-sm text-slate-400">
            Report an issue directly to our GitHub repository.
          </span>
        </label>
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <a
          href="https://github.com/Adam-Elmi/Quick-CV/issues/new"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer px-4 py-2 rounded-md border border-slate-300 transition-colors duration-300 ease-in-out flex items-center gap-2 bg-blue-100 text-blue-600 hover:bg-blue-200"
        >
          <i className="fa-brands fa-github"></i>
          Report Issue
        </a>
      </div>
    </div>
  );
}
