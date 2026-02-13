import InputWrapper from "./InputWrapper";
import DynamicInputGroup from "./DynamicInputGroup";
export default function Profile() {
  return (
    <div className="flex flex-col gap-8 border-2 border-slate-100 rounded-md bg-white p-2 m-4">
      <h1 className="p-1 text-xl bold border-b-[1.5px] w-fit border-slate-100 text-slate-500 m-auto">
        Profile Summary
      </h1>
      <form className="flex flex-col gap-4 flex-wrap justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl px-4 justify-items-center">
          {}
          <InputWrapper
            dataId="First-Name"
            type="text"
            label="First Name"
            placeholder="Enter your first name"
            icon="fa-solid fa-user"
          />
          {}
          <InputWrapper
            dataId="Last-Name"
            type="text"
            label="Last Name"
            placeholder="Enter your last name"
            icon="fa-solid fa-user"
          />
          {}
          <InputWrapper
            dataId="Title"
            type="text"
            label="Title"
            placeholder="Enter your title"
            icon="fa-solid fa-star"
            className="sm:col-span-2 sm:max-w-none"
          />
          {}
          <InputWrapper
            dataId="Email"
            type="text"
            label="Email Address"
            placeholder="Enter your email address"
            icon="fa-solid fa-envelope"
          />
          {}
          <InputWrapper
            dataId="Phone-Number"
            type="text"
            label="Phone Number"
            placeholder="Enter your phone number"
            icon="fa-solid fa-phone"
          />
          {}
          <InputWrapper
            dataId="Country"
            type="text"
            label="Country"
            placeholder="Enter your country"
            icon="fa-solid fa-earth-americas"
          />
          <InputWrapper
            dataId="City"
            type="text"
            label="City"
            placeholder="Enter your city"
            icon="fa-solid fa-city"
          />
          {}
          <div className="w-full max-w-4xl sm:col-span-2 sm:w-full">
            <DynamicInputGroup
              baseId="Profile_Link"
              title="Social Links"
              buttonLabel="Add Link"
            >
              {(id, index) => (
                <InputWrapper
                  key={id}
                  dataId={id}
                  type="text"
                  label={`Link #${index + 1}`}
                  placeholder="Enter a link..."
                  icon="fa-solid fa-link"
                  className="sm:max-w-none"
                />
              )}
            </DynamicInputGroup>
          </div>
        </div>
      </form>
    </div>
  );
}
