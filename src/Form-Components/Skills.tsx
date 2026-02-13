import InputWrapper from "./InputWrapper";
import DynamicInputGroup from "./DynamicInputGroup";

export default function Skills() {
    return (
        <div className="flex flex-col gap-8 border-2 border-slate-100 rounded-md bg-white p-2 m-4">
            <h1 className="p-1 text-xl bold border-b-[1.5px] w-fit border-slate-100 text-slate-500 m-auto">
                Skills
            </h1>
            <form className="flex flex-col gap-4 flex-wrap justify-center">
                <div className="w-full max-w-4xl px-4 justify-items-center">
                    <DynamicInputGroup
                        baseId="Skills"
                        title="Skills & Expertise"
                        buttonLabel="Add Skill"
                    >
                        {(id, index) => (
                            <InputWrapper
                                key={id}
                                dataId={`${id}_Skill`}
                                type="text"
                                label="Skill"
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
