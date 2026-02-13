import InputWrapper from "./InputWrapper";
import DynamicInputGroup from "./DynamicInputGroup";
export default function Projects() {
    return (
        <div className="flex flex-col gap-8 border-2 border-slate-100 rounded-md bg-white p-2 m-4">
            <h1 className="p-1 text-xl bold border-b-[1.5px] w-fit border-slate-100 text-slate-500 m-auto">
                Projects
            </h1>
            <form className="flex flex-col gap-4 flex-wrap justify-center">
                <div className="w-full max-w-4xl px-4 justify-items-center">
                    <DynamicInputGroup
                        baseId="Projects"
                        title="Personal / Professional Projects"
                        buttonLabel="Add Project"
                    >
                        {(id, index) => (
                            <div key={id} className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-8 pt-4 border-t border-slate-50 first:border-t-0 first:pt-0">
                                {}
                                <InputWrapper
                                    dataId={`${id}_ProjectName`}
                                    type="text"
                                    label="Project Name"
                                    placeholder="e.g. Portfolio Website"
                                    icon="fa-solid fa-folder-open"
                                    className="sm:col-span-2 sm:max-w-none"
                                />
                                {}
                                <InputWrapper
                                    dataId={`${id}_TechStack`}
                                    type="text"
                                    label="Tech Stack"
                                    placeholder="e.g. React, Node.js"
                                    icon="fa-solid fa-layer-group"
                                />
                                {}
                                <InputWrapper
                                    dataId={`${id}_ProjectLink`}
                                    type="text"
                                    label="Project Link"
                                    placeholder="e.g. github.com/my-project"
                                    icon="fa-solid fa-link"
                                />
                                {}
                                <InputWrapper
                                    dataId={`${id}_Description`}
                                    type="text"
                                    label="Description / Impact"
                                    placeholder="Briefly describe what you built..."
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
