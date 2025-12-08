import InputWrapper from "./InputWrapper";
// import ids from "../Utilities/ids";
export default function Profile() {
  return (
    <div className="flex flex-col gap-8 border-2 border-slate-100 rounded-md bg-white p-2 m-4">
      <h1 className="p-1 text-xl bold border-b-[1.5px] w-fit border-slate-100 text-slate-500 m-auto">
        Profile Summary
      </h1>
      <form className="flex flex-col gap-4 flex-wrap justify-center">
        <div className="flex gap-4 flex-wrap justify-center">
          {/* First Name */}
          <InputWrapper
            dataId="First-Name"
            type="text"
            label="First Name"
            placeholder="Enter your first name"
            icon="fa-solid fa-user"
          />
          {/* Last Name */}
          <InputWrapper
            dataId="Last-Name"
            type="text"
            label="Last Name"
            placeholder="Enter your last name"
            icon="fa-solid fa-user"
          />
          {/* Title */}
          <InputWrapper
          dataId = "Title"
            type="text"
            label="Title"
            placeholder="Enter your title"
            icon="fa-solid fa-star"
          />
          {/* Email Address */}
          <InputWrapper
          dataId = "Email"
            type="text"
            label="Email Address"
            placeholder="Enter your email address"
            icon="fa-solid fa-envelope"
          />
          {/* Phone Number */}
          <InputWrapper
          dataId = "Phone-Number"
            type="text"
            label="Phone Number"
            placeholder="Enter your phone number"
            icon="fa-solid fa-phone"
          />
          {/* Website */}
          <InputWrapper
          dataId = "Website"
            type="text"
            label="Website"
            placeholder="Enter your website link"
            icon="fa-solid fa-link"
          />
          {/* LinkedIn */}
          <InputWrapper
          dataId = "LinkedIN"
            type="text"
            label="LinkedIn"
            placeholder="Enter your LinkedIn link"
            icon="fa-brands fa-linkedin"
          />
          {/* Country */}
          <InputWrapper
          dataId = "Country"
            type="text"
            label="Country"
            placeholder="Enter your country"
            icon="fa-solid fa-earth-americas"
          />
          {/* City */}
          <InputWrapper
            dataId = "City"
            type="text"
            label="City"
            placeholder="Enter your city"
            icon="fa-solid fa-city"
          />
        </div>
      </form>
    </div>
  );
}
