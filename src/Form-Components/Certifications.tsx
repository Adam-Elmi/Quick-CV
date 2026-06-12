import InputWrapper from "./InputWrapper";
import DynamicInputGroup from "./DynamicInputGroup";
export default function Certifications() {
    return (
        <div className="flex flex-col gap-6 border border-[#2a2a38] rounded-lg bg-[#1a1a27] p-4 m-4">
            <h2 className="mono text-xs font-bold uppercase tracking-widest text-[#8b8fa8] pb-3 border-b border-[#2a2a38] text-center">
                Certifications
            </h2>
            <form className="flex flex-col gap-4 flex-wrap justify-center">
                <div className="w-full max-w-4xl px-4">
                    <InputWrapper
                        dataId="Section-Title-Certifications"
                        type="text"
                        label="Section Title"
                        placeholder="Default: CERTIFICATIONS"
                        icon="fa-solid fa-heading"
                        className="w-full max-w-none"
                    />
                </div>
                <div className="w-full max-w-4xl px-4 justify-items-center">
                    <DynamicInputGroup
                        baseId="Certifications"
                        title="Certifications"
                        buttonLabel="Add Certification"
                    >
                        {(id) => (
                            <div key={id} className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-8 pt-4 border-t border-[#2a2a38] first:border-t-0 first:pt-0">
                                <InputWrapper
                                    dataId={`${id}_CertName`}
                                    type="text"
                                    label="Certification Name"
                                    placeholder="e.g. AWS Solutions Architect"
                                    icon="fa-solid fa-certificate"
                                    className="sm:col-span-2 sm:max-w-none"
                                />
                                <InputWrapper
                                    dataId={`${id}_Issuer`}
                                    type="text"
                                    label="Issuing Organization"
                                    placeholder="e.g. Amazon Web Services"
                                    icon="fa-solid fa-building"
                                />
                                <InputWrapper
                                    dataId={`${id}_IssueDate`}
                                    type="text"
                                    label="Issue Date"
                                    placeholder="e.g. March 2023"
                                    icon="fa-solid fa-calendar-day"
                                />
                                <InputWrapper
                                    dataId={`${id}_ExpiryDate`}
                                    type="text"
                                    label="Expiry Date"
                                    placeholder="e.g. March 2026 or No Expiry"
                                    icon="fa-solid fa-calendar-xmark"
                                />
                                <InputWrapper
                                    dataId={`${id}_CredentialId`}
                                    type="text"
                                    label="Credential ID"
                                    placeholder="e.g. ABC-12345"
                                    icon="fa-solid fa-fingerprint"
                                />
                                <InputWrapper
                                    dataId={`${id}_CredentialUrl`}
                                    type="text"
                                    label="Credential URL"
                                    placeholder="e.g. https://verify.example.com/..."
                                    icon="fa-solid fa-link"
                                />
                            </div>
                        )}
                    </DynamicInputGroup>
                </div>
            </form>
        </div>
    );
}
