import InputWrapper from "./InputWrapper";
import DynamicInputGroup from "./DynamicInputGroup";
export default function Education() {
    return (
        <div className="flex flex-col gap-6 border border-[#2a2a38] rounded-lg bg-[#1a1a27] p-4 m-4">
            <h2 className="mono text-xs font-bold uppercase tracking-widest text-[#8b8fa8] pb-3 border-b border-[#2a2a38] text-center">
                Education History
            </h2>
            <form className="flex flex-col gap-4 flex-wrap justify-center">
                <div className="w-full max-w-4xl px-4">
                    <InputWrapper
                        dataId="Section-Title-Education"
                        type="text"
                        label="Section Title"
                        placeholder="Default: EDUCATION"
                        icon="fa-solid fa-heading"
                        className="w-full max-w-none"
                    />
                </div>
                <div className="w-full max-w-4xl px-4 justify-items-center">
                    <DynamicInputGroup
                        baseId="Education"
                        title="Schools / Degrees"
                        buttonLabel="Add Education"
                    >
                        {(id, index) => (
                            <div key={id} className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-8 pt-4 border-t border-[#2a2a38] first:border-t-0 first:pt-0">
                                <InputWrapper
                                    dataId={`${id}_School`}
                                    type="text"
                                    label="School / University"
                                    placeholder="e.g. Harvard University"
                                    icon="fa-solid fa-school"
                                    className="sm:col-span-2 sm:max-w-none"
                                />
                                <InputWrapper
                                    dataId={`${id}_Degree`}
                                    type="text"
                                    label="Degree"
                                    placeholder="e.g. Bachelor of Science"
                                    icon="fa-solid fa-graduation-cap"
                                />
                                <InputWrapper
                                    dataId={`${id}_City`}
                                    type="text"
                                    label="City"
                                    placeholder="e.g. Cambridge, MA"
                                    icon="fa-solid fa-city"
                                />
                                <InputWrapper
                                    dataId={`${id}_StartDate`}
                                    type="text"
                                    label="Start Date"
                                    placeholder="e.g. Sep 2018"
                                    icon="fa-solid fa-calendar"
                                />
                                <InputWrapper
                                    dataId={`${id}_EndDate`}
                                    type="text"
                                    label="End Date"
                                    placeholder="e.g. May 2022"
                                    icon="fa-solid fa-calendar-check"
                                />
                                <InputWrapper
                                    dataId={`${id}_Description`}
                                    type="text"
                                    label="Description / Achievements"
                                    placeholder="Relevant coursework, honors, etc."
                                    icon="fa-solid fa-align-left"
                                    className="sm:col-span-2 sm:max-w-none"
                                    multiline={true}
                                />
                            </div>
                        )}
                    </DynamicInputGroup>
                </div>
            </form>
        </div>
    );
}
