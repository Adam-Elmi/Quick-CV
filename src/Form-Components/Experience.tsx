import InputWrapper from "./InputWrapper";
import DynamicInputGroup from "./DynamicInputGroup";
export default function Experience() {
    return (
        <div className="flex flex-col gap-8 border-2 border-slate-100 rounded-md bg-white p-2 m-4">
            <h1 className="p-1 text-xl bold border-b-[1.5px] w-fit border-slate-100 text-slate-500 m-auto">
                Work Experience
            </h1>
            <form className="flex flex-col gap-4 flex-wrap justify-center">
                <div className="w-full max-w-4xl px-4 justify-items-center">
                    <DynamicInputGroup
                        baseId="Experience"
                        title="Jobs / Internships"
                        buttonLabel="Add Experience"
                    >
                        {(id, index) => (
                            <div key={id} className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-8 pt-4 border-t border-slate-50 first:border-t-0 first:pt-0">
                                {}
                                <InputWrapper
                                    dataId={`${id}_Position`}
                                    type="text"
                                    label="Position / Job Title"
                                    placeholder="e.g. Senior Software Engineer"
                                    icon="fa-solid fa-briefcase"
                                    className="sm:col-span-2 sm:max-w-none"
                                />
                                {}
                                <InputWrapper
                                    dataId={`${id}_Company`}
                                    type="text"
                                    label="Company Name"
                                    placeholder="e.g. Google"
                                    icon="fa-solid fa-building"
                                />
                                {}
                                <InputWrapper
                                    dataId={`${id}_City`}
                                    type="text"
                                    label="City"
                                    placeholder="e.g. Mountain View, CA"
                                    icon="fa-solid fa-city"
                                />
                                {}
                                <InputWrapper
                                    dataId={`${id}_StartDate`}
                                    type="text"
                                    label="Start Date"
                                    placeholder="e.g. June 2022"
                                    icon="fa-solid fa-calendar"
                                />
                                {}
                                <InputWrapper
                                    dataId={`${id}_EndDate`}
                                    type="text"
                                    label="End Date"
                                    placeholder="e.g. Present"
                                    icon="fa-solid fa-calendar-check"
                                />
                                {}
                                <InputWrapper
                                    dataId={`${id}_Description`}
                                    type="text"
                                    label="Responsibilities / Achievements"
                                    placeholder="Led a team of..."
                                    icon="fa-solid fa-list-ul"
                                    className="sm:col-span-2 sm:max-w-none"
                                />
                            </div>
                        )}
                    </DynamicInputGroup>
                </div>
            </form>
        </div>
    );
}
