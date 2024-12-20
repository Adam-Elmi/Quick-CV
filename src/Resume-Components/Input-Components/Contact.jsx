import { useEffect, useState } from "react";

export default function Contact() {
  const [inputValue, setInputValue] = useState(() => {
    const storedData = JSON.parse(sessionStorage.getItem("contact"));
    return storedData
      ? storedData
      : {
        fullname: "",
        phone_number: "",
        email: "",
        country: "",
        city: "",
      }
  });

  const handleInputValue = (e) => {
    setInputValue(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    sessionStorage.setItem("contact", JSON.stringify(inputValue));
  }, [inputValue]);

  return (
    <>
      <h1 className="mt-5 mb-2 font-bold text-[2rem] w-full text-center">
        Contact Info
      </h1>
      <div className="flex flex-col gap-5 w-full justify-center items-center">
        <div className="flex flex-col gap-5 w-full justify-center items-center max-w-[500px] p-4 border-[1.5px] border-blue-400 rounded-md shadow-md">
          <InputField
            id="fullname"
            label="Enter your fullname"
            iconClass="fa-user"
            onChange={handleInputValue}
            value={inputValue.fullname}
          />
          <InputField
            id="phone_number"
            label="Enter your phone number"
            iconClass="fa-phone"
            type="tel"
            onChange={handleInputValue}
            value={inputValue.phone_number}
          />
          <InputField
            id="email"
            label="Enter your email address"
            iconClass="fa-envelope"
            type="email"
            onChange={handleInputValue}
            value={inputValue.email}
          />
          <InputField
            id="country"
            label="Enter your country"
            iconClass="fa-globe"
            onChange={handleInputValue}
            value={inputValue.country}
          />
          <InputField
            id="city"
            label="Enter your city"
            iconClass="fa-city"
            onChange={handleInputValue}
            value={inputValue.city}
          />
        </div>
      </div>
    </>
  );
}

const InputField = ({ id, label, iconClass, type = "text", value, onChange }) => (
  <div className="flex flex-col gap-2 w-full max-w-[400px]">
    <label
      htmlFor={id}
      className="font-bold text-slate-500 flex items-center gap-2"
    >
      <span className={`fa-solid ${iconClass}`}></span>
      <span>{label}</span>
    </label>
    <input
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