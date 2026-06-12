import InputWrapper from "./InputWrapper";
import DynamicInputGroup from "./DynamicInputGroup";
import ImageInput from "./ImageInput";
import { useActiveTemplateConfig } from "../Utilities/cvDataStore";

export default function Profile() {
  const config = useActiveTemplateConfig();

  return (
    <div className="flex flex-col gap-6 border border-[#2a2a38] rounded-lg bg-[#1a1a27] p-4 m-4">
      <h2 className="mono text-xs font-bold uppercase tracking-widest text-[#8b8fa8] pb-3 border-b border-[#2a2a38] text-center">
        Profile Summary
      </h2>
      <form className="flex flex-col gap-4 flex-wrap justify-center">
        {/* Adaptive Image Input */}
        {config.features.picture && (
          <ImageInput
            dataId="Profile-Picture"
            label="Profile Picture"
            icon="fa-solid fa-image"
            className="self-center"
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl px-4 justify-items-center">
          <InputWrapper
            dataId="Section-Title-Profile"
            type="text"
            label="Section Title"
            placeholder="Default: CONTACT"
            icon="fa-solid fa-heading"
            className="sm:col-span-2 sm:max-w-none"
            required={config.requiredFields.includes("Section-Title-Profile")}
          />
          <InputWrapper
            dataId="First-Name"
            type="text"
            label="First Name"
            placeholder="Enter your first name"
            icon="fa-solid fa-user"
            required={config.requiredFields.includes("First-Name")}
          />
          <InputWrapper
            dataId="Last-Name"
            type="text"
            label="Last Name"
            placeholder="Enter your last name"
            icon="fa-solid fa-user"
            required={config.requiredFields.includes("Last-Name")}
          />
          <InputWrapper
            dataId="Title"
            type="text"
            label="Title"
            placeholder="Enter your title"
            icon="fa-solid fa-star"
            className="sm:col-span-2 sm:max-w-none"
            required={config.requiredFields.includes("Title")}
          />
          <InputWrapper
            dataId="Summary"
            type="text"
            label="Professional Summary"
            placeholder="A brief summary about yourself..."
            icon="fa-solid fa-align-left"
            className="sm:col-span-2 sm:max-w-none"
            multiline={true}
            required={config.requiredFields.includes("Summary")}
          />
          <InputWrapper
            dataId="Email-1"
            type="text"
            label="Primary Email"
            placeholder="Enter primary email"
            icon="fa-solid fa-envelope"
            required={config.requiredFields.includes("Email-1")}
          />
          <InputWrapper
            dataId="Email-2"
            type="text"
            label="Secondary Email"
            placeholder="Enter secondary email"
            icon="fa-solid fa-envelope"
            required={config.requiredFields.includes("Email-2")}
          />
          <InputWrapper
            dataId="Phone-1"
            type="text"
            label="Primary Phone"
            placeholder="Enter primary phone"
            icon="fa-solid fa-phone"
            required={config.requiredFields.includes("Phone-1")}
          />
          <InputWrapper
            dataId="Phone-2"
            type="text"
            label="Secondary Phone"
            placeholder="Enter secondary phone"
            icon="fa-solid fa-phone"
            required={config.requiredFields.includes("Phone-2")}
          />
          <InputWrapper
            dataId="Country"
            type="text"
            label="Country"
            placeholder="Enter your country"
            icon="fa-solid fa-earth-americas"
            required={config.requiredFields.includes("Country")}
          />
          <InputWrapper
            dataId="City"
            type="text"
            label="City"
            placeholder="Enter your city"
            icon="fa-solid fa-city"
            required={config.requiredFields.includes("City")}
          />
          <InputWrapper
            dataId="Street-1"
            type="text"
            label="Street Address 1"
            placeholder="Enter street line 1"
            icon="fa-solid fa-map-location-dot"
            required={config.requiredFields.includes("Street-1")}
          />
          <InputWrapper
            dataId="Street-2"
            type="text"
            label="Street Address 2"
            placeholder="Enter street line 2"
            icon="fa-solid fa-map-location-dot"
            required={config.requiredFields.includes("Street-2")}
          />

          <div className="w-full max-w-4xl sm:col-span-2 sm:w-full">
            <DynamicInputGroup
              baseId="Profile_Link"
              title="Social Links"
              buttonLabel="Add Link"
              maxItems={config.features.socialLinks.max}
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
