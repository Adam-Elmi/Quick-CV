import { useEffect, useState, useRef, useContext } from "react";

export default function Contact() {
  
  return (
    <>
      <h1 className="mt-5 mb-2 font-bold text-[2rem] w-full text-center">
        Contact Info
      </h1>
      <div className="flex flex-col gap-5 w-full justify-center items-center">
        <div className="flex flex-col gap-5 w-full justify-center items-center max-w-[500px] p-4 border-[1.5px] border-blue-400 rounded-md shadow-md">
          
          {/* Fullname */}
          <InputField
            id="fullname"
            label="Enter your fullname"
            iconClass="fa-user"
          />
          {/* Phone Number */}
          <InputField
            id="phoneNumber"
            label="Enter your phone number"
            iconClass="fa-phone"
            type="tel"
          />

          {/* Email */}
          <InputField
            id="email"
            label="Enter your email address"
            iconClass="fa-envelope"
            type="email"
          />
          {/* Country */}
          <InputField
            id="country"
            label="Enter your country"
            iconClass="fa-globe"
          />
          {/* City */}
          <InputField
            id="city"
            label="Enter your city"
            iconClass="fa-city"
          />
        </div>
      </div>
    </>
  );
}

// Reusable input component
const InputField = ({
  id,
  label,
  iconClass,
  type = "text",
  value,
  onChange,
  inputRef,
}) => (
  <div className="flex flex-col gap-2 w-full max-w-[400px]">
    <label
      htmlFor={id}
      className="font-bold text-slate-500 flex items-center gap-2"
    >
      <span className={`fa-solid ${iconClass}`}></span>
      <span>{label}</span>
    </label>
    <input
      ref={inputRef}
      required
      type={type}
      placeholder={label}
      id={id}
      value={value}
      onChange={onChange}
      className="border border-gray-300 text-gray-700 py-2 px-3 mb-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);
