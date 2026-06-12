import InputWrapper from "./InputWrapper";
import DynamicInputGroup from "./DynamicInputGroup";
import { useActiveTemplateConfig } from "../Utilities/cvDataStore";

export default function Skills() {
    const config = useActiveTemplateConfig();

    return (
        <div className="flex flex-col gap-6 border border-[#2a2a38] rounded-lg bg-[#1a1a27] p-4 m-4">
            <h2 className="mono text-xs font-bold uppercase tracking-widest text-[#8b8fa8] pb-3 border-b border-[#2a2a38] text-center">
                Skills
            </h2>
            <form className="flex flex-col gap-4 flex-wrap justify-center">
                <div className="w-full max-w-4xl px-4">
                    <InputWrapper
                        dataId="Section-Title-Skills"
                        type="text"
                        label="Section Title"
                        placeholder="Default: SKILLS"
                        icon="fa-solid fa-heading"
                        className="w-full max-w-none"
                    />
                </div>
                <div className="w-full max-w-4xl px-4 justify-items-center">
                    <DynamicInputGroup
                        baseId="Skills"
                        title="Skills & Expertise"
                        buttonLabel="Add Skill"
                        maxItems={config.features.skills.max}
                    >
                        {(id, index) => (
                            <InputWrapper
                                key={id}
                                dataId={`${id}_Skill`}
                                type="text"
                                label={`Skill #${index + 1}`}
                                placeholder="e.g. React.js"
                                icon="fa-solid fa-code"
                                className="w-full"
                            />
                        )}
                    </DynamicInputGroup>
                </div>
            </form>
        </div>
    );
}
