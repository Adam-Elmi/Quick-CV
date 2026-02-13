import InputWrapper from "./InputWrapper";
import DynamicInputGroup from "./DynamicInputGroup";
export default function Languages() {
    return (
        <div className="flex flex-col gap-8 border-2 border-slate-100 rounded-md bg-white p-2 m-4">
            <h1 className="p-1 text-xl bold border-b-[1.5px] w-fit border-slate-100 text-slate-500 m-auto">
                Languages
            </h1>
            <form className="flex flex-col gap-4 flex-wrap justify-center">
                <div className="w-full max-w-4xl px-4 justify-items-center">
                    <DynamicInputGroup
                        baseId="Languages"
                        title="Languages"
                        buttonLabel="Add Language"
                    >
                        {(id, index) => (
                            <div key={id} className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-4 pt-2 border-t border-slate-50 first:border-t-0 first:pt-0 items-end">
                                {}
                                <InputWrapper
                                    dataId={`${id}_Language`}
                                    type="text"
                                    label="Language"
                                    placeholder="e.g. English"
                                    icon="fa-solid fa-language"
                                />
                                {}
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
