import { useShared } from "../Shared/SharedContext";
import { useState } from "react";
import ProTypes from "prop-types";

export default function Profile() {
  const { setInputValue } = useShared();
  return (
    <div className="flex flex-col gap-8 border-2 border-slate-100 rounded-md bg-white p-2 m-4">
      <h1 className="p-1 text-xl bold border-b-[1.5px] w-fit border-slate-100 text-slate-500 m-auto">
        Profile Summary
      </h1>
      <form className="flex flex-col gap-4 flex-wrap justify-center">
        {/* Photo */}
        <div className="flex justify-center items-center">
          <input
            type="file"
            accept="image/*"
            id="profile-image-upload"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = function (ev) {
                  const img = document.getElementById("profile-image-preview");
                  if (img) img.src = ev.target.result;
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <label
            htmlFor="profile-image-upload"
            className="flex justify-center items-center cursor-pointer w-[100px] h-[100px] border-[1.5px] border-slate-400"
          >
            <img
              id="profile-image-preview"
              className="block relative z-99 w-full h-full object-cover"
            />
            <span
              className="absolute text-4xl text-slate-400 pointer-events-none select-none flex items-center justify-center w-[100px] h-[100px]"
              id="profile-image-plus"
            >+</span>
          </label>
          <script dangerouslySetInnerHTML={{
            __html: `
              document.getElementById('profile-image-upload')?.addEventListener('change', function(e) {
                const file = e.target.files && e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = function (ev) {
                    const img = document.getElementById("profile-image-preview");
                    const plus = document.getElementById("profile-image-plus");
                    if (img) img.src = ev.target.result;
                    if (plus) plus.style.display = "none";
                  };
                  reader.readAsDataURL(file);
                }
              });
            `
          }} />
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          {/* First Name */}
          <InputField
            event={(e) => setInputValue(e.target.value)}
            type="text"
            label="First Name"
            is_required={true}
            placeholder="Enter your first name"
            icon="fa-solid fa-user"
          />
          {/* Last Name */}
          <InputField
            type="text"
            label="Last Name"
            is_required={true}
            placeholder="Enter your last name"
            icon="fa-solid fa-user"
          />
          {/* Title */}
          <InputField
            type="text"
            label="Title"
            is_required={false}
            placeholder="Enter your title"
            icon="fa-solid fa-star"
          />
          {/* Email Address */}
          <InputField
            type="text"
            label="Email Address"
            is_required={true}
            placeholder="Enter your email address"
            icon="fa-solid fa-envelope"
          />
          {/* Phone Number */}
          <InputField
            type="text"
            label="Phone Number"
            is_required={true}
            placeholder="Enter your phone number"
            icon="fa-solid fa-phone"
          />
          {/* Website */}
          <InputField
            type="text"
            label="Website"
            is_required={false}
            placeholder="Enter your website link"
            icon="fa-solid fa-link"
          />
          {/* LinkedIn */}
          <InputField
            type="text"
            label="LinkedIn"
            is_required={false}
            placeholder="Enter your LinkedIn link"
            icon="fa-brands fa-linkedin"
          />
          {/* Country */}
          <InputField
            type="text"
            label="Country"
            is_required={false}
            placeholder="Enter your country"
            icon="fa-solid fa-earth-americas"
          />
          {/* City */}
          <InputField
            type="text"
            label="City"
            is_required={false}
            placeholder="Enter your city"
            icon="fa-solid fa-city"
          />
        </div>
      </form>
    </div>
  );
}

function InputField({ label, event, type, is_required, placeholder, icon }) {
  const [len, setLen] = useState(0);
  return (
    <div className="flex flex-col gap-1">
      <label className="text-slate-500 bold flex items-center gap-2">
        <span className={icon + " text-sm text-gray-300"}></span>
        {label}
        {is_required ? <span className="text-red-400">*</span> : null}
      </label>
      <input
        required={is_required}
        onChange={event}
        onInput={(e) => setLen(e.target.value.length)}
        type={type}
        className={`border border-gray-300 ${len > 0 ? "text-blue-700" : "text-gray-700"} py-2 px-3 mb-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500{`}
        placeholder={placeholder}
      />
    </div>
  );
}

InputField.propTypes = {
  label: ProTypes.string.isRequired,
  event: ProTypes.func.isRequired,
  type: ProTypes.string.isRequired,
  is_required: ProTypes.bool,
  placeholder: ProTypes.string,
  icon: ProTypes.string,
};
