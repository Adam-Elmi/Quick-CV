import InputField from "./InputField";

export default function Profile() {
  return (
    <div className="flex flex-col gap-8 border-2 border-slate-100 rounded-md bg-white p-2 m-4">
      <h1 className="p-1 text-xl bold border-b-[1.5px] w-fit border-slate-100 text-slate-500 m-auto">
        Profile Summary
      </h1>
      <form className="flex flex-col gap-4 flex-wrap justify-center">
        <div className="flex gap-4 flex-wrap justify-center">
          {/* First Name */}
          <InputField
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
