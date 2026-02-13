import InputWrapper from "./InputWrapper";
import DynamicInputGroup from "./DynamicInputGroup";
export default function Awards() {
    return (
        <div className="flex flex-col gap-8 border-2 border-slate-100 rounded-md bg-white p-2 m-4">
            <h1 className="p-1 text-xl bold border-b-[1.5px] w-fit border-slate-100 text-slate-500 m-auto">
                Awards & Honors
            </h1>
            <form className="flex flex-col gap-4 flex-wrap justify-center">
                <div className="w-full max-w-4xl px-4 justify-items-center">
                    <DynamicInputGroup
                        baseId="Awards"
                        title="Awards"
                        buttonLabel="Add Award"
                    >
                        {(id, index) => (
                            <div key={id} className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-8 pt-4 border-t border-slate-50 first:border-t-0 first:pt-0">
                                {}
                                <InputWrapper
                                    dataId={`${id}_AwardName`}
                                    type="text"
                                    label="Award Name"
                                    placeholder="e.g. Employee of the Month"
                                    icon="fa-solid fa-trophy"
                                    className="sm:col-span-2 sm:max-w-none"
                                />
                                {}
                                <InputWrapper
                                    dataId={`${id}_Organization`}
                                    type="text"
                                    label="Organization / Issuer"
                                    placeholder="e.g. Google"
                                    icon="fa-solid fa-building"
                                />
                                {}
                                <InputWrapper
                                    dataId={`${id}_Date`}
                                    type="text"
                                    label="Date Received"
                                    placeholder="e.g. July 2023"
                                    icon="fa-solid fa-calendar-day"
                                />
                                {}
                                <InputWrapper
                                    dataId={`${id}_Description`}
                                    type="text"
                                    label="Description"
                                    placeholder="Briefly describe the recognition..."
                                    icon="fa-solid fa-align-left"
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
