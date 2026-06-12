import InputWrapper from "./InputWrapper";
import DynamicInputGroup from "./DynamicInputGroup";
export default function Languages() {
    return (
        <div className="flex flex-col gap-6 border border-[#2a2a38] rounded-lg bg-[#1a1a27] p-4 m-4">
            <h2 className="mono text-xs font-bold uppercase tracking-widest text-[#8b8fa8] pb-3 border-b border-[#2a2a38] text-center">
                Languages
            </h2>
            <form className="flex flex-col gap-4 flex-wrap justify-center">
                <div className="w-full max-w-4xl px-4">
                    <InputWrapper
                        dataId="Section-Title-Languages"
                        type="text"
                        label="Section Title"
                        placeholder="Default: LANGUAGES"
                        icon="fa-solid fa-heading"
                        className="w-full max-w-none"
                    />
                </div>
                <div className="w-full max-w-4xl px-4 justify-items-center">
                    <DynamicInputGroup
                        baseId="Languages"
                        title="Languages"
                        buttonLabel="Add Language"
                    >
                        {(id, index) => (
                            <div key={id} className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-4 pt-2 border-t border-[#2a2a38] first:border-t-0 first:pt-0 items-end">
                                <InputWrapper
                                    dataId={`${id}_Language`}
                                    type="text"
                                    label="Language"
                                    placeholder="e.g. English"
                                    icon="fa-solid fa-language"
                                />
                                <InputWrapper
                                    dataId={`${id}_Proficiency`}
                                    type="text"
                                    label="Proficiency"
                                    placeholder="e.g. Native, Fluent"
                                    icon="fa-solid fa-star-half-stroke"
                                />
                            </div>
                        )}
                    </DynamicInputGroup>
                </div>
            </form>
        </div>
    );
}
